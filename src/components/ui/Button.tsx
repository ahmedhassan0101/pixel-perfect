/**
 * Button.tsx
 *
 * Philosophical Reasoning:
 * In the Cinematic Dark system, buttons are not decorative — they are
 * instructions. The primary button inverts the palette (light on dark)
 * because it is the single most important action per section. It should
 * feel like pressing a key on a mechanical keyboard — deliberate, clear.
 *
 * Hover states use opacity (primary) or border/color shift (outline,
 * ghost) — never scale transforms, never background flashes.
 * No layout shift means the user feels control, not surprise.
 *
 * The ghost variant uses the gold underline as its sole interaction
 * signal — consistent with the link language in the system.
 *
 * Icons are sized and spaced to feel integrated, not appended.
 * Logical margin properties (me-, ms-) are used so the component
 * works correctly if direction ever changes.
 */

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
// ── Types ─────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered before the label */
  iconStart?: ReactNode;
  /** Icon rendered after the label */
  iconEnd?: ReactNode;
  /** Stretch to fill parent width */
  fullWidth?: boolean;
}

// ── Variant map ───────────────────────────────────────────────

const VARIANTS: Record<ButtonVariant, string> = {
  /**
   * primary — inverted: bg-text / text-bg
   * The only filled button in the system.
   * Hover: opacity drops to 0.85 — no color change.
   */
  primary: ["bg-text text-bg", "border border-text", "hover:opacity-85"].join(
    " ",
  ),

  /**
   * outline — transparent with visible border.
   * Hover: border shifts to border-em, text shifts to text-primary.
   */
  outline: [
    "bg-transparent text-muted",
    "border border-border",
    "hover:border-border-em hover:text-text",
  ].join(" "),

  /**
   * ghost — borderless. Hover reveals gold underline.
   * Used for nav links, secondary actions, external links.
   */
  ghost: [
    "bg-transparent text-muted",
    "border border-transparent",
    // "hover:text-text hover:underline-gold",
    "hover:text-text hover:border-b-gold/80",
  ].join(" "),
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2   text-label! gap-1.5",
  md: "px-6 py-2.5 text-label! gap-2",
};

// ── Component ─────────────────────────────────────────────────

export function Button({
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        // ── Base ───────────────────────────────────────────
        "inline-flex items-center justify-center",
        "font-mono tracking-widest uppercase",
        "rounded-default", // 2px — manifesto hard cap
        "transition-base", // color, opacity, border @ 250ms ease-in
        "cursor-pointer select-none",
        // ── Focus ──────────────────────────────────────────
        "focus-visible:outline-none",
        "focus-visible:ring-[1.5px] focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-bg",
        // ── Disabled ───────────────────────────────────────
        "disabled:opacity-40 disabled:cursor-not-allowed",
        // ── Variant + size ─────────────────────────────────
        VARIANTS[variant],
        SIZES[size],
        // ── Width ──────────────────────────────────────────
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {iconStart && (
        <span className="me-0 flex shrink-0 items-center" aria-hidden>
          {iconStart}
        </span>
      )}
      {children}
      {iconEnd && (
        <span className="ms-0 flex shrink-0 items-center" aria-hidden>
          {iconEnd}
        </span>
      )}
    </button>
  );
}

interface LinkBtnProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkBtn({ href, children, className }: LinkBtnProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-label text-muted! flex items-center gap-1.5 transition-base hover:text-text hover:underline-gold",
        className,
      )}
    >
      {children}
    </Link>
  );
}
