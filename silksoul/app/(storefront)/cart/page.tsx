"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShieldCheck, Truck, ArrowRight, ArrowLeft } from "lucide-react";

const FREE_DELIVERY_THRESHOLD = 3000;
const DELIVERY_FEE = 200;

export default function CartPage() {
  const { items, subtotal, originalSubtotal, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const deliveryFee = items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const savings = originalSubtotal - subtotal;

  return (
    <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-sm">
        <div>
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            Your Rituals
          </p>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            Shopping Bag {count > 0 && <span className="text-on-surface-variant">({count})</span>}
          </h1>
        </div>
        <Link
          href="/shop"
          className="font-label-md text-label-md text-on-surface hover:text-secondary inline-flex items-center gap-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-3xl space-y-md bg-surface-container-low rounded-xl">
          <p className="font-display text-headline-md text-on-surface">Your bag is empty</p>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Discover clean, effective formulations crafted for your skin and hair ritual.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-xs font-label-md text-label-md bg-primary text-on-primary h-11 px-6 rounded-lg hover:bg-[#2E2D2B] transition-colors"
          >
            Explore the Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          {/* Line items */}
          <div className="lg:col-span-8 flex flex-col gap-sm">
            <div className="bg-surface-container-low rounded-lg p-md mb-sm">
              {remaining > 0 ? (
                <p className="font-body-sm text-body-sm text-on-surface mb-xs">
                  You are <span className="font-semibold text-secondary">{formatPrice(remaining)}</span>{" "}
                  away from complimentary delivery
                </p>
              ) : (
                <p className="font-body-sm text-body-sm text-on-surface">
                  <Truck className="inline w-4 h-4 text-secondary mr-1" />
                  Congratulations — your order qualifies for complimentary delivery
                </p>
              )}
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {items.map((item) => {
              const lineTotal = item.price * item.quantity;
              const originalLineTotal = item.originalPrice * item.quantity;
              return (
                <div
                  key={item.productId}
                  className="bg-surface-container-lowest rounded-xl p-md shadow-card border border-surface-variant flex gap-md"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden bg-surface-container shrink-0"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-xs">
                        No image
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-sm">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-display text-headline-sm text-on-surface hover:text-secondary transition-colors leading-snug"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from bag`}
                        onClick={() => removeFromCart(item.productId)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1 -m-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-xs mt-xs">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-sm flex items-center justify-between gap-sm flex-wrap">
                      <div className="flex items-center bg-surface-container rounded-lg p-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-label-md text-label-md font-semibold select-none">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.productId, Math.min(item.stock, item.quantity + 1))
                          }
                          className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-baseline gap-xs">
                        {originalLineTotal > lineTotal && (
                          <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            {formatPrice(originalLineTotal)}
                          </span>
                        )}
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-sm">
              <button
                type="button"
                onClick={clearCart}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-error transition-colors underline underline-offset-4"
              >
                Clear bag
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-[104px]">
            <div className="bg-surface-container-lowest rounded-xl p-lg shadow-card border border-surface-variant">
              <h2 className="font-display text-headline-sm text-on-surface mb-md">Order Summary</h2>

              <div className="space-y-sm border-b border-surface-variant pb-md">
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface">{formatPrice(subtotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between font-body-md text-body-md text-secondary">
                    <span>Sale savings</span>
                    <span>−{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "text-secondary font-semibold" : "text-on-surface"}>
                    {deliveryFee === 0 ? "Complimentary" : formatPrice(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-md">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                  Total
                </span>
                <span className="font-display text-headline-md text-on-surface">{formatPrice(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-md w-full h-12 rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-xs transition-all shadow-md active:scale-[0.99]"
              >
                Request Order <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-sm flex items-start gap-xs text-on-surface-variant">
                <ShieldCheck className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <p className="font-body-sm text-body-sm">
                  No online payment required. We confirm every order personally via phone or
                  WhatsApp before dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}