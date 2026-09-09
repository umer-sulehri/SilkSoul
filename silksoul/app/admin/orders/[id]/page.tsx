import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { fetchAdminOrder } from "@/lib/data/admin";
import { UpdateOrderForm } from "@/components/admin/UpdateOrderForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ArrowLeft, User, MapPin, Phone, Mail, StickyNote, Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Detail — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const order = await fetchAdminOrder(id);
  if (!order) notFound();

  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div className="flex items-center justify-between gap-sm flex-wrap">
        <div className="flex items-center gap-sm">
          <Link
            href="/admin/orders"
            aria-label="Back to orders"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-lowest shadow-card border border-surface-variant text-on-surface hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
              Order Detail
            </p>
            <h1 className="font-display text-headline-lg text-on-surface leading-tight">
              {order.order_number}
            </h1>
          </div>
        </div>
        <StatusBadge status={order.status} className="scale-110" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg items-start">
        <div className="lg:col-span-2 flex flex-col gap-md">
          {/* Items */}
          <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant overflow-hidden">
            <div className="flex items-center justify-between px-md py-sm border-b border-surface-variant">
              <h2 className="font-display text-headline-sm text-on-surface">Items ({itemCount})</h2>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                {order.items.length} line items
              </span>
            </div>
            <div className="divide-y divide-surface-variant">
              {order.items.map((item) => (
                <div key={item.id} className="px-md py-sm flex items-center gap-md">
                  <div className="relative w-14 h-16 rounded-md overflow-hidden bg-surface-container shrink-0">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                        <Receipt className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface">{item.product_name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.quantity} × {formatPrice(item.unit_price)}
                    </p>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {formatPrice(item.line_total)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-md py-sm border-t border-surface-variant bg-surface-container-low/50">
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Delivery</span>
                <span>{order.delivery_fee === 0 ? "Complimentary" : formatPrice(order.delivery_fee)}</span>
              </div>
              {order.coupon_discount > 0 && (
                <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                  <span>Coupon {order.coupon_code}</span>
                  <span>−{formatPrice(order.coupon_discount)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-xs font-label-md text-label-md text-on-surface">
                <span className="uppercase tracking-wider">Grand Total</span>
                <span className="font-display text-headline-md">{formatPrice(order.grand_total)}</span>
              </div>
            </div>
          </div>

          {/* Admin note history */}
          <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant p-md">
            <h2 className="font-display text-headline-sm text-on-surface mb-sm flex items-center gap-xs">
              <StickyNote className="w-5 h-5 text-secondary" />
              Internal Notes
            </h2>
            {order.admin_note ? (
              <pre className="whitespace-pre-wrap font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low rounded-lg p-sm">
                {order.admin_note}
              </pre>
            ) : (
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                No internal notes yet.
              </p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-md">
          <UpdateOrderForm orderId={order.id} status={order.status} />

          <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant p-md">
            <h2 className="font-display text-headline-sm text-on-surface mb-sm">Customer</h2>
            <div className="space-y-xs">
              <p className="flex items-center gap-xs font-label-md text-label-md text-on-surface">
                <User className="w-4 h-4 text-secondary" />
                {order.customer_name}
              </p>
              {order.email && (
                <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                  <Mail className="w-4 h-4 text-secondary" />
                  {order.email}
                </p>
              )}
              {order.phone && (
                <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                  <Phone className="w-4 h-4 text-secondary" />
                  {order.phone}
                </p>
              )}
              <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                <MapPin className="w-4 h-4 text-secondary" />
                {[order.address, order.city].filter(Boolean).join(", ") || "—"}
              </p>
            </div>
            {order.notes && (
              <div className="mt-sm bg-surface-container-low rounded-lg p-sm">
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">
                  Customer notes
                </p>
                <p className="font-body-sm text-body-sm text-on-surface mt-xs">{order.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant p-md">
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Placed at
            </p>
            <p className="font-label-md text-label-md text-on-surface mt-xs">{formatDateTime(order.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}