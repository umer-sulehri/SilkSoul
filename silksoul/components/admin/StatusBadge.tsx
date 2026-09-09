import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Boxes,
  Users,
  MessagesSquare,
  Star,
  Tag,
  FolderTree,
  Layers,
  type LucideIcon,
} from "lucide-react";
import type { OrderStatus, ProductStatus, QueryStatus, ReviewStatus } from "@/types";

export function StatusBadge({
  status,
  className,
}: {
  status: OrderStatus | ProductStatus | QueryStatus | ReviewStatus | string;
  className?: string;
}) {
  const palette: Record<string, string> = {
    PENDING: "bg-warning/15 text-on-surface-variant border-warning/30",
    APPROVED: "bg-success/15 text-on-surface-variant border-success/30",
    PROCESSING: "bg-info/15 text-on-surface-variant border-info/30",
    SHIPPED: "bg-info/15 text-on-surface-variant border-info/30",
    DELIVERED: "bg-success/15 text-on-surface-variant border-success/30",
    REJECTED: "bg-error/15 text-on-error-container border-error/30",
    CANCELLED: "bg-error/15 text-on-error-container border-error/30",
    PUBLISHED: "bg-success/15 text-on-surface-variant border-success/30",
    DRAFT: "bg-outline-variant/40 text-on-surface-variant border-outline-variant",
    ARCHIVED: "bg-outline-variant/40 text-on-surface-variant border-outline-variant",
    NEW: "bg-warning/15 text-on-surface-variant border-warning/30",
    IN_PROGRESS: "bg-info/15 text-on-surface-variant border-info/30",
    RESOLVED: "bg-success/15 text-on-surface-variant border-success/30",
    CLOSED: "bg-outline-variant/40 text-on-surface-variant border-outline-variant",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-xs px-2 py-0.5 rounded-full border font-label-caps text-label-caps text-[10px] uppercase tracking-wider whitespace-nowrap",
        palette[status] ?? "bg-outline-variant/40 text-on-surface-variant border-outline-variant",
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {status.replace(/_/g, " ")}
    </span>
  );
}

export type AdminNavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean };

export const NAV_ITEMS: AdminNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/queries", label: "Queries", icon: MessagesSquare },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
];

export const CATALOG_ITEMS: AdminNavItem[] = [
  { href: "/admin/brands", label: "Brands", icon: Tag },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/collections", label: "Collections", icon: Layers },
];