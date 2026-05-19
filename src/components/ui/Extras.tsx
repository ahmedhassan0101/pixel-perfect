/**
 * Separator.tsx
 *
 * Philosophical Reasoning:
 * In a system where borders define structure rather than decorate,
 * the separator is a first-class citizen. 1px only — never more.
 * The accent variant uses gold to signal hierarchy transitions
 * (end of hero, beginning of work). The standard variant uses
 * border-default — barely visible, purely structural.
 *
 * Logical border properties (border-block-start, border-inline-start)
 * ensure correct rendering in both LTR and RTL contexts.
 */

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Gold accent line — used sparingly at section transitions */
  accent?: boolean;
}

export function Separator({
  orientation = "horizontal",
  accent = false,
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
          : "h-full border-s self-stretch",
        accent ? "border-gold" : "border-border",
        className,
      )}
      {...props}
    />
  );
}


/**
 * Ticker.tsx
 *
 * Philosophical Reasoning:
 * The stack ticker is not a gimmick — it is a data display mechanism.
 * A static list of technologies reads as a resume bullet. A continuously
 * scrolling list reads as "this person is actively working with these
 * tools." The pause-on-hover gives users control. The gold separator
 * dots add visual rhythm without adding noise.
 *
 * Duplicated children create the seamless loop. The .ticker CSS class
 * in globals.css handles all animation — zero JS involved.
 */

interface TickerProps {
  items: string[];
  className?: string;
}

export function Ticker({ items, className }: TickerProps) {
  // Duplicate for seamless infinite scroll loop
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("overflow-hidden border-y border-border", className)}
      aria-label="Technology stack"
    >
      <div className="ticker flex items-center gap-6 py-3">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === "·"
                ? "text-gold text-label"
                : "text-label text-muted"
            }
            aria-hidden={i >= items.length} // Hide duplicates from screen readers
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}


/**
 * Skeleton.tsx
 *
 * Philosophical Reasoning:
 * Loading states are part of the experience. A generic spinner breaks
 * the editorial feel. Rectangular skeletons — perfectly sharp,
 * pulsing at the same rhythm as the availability dot — maintain
 * the geometric identity while signaling "content is arriving."
 *
 * Zero border-radius. The skeleton must feel like a placeholder
 * for our content, not a generic loading widget.
 */

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
}

export function Skeleton({
  height = "h-4",
  width = "w-full",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-surface rounded-none",   // 0px — geometric
        "pulse-ring",                // reuse the pulse animation from globals.css
        height,
        width,
        className,
      )}
      {...props}
    />
  );
}