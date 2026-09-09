import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({
  className,
  link = true,
}: {
  className?: string;
  link?: boolean;
}) {
  const logo = (
    <span className={cn("flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 50"
        className="h-8 w-auto object-contain"
        aria-hidden="true"
      >
        <path
          className="fill-none stroke-gold"
          style={{ fill: "none", stroke: "#B69A68", strokeWidth: 1.5, strokeLinecap: "round" }}
          d="M12 28 C 8 20, 16 14, 22 18 C 28 22, 16 32, 22 36 C 26 38, 30 34, 28 30"
        />
        <text
          x="38"
          y="32"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: "0.14em",
            fill: "#171717",
          }}
        >
          SilkSoul
        </text>
      </svg>
    </span>
  );

  if (!link) return logo;
  return (
    <Link href="/" aria-label="SilkSoul home" className="shrink-0">
      {logo}
    </Link>
  );
}