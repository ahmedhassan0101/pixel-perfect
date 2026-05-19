// src/components/dev/DesignSystemShowcase.tsx
// ─────────────────────────────────────────────────────────────
// DEV ONLY — delete before production.
//
// Every className here maps to a class defined in globals.css.
// No inline styles. No hardcoded colors. No Tailwind utilities
// outside what we defined. This file proves the system works.
// ─────────────────────────────────────────────────────────────

import { ArrowRight, FolderGit2, ExternalLink } from "lucide-react";
// <FolderGit2 />
// ── Section wrapper ───────────────────────────────────────────
function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-padding-sm border-t border-border">
      <div className="container-content">
        {/* Section label — our pattern from instructions */}
        <p className="text-label text-gold mb-6 flex items-center gap-3">
          <span aria-hidden>§</span>
          <span>{index}</span>
          <span aria-hidden>—</span>
          <span>{title}</span>
        </p>
        {children}
      </div>
    </section>
  );
}

// ── Token row ─────────────────────────────────────────────────
function TokenRow({
  name,
  value,
  children,
}: {
  name: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-6 py-4 border-b border-border">
      <div className="flex-1">{children}</div>
      <div className="text-right hidden sm:block">
        <p className="text-label text-muted">{name}</p>
        <p className="text-label text-ghost mt-1">{value}</p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function DesignSystemShowcase() {
  return (
    <div className="bg-bg text-text min-h-screen">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="section-padding-sm border-b border-border">
        <div className="container-content">
          <p className="text-label text-gold mb-4">
            Dev Only · Remove before production
          </p>
          <h1 className="text-display mb-6">
            Design System
            <br />
            <em className="text-em">Reference.</em>
          </h1>
          <p className="text-body text-muted max-w-prose">
            Every token, every class, every rule from{" "}
            <span className="text-mono text-gold">globals.css</span> — rendered
            live in your project.
          </p>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          01 · COLOR PALETTE
      ══════════════════════════════════════════════════════ */}
      <Section index="01" title="Color Palette">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
          {/* Each swatch: the color block + token name + hex */}
          {[
            {
              cls: "bg-bg",
              name: "--bg",
              hex: "#0F0E0C",
              role: "Background primary",
            },
            {
              cls: "bg-surface",
              name: "--surface",
              hex: "#1A1916",
              role: "Cards · panels",
            },
            {
              cls: "bg-elevated",
              name: "--elevated",
              hex: "#242220",
              role: "Code blocks",
            },
            {
              cls: "bg-border",
              name: "--border-default",
              hex: "#2C2926",
              role: "Structural only",
            },
            {
              cls: "bg-border-em",
              name: "--border-emphasis",
              hex: "#3D3830",
              role: "Hover · active",
            },
            {
              cls: "bg-text",
              name: "--text-primary",
              hex: "#F0ECE4",
              role: "15.3:1 contrast ✓",
            },
            {
              cls: "bg-muted",
              name: "--text-secondary",
              hex: "#8A8278",
              role: "4.6:1 contrast ✓",
            },
            {
              cls: "bg-ghost",
              name: "--text-tertiary",
              hex: "#4A4540",
              role: "Decorative only",
            },
            {
              cls: "bg-gold",
              name: "--accent-gold",
              hex: "#C8A060",
              role: "The only warm color",
            },
            {
              cls: "bg-gold-hover",
              name: "--accent-hover",
              hex: "#D4AE72",
              role: "Interaction state",
            },
            {
              cls: "bg-code-bg",
              name: "--code-surface",
              hex: "#141310",
              role: "Deepest black",
            },
            {
              cls: "bg-code-text",
              name: "--code-text",
              hex: "#E8E0D0",
              role: "Warmer than body",
            },
          ].map(({ cls, name, hex, role }) => (
            <div key={name} className="bg-bg p-4">
              {/* The color swatch itself — uses our bg-* classes */}
              <div
                className={`${cls} h-14 rounded-none mb-3 border border-border`}
              />
              <p className="text-label text-text mb-1">{name}</p>
              <p className="text-label text-ghost">{hex}</p>
              <p className="text-label text-muted mt-1">{role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          02 · TYPOGRAPHY SCALE
      ══════════════════════════════════════════════════════ */}
      <Section index="02" title="Typography Scale">
        <TokenRow
          name=".text-display"
          value="clamp(3.5rem, 9vw, 8rem) · Fraunces 300 · lh 0.94"
        >
          <p className="text-display">
            I build things
            <br />
            <em className="text-em">that outlast.</em>
          </p>
        </TokenRow>

        <TokenRow
          name=".text-heading"
          value="clamp(2rem, 5vw, 4rem) · Fraunces 300 · lh 1.05"
        >
          <p className="text-heading">Selected Work</p>
        </TokenRow>

        <TokenRow
          name=".text-subheading"
          value="clamp(1.1rem, 2.5vw, 1.6rem) · Geist 300 · lh 1.4"
        >
          <p className="text-subheading">
            Full-Stack Engineer building end-to-end systems.
          </p>
        </TokenRow>

        <TokenRow name=".text-body" value="1rem · Geist 300 · lh 1.75">
          <p className="text-body text-muted max-w-prose">
            Building end-to-end products with Node.js, Next.js, and React — from
            database schema to the pixel you see right now.
          </p>
        </TokenRow>

        <TokenRow
          name=".text-caption"
          value="0.8125rem · Geist Mono · uppercase · tracking 0.1em"
        >
          <p className="text-caption">
            § 01 — Selected Work · Next.js · Node.js · React
          </p>
        </TokenRow>

        <TokenRow
          name=".text-label"
          value="0.6875rem · Geist Mono · uppercase · tracking 0.15em"
        >
          <p className="text-label text-gold">Available for new projects</p>
        </TokenRow>

        <TokenRow name=".text-mono" value="0.875rem · Geist Mono · lh 1.65">
          <p className="text-mono text-code-text bg-code-bg px-3 py-2 inline-block">
            const handler = async (req) =&gt; {"{}"}
          </p>
        </TokenRow>
      </Section>

      {/* ══════════════════════════════════════════════════════
          03 · BUTTONS
      ══════════════════════════════════════════════════════ */}
      <Section index="03" title="Buttons">
        <div className="flex flex-wrap gap-4 items-center mb-8">
          {/* Primary — bg-text text-bg */}
          <button
            className="
            bg-text text-bg
            border border-text
            rounded-default
            text-label tracking-widest uppercase
            px-6 py-2.5
            transition-base
            hover:opacity-85
            flex items-center gap-2
          "
          >
            View the Work
            <ArrowRight size={14} aria-hidden />
          </button>

          {/* Outline — transparent, border-border */}
          <button
            className="
            bg-transparent text-muted
            border border-border
            rounded-default
            text-label tracking-widest uppercase
            px-6 py-2.5
            transition-base
            hover:border-border-em hover:text-text
          "
          >
            Let&apos;s Talk
          </button>

          {/* Ghost — no border, underline on hover */}
          <button
            className="
            bg-transparent text-muted
            border border-transparent
            rounded-default
            text-label tracking-widest uppercase
            px-6 py-2.5
            transition-base
            hover:text-text hover:underline-gold
            flex items-center gap-2
          "
          >
            <FolderGit2 size={14} aria-hidden />
            FolderGit2
          </button>
        </div>

        {/* Small variant */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-label text-ghost">Small (sm):</span>
          <button
            className="
            bg-text text-bg
            border border-text
            rounded-default
            text-label tracking-widest uppercase
            px-4 py-2
            transition-base hover:opacity-85
          "
          >
            Download CV
          </button>
          <button
            className="
            bg-transparent text-muted
            border border-border
            rounded-default
            text-label tracking-widest uppercase
            px-4 py-2
            transition-base hover:border-border-em hover:text-text
          "
          >
            Contact
          </button>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          04 · LINKS & INTERACTION
      ══════════════════════════════════════════════════════ */}
      <Section index="04" title="Links & Interaction">
        <div className="flex flex-col gap-5">
          {/* underline-gold — always visible */}
          <div>
            <p className="text-label text-ghost mb-3">
              .underline-gold — always visible
            </p>
            <a
              href="#"
              className="text-body underline-gold transition-base hover:text-gold"
            >
              View case study
            </a>
          </div>

          {/* hover:underline-gold — reveals on hover */}
          <div>
            <p className="text-label text-ghost mb-3">
              .hover:underline-gold — revealed on hover
            </p>
            <a
              href="#"
              className="text-body text-muted transition-base hover:text-text hover:underline-gold flex items-center gap-1.5"
            >
              Open live project
              <ExternalLink size={13} aria-hidden />
            </a>
          </div>

          {/* img-cinematic filter */}
          <div>
            <p className="text-label text-ghost mb-3">
              .img-cinematic — grayscale rest, full saturation on hover
            </p>
            <div className="w-48 h-28 bg-surface border border-border flex items-center justify-center img-cinematic">
              <p className="text-caption">Hover this image</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          05 · CARDS
      ══════════════════════════════════════════════════════ */}
      <Section index="05" title="Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Default card — hover shifts border to border-em */}
          <div
            className="
            bg-surface border border-border rounded-card p-6
            transition-base hover:border-border-em
          "
          >
            <p className="text-label text-gold mb-4">§ PROJECT</p>
            <h3 className="text-heading mb-3">SaaS Platform</h3>
            <p className="text-body text-muted">
              Real-time dashboard with role-based access.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="text-label border border-border rounded-default px-2 py-1">
                Next.js
              </span>
              <span className="text-label border border-border rounded-default px-2 py-1">
                MongoDB
              </span>
            </div>
          </div>

          {/* Elevated card — the one shadow in the system */}
          <div
            className="bg-surface border border-border rounded-card p-6"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-label text-gold mb-4">§ FEATURED</p>
            <h3 className="text-heading mb-3">E-Commerce API</h3>
            <p className="text-body text-muted">
              Full REST API with JWT auth and Stripe integration.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="text-label border border-border rounded-default px-2 py-1">
                Node.js
              </span>
              <span className="text-label border border-border rounded-default px-2 py-1">
                REST
              </span>
            </div>
          </div>

          {/* Stats info card */}
          <div className="bg-surface border border-border rounded-card p-6">
            <p className="text-label text-gold mb-6">§ STATISTICS</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "3+", label: "Years" },
                { val: "24+", label: "Projects" },
                { val: "480", label: "Problems" },
                { val: "100", label: "Lighthouse" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-heading text-text">{val}</p>
                  <p className="text-label text-muted mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          06 · BADGES & AVAILABILITY
      ══════════════════════════════════════════════════════ */}
      <Section index="06" title="Badges & Tags">
        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "Next.js",
            "TypeScript",
            "Node.js",
            "React",
            "MongoDB",
            "Tailwind v4",
          ].map((tag) => (
            <span
              key={tag}
              className="text-label text-muted border border-border rounded-default px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Availability badge — pill shape, pulse dot */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center gap-3 border border-gold text-gold text-label px-4 py-2"
            style={{ borderRadius: "9999px" }} // rounded-pill
          >
            {/* Pulse dot — CSS animation from globals.css */}
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects
          </div>
        </div>

        {/* Status tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-label border border-gold text-gold rounded-default px-2 py-1">
            Live
          </span>
          <span className="text-label border border-border text-muted rounded-default px-2 py-1">
            In Progress
          </span>
          <span className="text-label border border-border text-ghost rounded-default px-2 py-1">
            Archived
          </span>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          07 · CODE BLOCK
      ══════════════════════════════════════════════════════ */}
      <Section index="07" title="Code Block">
        <div className="border border-border rounded-none overflow-hidden">
          {/* Titlebar */}
          <div
            className="
            bg-elevated border-b border-border
            flex items-center justify-between
            px-4 py-2
          "
          >
            <span className="text-label text-gold">get-projects.ts</span>
            <span className="text-label text-ghost">typescript</span>
          </div>
          {/* Code content */}
          <pre className="bg-code-bg text-code-text text-mono p-5 overflow-x-auto">
            <code>{`import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const data = await import("@/data/projects.json");
  return data.default as Project[];
}`}</code>
          </pre>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          08 · RADIUS SCALE
      ══════════════════════════════════════════════════════ */}
      <Section index="08" title="Radius Scale">
        <div className="flex gap-6 items-end flex-wrap">
          {[
            { cls: "rounded-none", label: "0px", use: "Images" },
            { cls: "rounded-default", label: "2px", use: "Buttons" },
            { cls: "rounded-card", label: "4px", use: "Cards" },
          ].map(({ cls, label, use }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div
                className={`w-16 h-16 bg-surface border border-border ${cls}`}
              />
              <p className="text-label text-muted text-center">
                {label}
                <br />
                <span className="text-ghost">{use}</span>
              </p>
            </div>
          ))}
          {/* Pill — special case */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="bg-surface border border-gold flex items-center px-4 h-8"
              style={{ borderRadius: "9999px" }}
            >
              <span className="text-label text-gold">Pill</span>
            </div>
            <p className="text-label text-muted text-center">
              9999px
              <br />
              <span className="text-ghost">Badge only</span>
            </p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          09 · ANIMATIONS
      ══════════════════════════════════════════════════════ */}
      <Section index="09" title="Animations from globals.css">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* page-enter */}
          <div>
            <p className="text-label text-ghost mb-4">
              .page-enter — fade + blur on mount
            </p>
            <div className="page-enter bg-surface border border-border rounded-card p-4">
              <p className="text-body">This div faded in.</p>
            </div>
          </div>

          {/* ticker */}
          <div>
            <p className="text-label text-ghost mb-4">
              .ticker — infinite scroll, pauses on hover
            </p>
            <div className="overflow-hidden border-y border-border py-2">
              <div className="ticker flex items-center gap-6">
                {[
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
                ].map((item, i) => (
                  <span
                    key={i}
                    className={
                      item === "·"
                        ? "text-gold text-caption"
                        : "text-label text-muted"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* cursor-blink */}
          <div>
            <p className="text-label text-ghost mb-4">
              .cursor-blink — terminal cursor
            </p>
            <div className="bg-code-bg border border-border p-4 text-mono text-code-text">
              <span className="text-gold">~ $</span>{" "}
              <span
                className="cursor-blink inline-block w-2 h-4 bg-gold align-middle"
                aria-hidden
              />
            </div>
          </div>

          {/* pulse-ring */}
          <div>
            <p className="text-label text-ghost mb-4">
              .pulse-ring — availability indicator
            </p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3" aria-hidden>
                <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-body text-muted">System online</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          10 · LAYOUT UTILITIES
      ══════════════════════════════════════════════════════ */}
      <Section index="10" title="Layout Utilities">
        <div className="space-y-6">
          <div>
            <p className="text-label text-ghost mb-2">
              .container-content — max-width 1100px, fluid gutter
            </p>
            <div className="container-content border border-dashed border-border-em py-3">
              <p className="text-caption">This is .container-content</p>
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-2">
              .container-prose — max-width 58ch
            </p>
            <div className="container-prose border border-dashed border-border-em py-3">
              <p className="text-caption">
                This is .container-prose — ideal for body text columns
              </p>
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-2">
              .section-padding → 8rem · .section-padding-sm → 5rem
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="section-padding border border-dashed border-border-em flex items-center justify-center">
                <p className="text-caption">section-padding</p>
              </div>
              <div className="section-padding-sm border border-dashed border-border-em flex items-center justify-center">
                <p className="text-caption">section-padding-sm</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border section-padding-sm">
        <div className="container-content flex items-center justify-between flex-wrap gap-4">
          <p className="text-label text-ghost">
            DesignSystemShowcase.tsx · Dev only · Delete before deployment
          </p>
          <p className="text-label text-ghost">
            Cinematic Dark · Tailwind v4 · Next.js 16
          </p>
        </div>
      </footer>
    </div>
  );
}
