"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProductStatus } from "@/app/actions/admin";
import { PRODUCT_STATUSES } from "@/types";
import { useToast } from "@/components/toast";

export function ProductStatusControl({
  productId,
  status,
}: {
  productId: string;
  status: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setPending(true);
    const result = await updateProductStatus({ id: productId, status: next });
    setPending(false);
    if (result.success) {
      toast(result.message ?? "Product updated");
      router.refresh();
    } else {
      toast(result.error, "error");
      router.refresh();
    }
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={pending}
      className="px-sm py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 border border-outline-variant"
    >
      {PRODUCT_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}