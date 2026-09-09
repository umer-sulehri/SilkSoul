"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./Logo";
import { useCart } from "./cart/CartContext";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ announcementBarText }: { announcementBarText?: string | null }) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href.split("?")[0] === pathname;

  const activeClass = "text-on-surface font-semibold underline underline-offset-8 decoration-secondary";
  const idleClass = "font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {announcementBarText && (
        <div className="w-full bg-primary-container text-on-primary py-xs px-gutter-mobile md:px-gutter-desktop text-center font-label-caps text-label-caps uppercase tracking-widest">
          {announcementBarText}
        </div>
      )}
      <div className="h-20 max-w-content mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-md">
        <div className="flex items-center gap-xs">
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={isActive(link.href) ? activeClass : idleClass}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          <Link
            href="/shop?q="
            aria-label="Search"
            className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
          >
            <Search className="w-[22px] h-[22px]" />
          </Link>
          <button
            aria-label="Wishlist"
            className="relative text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
            onClick={() => window.alert("Wishlist coming soon")}
          >
            <Heart className="w-[22px] h-[22px]" />
            <span className="absolute -top-1.5 -right-2 bg-secondary text-on-secondary font-label-caps text-[9px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
              0
            </span>
          </button>
          <button
            aria-label="Shopping Bag"
            onClick={openCart}
            className="relative text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="w-[22px] h-[22px]" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-primary text-on-primary font-label-caps text-[9px] min-w-4 h-4 rounded-full flex items-center justify-center px-1 leading-none">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/account"
            aria-label="My Account"
            className="pl-xs flex items-center"
          >
            <span className="w-9 h-9 rounded-full bg-surface-container-high ring-1 ring-surface-variant flex items-center justify-center text-on-surface-variant">
              <User className="w-4 h-4" />
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-on-surface-variant"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-surface border-t border-surface-variant max-w-content mx-auto px-gutter-mobile py-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-2.5 border-b border-surface-variant/60 last:border-0",
                isActive(link.href) ? activeClass : idleClass,
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            onClick={() => setMobileOpen(false)}
            className={cn("block py-2.5 border-b border-surface-variant/60", isActive("/account") ? activeClass : idleClass)}
          >
            My Account
          </Link>
        </nav>
      )}
    </header>
  );
}