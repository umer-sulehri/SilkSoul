import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { fetchAdminQueries } from "@/lib/data/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { QueryStatusControl } from "@/components/admin/StatusControls";
import { formatDateTime } from "@/lib/utils";
import { MessagesSquare, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Queries — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminQueriesPage() {
  await requireAdmin();
  const queries = await fetchAdminQueries();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Inbox
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight">
          Queries <span className="text-on-surface-variant">({queries.length})</span>
        </h1>
      </div>

      <div className="space-y-md">
        {queries.map((q) => (
          <div
            key={q.id}
            className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant"
          >
            <div className="flex items-start justify-between gap-sm flex-wrap">
              <div className="flex items-start gap-sm">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest text-[10px]">
                  {new Date(q.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-semibold">{q.subject}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {q.name}
                    {q.email && <> · {q.email}</>}
                    {q.phone && <> · {q.phone}</>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-xs">
                <StatusBadge status={q.status} />
                <QueryStatusControl id={q.id} status={q.status} />
              </div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant mt-md leading-relaxed bg-surface-container-low rounded-lg p-sm">
              {q.message}
            </p>

            <div className="flex items-center gap-xl mt-sm flex-wrap">
              <span className="inline-flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                {q.email}
              </span>
              {q.phone && (
                <span className="inline-flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  {q.phone}
                </span>
              )}
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {formatDateTime(q.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {queries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-3xl text-center gap-sm">
          <MessagesSquare className="w-10 h-10 text-on-surface-variant" />
          <p className="font-body-md text-body-md text-on-surface-variant">No queries yet.</p>
        </div>
      )}
    </div>
  );
}