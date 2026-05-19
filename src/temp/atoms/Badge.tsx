// src/components/atoms/Badge.tsx
// Atomic position: atom — smallest labeling primitive.
// Used for: tech stack tags, project status, section labels, complexity notation.
//
// Three variants:
//   outline  → transparent bg, border-border                ← RECOMMENDED
//   subtle   → bg-muted, no border — for secondary info
//   accent   → transparent bg, border-ring, text-accent-warm — for status/live
//
// Size: sm (default for tags) and md (for standalone labels).
// All text is font-mono — badges are always technical/data, never prose.

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export type BadgeVariant = "outline" | "subtle" | "accent";
export type BadgeSize    = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?:    BadgeSize;
}

// ── Variant classes ───────────────────────────────────────────────────────────

const variantClasses: Record<BadgeVariant, string> = {
  // Sharp border, no fill — reads as technical annotation
  outline: "border border-border text-muted-foreground bg-transparent",

  // Muted fill — secondary, lower visual weight
  subtle:  "border border-transparent bg-muted text-muted-foreground",

  // Amber border + amber text — for "Live", "Active", focal states
  accent:  "border border-ring text-accent-warm bg-transparent",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px] tracking-wider",
  md: "px-2.5 py-1   text-xs     tracking-wide",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Badge({
  variant   = "outline",
  size      = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono rounded-none uppercase",
        // rounded-none enforces the 0px radius — badges are the sharpest element
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}