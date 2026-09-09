import Link from "next/link";
import Image from "next/image";
import {
  fetchCategories,
  fetchProducts,
  fetchReviews,
} from "@/lib/data/loader";
import { IMAGES } from "@/lib/data/sample-data";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { SectionHeading } from "@/components/ui";
import { StarRating } from "@/components/StarRating";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Badge } from "@/components/ui";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SilkSoul — Beauty & Personal Care",
  description:
    "Clinically proven skincare, herbal hair care and everyday wellness essentials chosen for your daily ritual.",
};

const concerns = [
  { icon: "●", title: "Acne & Breakouts", sub: "Salicylic & Zinc", link: "/shop?category=skincare" },
  { icon: "✦", title: "Dark Spots & Tone", sub: "Vitamin C & Niacinamide", link: "/shop?category=skincare" },
  { icon: "❋", title: "Hair Fall & Density", sub: "Rosemary & Bhringraj", link: "/shop?category=herbal-care" },
  { icon: "◒", title: "Oily & Congested", sub: "Clarifying & Tea Tree", link: "/shop?category=skincare" },
  { icon: "❖", title: "Dry Barrier Care", sub: "Ceramides & Hydration", link: "/shop?category=skincare" },
  { icon: "✳", title: "Daily Ritual", sub: "Everyday Essentials", link: "/shop" },
];

const perks = [
  {
    title: "Quality Formulations",
    description:
      "Clinically studied botanical ratios rigorously formulated to work with your natural cellular renewal cycle.",
    icon: "science",
  },
  {
    title: "Authentic Care",
    description:
      "Full ingredient transparency. No compromises on clean safety, zero filler agents, and certified cruelty-free.",
    icon: "verified",
  },
  {
    title: "Everyday Rituals",
    description:
      "Thoughtfully crafted sensory textures and delicate natural aromas that transform daily care into mindful stillness.",
    icon: "spa",
  },
  {
    title: "Customer First Support",
    description:
      "Direct consultation with certified cosmetic advisors and prompt assistance for every step of your skin journey.",
    icon: "support",
  },
];

export default async function HomePage() {
  const [categories, featured, bestSellers, reviews] = await Promise.all([
    fetchCategories(),
    fetchProducts({ featured: true }),
    fetchProducts({ bestSeller: true }),
    fetchReviews(),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* Top Subtle Brand Ribbon */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2">
        <div className="flex items-center justify-between py-1">
          <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">
            Pure Formulation • Clinical Provenance
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant hidden sm:inline-block">
            Dermatologically Verified Rituals
          </span>
        </div>
      </section>

      {/* 1. Hero */}
      <section className="w-full max-w-content mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop pb-2xl md:pb-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center bg-surface-container-low rounded-xl p-lg md:p-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />
          <div className="lg:col-span-6 z-10 space-y-md">
            <Badge>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              The Inaugural Edition
            </Badge>
            <h1 className="font-display text-display-hero-mobile md:text-display-hero text-on-surface tracking-tight leading-tight">
              Discover Your Everyday Care
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Thoughtfully selected beauty and personal-care essentials designed
              for your daily ritual.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md pt-xs">
              <Link
                href="/shop"
                className="h-12 px-8 bg-primary hover:bg-[#2E2D2B] text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center transition-all duration-200 shadow-md"
              >
                Shop Collection
              </Link>
              <Link
                href="/#featured"
                className="h-12 px-4 text-on-surface hover:text-secondary font-label-md text-label-md flex items-center gap-xs transition-colors group"
              >
                <span>Explore the Launch Line</span>
                <ArrowRight className="text-[18px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="pt-lg flex items-center gap-xl">
              <div>
                <p className="font-display text-headline-sm text-on-surface">100%</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Traceable Botanicals</p>
              </div>
              <div className="w-px h-8 bg-surface-variant" />
              <div>
                <p className="font-display text-headline-sm text-on-surface">4.9 / 5</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Clinical Rating</p>
              </div>
              <div className="w-px h-8 bg-surface-variant" />
              <div>
                <p className="font-display text-headline-sm text-on-surface">32,000+</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Mindful Ritualists</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative z-10">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden shadow-xl bg-surface-container">
              <Image
                src={IMAGES.heroPortrait}
                alt="Minimalist editorial still-life of amber cosmetic bottles and white cream jars on draped cream raw silk with soft golden sunlight and botanical shadows"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md rounded-lg p-sm shadow-md flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">Featured Ritual</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Clarifying & Restorative Regime</p>
                  </div>
                </div>
                <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">01 / Pure Balance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <SectionHeading
          eyebrow="Curated Dispensary"
          title="Shop by Category"
          link="/shop"
          linkLabel="Browse All Categories"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-md">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Care That Meets Your Needs */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <div className="bg-surface-container rounded-xl p-lg md:p-2xl shadow-sm">
          <div className="max-w-2xl mb-xl">
            <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-2xs">
              Prescriptive Focus
            </p>
            <h2 className="font-display text-headline-lg text-on-surface leading-tight">
              Care That Meets Your Needs
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Select your primary dermatological or hair objective to uncover
              precise botanical-clinical protocols.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-sm">
            {concerns.map((c) => (
              <Link
                key={c.title}
                href={c.link}
                className="group p-md bg-surface-container-lowest hover:bg-primary rounded-xl text-left transition-all duration-200 shadow-sm flex flex-col justify-between h-36"
              >
                <span className="text-[24px] text-secondary group-hover:text-on-primary transition-colors leading-none">
                  {c.icon}
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface group-hover:text-on-primary font-medium leading-tight">
                    {c.title}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-primary/70 mt-1">
                    {c.sub}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Essentials */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl" id="featured">
        <SectionHeading
          eyebrow="Curated Dispensary"
          title="Featured Essentials"
          link="/shop"
          linkLabel="View All"
        />
        <ProductGrid products={featured} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg" />
      </section>

      {/* 5. Brand Narrative */}
      <section className="w-full max-w-content mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-3xl" id="philosophy">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full overflow-hidden">
            <Image
              src={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCYu58Nvd6fWEK2x2d0i62NwN8pd7WOjonstHAsFcEG-jo0I544CVuWSWrPILP1eYObHWsu7FHweduL5MzzvzOMHJY_9AcDHbcBOklyGfuSBFMe0USahb1ZbAstiPSTHtnW34tLEOwM6Y7jWu9aVnULc216B3R4PLPvzoF6EyIm7ZbbJZ5nzOuAaHp9ACdks-ztqPDfZ49gS58NgzLofD5HdXnmN4GvcUw_98Y7ZU93sl-iEYmndqXvQA"
              }
              alt="Pure botanicals, raw seeds and morning dew resting on a marble slab in a sunlit botanical atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-6 left-6 px-3 py-1.5 bg-surface/90 backdrop-blur-md rounded-full shadow-sm">
              <p className="font-label-caps text-label-caps text-secondary uppercase font-semibold">Atelier Standard</p>
            </div>
          </div>
          <div className="lg:col-span-6 p-lg md:p-2xl space-y-md">
            <div className="inline-flex items-center gap-xs">
              <span className="w-6 h-px bg-secondary" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Our Philosophy</span>
            </div>
            <h2 className="font-display text-headline-lg text-on-surface leading-tight">
              Beauty, thoughtfully chosen.
            </h2>
            <div className="space-y-sm text-on-surface-variant font-body-md text-body-md">
              <p>
                At SilkSoul, we reject the noise of excess and fleeting fads. We
                believe daily self-care should be an unhurried ritual of quiet
                confidence and genuine skin nourishment.
              </p>
              <p>
                Our formulations combine active clinical dermatological efficacy
                with time-honored Ayurvedic and herbal infusions. Every
                ingredient is sourced with absolute transparency, verified for
                cellular compatibility, and housed in mindful packaging.
              </p>
            </div>
            <div className="pt-sm grid grid-cols-2 gap-md">
              <div className="p-sm bg-surface-container-lowest rounded-lg shadow-sm">
                <p className="font-display text-headline-sm text-on-surface">98.4%</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Reported calmed, clarified skin within 14 days
                </p>
              </div>
              <div className="p-sm bg-surface-container-lowest rounded-lg shadow-sm">
                <p className="font-display text-headline-sm text-on-surface">0%</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Parabens, harsh sulfates, synthetic fragrance
                </p>
              </div>
            </div>
            <div className="pt-xs">
              <Link
                href="/shop"
                className="inline-flex items-center gap-xs font-label-md text-label-md text-on-surface hover:text-secondary font-semibold transition-colors group"
              >
                <span>Discover SilkSoul</span>
                <ArrowRight className="text-[18px] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The SilkSoul Promise */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <div className="text-center max-w-xl mx-auto mb-2xl">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-2xs">
            The Standard
          </p>
          <h2 className="font-display text-headline-lg text-on-surface leading-tight">
            The SilkSoul Promise
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="p-lg bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-start space-y-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary font-display text-headline-sm">
                {perk.icon.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-display text-headline-sm text-on-surface leading-snug">
                {perk.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Reviews */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <div className="bg-surface-container rounded-xl p-lg md:p-3xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-sm">
            <div>
              <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-2xs">
                Real Rituals
              </p>
              <h2 className="font-display text-headline-lg text-on-surface leading-tight">
                Words from Our Community
              </h2>
            </div>
            <div className="flex items-center gap-xs">
              <StarRating rating={5} size={18} />
              <span className="font-label-md text-label-md font-semibold text-on-surface">4.92 / 5 Overall</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between space-y-md"
              >
                <div className="space-y-sm">
                  <StarRating rating={review.rating} size={16} />
                  <p className="font-display text-title-editorial text-on-surface italic leading-relaxed">
                    “{review.comment}”
                  </p>
                </div>
                <div className="pt-sm flex items-center justify-between">
                  <div>
                    <p className="font-label-md text-label-md font-semibold text-on-surface">
                      {review.customer_name}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Verified Purchase
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-secondary font-medium uppercase tracking-wider bg-secondary-fixed/40 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <section className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl">
        <div className="bg-surface-container-low rounded-xl p-lg md:p-3xl shadow-sm text-center relative overflow-hidden">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-secondary-container/40 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-md relative z-10">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Mindful Dispatch</span>
            <h2 className="font-display text-headline-lg text-on-surface leading-tight">
              Stay in the SilkSoul circle
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Receive botanical research notes, launch line notifications, and
              complimentary seasonal ritual guides.
            </p>
            <NewsletterForm />
            <p className="font-label-sm text-label-sm text-on-surface-variant/70">
              We respect your peace. Unsubscribe at any moment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}