"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data/loader";
import {
  USER_COOKIE,
  createUserSession,
  matchesUserCredentials,
  userCredentials,
} from "@/lib/demo-auth";

const credsSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(190),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

async function setUserCookie(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE, createUserSession(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function signInUser(
  input: unknown,
): Promise<{ success: boolean; error?: string }> {
  const parsed = credsSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid credentials" };
  }

  if (!isSupabaseConfigured()) {
    if (!matchesUserCredentials(parsed.data.email, parsed.data.password)) {
      return { success: false, error: "Invalid email or password." };
    }
    await setUserCookie(parsed.data.email);
    redirect("/account");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) {
    return { success: false, error: error?.message ?? "Unable to sign in" };
  }

  await setUserCookie(data.user.email ?? parsed.data.email);
  redirect("/account");
}

export async function signInUserDemo(
  email: string,
): Promise<{ success: boolean; error?: string }> {
  const demo = userCredentials();
  if (email.trim().toLowerCase() !== demo.email.toLowerCase()) {
    return { success: false, error: "Invalid demo email." };
  }

  await setUserCookie(demo.email);
  redirect("/account");
}

export async function signOutUser() {
  (await cookies()).set(USER_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/account/login");
}