// src/components/atoms/Card.tsx
// Atomic position: atom — structural container primitive.
//
// Three variants:
//   image    → bg-card + border + image slot + hover border-ring ← RECOMMENDED
//   info     → bg-surface + border — for stats and text blocks
//   minimal  → border only, bg-transparent — most editorial
//
// Cards never have box-shadow — depth is expressed through border and bg contrast.
// radius: --radius (2px) throughout.
// Hover: border-color transitions to amber, nothing else moves.

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CardVariant = "image" | "info" | "minimal";

// Base card props — composes with HTMLAttributes for spread compatibility
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

// Image card specific — requires image slot
export interface ImageCardProps extends CardProps {
  variant:       "image";
  imageSrc?:     string;
  imageAlt?:     string;
  /** Rendered inside the image area — for badges/overlays */
  imageOverlay?: ReactNode;
}

// Union — TypeScript discriminates on variant
export type CardPropsUnion = ImageCardProps | (CardProps & { variant?: "info" | "minimal" });

// ── Variant base classes ──────────────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  image:   "bg-card border border-border hover:border-ring transition-base overflow-hidden",
  info:    "bg-surface border border-border",
  minimal: "bg-transparent border border-border hover:border-ring transition-base",
};

// ── Sub-components ────────────────────────────────────────────────────────────

// Card.Header — section label + title area
function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start justify-between gap-3 p-4 pb-0", className)}
      {...props}
    />
  );
}

// Card.Body — main content area
function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4", className)} {...props} />
  );
}

// Card.Footer — links, actions
function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 pb-4 pt-0 border-t border-border mt-auto",
        className,
      )}
      {...props}
    />
  );
}

// Card.ImageSlot — the image container with placeholder
function CardImageSlot({
  src,
  alt = "",
  overlay,
}: {
  src?:     string;
  alt?:     string;
  overlay?: ReactNode;
}) {
  return (
    <div className="relative w-full h-44 bg-code-bg overflow-hidden">
      {src ? (
        // Next.js Image would be used in real pages — img for atomic portability
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        // Placeholder — geometric grid pattern using border lines
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border opacity-60"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
      )}

      {/* Overlay — badges and status indicators */}
      {overlay && (
        <div className="absolute bottom-3 start-3 end-3 flex flex-wrap gap-1.5">
          {overlay}
        </div>
      )}
    </div>
  );
}

// ── Root Card component ───────────────────────────────────────────────────────

function CardRoot({
  variant   = "info",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm",     // rounded-sm = 1px
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Compound export ───────────────────────────────────────────────────────────
// Usage:
//   <Card.Root variant="image">
//     <Card.ImageSlot src="..." overlay={<Badge>Live</Badge>} />
//     <Card.Body>...</Card.Body>
//     <Card.Footer>...</Card.Footer>
//   </Card.Root>

export const Card = {
  Root:      CardRoot,
  Header:    CardHeader,
  Body:      CardBody,
  Footer:    CardFooter,
  ImageSlot: CardImageSlot,
};