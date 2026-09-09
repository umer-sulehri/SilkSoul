import type { ProductWithRelations } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  className,
}: {
  products: ProductWithRelations[];
  className?: string;
}) {
  if (products.length === 0) return null;
  return (
    <div
      className={
        className ??
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}