"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { ProductImage } from "@/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const galleries = images.length > 0 ? images : [];
  const current = galleries[active];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-md md:gap-lg">
      {galleries.length > 1 && (
        <div className="flex md:flex-col gap-sm overflow-x-auto md:overflow-visible pb-xs md:pb-0 shrink-0">
          {galleries.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-surface-container-low transition-all duration-200 shadow-sm focus:outline-none ${
                i === active ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img.image_url}
                alt={img.alt_text ?? `Product image ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {i === active && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-secondary" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1 aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex items-center justify-center group">
        {current ? (
          <Image
            src={current.image_url}
            alt={current.alt_text ?? "Product image"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            No image available
          </div>
        )}
        <div className="absolute top-md left-md flex flex-col gap-xs pointer-events-none">
          <span className="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest text-[10px]">
              Pure Formulation
            </span>
          </span>
        </div>
        <div className="absolute bottom-md right-md bg-surface-container-lowest/80 backdrop-blur-md px-sm py-1.5 rounded-full shadow-sm text-on-surface-variant flex items-center gap-xs pointer-events-none">
          <ZoomIn className="text-[16px] w-4 h-4" />
          <span className="font-label-caps text-label-caps text-[10px] uppercase">Hover to inspect</span>
        </div>
      </div>
    </div>
  );
}