"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured", label: "Sort: Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const pushParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-md">
      <div className="relative flex-1">
        <Search className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant w-[20px] h-[20px]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") pushParams("q", query.trim() || null);
          }}
          placeholder="Search products, ingredients, concerns..."
          className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-10 pr-md py-2.5 rounded-lg focus:outline-none focus:bg-surface-container transition-colors placeholder:text-on-surface-variant/60"
        />
      </div>
      <div className="flex items-center justify-between md:justify-end gap-sm">
        <div className="relative">
          <select
            value={searchParams.get("sort") ?? "featured"}
            onChange={(e) => pushParams("sort", e.target.value)}
            className="appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md px-md py-2.5 pr-8 rounded-lg cursor-pointer focus:outline-none hover:bg-surface-container transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-[18px] h-[18px]" />
        </div>
      </div>
    </div>
  );
}