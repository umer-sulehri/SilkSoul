import type { Metadata } from "next";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { fetchCollections } from "@/lib/data/loader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Layers, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Collections — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCollectionsPage() {
  await requireAdmin();
  const collections = await fetchCollections();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Catalog
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight">
          Collections <span className="text-on-surface-variant">({collections.length})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
        {collections.map((c) => (
          <div
            key={c.id}
            className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant flex items-center gap-sm"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-surface-container shrink-0">
              {c.image_url ? (
                <Image src={c.image_url} alt={c.name} fill sizes="56px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                  <Layers className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-xs">
                {c.name}
                {c.featured && <Star className="w-3.5 h-3.5 text-secondary" fill="currentColor" />}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">/{c.slug}</p>
            </div>
            <StatusBadge status={c.status} />
          </div>
        ))}
      </div>
    </div>
  );
}