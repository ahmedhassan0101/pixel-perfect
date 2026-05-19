// src/components/layout/Container.tsx
// Atomic position: layout atom — the universal horizontal constraint.
//
// Responsibilities:
//   - max-width: --spacing-layout (1200px equivalent via Tailwind)
//   - Fluid horizontal padding: px-gutter on mobile, wider on desktop
//   - Always centered: mx-auto
//   - No vertical spacing — that is Section's job
//
// Usage:
//   <Container>...</Container>
//   <Container as="section" narrow>...</Container>

import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Polymorphic — render as any block element */
  as?: ElementType;
  /** Narrow = prose width for text-heavy sections */
  narrow?: boolean;
}

export function Container({
  as: Tag = "div",
  narrow = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        // Horizontal padding — logical, fluid
        "px-gutter sm:px-8 lg:px-12",
        // Max width
        narrow
          ? "max-w-[72ch]" // prose column
          : "max-w-[1200px]", // full layout
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// src/components/layout/Section.tsx
// Atomic position: layout molecule — composes Container inside a <section>.
//
// Responsibilities:
//   - Vertical padding: py-section (6rem) or py-section-sm (3.5rem)
//   - Optional top border (editorial section separator)
//   - Optional SectionLabel rendered above content
//   - Wraps content in Container automatically
// ─────────────────────────────────────────────────────────────────────────────

import type { HTMLAttributes as SectionHTMLAttributes } from "react";
import { SectionLabel } from "./atoms/Separator";
// import { SectionLabel } from "@/components/atoms/Primitives";

export interface SectionProps extends SectionHTMLAttributes<HTMLElement> {
  /** Renders the amber § label above content */
  label?: string;
  /** Index prefix for the label: "01", "02" */
  labelIndex?: string;
  /** Compact vertical padding */
  compact?: boolean;
  /** Adds 1px border-top (Separator) */
  bordered?: boolean;
  /** Narrow prose layout */
  narrow?: boolean;
}

export function Section({
  label,
  labelIndex,
  compact = false,
  bordered = false,
  narrow = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        compact ? "py-section-sm" : "py-section",
        bordered && "border-t border-border",
        className,
      )}
      {...props}
    >
      <Container narrow={narrow}>
        {label && (
          <SectionLabel index={labelIndex} className="mb-8">
            {label}
          </SectionLabel>
        )}
        {children}
      </Container>
    </section>
  );
}
