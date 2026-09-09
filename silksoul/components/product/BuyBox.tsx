"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice, stockStatus } from "@/lib/utils";
import { Minus, Plus, Heart, ShoppingBag, Truck, Banknote, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types";

export function BuyBox({ product }: { product: ProductWithRelations }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const stock = stockStatus(product.stock_quantity, product.low_stock_threshold);
  const price = product.sale_price ?? product.price;
  const outOfStock = stock === "OUT_OF_STOCK";

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      originalPrice: product.price,
      image:
        product.images?.find((i) => i.is_primary)?.image_url ??
        product.images?.[0]?.image_url ??
        null,
      stock: product.stock_quantity,
      quantity,
      openDrawer: true,
    });
  };

  return (
    <div className="flex items-center justify-between pt-xs">
      <div className="flex items-center bg-surface-container rounded-lg p-1">
        <button
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
        >
          <Minus className="text-[16px] w-4 h-4" />
        </button>
        <span className="w-10 text-center font-label-md text-label-md text-on-surface font-semibold select-none">
          {quantity}
        </span>
        <button
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(product.stock_quantity || 1, q + 1))}
          className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
        >
          <Plus className="text-[16px] w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant">
        <span className={cn("w-2 h-2 rounded-full animate-pulse", outOfStock ? "bg-error" : "bg-secondary")} />
        <span>
          {outOfStock
            ? "Sold Out"
            : stock === "LOW_STOCK"
              ? `Only ${product.stock_quantity} left · Dispatch in 24-48h`
              : "In Stock · Ready to dispatch"}
        </span>
      </div>
    </div>
  );
}

export function BuyActions({ product }: { product: ProductWithRelations }) {
  const { addToCart } = useCart();
  const price = product.sale_price ?? product.price;
  const stock = stockStatus(product.stock_quantity, product.low_stock_threshold);
  const outOfStock = stock === "OUT_OF_STOCK";

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      originalPrice: product.price,
      image:
        product.images?.find((i) => i.is_primary)?.image_url ??
        product.images?.[0]?.image_url ??
        null,
      stock: product.stock_quantity,
      quantity: 1,
      openDrawer: true,
    });
  };

  return (
    <div className="flex items-center gap-sm pt-xs">
      <button
        type="button"
        disabled={outOfStock}
        onClick={handleAdd}
        className="flex-1 h-12 rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] disabled:opacity-50 disabled:cursor-not-allowed font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-xs transition-all shadow-md active:scale-[0.99]"
      >
        <ShoppingBag className="text-[20px] w-5 h-5" />
        {outOfStock ? "Sold Out" : `Request Order — ${formatPrice(price)}`}
      </button>
      <button
        type="button"
        aria-label="Save to Wishlist"
        className="w-12 h-12 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors"
      >
        <Heart className="text-[22px] w-5 h-5" />
      </button>
    </div>
  );
}

export function ReassuranceBadges() {
  const items = [
    { icon: Truck, title: "Complimentary", sub: "Orders above Rs. 3,000" },
    { icon: Banknote, title: "Cash on Delivery", sub: "Available Nationwide" },
    { icon: Clock, title: "Fast Dispatch", sub: "Within 24-48 hours" },
  ];
  return (
    <div className="grid grid-cols-3 gap-xs pt-md bg-surface-container-lowest rounded-lg p-sm shadow-sm">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            "flex flex-col items-center text-center p-xs",
            i === 1 && "bg-surface-container-low rounded",
          )}
        >
          <item.icon className="text-secondary w-5 h-5 mb-1" />
          <p className="font-label-caps text-[10px] uppercase font-semibold text-on-surface">
            {item.title}
          </p>
          <p className="font-body-sm text-[11px] text-on-surface-variant">{item.sub}</p>
        </div>
      ))}
    </div>
  );
}