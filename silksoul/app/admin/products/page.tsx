import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { fetchAllProductsAdmin } from "@/lib/data/loader";
import { ProductStatusControl } from "@/components/admin/ProductStatusControl";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatPrice } from "@/lib/utils";
import { Plus, Pencil, Inbox } from "lucide-react";

export const metadata: Metadata = {
  title: "Products — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await fetchAllProductsAdmin();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div className="flex items-center justify-between gap-sm flex-wrap">
        <div>
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            Catalog
          </p>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            Products <span className="text-on-surface-variant">({products.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-xs font-label-md text-label-md bg-primary text-on-primary h-10 px-4 rounded-lg hover:bg-[#2E2D2B] transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Product
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Product</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px] hidden lg:table-cell">Brand</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Price</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Stock</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-md py-sm font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} className="border-t border-surface-variant hover:bg-surface-container-low transition-colors">
                  <td className="px-md py-sm">
                    <div className="flex items-center gap-sm">
                      <div className="relative w-10 h-12 rounded-md overflow-hidden bg-surface-container shrink-0">
                        {p.image_url ? (
                          <Image src={p.image_url} alt={p.name} fill sizes="40px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                            <Inbox className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md text-on-surface truncate max-w-[220px]">{p.name}</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant hidden lg:table-cell">
                    {p.brand ?? "—"}
                  </td>
                  <td className="px-md py-sm font-label-md text-label-md text-on-surface">
                    {formatPrice(p.price)}
                  </td>
                  <td className="px-md py-sm">
                    <span className={p.stock_quantity === 0 ? "text-error" : "text-on-surface"}>
                      {p.stock_quantity}
                    </span>
                  </td>
                  <td className="px-md py-sm">
                    <div className="flex items-center gap-xs">
                      <StatusBadge status={p.status} />
                      <ProductStatusControl productId={p.id} status={p.status} />
                    </div>
                  </td>
                  <td className="px-md py-sm text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="inline-flex items-center gap-xs p-1.5 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                      aria-label={`Edit ${p.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-3xl text-center gap-sm">
            <p className="font-body-md text-body-md text-on-surface-variant">No products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}