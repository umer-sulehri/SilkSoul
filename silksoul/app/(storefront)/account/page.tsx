import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Package, MessagesSquare, Star, ShoppingBag, MapPin, Phone } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SignOutButton } from "@/components/account/SignOutButton";
import { requireUser } from "@/lib/user-auth";
import {
  fetchCustomerByEmail,
  fetchOrdersByEmail,
  fetchQueriesByEmail,
  fetchReviewsByEmail,
} from "@/lib/data/loader";
import { formatDate, formatPrice, initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Account — SilkSoul",
};

export default async function AccountPage() {
  const email = await requireUser();

  const [orders, queries, customer, reviews] = await Promise.all([
    fetchOrdersByEmail(email).catch(() => []),
    fetchQueriesByEmail(email).catch(() => []),
    fetchCustomerByEmail(email).catch(() => null),
    fetchReviewsByEmail(email).catch(() => []),
  ]);

  const displayName = customer?.name ?? email.split("@")[0];
  const memberSince = customer?.created_at ?? orders[0]?.created_at ?? null;

  return (
    <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-sm">
        <div>
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            Welcome back
          </p>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            My Account
          </h1>
        </div>
        <div className="flex items-center gap-lg">
          <Link
            href="/shop"
            className="font-label-md text-label-md text-on-surface hover:text-secondary inline-flex items-center gap-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-xl">
        <aside className="md:col-span-1">
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-lg flex flex-col gap-md">
            <div className="flex items-center gap-md">
              <span className="w-14 h-14 rounded-full bg-primary/10 ring-1 ring-primary/30 text-primary font-display text-headline-sm flex items-center justify-center uppercase">
                {initials(displayName)}
              </span>
              <div>
                <p className="font-display text-headline-xs text-on-surface">{displayName}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant break-all">{email}</p>
              </div>
            </div>

            <div className="h-px bg-surface-variant my-sm" />

            <dl className="space-y-sm font-body-sm text-body-sm text-on-surface-variant">
              {customer?.phone && (
                <div className="flex items-center gap-xs">
                  <Phone className="w-4 h-4 text-on-surface-variant/70" />
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer?.city && (
                <div className="flex items-center gap-xs">
                  <MapPin className="w-4 h-4 text-on-surface-variant/70" />
                  <span>{customer.city}</span>
                </div>
              )}
              {memberSince && (
                <p className="mt-sm">Member since {formatDate(memberSince)}</p>
              )}
            </dl>

            <div className="grid grid-cols-2 gap-sm mt-auto">
              <div className="bg-surface-container-low rounded-xl p-sm text-center">
                <p className="font-display text-headline-sm text-primary">{orders.length}</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Orders
                </p>
              </div>
              <div className="bg-surface-container-low rounded-xl p-sm text-center">
                <p className="font-display text-headline-sm text-secondary">{reviews.length}</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Reviews
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="md:col-span-2 flex flex-col gap-xl">
          <section>
            <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2 mb-md">
              <Package className="w-5 h-5 text-secondary" /> My Orders
            </h2>
            {orders.length === 0 ? (
              <EmptyState
                title="No orders yet"
                text="When you place an order with this email, it will appear here with live status updates."
                ctaHref="/shop"
                ctaLabel="Shop Products"
              />
            ) : (
              <div className="space-y-md">
                {orders.map((order) => (
                  <Link
                    key={order.id ?? order.order_number}
                    href={`/checkout/success?order=${order.order_number}`}
                    className="block bg-surface-container-lowest rounded-2xl border border-surface-variant p-md hover:border-secondary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-sm">
                      <div className="flex items-center gap-sm flex-wrap">
                        <span className="font-label-md text-label-md text-on-surface">
                          {order.order_number}
                        </span>
                        <StatusBadge status={order.status} />
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    <ul className="mt-sm space-y-1">
                      {(order.order_items ?? []).map((item: any, idx: number) => (
                        <li
                          key={idx}
                          className="font-body-sm text-body-sm text-on-surface-variant flex justify-between gap-sm"
                        >
                          <span>
                            {item.product_name} <span className="text-on-surface-variant/70">× {item.quantity}</span>
                          </span>
                          <span>{formatPrice(item.line_total ?? item.unit_price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-sm pt-sm border-t border-surface-variant flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Total
                      </span>
                      <span className="font-display text-headline-xs text-primary">
                        {formatPrice(order.grand_total)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2 mb-md">
              <MessagesSquare className="w-5 h-5 text-secondary" /> My Queries
            </h2>
            {queries.length === 0 ? (
              <EmptyState
                title="No queries submitted"
                text="Questions you send through the Contact page will show up here with the team's response."
                ctaHref="/contact"
                ctaLabel="Contact Us"
              />
            ) : (
              <div className="space-y-md">
                {queries.map((query) => (
                  <div
                    key={query.id}
                    className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-md"
                  >
                    <div className="flex items-center justify-between gap-sm flex-wrap">
                      <span className="font-label-md text-label-md text-on-surface">{query.subject}</span>
                      <div className="flex items-center gap-sm">
                        <StatusBadge status={query.status} />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {formatDate(query.created_at)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-sm font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {query.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="font-display text-headline-sm text-on-surface flex items-center gap-2 mb-md">
              <Star className="w-5 h-5 text-secondary" /> My Reviews
            </h2>
            {reviews.length === 0 ? (
              <EmptyState
                title="No reviews yet"
                text="Reviews you leave on products will show up here after the team approves them."
                ctaHref="/shop"
                ctaLabel="Browse Products"
              />
            ) : (
              <div className="space-y-md">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-md"
                  >
                    <div className="flex items-center justify-between gap-sm flex-wrap">
                      <span className="font-label-md text-label-md text-on-surface">
                        {review.product_name}
                      </span>
                      <div className="flex items-center gap-sm">
                        <StarRating rating={review.rating} size={16} />
                        <StatusBadge status={review.status} />
                      </div>
                    </div>
                    {review.title && (
                      <p className="mt-sm font-label-md text-label-md text-on-surface">
                        {review.title}
                      </p>
                    )}
                    <p className="mt-xs font-body-sm text-body-sm text-on-surface-variant">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  text,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  text: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-dashed border-surface-variant p-lg text-center flex flex-col items-center gap-sm">
      <ShoppingBag className="w-8 h-8 text-on-surface-variant/50" />
      <p className="font-label-md text-label-md text-on-surface">{title}</p>
      <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">{text}</p>
      <Link
        href={ctaHref}
        className="mt-xs font-label-md text-label-md text-secondary hover:underline underline-offset-4"
      >
        {ctaLabel} →
      </Link>
    </div>
  );
}