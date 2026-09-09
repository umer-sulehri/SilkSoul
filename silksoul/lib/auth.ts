import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data/loader";
import { ADMIN_COOKIE, readDemoSession } from "@/lib/demo-auth";

export type AdminUser = {
  user: { id: string; email?: string };
  role: string;
  demo: boolean;
};

export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || !["ADMIN", "SUPER_ADMIN"].includes(profile.role)) return null;
    return {
      user: { id: user.id, email: user.email ?? undefined },
      role: profile.role as string,
      demo: false,
    };
  }

  const email = readDemoSession((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!email) return null;
  return { user: { id: "demo-admin", email }, role: "ADMIN", demo: true };
});

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  return admin;
}