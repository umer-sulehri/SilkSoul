"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/types";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export function OrdersToolbar({
  currentStatus,
  currentSearch,
}: {
  currentStatus: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildHref = (status: string, search: string) => {
    const params = new URLSearchParams();
    if (status && status !== "ALL") params.set("status", status);
    if (search) params.set("search", search);
    const qs = params.toString();
    return `/admin/orders${qs ? `?${qs}` : ""}`;
  };

  const onSearch = (value: string) => {
    router.push(buildHref(currentStatus, value));
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center gap-xs overflow-x-auto bg-surface-container-lowest rounded-lg p-1 shadow-card border border-surface-variant">
        <button
          type="button"
          onClick={() => router.push(buildHref("ALL", currentSearch))}
          className={cn(
            "px-sm py-1.5 rounded-md font-label-sm text-label-sm whitespace-nowrap transition-colors",
            currentStatus === "ALL"
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:bg-surface-container",
          )}
        >
          All ({ORDER_STATUSES.length + 1})
        </button>
        {ORDER_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => router.push(buildHref(status, currentSearch))}
            className={cn(
              "px-sm py-1.5 rounded-md font-label-sm text-label-sm whitespace-nowrap transition-colors",
              currentStatus === status
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container",
            )}
          >
            {ORDER_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-on-surface-variant absolute left-sm top-1/2 -translate-y-1/2" />
        <input
          defaultValue={currentSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch((e.target as HTMLInputElement).value.trim());
          }}
          onBlur={(e) => {
            const v = e.target.value.trim();
            if (v !== currentSearch) onSearch(v);
          }}
          placeholder="Search order number, customer, city..."
          className="w-full pl-9 pr-9 h-10 bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary shadow-card border border-surface-variant"
        />
        {currentSearch && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              router.push(buildHref(currentStatus, ""));
              router.refresh();
            }}
            className="absolute right-xs top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}