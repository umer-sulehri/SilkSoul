"use server";

import { checkoutSchema } from "@/lib/validations";
import { createServiceClient } from "@/lib/supabase/service";
import {
  fetchProductById,
  fetchSiteSettings,
  isSupabaseConfigured,
} from "@/lib/data/loader";
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
    return {
      success: true,
      orderNumber,
      orderId: `demo-${fallbackSequence}`,
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
  if (!isSupabaseConfigured()) return null;
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