import type { ProductWithRelations } from "@/types";
import { formatPrice } from "@/lib/utils";
import { discountPercent, stockStatus } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "./cart/AddToCartButton";
import { StarRating } from "./StarRating";
import { ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const image = product.images?.find((i) => i.is_primary) ?? product.images?.[0];
  const discount = discountPercent(product.price, product.sale_price);
  const stock = stockStatus(product.stock_quantity, product.low_stock_threshold);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container">
        {image ? (
          <Image
            src={image.image_url}
            alt={image.alt_text ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            No image
          </div>
        )}

        {/* badges */}
        <div className="absolute top-xs left-xs flex flex-col gap-1">
          {discount && (
            <span className="bg-secondary text-on-secondary font-label-caps text-label-sm px-xs py-0.5 rounded-sm tracking-wider uppercase">
              -{discount}%
            </span>
          )}
          {product.new_arrival && (
            <span className="bg-primary text-on-primary font-label-caps text-label-sm px-xs py-0.5 rounded-sm tracking-wider uppercase">
              New
            </span>
          )}
        </div>
        {stock === "OUT_OF_STOCK" && (
          <div className="absolute inset-0 bg-surface/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface bg-surface px-3 py-1 rounded-full shadow-sm">
              Sold Out
            </span>
          </div>
        )}

        {/* quick add */}
        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {stock !== "OUT_OF_STOCK" && (
            <AddToCartButton
              product={product}
              variant="bar"
              className="w-full h-11 bg-primary text-on-primary"
            />
          )}
        </div>
      </div>

      <div className="p-sm flex items-start justify-between gap-sm">
        <div className="min-w-0">
          {product.brand && (
            <p className="font-label-caps text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">
              {product.brand.name}
            </p>
          )}
          <h3 className="font-display text-title-editorial text-on-surface leading-snug truncate">
            {product.name}
          </h3>
          {product.rating != null && product.rating > 0 && (
            <div className="mt-xs flex items-center gap-1">
              <StarRating rating={product.rating} size={13} />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              {formatPrice(product.sale_price ?? product.price)}
            </span>
            {product.sale_price && (
              <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
        <ShowItemButton product={product} />
      </div>
    </Link>
  );
}

function ShowItemButton({ product }: { product: ProductWithRelations }) {
  const stock = stockStatus(product.stock_quantity, product.low_stock_threshold);
  if (stock === "OUT_OF_STOCK") return null;
  return (
    <span
      className="w-9 h-9 shrink-0 rounded-full bg-surface-container-low text-on-surface-variant group-hover:bg-secondary group-hover:text-on-secondary flex items-center justify-center transition-colors duration-300"
      aria-hidden="true"
    >
      <ShoppingBag className="w-4 h-4" />
    </span>
  );
}