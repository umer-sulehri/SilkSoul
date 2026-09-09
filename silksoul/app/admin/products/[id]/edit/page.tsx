import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { fetchProductById, fetchCategories, fetchBrands } from "@/lib/data/loader";
import { ProductForm } from "@/components/admin/ProductForm";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit Product — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories, brands] = await Promise.all([
    fetchProductById(id),
    fetchCategories(),
    fetchBrands(),
  ]);
  if (!product) notFound();

  return (
    <div className="p-gutter-mobile md:p-lg flex flex-col gap-lg">
      <div className="flex items-center gap-sm">
        <Link
          href="/admin/products"
          aria-label="Back to products"
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-lowest shadow-card border border-surface-variant text-on-surface hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            Catalog
          </p>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            Edit {product.name}
          </h1>
        </div>
      </div>

      <ProductForm
        categories={categories}
        brands={brands}
        initial={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          brandId: product.brand_id ?? "",
          categoryId: product.category_id ?? "",
          sku: product.sku ?? "",
          shortDescription: product.short_description ?? "",
          description: product.description ?? "",
          price: String(product.price),
          salePrice: product.sale_price != null ? String(product.sale_price) : "",
          stockQuantity: String(product.stock_quantity),
          status: product.status,
          seoTitle: product.seo_title ?? "",
          seoDescription: product.seo_description ?? "",
        }}
      />
    </div>
  );
}