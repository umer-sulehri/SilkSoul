"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { NAV_ITEMS, CATALOG_ITEMS } from "@/components/admin/StatusBadge";
import { Store, LogOut, ExternalLink } from "lucide-react";

export function AdminSidebar({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-surface-container-lowest border-r border-surface-variant z-40">
        <div className="h-[72px] flex items-center justify-between px-md border-b border-surface-variant">
          <Logo />
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest text-[10px]">
            Admin
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-sm py-md space-y-xs">
          <p className="px-sm pb-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">
            Manage
          </p>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-sm px-sm py-2 rounded-lg font-label-md text-label-md transition-colors",
                isActive(item.href, item.exact)
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}

          <p className="px-sm pt-lg pb-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">
            Catalog
          </p>
          {CATALOG_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-sm px-sm py-2 rounded-lg font-label-md text-label-md transition-colors",
                isActive(item.href)
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-surface-variant p-sm space-y-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-sm px-sm py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <Store className="w-4 h-4" />
            View Storefront
            <ExternalLink className="w-3.5 h-3.5 ml-auto" />
          </Link>
          <button
            type="button"
            onClick={() => signOutAdmin()}
            className="w-full flex items-center gap-sm px-sm py-2 rounded-lg font-label-md text-label-md text-error hover:bg-error/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
          {adminEmail && (
            <p className="px-sm pt-xs font-body-sm text-body-sm text-on-surface-variant truncate">
              {adminEmail}
            </p>
          )}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-surface-container-lowest border-b border-surface-variant">
        <div className="h-[64px] px-md flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => signOutAdmin()}
            className="inline-flex items-center gap-xs font-label-md text-label-md text-error"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
        <nav className="px-sm pb-sm flex items-center gap-xs overflow-x-auto">
          {[...NAV_ITEMS, ...CATALOG_ITEMS].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-xs px-sm py-1.5 rounded-lg font-label-sm text-label-sm whitespace-nowrap transition-colors",
                isActive(item.href, item.exact)
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant",
              )}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}