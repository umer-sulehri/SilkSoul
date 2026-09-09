import type { Metadata } from "next";
import { getAdminUser } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — SilkSoul",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();

  return (
    <div className="min-h-screen bg-surface-container-low">
      <AdminSidebar adminEmail={admin?.user.email} />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}