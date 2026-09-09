import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCollectionProducts, fetchCollections } from "@/lib/data/loader";
import { ProductGrid } from "@/components/ProductGrid";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collections = await fetchCollections();
  const collection = collections.find((c) => c.slug === slug);
  return {
    title: collection ? `${collection.name} — SilkSoul` : "Collection",
    description: collection?.description ?? undefined,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, collections] = await Promise.all([
    fetchCollectionProducts(slug),
    fetchCollections(),
  ]);
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  return (
    <div className="flex flex-col w-full">
      {/* Editorial banner */}
      <section className="relative w-full overflow-hidden bg-surface-dim">
        <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop pt-2xl pb-xl md:py-3xl relative">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[11px] mb-lg"
          >
            <Link href="/" className="hover:text-on-surface transition-colors">Home</Link>
            <span className="text-outline-variant">/</span>
            <Link href="/shop" className="hover:text-on-surface transition-colors">Shop</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">{collection.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-end">
            <div className="lg:col-span-8">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Curated Rituals
              </span>
              <h1 className="font-display text-headline-lg md:text-display-hero-mobile text-on-surface leading-tight mt-2xs max-w-2xl">
                {collection.name}
              </h1>
              {collection.description && (
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-md max-w-2xl leading-relaxed">
                  {collection.description}
                </p>
              )}
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="inline-flex items-center gap-sm px-lg py-sm bg-surface-container-lowest rounded-lg shadow-sm">
                <span className="font-display text-headline-md text-secondary">
                  {products.length}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  {products.length === 1 ? "Ritual" : "Rituals"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-3xl space-y-md">
            <p className="font-display text-headline-md text-on-surface">
              This collection is being curated
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
              New rituals are on their way. Explore the full shop while you wait.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-xs font-label-md text-label-md text-on-surface hover:text-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}