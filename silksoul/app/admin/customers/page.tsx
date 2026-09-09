import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { fetchAdminCustomers } from "@/lib/data/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";
import { Users, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Customers — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCustomersPage() {
  await requireAdmin();
  const customers = await fetchAdminCustomers();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Relationships
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight">
          Customers <span className="text-on-surface-variant">({customers.length})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        {customers.map((c) => (
          <div
            key={c.id}
            className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant hover:shadow-hover transition-shadow"
          >
            <div className="flex items-start justify-between gap-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-display text-headline-sm text-on-secondary-container uppercase">
                {c.name.slice(0, 1)}
              </div>
              <StatusBadge status={c.status} />
            </div>
            <p className="font-label-md text-label-md text-on-surface font-semibold mt-sm">{c.name}</p>
            <div className="space-y-xs mt-xs">
              <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                {c.email}
              </p>
              {c.phone && (
                <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  {c.phone}
                </p>
              )}
              {c.city && (
                <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  {c.city}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-sm pt-sm border-t border-surface-variant">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">
                  Orders
                </p>
                <p className="font-label-md text-label-md text-on-surface">{c.total_orders}</p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">
                  Spent
                </p>
                <p className="font-label-md text-label-md text-on-surface">{formatPrice(c.total_spent)}</p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">
                  Last order
                </p>
                <p className="font-label-md text-label-md text-on-surface">
                  {c.last_order_at ? formatDate(c.last_order_at) : "—"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {customers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-3xl text-center gap-sm">
          <Users className="w-10 h-10 text-on-surface-variant" />
          <p className="font-body-md text-body-md text-on-surface-variant">
            No customers yet. They appear as they place orders.
          </p>
        </div>
      )}
    </div>
  );
}