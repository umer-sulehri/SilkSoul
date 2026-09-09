"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import { requestOrder } from "@/app/actions/orders";
import { checkoutSchema } from "@/lib/validations";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck, Truck, Phone } from "lucide-react";

const FREE_DELIVERY_THRESHOLD = 3000;
const DELIVERY_FEE = 200;

const fieldStyles =
  "w-full px-sm bg-surface-container-low text-on-surface rounded-lg h-11 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-shadow";
const textareaStyles =
  "w-full px-sm py-sm bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 resize-none transition-shadow";

type FieldErrors = Partial<Record<"customerName" | "email" | "phone" | "address" | "city" | "notes", string>>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, originalSubtotal, clearCart } = useCart();
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const deliveryFee = items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const savings = originalSubtotal - subtotal;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setErrors({});
    if (items.length === 0) {
      setSubmitError("Your bag is empty. Add a product before requesting an order.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: i.price,
        name: i.name,
        image: i.image,
      })),
      customerName: String(data.get("customerName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      address: String(data.get("address") ?? ""),
      city: String(data.get("city") ?? ""),
      notes: String(data.get("notes") ?? ""),
    };

    const parsed = checkoutSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) {
          next[key] = issue.message;
        } else if (!key) {
          setSubmitError(issue.message);
        }
      }
      setErrors(next);
      return;
    }

    setPending(true);
    const result = await requestOrder(payload);
    setPending(false);

    if (result.success) {
      clearCart();
      router.push(`/checkout/success?order=${result.orderNumber}`);
    } else {
      setSubmitError(result.error);
    }
  }

  return (
    <div className="max-w-content mx-auto w-full px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-2xl flex flex-col gap-xl">
      <div>
        <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
          Almost There
        </p>
        <div className="flex items-center gap-sm">
          <Link
            href="/cart"
            className="font-label-md text-label-md text-on-surface hover:text-secondary inline-flex items-center gap-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-headline-lg text-on-surface leading-tight">
            Request Your Order
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-lg shadow-card border border-surface-variant flex flex-col gap-lg"
        >
          <div className="flex items-center gap-xs">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[12px] font-bold">
              1
            </span>
            <h2 className="font-display text-headline-sm text-on-surface">Delivery Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="space-y-1">
              <label htmlFor="customerName" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                Full name
              </label>
              <input id="customerName" name="customerName" required maxLength={100} placeholder="e.g. Ayesha Khan" className={fieldStyles} />
              {errors.customerName && (
                <p className="font-body-sm text-body-sm text-error">{errors.customerName}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                Phone / WhatsApp
              </label>
              <input id="phone" name="phone" required placeholder="03XX-XXXXXXX" className={fieldStyles} />
              {errors.phone && <p className="font-body-sm text-body-sm text-error">{errors.phone}</p>}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                Email
              </label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className={fieldStyles} />
              {errors.email && <p className="font-body-sm text-body-sm text-error">{errors.email}</p>}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="address" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                Delivery address
              </label>
              <input id="address" name="address" required placeholder="House, street, area" className={fieldStyles} />
              {errors.address && <p className="font-body-sm text-body-sm text-error">{errors.address}</p>}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="city" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                City
              </label>
              <input id="city" name="city" required placeholder="e.g. Karachi" className={fieldStyles} />
              {errors.city && <p className="font-body-sm text-body-sm text-error">{errors.city}</p>}
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="notes" className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                Order notes <span className="text-on-surface-variant normal-case">(optional)</span>
              </label>
              <textarea id="notes" name="notes" rows={3} placeholder="Any instructions for your ritual..." className={textareaStyles} />
            </div>
          </div>

          <div className="border-t border-surface-variant mt-sm pt-md flex items-start gap-xs text-on-surface-variant">
            <Phone className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
            <p className="font-body-sm text-body-sm">
              We confirm every request personally. Kindly keep your phone handy for the confirmation
              call or WhatsApp message within 24 hours.
            </p>
          </div>

          {submitError && (
            <p className="font-body-sm text-body-sm text-error bg-error-container/30 rounded-lg p-sm">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || items.length === 0}
            className="w-full rounded-lg bg-primary text-on-primary hover:bg-[#2E2D2B] disabled:opacity-50 disabled:cursor-not-allowed font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-xs transition-all shadow-md active:scale-[0.99] py-4"
          >
            {pending ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-on-primary/40 border-t-on-primary rounded-full animate-spin" />
                Placing Request...
              </span>
            ) : (
              <>
                Place Order Request <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 justify-center">
            <Lock className="w-3.5 h-3.5" />
            Your information is safe with us. We never share your data.
          </p>
        </form>

        {/* Summary */}
        <div className="lg:col-span-4 lg:sticky lg:top-[104px] flex flex-col gap-md">
          <div className="bg-surface-container-lowest rounded-xl p-lg shadow-card border border-surface-variant">
            <h2 className="font-display text-headline-sm text-on-surface mb-md">
              Your Bag ({count})
            </h2>
            <div className="space-y-sm max-h-64 overflow-y-auto pr-xs">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-sm">
                  <div className="relative w-14 h-16 rounded-md overflow-hidden bg-surface-container shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-md text-body-md text-on-surface truncate">{item.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-sm border-t border-surface-variant mt-md pt-md">
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
              <div className="flex justify-between items-baseline pt-xs">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                  Estimated Total
                </span>
                <span className="font-display text-headline-md text-on-surface">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="bg-surface-container-lowest rounded-xl p-sm shadow-card border border-surface-variant text-center">
              <ShieldCheck className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Cash on Delivery
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-sm shadow-card border border-surface-variant text-center">
              <Truck className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
                Dispatch in 24-48h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}