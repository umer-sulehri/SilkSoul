import Link from "next/link";
import { getOrderByNumber } from "@/app/actions/orders";
import { formatPrice, formatDateTime } from "@/lib/utils";
import {
  CheckCircle2,
  ArrowLeft,
  Phone,
  MessageCircle,
  Clock,
  PackageCheck,
} from "lucide-react";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderNumber } = await searchParams;
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;

  return (
    <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-4xl flex justify-center">
      <div className="max-w-2xl w-full bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant p-lg md:p-xl text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-md">
          <CheckCircle2 className="w-8 h-8 text-on-secondary-container" />
        </div>

        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Request Received
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight mt-2xs">
          Thank You — Your Order Request Is In
        </h1>

        {orderNumber && (
          <div className="mt-md inline-flex items-center gap-sm px-lg py-sm bg-surface-container rounded-lg">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Order Reference
            </span>
            <span className="font-display text-headline-md text-secondary font-semibold">
              {orderNumber}
            </span>
          </div>
        )}

        <div className="text-left mt-lg space-y-sm">
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Your request has been received and will be reviewed by our team. We will personally
            confirm your order, verify the total, and arrange delivery — no online payment is
            required.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm pt-sm">
            <div className="bg-surface-container-low rounded-lg p-sm text-center">
              <Clock className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Confirmation within 24h
              </p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-sm text-center">
              <PackageCheck className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Dispatch in 24-48h
              </p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-sm text-center">
              <MessageCircle className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Paid on delivery
              </p>
            </div>
          </div>
        </div>

        {order && (
          <div className="text-left mt-lg bg-surface-container-low rounded-lg p-md">
            <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
              <span>Order total</span>
              <span className="text-on-surface font-semibold">{formatPrice(order.grand_total)}</span>
            </div>
            <div className="flex justify-between font-body-md text-body-md text-on-surface-variant mt-xs">
              <span>Placed at</span>
              <span>{formatDateTime(order.created_at)}</span>
            </div>
          </div>
        )}

        <div className="mt-lg flex flex-col sm:flex-row items-center justify-center gap-sm">
          <Link
            href="/shop"
            className="inline-flex items-center gap-xs font-label-md text-label-md bg-primary text-on-primary h-11 px-6 rounded-lg hover:bg-[#2E2D2B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Exploring
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface hover:text-secondary transition-colors"
          >
            <Phone className="w-4 h-4" />
            Need help? Contact us
          </a>
        </div>
      </div>
    </div>
  );
}