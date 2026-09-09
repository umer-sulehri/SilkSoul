import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserEmail } from "@/lib/user-auth";
import { isSupabaseConfigured } from "@/lib/data/loader";
import { demoCredentials, userCredentials } from "@/lib/demo-auth";
import { UserLoginForm } from "@/components/account/UserLoginForm";

export const metadata: Metadata = {
  title: "Sign In — SilkSoul",
};

export default async function AccountLoginPage() {
  const email = await getUserEmail();
  if (email) redirect("/account");

  const demoMode = !isSupabaseConfigured();
  const user = userCredentials();
  const admin = demoCredentials();

  return (
    <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl flex flex-col gap-xl">
      <UserLoginForm
        demoMode={demoMode}
        userEmail={user.email}
        userPassword={user.password}
        adminEmail={admin.email}
        adminPassword={admin.password}
      />
    </div>
  );
}