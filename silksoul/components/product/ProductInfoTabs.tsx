"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types";

const TABS = [
  { id: "description", label: "Description" },
  { id: "benefits", label: "Key Benefits" },
  { id: "ingredients", label: "Ingredients" },
  { id: "how-to-use", label: "How to Use" },
  { id: "specs", label: "Specifications" },
  { id: "faqs", label: "FAQs" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductInfoTabs({ product }: { product: ProductWithRelations }) {
  const [active, setActive] = useState<TabId>("description");

  return (
    <div>
      <div className="flex items-center gap-gutter-mobile md:gap-gutter-desktop overflow-x-auto border-b border-surface-variant">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "py-md whitespace-nowrap font-label-md text-label-md uppercase tracking-wider border-b-2 -mb-px transition-colors",
              active === tab.id
                ? "text-secondary border-secondary font-semibold"
                : "text-on-surface-variant border-transparent hover:text-on-surface",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-xl">
        {active === "description" && (
          <div className="prose prose-lg max-w-3xl text-on-surface-variant">
            <p className="font-body-lg text-body-lg leading-relaxed">{product.description}</p>
          </div>
        )}

        {active === "benefits" && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-md max-w-3xl">
            {(product.benefits ?? []).map((benefit, i) => (
              <li
                key={i}
                className="flex items-start gap-sm p-sm bg-surface-container-low rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                <span className="font-body-md text-body-md text-on-surface">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {active === "ingredients" && (
          <ul className="max-w-3xl space-y-sm">
            {(product.ingredients ?? []).map((ing, i) => (
              <li
                key={i}
                className="flex items-center gap-sm p-sm bg-surface-container-low rounded-lg"
              >
                <span className="w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-[10px] font-bold">
                  {i + 1}
                </span>
                <span className="font-body-md text-body-md text-on-surface">{ing}</span>
              </li>
            ))}
          </ul>
        )}

        {active === "how-to-use" && (
          <div className="max-w-3xl space-y-md">
            <div className="flex items-center gap-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                Ritual Guide
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {product.how_to_use}
            </p>
            {(product.suitable_for ?? []).length > 0 && (
              <div className="pt-sm">
                <p className="font-label-md text-label-md text-on-surface mb-xs">Suitable for:</p>
                <div className="flex flex-wrap gap-xs">
                  {(product.suitable_for ?? []).map((s) => (
                    <span
                      key={s}
                      className="px-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {active === "specs" && (
          <div className="max-w-3xl overflow-hidden rounded-lg border border-surface-variant">
            <table className="w-full text-left">
              <tbody>
                {(product.specifications ?? []).map((spec, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-b border-surface-variant last:border-0",
                      i % 2 === 0 && "bg-surface-container-low/50",
                    )}
                  >
                    <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider w-1/3">
                      {spec.key}
                    </th>
                    <td className="px-md py-sm font-body-md text-body-md text-on-surface">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === "faqs" && (
          <div className="max-w-3xl space-y-sm">
            {(product.faqs ?? []).map((faq, i) => (
              <details key={i} className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between p-sm bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface">
                  {faq.question}
                </summary>
                <p className="p-sm pl-md font-body-sm text-body-sm text-on-surface-variant">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}