import type { Metadata } from "next";
import Link from "next/link";
import { fetchBrands, fetchCategories, fetchProducts } from "@/lib/data/loader";
import { shopSearchParamsSchema } from "@/lib/validations";
import { ProductGrid } from "@/components/ProductGrid";
import { ShopControls } from "@/components/ShopControls";
import { X, SlidersHorizontal, Check, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop All Essentials",
  description:
    "Explore clinical dermatological care and herbal botanicals crafted for daily mindful skin rituals.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const parsed = shopSearchParamsSchema.parse({
    category: (params.category as string) ?? undefined,
    brand: (params.brand as string) ?? undefined,
    sort: (params.sort as string) ?? undefined,
    q: (params.q as string) ?? undefined,
  });

  const [products, categories, brands] = await Promise.all([
    fetchProducts({
      categorySlug: parsed.category,
      brandSlug: parsed.brand,
      search: parsed.q,
      sort: parsed.sort === "featured" ? undefined : parsed.sort,
    }),
    fetchCategories(),
    fetchBrands(),
  ]);

  const activeCategory = categories.find((c) => c.slug === parsed.category);
  const activeSortLabel =
    parsed.sort === "newest"
      ? "Newest"
      : parsed.sort === "price-asc"
        ? "Price: Low to High"
        : parsed.sort === "price-desc"
          ? "Price: High to Low"
          : null;

  const hasActiveFilters = Boolean(
    parsed.category || parsed.brand || parsed.sort !== "featured" || parsed.q,
  );

  // Build a shop URL with a given param overwritten.
  const shopUrl = (overrides: Record<string, string | undefined>) => {
    const query = new URLSearchParams();
    const merged: Record<string, string | undefined> = {
      category: parsed.category,
      brand: parsed.brand,
      sort: parsed.sort === "featured" ? undefined : parsed.sort,
      q: parsed.q,
      ...overrides,
    };
    for (const [k, v] of Object.entries(merged)) {
      if (v) query.set(k, v);
    }
    const qs = query.toString();
    return qs ? `/shop?${qs}` : "/shop";
  };

  const without = (key: string) =>
    shopUrl({ [key]: undefined });

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Shop Editorial Intro Banner */}
      <section className="relative bg-surface-container-low py-3xl px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop overflow-hidden">
        <div className="max-w-content mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-xs mb-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Apothecary & Clinical Archive
              </p>
            </div>
            <h1 className="font-display text-headline-lg md:text-display-hero text-on-surface tracking-tight leading-tight">
              Shop All Essentials
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm font-light leading-relaxed">
              Explore our catalog of clinical dermatological care and herbal
              botanicals, crafted for daily mindful skin rituals.
            </p>
          </div>
          <div className="flex items-center gap-sm self-start md:self-end bg-surface-container-lowest px-lg py-sm rounded-lg shadow-sm">
            <Package className="text-secondary w-[20px] h-[20px]" />
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Current Index
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {products.length} Formulation{products.length === 1 ? "" : "s"} Available
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-content mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Filter sidebar */}
          <aside className="lg:col-span-3 space-y-lg">
            <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm sticky top-32">
              <div className="flex items-center justify-between pb-md mb-md bg-surface-container-low/50 px-sm py-xs rounded-lg">
                <div className="flex items-center gap-xs">
                  <SlidersHorizontal className="text-[18px] text-on-surface w-[18px] h-[18px]" />
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Filters</span>
                </div>
                {hasActiveFilters && (
                  <Link href="/shop" className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors">
                    Clear All
                  </Link>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-xs">
                <p className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
                  Categories
                </p>
                <div className="space-y-xs pt-xs pl-xs">
                  <Link href="/shop" className="flex items-center justify-between group">
                    <span className={cn("font-body-sm text-body-sm transition-colors", !parsed.category ? "font-medium text-on-surface" : "text-on-surface-variant group-hover:text-on-surface")}>
                      All Categories
                    </span>
                    {!parsed.category && <Check className="text-secondary w-3.5 h-3.5" />}
                  </Link>
                  {categories.map((category) => {
                    const active = category.slug === parsed.category;
                    return (
                      <Link
                        key={category.id}
                        href={shopUrl({ category: category.slug })}
                        className="flex items-center justify-between group"
                      >
                        <span className={cn("font-body-sm text-body-sm transition-colors", active ? "font-medium text-on-surface" : "text-on-surface-variant group-hover:text-on-surface")}>
                          {category.name}
                        </span>
                        {active && <Check className="text-secondary w-3.5 h-3.5" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="h-[1px] bg-surface-variant/60 my-md" />

              {/* Brands */}
              <div className="space-y-xs">
                <p className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
                  Brands
                </p>
                <div className="space-y-xs pt-xs pl-xs">
                  <Link href={without("brand")} className="flex items-center gap-xs group">
                    <span className={cn("font-body-sm text-body-sm transition-colors", !parsed.brand ? "font-medium text-on-surface" : "text-on-surface-variant group-hover:text-on-surface")}>
                      All Brands
                    </span>
                    {!parsed.brand && <Check className="text-secondary w-3.5 h-3.5" />}
                  </Link>
                  {brands.map((brand) => {
                    const active = brand.slug === parsed.brand;
                    return (
                      <Link
                        key={brand.id}
                        href={shopUrl({ brand: brand.slug })}
                        className="flex items-center gap-xs group"
                      >
                        <span className={cn("font-body-sm text-body-sm transition-colors", active ? "font-medium text-on-surface" : "text-on-surface-variant group-hover:text-on-surface")}>
                          {brand.name}
                        </span>
                        {active && <Check className="text-secondary w-3.5 h-3.5" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="h-[1px] bg-surface-variant/60 my-md" />

              {/* Sort */}
              <div className="space-y-xs">
                <p className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
                  Sort
                </p>
                <div className="space-y-xs pt-xs pl-xs">
                  {sortOptions.map((opt) => {
                    const active = (parsed.sort ?? "featured") === opt.value;
                    return (
                      <Link
                        key={opt.value}
                        href={shopUrl({ sort: opt.value === "featured" ? undefined : opt.value })}
                        className="flex items-center gap-xs group"
                      >
                        <span className={cn("font-body-sm text-body-sm transition-colors", active ? "font-medium text-on-surface" : "text-on-surface-variant group-hover:text-on-surface")}>
                          {opt.label}
                        </span>
                        {active && <Check className="text-secondary w-3.5 h-3.5" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog listing */}
          <main className="lg:col-span-9 flex flex-col space-y-lg">
            <ShopControls />

            {(parsed.category || parsed.brand || parsed.q || activeSortLabel) && (
              <div className="flex flex-wrap items-center gap-xs">
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider mr-xs">
                  Active:
                </span>
                {parsed.q && (
                  <ActiveChip label={`Search: ${parsed.q}`} href={without("q")} />
                )}
                {activeCategory && (
                  <ActiveChip
                    label={`Category: ${activeCategory.name}`}
                    href={without("category")}
                  />
                )}
                {parsed.brand && (
                  <ActiveChip
                    label={`Brand: ${brands.find((b) => b.slug === parsed.brand)?.name ?? parsed.brand}`}
                    href={without("brand")}
                  />
                )}
                {activeSortLabel && (
                  <ActiveChip label={activeSortLabel} href={without("sort")} />
                )}
                <Link href="/shop" className="font-label-sm text-label-sm text-secondary hover:underline underline-offset-4 ml-xs">
                  Clear all
                </Link>
              </div>
            )}

            {products.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-xl text-center shadow-sm">
                <p className="font-display text-headline-sm text-on-surface">No products found</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                  Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </main>
        </div>
      </section>
    </div>
  );
}

function ActiveChip({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-xs bg-surface-container px-sm py-1 rounded-full font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high transition-colors"
    >
      {label}
      <X className="text-on-surface-variant hover:text-on-surface w-[14px] h-[14px]" />
    </Link>
  );
}