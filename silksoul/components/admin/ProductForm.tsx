"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/admin";
import { productCreateBaseSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { PRODUCT_STATUSES } from "@/types";
import { useToast } from "@/components/toast";
import type { Brand, Category } from "@/types";

const fieldStyles =
  "w-full px-sm bg-surface-container-low text-on-surface rounded-lg h-11 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-shadow";
const textareaStyles =
  "w-full px-sm py-sm bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-shadow";

export type ProductFormValues = {
  id?: string;
  name: string;
  slug: string;
  brandId: string;
  categoryId: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: string;
  salePrice: string;
  stockQuantity: string;
  status: string;
  seoTitle: string;
  seoDescription: string;
};

export function ProductForm({
  initial,
  categories,
  brands,
}: {
  initial?: Partial<ProductFormValues>;
  categories: Category[];
  brands: Brand[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");

  function autoSlug(value: string) {
    const s = slugify(value);
    if (!slug || slug === slugify(name)) setSlug(s);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const payload = {
      id: initial?.id,
      name: String(data.get("name") ?? ""),
      slug: String(data.get("slug") ?? ""),
      brandId: String(data.get("brandId") ?? "") || null,
      categoryId: String(data.get("categoryId") ?? "") || null,
      sku: String(data.get("sku") ?? ""),
      shortDescription: String(data.get("shortDescription") ?? ""),
      description: String(data.get("description") ?? ""),
      price: data.get("price"),
      salePrice: data.get("salePrice") ? Number(data.get("salePrice")) : null,
      stockQuantity: Number(data.get("stockQuantity") ?? 0),
      status: String(data.get("status") ?? "DRAFT"),
      seoTitle: String(data.get("seoTitle") ?? ""),
      seoDescription: String(data.get("seoDescription") ?? ""),
    };

    const parsed = productCreateBaseSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setPending(true);
    const result = initial?.id
      ? await updateProduct(payload)
      : await createProduct(payload);
    setPending(false);

    if (result.success) {
      toast(result.message ?? "Product saved");
      router.push("/admin/products");
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant p-lg space-y-md max-w-4xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <div className="space-y-1 sm:col-span-2">
          <label htmlFor="name" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Product name *
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            value={name}
            onChange={(e) => { setName(e.target.value); autoSlug(e.target.value); }}
            placeholder="e.g. Anti-Acne Face Wash"
            className={fieldStyles}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="slug" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Slug (URL)
          </label>
          <input id="slug" name="slug" required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="anti-acne-face-wash" className={fieldStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="sku" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            SKU
          </label>
          <input id="sku" name="sku" placeholder="CLE-001" className={fieldStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="brandId" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Brand
          </label>
          <select id="brandId" name="brandId" defaultValue={initial?.brandId ?? ""} className={fieldStyles}>
            <option value="">No brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="categoryId" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Category
          </label>
          <select id="categoryId" name="categoryId" defaultValue={initial?.categoryId ?? ""} className={fieldStyles}>
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="price" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Price *
          </label>
          <input id="price" name="price" type="number" required min={0} step="0.01" defaultValue={initial?.price ?? ""} placeholder="1499" className={fieldStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="salePrice" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Sale price
          </label>
          <input id="salePrice" name="salePrice" type="number" min={0} step="0.01" defaultValue={initial?.salePrice ?? ""} placeholder="Leave blank for none" className={fieldStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="stockQuantity" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Stock quantity
          </label>
          <input id="stockQuantity" name="stockQuantity" type="number" min={0} defaultValue={initial?.stockQuantity ?? "0"} className={fieldStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="status" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Status
          </label>
          <select id="status" name="status" defaultValue={initial?.status ?? "DRAFT"} className={fieldStyles}>
            {PRODUCT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label htmlFor="shortDescription" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Short description
          </label>
          <input id="shortDescription" name="shortDescription" maxLength={500} defaultValue={initial?.shortDescription ?? ""} placeholder="One-line product promise shown on cards" className={fieldStyles} />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label htmlFor="description" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            Description
          </label>
          <textarea id="description" name="description" rows={4} defaultValue={initial?.description ?? ""} placeholder="Full product description, benefits, positioning..." className={textareaStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="seoTitle" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            SEO title
          </label>
          <input id="seoTitle" name="seoTitle" maxLength={200} defaultValue={initial?.seoTitle ?? ""} className={fieldStyles} />
        </div>

        <div className="space-y-1">
          <label htmlFor="seoDescription" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
            SEO description
          </label>
          <input id="seoDescription" name="seoDescription" maxLength={300} defaultValue={initial?.seoDescription ?? ""} className={fieldStyles} />
        </div>
      </div>

      {error && (
        <p className="font-body-sm text-body-sm text-error bg-error/10 rounded-lg p-sm">{error}</p>
      )}

      <div className="flex items-center gap-sm pt-xs">
        <button
          type="submit"
          disabled={pending}
          className="h-11 px-6 rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] disabled:opacity-50 disabled:cursor-not-allowed font-label-md text-label-md uppercase tracking-wider transition-all shadow-md"
        >
          {pending ? "Saving..." : initial?.id ? "Save Changes" : "Create Product"}
        </button>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {initial?.id ? `Editing ${initial.name}` : "New product"}
        </span>
      </div>
    </form>
  );
}