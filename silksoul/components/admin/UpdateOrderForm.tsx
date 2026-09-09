"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/admin";
import { ORDER_STATUSES, ORDER_STATUS_LABELS, type OrderStatus } from "@/types";
import { useToast } from "@/components/toast";

export function UpdateOrderForm({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nextStatus = String(data.get("status") ?? "") as OrderStatus;
    const adminNote = String(data.get("adminNote") ?? "").trim();
    setPending(true);
    const result = await updateOrderStatus({ id: orderId, status: nextStatus, adminNote });
    setPending(false);
    if (result.success) {
      toast(result.message ?? "Order updated");
      router.refresh();
    } else {
      toast(result.error, "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant space-y-md">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Manage Order
        </p>
        <h2 className="font-display text-headline-sm text-on-surface mt-xs">Update Status</h2>
      </div>

      <input type="hidden" name="orderId" value={orderId} />

      <div className="space-y-1">
        <label htmlFor="status" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="w-full px-sm bg-surface-container-low text-on-surface rounded-lg h-11 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="adminNote" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
          Internal note <span className="text-on-surface-variant normal-case">(optional)</span>
        </label>
        <textarea
          id="adminNote"
          name="adminNote"
          rows={3}
          maxLength={1000}
          placeholder="e.g. Call customer to confirm, adjusted delivery address..."
          className="w-full px-sm py-sm bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] disabled:opacity-50 disabled:cursor-not-allowed font-label-md text-label-md uppercase tracking-wider transition-all shadow-md"
      >
        {pending ? "Saving..." : "Save Status & Notes"}
      </button>
    </form>
  );
}