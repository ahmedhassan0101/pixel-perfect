/**
 * SectionHeader.tsx
 *
 * Philosophical Reasoning:
 * Every section of the portfolio is a chapter. The SectionHeader is the
 * chapter heading — it establishes context before the content speaks.
 * The pattern is always the same: a small gold mono label (the index,
 * the category), then the large Fraunces headline (the human voice),
 * then an optional Geist body (the precise explanation), then a 32px
 * gold line (the accent mark — used sparingly, never decoratively).
 *
 * The consistency of this pattern across sections creates rhythm.
 * Rhythm creates trust. Trust creates the feeling that a deliberate
 * human — not a template — assembled this.
 *
 * The "em" italic in Fraunces is the warmth injection. A single word
 * in italic gold inside a weight-300 headline creates cinematic tension
 * without breaking the structural identity.
 */

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small mono label above headline — e.g. "§ 01 — SELECTED WORK" */
  label: string;
  /** Optional section index prefix — e.g. "01" */
  index?: string;
  /** Large Fraunces headline */
  headline: React.ReactNode;
  /** Optional body copy in Geist light */
  body?: string;
  /** Show the 32px gold accent line below */
  accentLine?: boolean;
  /** Alignment — default is start (left in LTR) */
  align?: "start" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  index,
  headline,
  body,
  accentLine = true,
  align = "start",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {/* ── Small gold label ──────────────────────────────── */}
      <p className="text-label text-gold flex items-center gap-2 mb-6">
        <span aria-hidden="true">§</span>
        {index && (
          <>
            <span>{index}</span>
            <span aria-hidden="true">—</span>
          </>
        )}
        <span>{label}</span>
      </p>

      {/* ── Fraunces headline ─────────────────────────────── */}
      {/* Accepts ReactNode so callers can inject <em className="text-em"> */}
      <h2 className="text-heading text-text mb-0">{headline}</h2>

      {/* ── 32px gold accent line ─────────────────────────── */}
      {accentLine && (
        <span
          aria-hidden="true"
          className="block w-8 h-px bg-gold mt-6 mb-0"
        />
      )}

      {/* ── Optional body copy ────────────────────────────── */}
      {body && (
        <p
          className={cn(
            "text-body text-muted mt-6",
            centered ? "max-w-prose" : "max-w-[52ch]",
          )}
        >
          {body}
        </p>
      )}
    </header>
  );
}