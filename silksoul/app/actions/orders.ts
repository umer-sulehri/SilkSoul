"use server";

import { revalidatePath } from "next/cache";
import { checkoutSchema } from "@/lib/validations";
import { createServiceClient } from "@/lib/supabase/service";
import {
  fetchProductById,
  fetchSiteSettings,
  isSupabaseConfigured,
} from "@/lib/data/loader";
import { addDemoOrder, decrementDemoStock, demoOrders } from "@/lib/data/demo-store";
import type { DemoOrder, DemoOrderItem } from "@/lib/data/demo-admin";
import { generateOrderNumber } from "@/lib/utils";

export type OrderResult =
  | { success: true; orderNumber: string; orderId: string; grandTotal: number }
  | { success: false; error: string };

let fallbackSequence = 8000;

export async function requestOrder(input: unknown): Promise<OrderResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? "Invalid order request" };
  }

  const { items, customerName, email, phone, address, city, notes } = parsed.data;

  // Re-validate item prices server-side.
  const subtotal = await items.reduce(async (accPromise, item) => {
    const acc = await accPromise;
    const product = await fetchProductById(item.productId);
    if (!product) return acc;
    const price = product.sale_price ?? product.price;
    return acc + price * item.quantity;
  }, Promise.resolve(0));

  const settings = await fetchSiteSettings();
  const deliveryFee =
    subtotal >= settings.free_delivery_threshold ? 0 : settings.standard_delivery_fee;
  const grandTotal = subtotal + deliveryFee;

  if (!isSupabaseConfigured()) {
    fallbackSequence += 1;
    const orderNumber = generateOrderNumber(fallbackSequence);
    const now = new Date().toISOString();
    const orderId = `ord-demo-${Date.now()}`;

    const orderItems: DemoOrderItem[] = [];
    for (const item of items) {
      const product = await fetchProductById(item.productId);
      if (!product) continue;
      const price = product.sale_price ?? product.price;
      orderItems.push({
        id: `oi-demo-${Date.now()}-${item.productId}`,
        order_id: orderId,
        product_id: product.id,
        product_name: product.name,
        product_image:
          product.images?.find((i) => i.is_primary)?.image_url ??
          product.images?.[0]?.image_url ??
          null,
        unit_price: price,
        quantity: item.quantity,
        line_total: price * item.quantity,
      });
      decrementDemoStock(product.id, item.quantity);
      revalidatePath("/shop");
      revalidatePath(`/products/${product.slug}`);
    }

    const demoOrder: DemoOrder = {
      id: orderId,
      order_number: orderNumber,
      customer_name: customerName,
      email,
      phone,
      address,
      city,
      notes,
      subtotal,
      delivery_fee: deliveryFee,
      grand_total: grandTotal,
      status: "PENDING",
      admin_note: null,
      coupon_code: null,
      coupon_discount: 0,
      created_at: now,
      items: orderItems,
    };
    addDemoOrder(demoOrder);

    return {
      success: true,
      orderNumber,
      orderId,
      grandTotal,
    };
  }

  try {
    const supabase = createServiceClient();

    const { count } = await supabase
      .from("orders")
      .select("id", { count: "exact", head: true });
    const orderNumber = generateOrderNumber((count ?? 0) + 1);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customerName,
        email,
        phone,
        address,
        city,
        notes,
        subtotal,
        delivery_fee: deliveryFee,
        grand_total: grandTotal,
        status: "PENDING",
      })
      .select("id")
      .single();
    if (orderError) throw new Error(orderError.message);

    for (const item of items) {
      const product = await fetchProductById(item.productId);
      if (!product) continue;
      const price = product.sale_price ?? product.price;
      await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        product_image:
          product.images?.find((i) => i.is_primary)?.image_url ??
          product.images?.[0]?.image_url ??
          null,
        unit_price: price,
        quantity: item.quantity,
        line_total: price * item.quantity,
      });
      await supabase
        .from("products")
        .update({ stock_quantity: Math.max(0, product.stock_quantity - item.quantity) })
        .eq("id", product.id);
    }

    return {
      success: true,
      orderNumber,
      orderId: order.id,
      grandTotal,
    };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Could not place order" };
  }
}

export async function getOrderByNumber(orderNumber: string) {
  if (!isSupabaseConfigured()) {
    return demoOrders().find((o) => o.order_number === orderNumber) ?? null;
  }
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("orders")
    .select(
      `id, order_number, customer_name, email, phone, address, city, notes,
       subtotal, delivery_fee, grand_total, status, created_at,
       order_items (id, product_id, product_name, product_image, unit_price, quantity, line_total)`,
    )
    .eq("order_number", orderNumber)
    .single();
  return data;
}