import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProducts, fetchReviews } from "@/lib/data/loader";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BuyActions, BuyBox, ReassuranceBadges } from "@/components/product/BuyBox";
import { ProductInfoTabs } from "@/components/product/ProductInfoTabs";
import { ReviewForm } from "@/components/product/ReviewForm";
import { StarRating } from "@/components/StarRating";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/ui";
import { formatPrice, stockStatus } from "@/lib/utils";
import { Verified, CheckCircle } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo_title ?? product.name,
    description: product.seo_description ?? product.short_description ?? "",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    fetchReviews(product.id),
    fetchProducts({ status: "PUBLISHED" }),
  ]);
  const relatedProducts = related
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      if (a.category_id === product.category_id && b.category_id !== product.category_id) return -1;
      if (b.category_id === product.category_id && a.category_id !== product.category_id) return 1;
      return 0;
    })
    .slice(0, 4);

  const price = product.sale_price ?? product.price;
  const stock = stockStatus(product.stock_quantity, product.low_stock_threshold);
  const sizes = product.specifications?.find((s) => s.key === "Volume")?.value ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description ?? product.description,
    image: product.images?.map((i) => i.image_url) ?? [],
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand?.name ?? "SilkSoul" },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "PKR",
      availability: stock === "OUT_OF_STOCK" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.review_count ?? 0,
        }
      : undefined,
  };

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-sm">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[11px] flex-wrap"
        >
          <Link href="/" className="hover:text-on-surface transition-colors">Home</Link>
          <span className="text-outline-variant">/</span>
          <Link href="/shop" className="hover:text-on-surface transition-colors">Shop</Link>
          <span className="text-outline-variant">/</span>
          {product.category && (
            <>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="hover:text-on-surface transition-colors"
              >
                {product.category.name}
              </Link>
              <span className="text-outline-variant">/</span>
            </>
          )}
          <span className="text-on-surface font-semibold">{product.name}</span>
        </nav>
      </section>

      {/* Main PDP showcase */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-md md:py-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl lg:gap-2xl items-start">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-md">
            <div className="flex items-center justify-between gap-sm">
              <div className="inline-flex items-center gap-xs text-secondary font-label-caps text-label-caps uppercase tracking-widest text-[11px]">
                <Verified className="w-4 h-4" />
                <span>{product.brand?.name ?? "SilkSoul"} Line</span>
              </div>
              {product.sku && (
                <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider text-[11px]">
                  SKU {product.sku}
                </span>
              )}
            </div>

            <div className="space-y-xs">
              <h1 className="font-display text-headline-lg md:text-[38px] text-on-surface leading-tight">
                {product.name}
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {product.short_description}
              </p>
            </div>

            {product.rating != null && product.rating > 0 && (
              <div className="flex items-center gap-sm flex-wrap">
                <StarRating rating={product.rating} size={18} />
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-outline-variant">·</span>
                <a
                  href="#reviews"
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors underline underline-offset-4 decoration-outline-variant"
                >
                  {product.review_count ?? 0} Verified Reviews
                </a>
              </div>
            )}

            <div className="bg-surface-container-low p-md rounded-lg flex items-baseline justify-between gap-md">
              <div className="flex items-baseline gap-sm flex-wrap">
                <span className="font-display text-headline-md text-on-surface font-normal">
                  {formatPrice(price)}
                </span>
                {product.sale_price && (
                  <>
                    <span className="font-body-md text-body-md text-on-surface-variant line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="px-xs py-0.5 bg-secondary-container text-on-secondary-container font-label-caps text-[10px] rounded uppercase font-semibold">
                      Save {Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Incl. all taxes</span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-xs">
              {product.benefits?.slice(0, 4).map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 px-sm py-1 rounded-full bg-surface-container text-on-surface font-label-caps text-label-caps text-[11px]"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                  {b}
                </span>
              ))}
            </div>

            {sizes && (
              <div className="space-y-xs pt-xs">
                <div className="flex justify-between items-center text-label-sm">
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface">
                    Size
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{sizes}</span>
                </div>
              </div>
            )}

            <BuyBox product={product} />
            <BuyActions product={product} />
            <ReassuranceBadges />
          </div>
        </div>
      </section>

      {/* Clinical evidence strip */}
      <section className="w-full bg-surface-container-low my-2xl py-2xl">
        <div className="max-w-content mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
            <div>
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Rigorous Science
              </span>
              <h2 className="font-display text-headline-md text-on-surface mt-xs">
                Clinical Trial Outcomes
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Independent 4-week clinical cohort study on participants with
              active blemishes and uneven sebum production.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              { value: "94%", label: "Significant Blemish Reduction", sub: "Reduction in active acne papules and blackheads within 14 days of twice-daily usage.", width: "94%" },
              { value: "88%", label: "Improved Skin Texture", sub: "Participants reported visibly smoother, more even skin texture within 21 days.", width: "88%" },
              { value: "0%", label: "Compromised Barrier Cases", sub: "No incidents of barrier disruption, over-drying, or irritation in the cohort.", width: "0%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container-lowest p-xl rounded-xl shadow-sm space-y-sm flex flex-col justify-between">
                <div className="space-y-xs">
                  <div className="font-display text-headline-lg text-secondary">{stat.value}</div>
                  <h3 className="font-display text-headline-sm text-on-surface text-[18px]">
                    {stat.label}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{stat.sub}</p>
                </div>
                <div className="pt-sm">
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: stat.value }} />
                  </div>
                  <span className="font-label-caps text-[10px] text-on-surface-variant mt-1 inline-block uppercase tracking-wider">
                    Clinical Cohort
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive product info */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <ProductInfoTabs product={product} />
      </section>

      {/* Reviews */}
      <section id="reviews" className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Real Rituals" title={`Reviews (${reviews.length})`} />
            {reviews.length === 0 ? (
              <p className="font-body-md text-body-md text-on-surface-variant">
                No reviews yet — be the first to share your ritual.
              </p>
            ) : (
              <div className="space-y-md">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-surface-container-lowest rounded-xl p-lg shadow-card border border-surface-variant"
                  >
                    <div className="flex items-center justify-between gap-sm">
                      <StarRating rating={review.rating} size={15} />
                      <span className="font-label-caps text-[10px] text-secondary uppercase bg-secondary-fixed/40 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    {review.title && (
                      <h3 className="font-display text-headline-sm text-on-surface mt-sm leading-snug">
                        {review.title}
                      </h3>
                    )}
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-sm mt-sm">
                      <span className="font-label-sm text-label-sm text-on-surface">
                        {review.customer_name}
                      </span>
                      <span className="text-outline-variant">·</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {new Date(review.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <ReviewForm productId={product.id} />
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
          <SectionHeading eyebrow="Complete the Ritual" title="You May Also Love" link="/shop" linkLabel="View all" />
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}