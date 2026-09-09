"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/service";
import { isSupabaseConfigured } from "@/lib/data/loader";
import {
  updateDemoOrderStatus,
  updateDemoQueryStatus,
  updateDemoReviewStatus,
  updateDemoProductStatus,
  upsertDemoProduct,
} from "@/lib/data/demo-store";
import { productCreateBaseSchema } from "@/lib/validations";
import { ORDER_STATUSES, QUERY_STATUSES, REVIEW_STATUSES, PRODUCT_STATUSES } from "@/types";
import { z } from "zod";

export type AdminActionResult =
  | { success: true; id?: string; message?: string }
  | { success: false; error: string };

const orderStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(ORDER_STATUSES),
  adminNote: z.string().trim().max(1000).optional().default(""),
});

export async function updateOrderStatus(input: unknown): Promise<AdminActionResult> {
  const parsed = orderStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid update" };
  }
  const { id, status, adminNote } = parsed.data;

  if (!isSupabaseConfigured()) {
    if (!updateDemoOrderStatus(id, status, adminNote || undefined)) {
      return { success: false, error: "Order not found" };
    }
    revalidatePath("/admin");
    revalidatePath("/admin/orders");
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const update: Record<string, unknown> = { status };
    if (adminNote) {
      const { data: current } = await supabase
        .from("orders")
        .select("admin_note")
        .eq("id", id)
        .single();
      const previous = (current?.admin_note as string | null) ?? "";
      update.admin_note = previous
        ? `${previous}\n${adminNote}`
        : adminNote;
    }
    const { error } = await supabase.from("orders").update(update).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin");
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

const queryStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(QUERY_STATUSES),
});

export async function updateQueryStatus(input: unknown): Promise<AdminActionResult> {
  const parsed = queryStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid update" };
  const { id, status } = parsed.data;

  if (!isSupabaseConfigured()) {
    if (!updateDemoQueryStatus(id, status)) {
      return { success: false, error: "Query not found" };
    }
    revalidatePath("/admin/queries");
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("queries").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/queries");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

const reviewStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(REVIEW_STATUSES),
});

export async function updateReviewStatus(input: unknown): Promise<AdminActionResult> {
  const parsed = reviewStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid update" };
  const { id, status } = parsed.data;

  if (!isSupabaseConfigured()) {
    if (!updateDemoReviewStatus(id, status)) {
      return { success: false, error: "Review not found" };
    }
    revalidatePath("/admin/reviews");
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

const productStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(PRODUCT_STATUSES),
});

export async function updateProductStatus(input: unknown): Promise<AdminActionResult> {
  const parsed = productStatusSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid update" };
  const { id, status } = parsed.data;

  if (!isSupabaseConfigured()) {
    if (!updateDemoProductStatus(id, status)) {
      return { success: false, error: "Product not found" };
    }
    revalidatePath("/admin/products");
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("products").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

export async function createProduct(input: unknown): Promise<AdminActionResult> {
  const parsed = productCreateBaseSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid product" };
  }
  const d = parsed.data;

  if (!isSupabaseConfigured()) {
    const id = upsertDemoProduct({
      name: d.name,
      slug: d.slug,
      brand_id: d.brandId || null,
      category_id: d.categoryId || null,
      sku: d.sku || null,
      short_description: d.shortDescription || null,
      description: d.description || null,
      price: d.price,
      sale_price: d.salePrice ?? null,
      stock_quantity: d.stockQuantity,
      status: d.status,
      seo_title: d.seoTitle || null,
      seo_description: d.seoDescription || null,
    });
    revalidatePath("/admin/products");
    return { success: true, id };
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: d.name,
        slug: d.slug,
        brand_id: d.brandId || null,
        category_id: d.categoryId || null,
        sku: d.sku || null,
        short_description: d.shortDescription || null,
        description: d.description || null,
        price: d.price,
        sale_price: d.salePrice ?? null,
        stock_quantity: d.stockQuantity,
        low_stock_threshold: 5,
        status: d.status,
        seo_title: d.seoTitle || null,
        seo_description: d.seoDescription || null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    revalidatePath("/admin/products");
    return { success: true, id: data.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Create failed" };
  }
}

export async function updateProduct(input: unknown): Promise<AdminActionResult> {
  const parsed = productCreateBaseSchema
    .extend({ id: z.string().min(1) })
    .safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid product" };
  }
  const d = parsed.data;

  if (!isSupabaseConfigured()) {
    upsertDemoProduct({
      id: d.id,
      name: d.name,
      slug: d.slug,
      brand_id: d.brandId || null,
      category_id: d.categoryId || null,
      sku: d.sku || null,
      short_description: d.shortDescription || null,
      description: d.description || null,
      price: d.price,
      sale_price: d.salePrice ?? null,
      stock_quantity: d.stockQuantity,
      status: d.status,
      seo_title: d.seoTitle || null,
      seo_description: d.seoDescription || null,
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase
      .from("products")
      .update({
        name: d.name,
        slug: d.slug,
        brand_id: d.brandId || null,
        category_id: d.categoryId || null,
        sku: d.sku || null,
        short_description: d.shortDescription || null,
        description: d.description || null,
        price: d.price,
        sale_price: d.salePrice ?? null,
        stock_quantity: d.stockQuantity,
        status: d.status,
        seo_title: d.seoTitle || null,
        seo_description: d.seoDescription || null,
      })
      .eq("id", d.id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}