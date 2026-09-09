import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { fetchBrands } from "@/lib/data/loader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Brands — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminBrandsPage() {
  await requireAdmin();
  const brands = await fetchBrands();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Catalog
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight">
          Brands <span className="text-on-surface-variant">({brands.length})</span>
        </h1>
      </div>

      <div className="space-y-md">
        {brands.map((b) => (
          <div
            key={b.id}
            className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant flex items-center justify-between gap-sm flex-wrap"
          >
            <div className="flex items-center gap-sm">
              <div className="w-11 h-11 rounded-lg bg-secondary-container flex items-center justify-center">
                <Tag className="w-5 h-5 text-on-secondary-container" />
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{b.name}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">/{b.slug}</p>
              </div>
            </div>
            <StatusBadge status={b.status} />
          </div>
        ))}
      </div>
    </div>
  );
}