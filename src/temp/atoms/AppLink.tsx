// src/components/atoms/AppLink.tsx
// Atomic position: atom — typed wrapper around Next.js Link.
// Named AppLink to avoid collision with next/link's own export name.
//
// Three variants:
//   accent   → underline-accent always visible          ← RECOMMENDED
//   hover    → underline-accent appears on hover only
//   silent   → no decoration, inherits color — for nav/icon contexts
//
// RTL: text-decoration flips direction automatically with the dir attribute.
// Logical margin/padding used when icon spacing is added.

import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export type LinkVariant = "accent" | "hover" | "silent";

export interface AppLinkProps extends ComponentProps<typeof NextLink> {
  variant?:   LinkVariant;
  iconStart?: ReactNode;
  iconEnd?:   ReactNode;
  external?:  boolean;
}

// ── Variant classes ───────────────────────────────────────────────────────────

const variantClasses: Record<LinkVariant, string> = {
  // Always underlined with amber — primary in-text link signal
  accent: "underline-accent text-foreground hover:text-accent-warm transition-base",

  // Underline appears on hover — for nav items and UI links
  hover:  "text-muted-foreground hover:underline-accent hover:text-foreground transition-base",

  // No decoration — for icon buttons, logo, wrapped card links
  silent: "text-foreground transition-base",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function AppLink({
  variant  = "accent",
  iconStart,
  iconEnd,
  external = false,
  className,
  children,
  ...props
}: AppLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <NextLink
      className={cn(
        "inline-flex items-center gap-1.5",
        variantClasses[variant],
        className,
      )}
      {...externalProps}
      {...props}
    >
      {iconStart && (
        <span className="flex shrink-0 items-center" aria-hidden>
          {iconStart}
        </span>
      )}

      {children}

      {iconEnd && (
        <span className="flex shrink-0 items-center" aria-hidden>
          {iconEnd}
        </span>
      )}

      {/* External link indicator — screen reader only */}
      {external && (
        <span className="sr-only">(opens in new tab)</span>
      )}
    </NextLink>
  );
}