/**
 * StackSection.tsx — Server Component
 *
 * Exports two independent variations:
 *
 * StackTableVariation  → Data table: category rows, tools as structured data.
 *                        Reads like a technical specification.
 *                        Progress bars show relative proficiency.
 *
 * StackGridVariation   → Categorized cards with Lucide icons.
 *                        More approachable, warmer, slightly more common.
 *
 * Both read from the same stack.json data.
 * Choose one, import it into page.tsx as <StackSection />.
 *
 * Usage:
 *   // In page.tsx — pick one:
 *   import { StackTableVariation as StackSection } from "@/components/sections/StackSection";
 *   import { StackGridVariation  as StackSection } from "@/components/sections/StackSection";
 */

import stackData from "@/data/stack.json";
import {
  Globe, Server, Database, Cloud, Wrench,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────

interface Tool {
  name:  string;
  level: number;
  note:  string;
}

interface StackCategory {
  category: string;
  index:    string;
  tools:    Tool[];
}

const stack = stackData as StackCategory[];

// ── Icon map ──────────────────────────────────────────────────

const ICONS: Record<string, React.ElementType> = {
  Frontend:       Globe,
  Backend:        Server,
  Database:       Database,
  Infrastructure: Cloud,
  Tooling:        Wrench,
};

// ── Shared section header ─────────────────────────────────────

function SectionHeader({ variation }: { variation: "A" | "B" }) {
  return (
    <header className="mb-16">
      <p className="text-label text-gold flex items-center gap-2 mb-6">
        <span aria-hidden="true">§</span>
        <span>04</span>
        <span aria-hidden="true">—</span>
        <span>The Architecture</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        <h2 className="text-heading text-text">
          Tools I reach for
          <br />
          <em style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
            by instinct.
          </em>
        </h2>
        <p className="text-body text-muted max-w-[44ch] lg:pb-1">
          {variation === "A"
            ? "Every row is a deliberate choice. Every percentage is honest."
            : "Five layers. Each one chosen after something broke without it."
          }
        </p>
      </div>

      <span aria-hidden="true" className="block w-8 h-px bg-gold mt-8" />
    </header>
  );
}


/* ═══════════════════════════════════════════════════════════════
   VARIATION A — DATA TABLE
   ═══════════════════════════════════════════════════════════════ */

/**
 * StackTableVariation
 *
 * Each category is a full-width row with a left label column.
 * Tools render inline with a 1px progress bar showing level.
 * The bar is amber — the only color element in this view.
 *
 * The table reads top-to-bottom like a technical specification.
 * Hover on a tool row shifts the border — minimal, intentional.
 */
export function StackTableVariation() {
  return (
    <section
      id="stack"
      className="section-padding border-b border-border"
      aria-label="Technical stack"
    >
      <div className="container-content">
        <SectionHeader variation="A" />

        {/* ── Table ───────────────────────────────────────── */}
        <div className="border border-border">
          {stack.map((cat, catIdx) => (
            <div
              key={cat.category}
              className={catIdx > 0 ? "border-t border-border" : ""}
            >
              {/* Category row */}
              <div className="grid grid-cols-[140px_1fr] lg:grid-cols-[200px_1fr]">

                {/* Left: category label */}
                <div className="
                  border-e border-border
                  bg-surface
                  px-5 py-6
                  flex flex-col justify-between
                ">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-label text-ghost">{cat.index}</span>
                  </div>
                  <p className="text-label text-text">{cat.category}</p>
                </div>

                {/* Right: tools */}
                <div className="flex flex-col">
                  {cat.tools.map((tool, toolIdx) => (
                    <div
                      key={tool.name}
                      className={`
                        group
                        grid grid-cols-[1fr_60px]
                        px-6 py-4
                        transition-base
                        hover:bg-surface
                        ${toolIdx > 0 ? "border-t border-border" : ""}
                      `}
                    >
                      {/* Tool name + note */}
                      <div className="flex items-center gap-4">
                        <span className="text-body text-text w-28 shrink-0">
                          {tool.name}
                        </span>

                        {/* Progress bar */}
                        <div className="flex-1 flex items-center gap-3">
                          <div className="flex-1 h-px bg-border relative overflow-hidden">
                            <div
                              className="absolute inset-y-0 start-0 bg-gold"
                              style={{ width: `${tool.level}%` }}
                              aria-label={`${tool.level}% proficiency`}
                            />
                          </div>
                          <span className="text-label text-ghost w-8 text-right shrink-0">
                            {tool.level}
                          </span>
                        </div>
                      </div>

                      {/* Note — appears on hover */}
                      <span className="
                        text-label text-ghost text-right
                        opacity-0 group-hover:opacity-100
                        transition-base
                        hidden lg:block
                      ">
                        {/* spacer */}
                      </span>
                    </div>
                  ))}

                  {/* Note row — shows on any hover inside category */}
                  <div className="border-t border-border px-6 py-2 flex flex-wrap gap-3">
                    {cat.tools.map((tool) => (
                      <span key={tool.name} className="text-label text-ghost">
                        {tool.name}: {tool.note}
                        <span className="text-border mx-2">·</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Summary row ──────────────────────────────────── */}
        <div className="
          mt-0 border-x border-b border-border
          grid grid-cols-2 sm:grid-cols-5
          divide-x divide-border
        ">
          {stack.map((cat) => (
            <div key={cat.category} className="px-4 py-4 text-center">
              <p className="text-heading text-text leading-none mb-1">
                {cat.tools.length}
              </p>
              <p className="text-label text-ghost">{cat.category}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════
   VARIATION B — CATEGORIZED GRID
   ═══════════════════════════════════════════════════════════════ */

/**
 * StackGridVariation
 *
 * Five cards in a responsive grid — one per category.
 * Each card has a Lucide icon (sized to 20px, color: gold on hover).
 * Tools listed as tags inside each card.
 * The proficiency bar runs horizontally at the bottom of each tag.
 *
 * Warmer and more approachable than the table.
 * Better for audiences who scan rather than read.
 */
export function StackGridVariation() {
  return (
    <section
      id="stack"
      className="section-padding border-b border-border"
      aria-label="Technical stack"
    >
      <div className="container-content">
        <SectionHeader variation="B" />

        {/* ── Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {stack.map((cat) => {
            const Icon = ICONS[cat.category] ?? Wrench;

            return (
              <div
                key={cat.category}
                className="
                  bg-bg hover:bg-surface
                  transition-base
                  p-6
                  flex flex-col gap-5
                  group
                "
              >
                {/* Card header: icon + index + category */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="
                      w-8 h-8 flex items-center justify-center
                      border border-border
                      group-hover:border-border-em
                      transition-base
                    ">
                      <Icon
                        size={14}
                        className="text-ghost group-hover:text-gold transition-base"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-label text-text">{cat.category}</span>
                  </div>
                  <span className="text-label text-ghost">{cat.index}</span>
                </div>

                {/* Divider */}
                <span className="
                  block w-full h-px bg-border
                  group-hover:bg-border-em transition-base
                " />

                {/* Tools */}
                <div className="flex flex-col gap-3 flex-1">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="flex flex-col gap-1.5">

                      {/* Tool name + level */}
                      <div className="flex items-center justify-between">
                        <span className="text-body text-text">{tool.name}</span>
                        <span className="text-label text-ghost">{tool.level}%</span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-px bg-border">
                        <div
                          className="h-full bg-gold"
                          style={{ width: `${tool.level}%` }}
                          aria-label={`${tool.level}% proficiency in ${tool.name}`}
                          role="meter"
                          aria-valuenow={tool.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>

                      {/* Note */}
                      <p className="text-label text-ghost">{tool.note}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <span className="
                  block w-0 h-px bg-gold
                  group-hover:w-8 transition-all duration-300
                " style={{ transitionTimingFunction: "cubic-bezier(0.25,0,0,1)" }} />

              </div>
            );
          })}

          {/* Sixth cell — summary / total count */}
          <div className="bg-bg p-6 flex flex-col justify-between">
            <p className="text-label text-ghost mb-6">Total tools</p>
            <div className="flex flex-col gap-3">
              {stack.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <span className="text-label text-muted">{cat.category}</span>
                  <span className="text-label text-gold">{cat.tools.length}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-heading text-text leading-none">
                {stack.reduce((sum, c) => sum + c.tools.length, 0)}
              </p>
              <p className="text-label text-ghost mt-1">Tools total</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}