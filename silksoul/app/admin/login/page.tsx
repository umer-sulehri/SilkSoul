import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/data/loader";
import { demoCredentials } from "@/lib/demo-auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — SilkSoul",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const admin = await getAdminUser();
  if (admin) redirect("/admin");

  const demoMode = !isSupabaseConfigured();
  const creds = demoCredentials();

  return (
    <div className="min-h-screen flex items-center justify-center px-gutter-mobile py-3xl bg-surface-container-low">
      <LoginForm
        demoMode={demoMode}
        demoEmail={creds.email}
        demoPassword={creds.password}
      />
    </div>
  );
}