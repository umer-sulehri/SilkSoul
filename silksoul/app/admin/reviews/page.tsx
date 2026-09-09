import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { fetchAdminReviews } from "@/lib/data/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ReviewStatusControl } from "@/components/admin/StatusControls";
import { StarRating } from "@/components/StarRating";
import { formatDateTime } from "@/lib/utils";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Reviews — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminReviewsPage() {
  await requireAdmin();
  const reviews = await fetchAdminReviews();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Moderation
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight">
          Reviews <span className="text-on-surface-variant">({reviews.length})</span>
        </h1>
      </div>

      <div className="space-y-md">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant"
          >
            <div className="flex items-start justify-between gap-sm flex-wrap">
              <div>
                <div className="flex items-center gap-sm">
                  <StarRating rating={r.rating} size={16} />
                  {r.title && (
                    <h3 className="font-label-md text-label-md text-on-surface font-semibold">{r.title}</h3>
                  )}
                </div>
                <p className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant mt-xs">
                  <span className="text-secondary">{r.product_name}</span>
                  · {r.customer_name} · {formatDateTime(r.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-xs">
                <StatusBadge status={r.status} />
                <ReviewStatusControl id={r.id} status={r.status} />
              </div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant mt-md leading-relaxed bg-surface-container-low rounded-lg p-sm">
              {r.comment}
            </p>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-3xl text-center gap-sm">
          <Star className="w-10 h-10 text-on-surface-variant" />
          <p className="font-body-md text-body-md text-on-surface-variant">No reviews yet.</p>
        </div>
      )}
    </div>
  );
}