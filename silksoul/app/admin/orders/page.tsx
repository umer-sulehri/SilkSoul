import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { fetchAdminOrders } from "@/lib/data/admin";
import { OrdersToolbar } from "@/components/admin/OrdersToolbar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ArrowRight, ArrowLeft, PackageSearch } from "lucide-react";

export const metadata: Metadata = {
  title: "Orders — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  await requireAdmin();
  const { status = "ALL", search = "" } = await searchParams;
  const orders = await fetchAdminOrders({
    status: status === "ALL" ? undefined : (status as never),
    search: search || undefined,
  });

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div className="flex items-center justify-between gap-sm flex-wrap">
        <div>
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            Order Requests
          </p>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            Orders <span className="text-on-surface-variant">({orders.length})</span>
          </h1>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
      </div>

      <OrdersToolbar currentStatus={status} currentSearch={search} />

      <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Order</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Customer</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px] hidden md:table-cell">City</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Items</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Total</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Date</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="px-md py-sm">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="font-label-md text-label-md text-secondary hover:underline font-semibold inline-flex items-center gap-xs"
                    >
                      {o.order_number}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                  <td className="px-md py-sm">
                    <p className="font-body-md text-body-md text-on-surface">{o.customer_name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{o.phone}</p>
                  </td>
                  <td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant hidden md:table-cell">
                    {o.city ?? "—"}
                  </td>
                  <td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant">
                    {o.items.reduce((sum, i) => sum + i.quantity, 0)}
                  </td>
                  <td className="px-md py-sm font-label-md text-label-md text-on-surface">{formatPrice(o.grand_total)}</td>
                  <td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">
                    {formatDateTime(o.created_at)}
                  </td>
                  <td className="px-md py-sm"><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-3xl text-center gap-sm">
            <PackageSearch className="w-10 h-10 text-on-surface-variant" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              No orders match this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}