// src/components/atoms/Separator.tsx
// Atomic position: atom — 1px divider.
// Uses border-block-start (logical) so it respects writing direction.
// Orientation: horizontal (default) or vertical.

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  /** Accent variant uses amber instead of border color */
  accent?:      boolean;
}

export function Separator({
  orientation = "horizontal",
  accent      = false,
  className,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        isHorizontal
          ? "w-full border-t"
          : "h-full border-s self-stretch",         // border-s = logical inline-start
        accent
          ? "border-accent-warm"
          : "border-border",
        className,
      )}
      {...props}
    />
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// src/components/atoms/Skeleton.tsx
// Atomic position: atom — loading placeholder primitive.
// No animation library — CSS keyframes only.
// Geometric, sharp-edged — consistent with the editorial aesthetic.
// ─────────────────────────────────────────────────────────────────────────────

import type { HTMLAttributes as SkeletonHTMLAttributes } from "react";

export interface SkeletonProps extends SkeletonHTMLAttributes<HTMLDivElement> {
  /** Sets a fixed height via Tailwind class — e.g. "h-4", "h-10" */
  height?: string;
  /** Sets a fixed width — e.g. "w-full", "w-32" */
  width?:  string;
}

export function Skeleton({
  height    = "h-4",
  width     = "w-full",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton rounded-none bg-muted",   // rounded-none = 0px, perfectly sharp
        height,
        width,
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

// Add this keyframe to globals.css @layer utilities:
// @keyframes skeleton-pulse {
//   0%, 100% { opacity: 1; }
//   50%       { opacity: .45; }
// }
// .skeleton { animation: skeleton-pulse 1.6s ease-in-out infinite; }


// ─────────────────────────────────────────────────────────────────────────────
// src/components/atoms/SectionLabel.tsx
// Atomic position: atom — the small uppercase monospace label above every section.
// Renders: "§ 01 — Selected Work" in accent amber.
// Used consistently across all portfolio sections.
// ─────────────────────────────────────────────────────────────────────────────

import type { HTMLAttributes as LabelHTMLAttributes } from "react";

export interface SectionLabelProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  index?:   string;   // "01", "02" etc — optional numbering
  children: React.ReactNode;
}

export function SectionLabel({
  index,
  children,
  className,
  ...props
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2",
        "font-mono text-xs tracking-widest uppercase",
        "text-accent-warm",
        className,
      )}
      {...props}
    >
      <span aria-hidden>§</span>
      {index && <span>{index}</span>}
      {index && <span aria-hidden>—</span>}
      <span>{children}</span>
    </p>
  );
}

// Helper to avoid multiple imports — re-export together
export { Separator as default } from "./Separator";