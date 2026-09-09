import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { fetchCategories, fetchBrands } from "@/lib/data/loader";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "New Product — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminNewProductPage() {
  await requireAdmin();
  const [categories, brands] = await Promise.all([fetchCategories(), fetchBrands()]);

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Catalog
        </p>
        <h1 className="font-display text-headline-lg text-on-surface leading-tight">New Product</h1>
      </div>
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}