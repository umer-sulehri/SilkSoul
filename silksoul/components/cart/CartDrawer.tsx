"use client";

import { useCart } from "./CartContext";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-surface z-[70] shadow-overlay flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-gutter-desktop py-md border-b border-surface-variant">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-secondary" />
            <h2 className="font-display text-headline-sm text-on-surface">Your Bag</h2>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              ({items.reduce((n, i) => n + i.quantity, 0)})
            </span>
          </div>
          <button onClick={closeCart} aria-label="Close bag" className="p-1 text-on-surface-variant hover:text-on-surface">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-sm px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-on-surface-variant" />
            </div>
            <p className="font-display text-headline-sm text-on-surface">Your bag is empty</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Discover clinically proven and botanical care essentials.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 h-11 px-6 inline-flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md rounded-lg"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-gutter-mobile md:px-gutter-desktop py-md space-y-md">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-sm">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-surface-container shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-sm">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-label-md text-label-md text-on-surface hover:text-secondary line-clamp-2 leading-snug"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        aria-label="Remove item"
                        className="text-on-surface-variant hover:text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-label-md text-label-md text-on-surface font-semibold mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-outline-variant rounded-full">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center font-label-md text-label-md text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.min(item.quantity + 1, item.stock),
                            )
                          }
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={closeCart}
                        aria-label="Edit in bag"
                        className="hidden"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-surface-variant px-gutter-mobile md:px-gutter-desktop py-md space-y-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant">Subtotal</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Delivery and order confirmation will be calculated at checkout.
              </p>
              <div className="flex flex-col gap-xs pt-xs">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="h-12 w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-[#2E2D2B] transition-colors"
                >
                  Request Order <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="h-11 w-full inline-flex items-center justify-center gap-2 border border-outline text-on-surface font-label-md text-label-md rounded-lg hover:border-secondary hover:text-secondary transition-colors"
                >
                  View Full Bag
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}