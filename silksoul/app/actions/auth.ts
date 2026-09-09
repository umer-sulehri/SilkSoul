"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data/loader";
import {
  ADMIN_COOKIE,
  createDemoSession,
  matchesDemoCredentials,
} from "@/lib/demo-auth";

const credsSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(190),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

export async function signInAdmin(
  input: unknown,
): Promise<{ success: boolean; error?: string }> {
  const parsed = credsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid credentials" };
  }

  if (!isSupabaseConfigured()) {
    if (!matchesDemoCredentials(parsed.data.email, parsed.data.password)) {
      return { success: false, error: "Invalid email or password." };
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, createDemoSession(parsed.data.email), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) {
    return { success: false, error: error?.message ?? "Unable to sign in" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!profile || !["ADMIN", "SUPER_ADMIN"].includes(profile.role)) {
    await supabase.auth.signOut();
    return { success: false, error: "This account does not have admin access." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } else {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
  redirect("/admin/login");
}