"use client";

import { useCart } from "./CartContext";
import { Button } from "@/components/ui";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types";

export function AddToCartButton({
  product,
  variant = "default",
  className,
  openDrawer = true,
}: {
  product: ProductWithRelations;
  variant?: "default" | "bar";
  className?: string;
  openDrawer?: boolean;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.sale_price ?? product.price,
      originalPrice: product.price,
      image: product.images?.find((i) => i.is_primary)?.image_url ?? product.images?.[0]?.image_url ?? null,
      stock: product.stock_quantity,
      quantity: 1,
      openDrawer,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "w-full h-11 inset-x-0 bottom-0 bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors hover:bg-[#2E2D2B]",
          className,
        )}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" /> Added to Bag
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" /> Add to Bag
          </>
        )}
      </button>
    );
  }

  return (
    <Button type="button" onClick={handleClick} size="md" className={className}>
      {added ? (
        <>
          <Check className="w-4 h-4" /> Added
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" /> Add to Bag
        </>
      )}
    </Button>
  );
}