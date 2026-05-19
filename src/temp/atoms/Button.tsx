// src/components/atoms/Button.tsx
// Atomic position: atom — the primary interactive primitive.
//
// Three variants:
//   primary  → solid bg-primary / text-primary-foreground  ← RECOMMENDED
//   outline  → transparent bg / border-border
//   ghost    → no border / underline-accent on hover
//
// Icon support: iconStart (before label) and iconEnd (after label).
// Logical properties throughout — ms-/me- flip automatically in RTL.
// Extends React.ButtonHTMLAttributes for full native button compatibility.

import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  /** Fills container width */
  fullWidth?: boolean;
}

// ── Variant classes ───────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  // Solid — primary brand action. High contrast, unmistakable.
  primary: [
    "bg-primary text-primary-foreground",
    "border border-primary",
    "hover:opacity-80",
    "disabled:opacity-40",
  ].join(" "),

  // Outline — secondary action. Sharp border, no fill.
  outline: [
    "bg-transparent text-foreground",
    "border border-border",
    "hover:border-ring hover:text-foreground",
    "disabled:opacity-40",
  ].join(" "),

  // Ghost — tertiary / nav links. No chrome, underline accent on hover.
  ghost: [
    "bg-transparent text-muted-foreground border border-transparent",
    "hover:text-foreground hover:underline-accent",
    "disabled:opacity-40",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2   text-sm gap-2",
  lg: "px-6 py-3   text-base gap-2.5",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Button({
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        // Base — shared across all variants
        "inline-flex items-center justify-center",
        "font-mono tracking-wider uppercase",
        "rounded-sm", // --radius-sm: 1px
        "transition-base", // color, bg, border, opacity @ 200ms
        "cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed",
        // Variant + size
        variantClasses[variant],
        sizeClasses[size],
        // Width
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {/* Icon before label — me- (margin-end) flips in RTL */}
      {iconStart && (
        <span className="me-0 flex shrink-0 items-center" aria-hidden>
          {iconStart}
        </span>
      )}

      {children}

      {/* Icon after label — ms- (margin-start) flips in RTL */}
      {iconEnd && (
        <span className="ms-0 flex shrink-0 items-center" aria-hidden>
          {iconEnd}
        </span>
      )}
    </button>
  );
}
