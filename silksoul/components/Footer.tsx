import Link from "next/link";
import { Logo } from "./Logo";

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "All Formulations", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Acne Care", href: "/collections/acne-care" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Delivery & Shipping", href: "/#delivery" },
      { label: "Returns & Exchanges", href: "/#returns" },
      { label: "Order Request Process", href: "/#how-it-works" },
      { label: "Skin Consultation", href: "/contact" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Philosophy", href: "/#philosophy" },
      { label: "Clinical Provenance", href: "/#featured" },
      { label: "Sourcing & Ethics", href: "/#philosophy" },
      { label: "Atelier Locations", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "WhatsApp Concierge", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-4xl">
      <div className="max-w-content mx-auto px-gutter-mobile md:px-margin-tablet lg:px-margin-desktop py-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-4 space-y-md">
            <Logo link={false} />
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              High-performance botanical formulations and clinical dermatological
              care created for daily mindful skin rituals.
            </p>
            <div className="pt-xs">
              <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs">
                Newsletter
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Receive botanical notes, ritual guides, and private preview access.
              </p>
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading} className="lg:col-span-2 space-y-sm">
              <p className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
                {col.heading}
              </p>
              <ul className="space-y-xs font-body-sm text-body-sm text-on-surface-variant">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-on-surface transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-2xl pt-lg flex flex-col md:flex-row items-center justify-between gap-md border-t border-surface-variant">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2026 SilkSoul. All rights reserved.
          </p>
          <div className="flex items-center gap-lg font-body-sm text-body-sm text-on-surface-variant">
            <Link href="#" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-on-surface transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}