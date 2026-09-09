"use server";

import { querySchema, reviewSchema } from "@/lib/validations";
import { createServiceClient } from "@/lib/supabase/service";
import { isSupabaseConfigured } from "@/lib/data/loader";

export type ActionResult =
  | { success: true; id?: string }
  | { success: false; error: string };

export async function submitQuery(input: unknown): Promise<ActionResult> {
  const parsed = querySchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? "Invalid submission" };
  }

  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const values = parsed.data;
    const { data, error } = await supabase
      .from("queries")
      .insert({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        subject: values.subject,
        message: values.message,
        status: "NEW",
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { success: true, id: data.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Could not submit" };
  }
}

export async function submitReview(input: unknown): Promise<ActionResult> {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? "Invalid review" };
  }

  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const supabase = createServiceClient();
    const values = parsed.data;
    const { error } = await supabase.from("reviews").insert({
      product_id: values.productId,
      rating: values.rating,
      title: values.title,
      comment: values.comment,
      status: "PENDING",
    });
    if (error) throw new Error(error.message);
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Could not submit review" };
  }
}