"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateQueryStatus,
  updateReviewStatus,
  type AdminActionResult,
} from "@/app/actions/admin";
import { QUERY_STATUSES, REVIEW_STATUSES, type QueryStatus, type ReviewStatus } from "@/types";
import { useToast } from "@/components/toast";

function StatusSelectRow({
  value,
  options,
  disabled,
  onChange,
}: {
  value: string;
  options: readonly string[];
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="px-sm py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 border border-outline-variant"
    >
      {options.map((s) => (
        <option key={s} value={s}>
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}

export function QueryStatusControl({ id, status }: { id: string; status: QueryStatus }) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPending(true);
    const result = await updateQueryStatus({ id, status: e.target.value });
    setPending(false);
    if (result.success) toast(result.message ?? "Query updated");
    else toast(result.error, "error");
    router.refresh();
  }

  return (
    <StatusSelectRow
      value={status}
      options={QUERY_STATUSES}
      disabled={pending}
      onChange={handleChange}
    />
  );
}

export function ReviewStatusControl({ id, status }: { id: string; status: ReviewStatus }) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPending(true);
    const result: AdminActionResult = await updateReviewStatus({ id, status: e.target.value });
    setPending(false);
    if (result.success) toast(result.message ?? "Review updated");
    else toast(result.error, "error");
    router.refresh();
  }

  return (
    <StatusSelectRow
      value={status}
      options={REVIEW_STATUSES}
      disabled={pending}
      onChange={handleChange}
    />
  );
}