import type { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container relative">
        {category.image_url ? (
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            {category.name}
          </div>
        )}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-sm flex items-center justify-between">
        <div>
          <h3 className="font-display text-headline-sm text-on-surface leading-snug">
            {category.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {category.product_count ?? 0} Products
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-on-surface-variant group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
}