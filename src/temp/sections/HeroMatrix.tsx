// src/components/sections/HeroMatrix.tsx
// Hero Variation 1 — "The Code Matrix"
//
// Philosophy: The terminal as canvas. Every element is a data point.
// Left column: massive fluid display type — the primary statement.
// Right column: structured metadata panel — role, status, stats, terminal block.
// The asymmetry (70/30) creates editorial tension without decoration.
//
// Server Component — all content is static, zero client JS.
// Availability badge pulses via CSS keyframes (no JS).

import { getTranslations } from "next-intl/server";
import type { Locale } from "@/temp/i18n/routing";
import { Button } from "@/temp/atoms/Button";
import { Badge } from "@/temp/atoms/Badge";
import { AppLink } from "@/temp/atoms/AppLink";
import { ArrowRight, ArrowDown } from "lucide-react";

interface HeroMatrixProps {
  locale: Locale;
}

export async function HeroMatrix({ locale }: HeroMatrixProps) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  const stats = [
    { value: t("years_exp"), label: t("years_label") },
    { value: t("projects_count"), label: t("projects_label") },
  ] as const;

  const terminalLines = [
    { prompt: "~", cmd: `whoami`, out: t("terminal_role") },
    { prompt: "~", cmd: `location`, out: t("terminal_location") },
    { prompt: "~", cmd: `availability`, out: t("terminal_status") },
  ] as const;

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-3.75rem)] border-b border-border flex flex-col"
    >
      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-gutter sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] min-h-[inherit]">
          {/* ── Left: Display headline ──────────────────────────────────── */}
          <div className="flex flex-col justify-center py-section border-e-0 lg:border-e border-border pe-0 lg:pe-12">
            {/* Availability badge */}
            <div className="flex items-center gap-2.5 mb-10">
              {/* CSS pulsing dot — no JS */}
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground">
                {t("available")}
              </span>
            </div>

            {/* Display headline — two lines, each with own weight */}
            <h1 className="mb-8">
              <span className="block text-display text-foreground leading-[1.02] tracking-[-0.03em]">
                {t("headline_1")}
              </span>
              <span className="block text-display text-muted-foreground leading-[1.02] tracking-[-0.03em]">
                {t("headline_2")}
              </span>
            </h1>

            {/* 1px accent divider — 32px wide */}
            <span className="block w-8 h-px bg-accent-warm mb-8" aria-hidden />

            {/* Sub-headline */}
            <p className="text-body text-muted-foreground max-w-[52ch] mb-12 leading-relaxed">
              {t("subheadline")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
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

          {/* ── Right: Metadata panel ───────────────────────────────────── */}
          <div className="hidden lg:flex flex-col justify-between py-section ps-10">
            {/* Role + index */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                {t("version")}
              </p>
              <p className="font-mono text-xs text-foreground mb-1">
                {t("role")}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">
                {t("coordinates")}
              </p>
            </div>

            {/* Stats grid */}
            <div className="flex flex-col gap-0 border border-border">
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={cn(
                    "px-4 py-5",
                    i < stats.length - 1 && "border-b border-border",
                  )}
                >
                  <p className="text-heading text-foreground">{value}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Terminal block */}
            <div className="bg-code-bg border border-border overflow-hidden">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/40">
                <span
                  className="w-2 h-2 rounded-full bg-border/60"
                  aria-hidden
                />
                <span
                  className="w-2 h-2 rounded-full bg-border/60"
                  aria-hidden
                />
                <span
                  className="w-2 h-2 rounded-full bg-border/60"
                  aria-hidden
                />
                <span className="font-mono text-[9px] text-code-text/40 ms-2 uppercase tracking-wider">
                  bash
                </span>
              </div>
              {/* Lines */}
              <div className="px-3 py-3 flex flex-col gap-2">
                {terminalLines.map(({ prompt, cmd, out }) => (
                  <div key={cmd}>
                    <p className="font-mono text-[10px] leading-relaxed">
                      <span className="text-accent-warm">{prompt} $</span>{" "}
                      <span className="text-code-text">{cmd}</span>
                    </p>
                    <p className="font-mono text-[10px] text-code-text/60 ps-4 leading-relaxed">
                      {out}
                    </p>
                  </div>
                ))}
                {/* Blinking cursor */}
                <p className="font-mono text-[10px] text-accent-warm">
                  ~ ${" "}
                  <span
                    className="cursor-blink inline-block w-1.5 h-3 bg-accent-warm align-middle"
                    aria-hidden
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator — bottom of section ───────────────────────── */}
      <div className="max-w-[1200px] mx-auto w-full px-gutter sm:px-8 border-t border-border">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <ArrowDown
              size={11}
              className="text-muted-foreground"
              aria-hidden
            />
            <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
              {t("scroll")}
            </span>
          </div>
          <Badge variant="outline" size="sm">
            {t("status_open")}
          </Badge>
        </div>
      </div>
    </section>
  );
}

// Utility — cn would be imported from @/lib/utils in the real project
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
