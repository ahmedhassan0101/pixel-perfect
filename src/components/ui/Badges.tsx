/**
 * Badges.tsx
 *
 * Philosophical Reasoning — TechBadge:
 * Stack labels are data, not decoration. They should read like
 * annotations on a technical drawing — precise, small, monospaced,
 * borderlined. The 2px radius keeps them sharp. No fill means they
 * don't compete with the content they describe. Uppercase tracking
 * signals "this is a category, not a word."
 *
 * Philosophical Reasoning — AvailabilityBadge:
 * This is the only pill-shaped element in the entire system — and
 * that singularity is intentional. The fully rounded form says:
 * "this is alive, this is organic, this is different from everything
 * else on this page." The pulsing green dot is a heartbeat. The gold
 * border is the frame. Together they say: open, ready, human.
 * It earns its visual weight by being the only element that breaks
 * the sharp-edge rule.
 */

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// TechBadge
// Sharp (2px radius), border-default, mono uppercase.
// Used for skill tags, project stack labels.
// ─────────────────────────────────────────────────────────────

export interface TechBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Optional accent variant — gold border and text (for "Live", "Featured") */
  accent?: boolean;
}

export function TechBadge({ accent = false, className, children, ...props }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "font-mono text-[10px] font-normal",
        "tracking-widest uppercase leading-none",
        "rounded-default",            // 2px — sharp, technical
        "px-2 py-1",
        "border transition-base",
        accent
          ? "border-gold text-gold"
          : "border-border text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// AvailabilityBadge
// The ONLY pill in the system (border-radius: 9999px).
// Transparent bg, gold border, pulsing emerald dot.
// ─────────────────────────────────────────────────────────────

export interface AvailabilityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

export function AvailabilityBadge({
  label = "Available for new projects",
  className,
  ...props
}: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        "border border-gold text-gold",
        "font-mono text-[11px] tracking-widest uppercase",
        "px-4 py-2",
        "transition-base",
        className,
      )}
      style={{ borderRadius: "9999px" }}   // rounded-pill — only exception in system
      {...props}
    >
      {/* Pulsing dot — CSS animation from globals.css */}
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>{label}</span>
    </span>
  );
}