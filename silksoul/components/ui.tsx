import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-label-md text-label-md rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
    variant === "primary" &&
      "bg-primary text-on-primary hover:bg-[#2E2D2B] shadow-md",
    variant === "secondary" && "bg-secondary text-on-secondary hover:bg-onSecondaryFixedVariant shadow-md",
    variant === "gold" && "bg-gold text-white hover:opacity-90 shadow-md",
    variant === "outline" &&
      "border border-outline text-on-surface hover:border-secondary hover:text-secondary bg-transparent",
    variant === "ghost" && "text-on-surface hover:text-secondary bg-transparent",
    size === "sm" && "h-9 px-3",
    size === "md" && "h-11 px-5",
    size === "lg" && "h-12 px-8",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }
  return <button {...props} className={classes} />;
}

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-xs px-3 py-1 rounded-full bg-surface shadow-sm text-label-caps uppercase tracking-wider text-on-surface",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  link,
  linkLabel,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  link?: string;
  linkLabel?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between mb-xl gap-sm",
        align === "center" && "items-center text-center",
      )}
    >
      <div>
        {eyebrow && (
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-2xs">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-headline-lg text-on-surface leading-tight tracking-tight">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link}
          className="font-label-md text-label-md text-on-surface hover:text-secondary flex items-center gap-xs transition-colors group"
        >
          {linkLabel ?? "View all"}
          <ArrowUpRight className="text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}