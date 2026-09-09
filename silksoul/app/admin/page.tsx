import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import {
  fetchDashboardStats,
  fetchAdminOrders,
  fetchAdminQueries,
} from "@/lib/data/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import {
  Banknote,
  ShoppingBag,
  Clock3,
  MessagesSquare,
  Star,
  Boxes,
  Users,
  ArrowRight,
} from "lucide-react";

export default async function AdminOverviewPage() {
  await requireAdmin();
  const [stats, orders, queries] = await Promise.all([
    fetchDashboardStats(),
    fetchAdminOrders(),
    fetchAdminQueries(),
  ]);
  const recentOrders = orders.slice(0, 6);
  const openQueries = queries.filter((q) => q.status === "NEW" || q.status === "IN_PROGRESS").slice(0, 5);
  const pendingCount = openQueries.length;

  const cards = [
    { label: "Revenue (Paid Orders)", value: formatPrice(stats.revenue), icon: Banknote, hint: "Accepted, shipped & delivered", href: "/admin/orders" },
    { label: "Order Requests", value: String(stats.orderCount), icon: ShoppingBag, hint: `${stats.pendingOrders} awaiting review`, href: "/admin/orders?status=PENDING" },
    { label: "Pending Queries", value: String(pendingCount), icon: MessagesSquare, hint: "Customer messages to answer", href: "/admin/queries" },
    { label: "Pending Reviews", value: String(stats.pendingReviews), icon: Star, hint: "Awaiting moderation", href: "/admin/reviews" },
    { label: "Customers", value: String(stats.customerCount), icon: Users, hint: "Registered & checkout customers", href: "/admin/customers" },
    { label: "Products", value: String(stats.productCount), icon: Boxes, hint: "Total catalog items", href: "/admin/products" },
  ];

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-sm">
        <div>
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            SilkSoul Command Center
          </p>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            Overview
          </h1>
        </div>
        <div className="inline-flex items-center gap-sm px-md py-sm bg-surface-container-lowest rounded-lg shadow-card border border-surface-variant">
          <Clock3 className="w-4 h-4 text-secondary" />
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant hover:border-secondary/40 hover:shadow-hover transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center">
                <card.icon className="w-5 h-5 text-on-secondary-container" />
              </div>
              <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-secondary transition-colors" />
            </div>
            <p className="font-display text-headline-md text-on-surface mt-sm">{card.value}</p>
            <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider mt-xs">
              {card.label}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg items-start">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant overflow-hidden">
          <div className="flex items-center justify-between px-md py-sm border-b border-surface-variant">
            <h2 className="font-display text-headline-sm text-on-surface">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors inline-flex items-center gap-xs"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Order</th>
                  <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Customer</th>
                  <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Total</th>
                  <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Date</th>
                  <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-surface-variant hover:bg-surface-container-low transition-colors">
                    <td className="px-md py-sm">
                      <Link href={`/admin/orders/${o.id}`} className="font-label-md text-label-md text-secondary hover:underline font-semibold">
                        {o.order_number}
                      </Link>
                    </td>
                    <td className="px-md py-sm">
                      <p className="font-body-md text-body-md text-on-surface">{o.customer_name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{o.city}</p>
                    </td>
                    <td className="px-md py-sm font-label-md text-label-md text-on-surface">{formatPrice(o.grand_total)}</td>
                    <td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant">
                      {formatDateTime(o.created_at)}
                    </td>
                    <td className="px-md py-sm"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-md py-lg text-center font-body-md text-body-md text-on-surface-variant">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Open queries */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant overflow-hidden">
          <div className="flex items-center justify-between px-md py-sm border-b border-surface-variant">
            <h2 className="font-display text-headline-sm text-on-surface">Open Queries</h2>
            <Link
              href="/admin/queries"
              className="font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors inline-flex items-center gap-xs"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-md space-y-sm">
            {openQueries.map((q) => (
              <Link
                key={q.id}
                href="/admin/queries"
                className="block bg-surface-container-low rounded-lg p-sm hover:border-secondary/40 border border-transparent transition-all"
              >
                <div className="flex items-center justify-between gap-sm">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{q.subject}</p>
                  <StatusBadge status={q.status} />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-xs">{q.name}</p>
              </Link>
            ))}
            {openQueries.length === 0 && (
              <p className="font-body-md text-body-md text-on-surface-variant py-lg text-center">
                No open queries — all caught up.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}