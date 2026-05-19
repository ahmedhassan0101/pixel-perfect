// src/components/sections/HeroBlueprint.tsx
// Hero Variation 3 — "The Blueprint UI"
//
// Philosophy: The engineering drawing as interface.
// The background is a precise CSS grid pattern (SVG, inline, no external file).
// Content is positioned within a coordinate system — every element
// has an X/Y reference marker, like a schematic diagram.
// The headline is massive — it bleeds beyond the normal grid.
//
// "Interactive" element: a CSS :hover group on the CTA area reveals
// a crosshair-style annotation box around the button — pure CSS, zero JS.
//
// Server Component. Background SVG pattern injected via Tailwind bg utilities
// mapped from CSS variables. No JavaScript for the grid — it's declarative.

import { getTranslations } from "next-intl/server";
import type { Locale } from "@/temp/i18n/routing";
import { Button } from "@/temp/atoms/Button";
import { Badge } from "@/temp/atoms/Badge";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroBlueprintProps {
  locale: Locale;
}

export async function HeroBlueprint({ locale }: HeroBlueprintProps) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-3.75rem)] border-b border-border overflow-hidden"
    >
      {/* ── Blueprint grid background — SVG pattern via CSS ───────────── */}
      {/* Rendered as a positioned SVG element, not a background-image.   */}
      {/* This keeps it accessible and avoids base64 data URIs.           */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          {/* Fine grid — 32px cells */}
          <pattern
            id="fine-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.4"
              opacity="0.6"
            />
          </pattern>
          {/* Coarse grid overlay — 128px cells */}
          <pattern
            id="coarse-grid"
            width="128"
            height="128"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 128 0 L 0 0 0 128"
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.8"
              opacity="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fine-grid)" />
        <rect width="100%" height="100%" fill="url(#coarse-grid)" />
        {/* Corner registration marks */}
        {[
          { x: 24, y: 24 },
          { x: "calc(100% - 24)", y: 24 },
          { x: 24, y: "calc(100% - 24)" },
          { x: "calc(100% - 24)", y: "calc(100% - 24)" },
        ].map((pos, i) => (
          <g key={i} transform={`translate(0,0)`}>
            <line
              x1={pos.x}
              y1={pos.y}
              x2={
                typeof pos.x === "number"
                  ? pos.x + 12
                  : `calc(${pos.x.toString().replace("calc(", "").replace(")", "")} + 12px)`
              }
              y2={pos.y}
              stroke="var(--color-accent-raw)"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={pos.x}
              y1={pos.y}
              x2={pos.x}
              y2={
                typeof pos.y === "number"
                  ? pos.y + 12
                  : `calc(${pos.y.toString().replace("calc(", "").replace(")", "")} + 12px)`
              }
              stroke="var(--color-accent-raw)"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        ))}
      </svg>

      {/* ── Content layer — sits above the grid ────────────────────────── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-gutter sm:px-8 h-full">
        <div className="flex flex-col justify-center min-h-[calc(100vh-3.75rem)] py-section">
          {/* Coordinate label row */}
          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              {/* Coordinate cross marker */}
              <span
                className="relative w-4 h-4 flex items-center justify-center"
                aria-hidden
              >
                <span className="absolute w-full h-px bg-accent-warm/60" />
                <span className="absolute w-px h-full bg-accent-warm/60" />
                <span className="absolute w-1.5 h-1.5 rounded-full border border-accent-warm bg-background" />
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                X:0000 · Y:0000
              </span>
            </div>
            <span className="w-px h-3 bg-border" aria-hidden />
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                {t("available")}
              </span>
            </div>
          </div>

          {/* Massive display headline — breaks the grid intentionally */}
          <div className="mb-8">
            {/* Section annotation — like a blueprint callout */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-accent-warm">
                § 01
              </span>
              <span className="w-8 h-px bg-accent-warm/50" aria-hidden />
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                {t("role")}
              </span>
            </div>

            <h1>
              <span className="block text-display text-foreground leading-[0.96] tracking-[-0.035em]">
                {t("headline_1")}
              </span>
              <span
                className="block text-display leading-[0.96] tracking-[-0.035em]"
                style={{
                  WebkitTextStroke: "1px var(--color-border-raw)",
                  color: "transparent",
                }}
              >
                {t("headline_2")}
              </span>
            </h1>
          </div>

          {/* Sub-grid: sub-headline + CTAs — two columns */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end mb-12">
            <div>
              <span
                className="block w-8 h-px bg-accent-warm mb-5"
                aria-hidden
              />
              <p className="text-body text-muted-foreground max-w-[46ch] leading-relaxed">
                {t("subheadline")}
              </p>
            </div>

            {/* CTAs with blueprint annotation frame on hover */}
            <div className="blueprint-cta-group relative flex flex-col gap-3">
              {/* Annotation corner marks — visible on group hover via CSS */}
              <span
                className="blueprint-corner blueprint-corner-tl"
                aria-hidden
              />
              <span
                className="blueprint-corner blueprint-corner-tr"
                aria-hidden
              />
              <span
                className="blueprint-corner blueprint-corner-bl"
                aria-hidden
              />
              <span
                className="blueprint-corner blueprint-corner-br"
                aria-hidden
              />

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
          </div>

          {/* Bottom metadata strip */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
                {t("stack_label")}:
              </span>
              <span className="font-mono text-[9px] tracking-widest text-foreground">
                Next.js · Node.js · React · TypeScript
              </span>
            </div>
            <span className="hidden md:block w-px h-3 bg-border" aria-hidden />
            <Badge variant="outline">{t("status_open")}</Badge>
            <span className="hidden md:block w-px h-3 bg-border" aria-hidden />
            <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
              {t("coordinates")}
            </span>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator — absolute bottom-right ─────────────────────── */}
      <div className="absolute bottom-0 end-8 flex flex-col items-center gap-2 pb-6">
        <span
          className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground"
          style={{ writingMode: "vertical-lr" }}
        >
          {t("scroll")}
        </span>
        <ArrowDown size={11} className="text-muted-foreground" aria-hidden />
      </div>
    </section>
  );
}
