// src/components/sections/HeroDesk.tsx
// Hero Variation 2 — "The Architect's Desk"
//
// Philosophy: The drawing board as identity. A portrait — grayscale,
// high-contrast — anchors the layout. The human behind the systems.
// Left: structured metadata column. Right: full-bleed image.
// Bottom: infinite scrolling ticker of stack technologies.
//
// Image treatment: CSS filter grayscale(100%) contrast(110%) on the
// <img> element — no Tailwind filter utilities needed, pure CSS vars.
// The image slot shows a placeholder grid when no src is provided.
//
// The ticker uses CSS animation — no JS scroll library.
// Server Component — ticker content is static strings.

import { getTranslations } from "next-intl/server";
import type { Locale } from "@/temp/i18n/routing";
import { Button } from "@/temp/atoms/Button";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroDeskProps {
  locale: Locale;
  /** Optional portrait image URL — shows architectural placeholder if omitted */
  imageSrc?: string;
}

const STACK_ITEMS = [
  "Next.js",
  "·",
  "Node.js",
  "·",
  "React",
  "·",
  "TypeScript",
  "·",
  "MongoDB",
  "·",
  "Tailwind",
  "·",
  "REST API",
  "·",
  "Vercel",
  "·",
  "Docker",
  "·",
  "Git",
  "·",
];

export async function HeroDesk({ locale, imageSrc }: HeroDeskProps) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-3.75rem)] border-b border-border flex flex-col"
    >
      {/* ── Main split grid ─────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-[1200px] mx-auto w-full px-gutter sm:px-8">
        {/* ── Left: Content column ───────────────────────────────────────── */}
        <div className="flex flex-col justify-center py-section pe-0 lg:pe-16 border-e-0 lg:border-e border-border">
          {/* Availability */}
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              {t("available")}
            </span>
          </div>

          {/* Role label */}
          <p className="font-mono text-xs tracking-widest uppercase text-accent-warm mb-4">
            {t("role")}
          </p>

          {/* Headline */}
          <h1 className="mb-6">
            <span className="block text-heading text-foreground leading-[1.1] tracking-[-0.025em]">
              {t("headline_1")}
            </span>
            <span className="block text-heading text-muted-foreground leading-[1.1] tracking-[-0.025em]">
              {t("headline_2")}
            </span>
          </h1>

          <span className="block w-8 h-px bg-accent-warm mb-6" aria-hidden />

          <p className="text-body text-muted-foreground max-w-[44ch] mb-10 leading-relaxed">
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              variant="primary"
              size="lg"
              iconEnd={<ArrowRight size={15} />}
            >
              {t("cta_primary")}
            </Button>
            <Button variant="outline" size="lg">
              {t("cta_secondary")}
            </Button>
          </div>

          {/* Stat row */}
          <div className="flex items-center gap-8 pt-8 border-t border-border">
            <div>
              <p className="text-subheading font-medium text-foreground leading-none mb-1">
                {t("years_exp")}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                {t("years_label")}
              </p>
            </div>
            <span className="w-px h-8 bg-border" aria-hidden />
            <div>
              <p className="text-subheading font-medium text-foreground leading-none mb-1">
                {t("projects_count")}
              </p>
              <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                {t("projects_label")}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Portrait image ──────────────────────────────────────── */}
        <div className="hidden lg:flex items-center justify-center ps-16 py-section">
          <div className="relative w-full max-w-[340px] aspect-[3/4]">
            {/* Offset border frame — editorial photograph treatment */}
            <span
              className="absolute inset-0 translate-x-3 translate-y-3 border border-accent-warm/30"
              aria-hidden
            />

            {imageSrc ? (
              // Portrait with editorial filter treatment
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt="Portrait"
                className="relative w-full h-full object-cover object-top"
                style={{
                  filter: "grayscale(100%) contrast(1.1) brightness(0.95)",
                }}
                loading="eager"
              />
            ) : (
              // Architectural placeholder — blueprint grid pattern
              <div className="relative w-full h-full bg-surface border border-border flex items-center justify-center overflow-hidden">
                {/* Blueprint grid lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <defs>
                    <pattern
                      id="blueprint-grid"
                      width="24"
                      height="24"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 24 0 L 0 0 0 24"
                        fill="none"
                        stroke="var(--border)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#blueprint-grid)"
                  />
                </svg>
                {/* Center mark */}
                <div className="relative flex flex-col items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    Portrait
                  </span>
                  <span className="block w-6 h-px bg-accent-warm" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    1:1 · 400 × 533px
                  </span>
                </div>
              </div>
            )}

            {/* Coordinate overlay — bottom corner */}
            <div className="absolute bottom-0 start-0 end-0 bg-code-bg/90 px-3 py-2">
              <p className="font-mono text-[9px] tracking-widest text-code-text/70 uppercase">
                {t("coordinates")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stack ticker — full width, borderless infinite scroll ────────── */}
      <div className="border-t border-border overflow-hidden">
        <div className="stack-ticker flex items-center gap-8 py-3 whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          {[...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span
              key={i}
              className={
                item === "·"
                  ? "text-accent-warm font-mono text-xs"
                  : "font-mono text-[10px] tracking-widest uppercase text-muted-foreground"
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
