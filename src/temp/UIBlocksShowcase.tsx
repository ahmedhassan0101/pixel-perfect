// src/components/dev/UIBlocksShowcase.tsx
// Development audit tool — remove before production.
// Displays all three variations of every atom side-by-side.
// ★ = recommended variation for the Editorial Blueprint identity.
//
// Server Component — data is static, no client JS needed.

import {
  ArrowUpRight,
  Download,
  // Github,
  Mail,
  Search,
  Terminal,
} from "lucide-react";

import { Button } from "@/temp/atoms/Button";
import { AppLink } from "@/temp/atoms/AppLink";
import { Badge } from "@/temp/atoms/Badge";
import { Card } from "@/temp/atoms/Card";
import { Input } from "@/temp/atoms/Input";
import { Textarea } from "@/temp/atoms/Textarea";
import { Separator, Skeleton, SectionLabel } from "./atoms/Separator";
// import { ThemeToggle } from "@/components/dev/ThemeToggle";
import { LocaleSwitcher } from "@/temp/LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
// import { SectionLabel } from "../atoms/Separator";

// ── Showcase primitives ───────────────────────────────────────────────────────

function ShowcaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 border-t border-border first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs text-accent-warm" aria-hidden>
          §
        </span>
        <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function VariantColumn({
  label,
  recommended = false,
  children,
}: {
  label: string;
  recommended?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
          {label}
        </p>
        {recommended && (
          <Badge variant="accent" size="sm">
            ★ Blueprint
          </Badge>
        )}
      </div>
      {children}
    </div>
  );
}

// ── Main showcase ─────────────────────────────────────────────────────────────

export default function UIBlocksShowcase() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="max-w-[1200px] mx-auto px-gutter sm:px-8 py-12">
        {/* Header */}
        <header className="mb-12 pb-8 border-b border-border">
          <SectionLabel className="mb-3">Development Audit</SectionLabel>
          <h1 className="text-heading mb-2">UI Blocks Showcase</h1>
          <p className="text-body text-muted-foreground max-w-[60ch]">
            All atomic components with three variations each.{" "}
            <span className="text-accent-warm font-mono text-xs">
              ★ Blueprint
            </span>{" "}
            marks the recommended variation for the Editorial identity.
          </p>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-6">
            <ThemeToggle />
            <LocaleSwitcher />
            <span className="font-mono text-xs text-muted-foreground">
              ← Use these to test light/dark and RTL/LTR
            </span>
          </div>
        </header>

        {/* ── 01 · Buttons ────────────────────────────────────────────────── */}
        <ShowcaseSection title="01 — Button.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VariantColumn label="Primary — Solid" recommended>
              <p className="text-caption">
                High-contrast. The only filled surface in the system. Used for
                the single primary CTA per section.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" iconStart={<Download size={14} />}>
                  Download Résumé
                </Button>
                <Button variant="primary" iconEnd={<ArrowUpRight size={14} />}>
                  View Live
                </Button>
              </div>
              <Button variant="primary" fullWidth>
                Full Width
              </Button>
              <Button variant="primary" disabled>
                Disabled State
              </Button>
            </VariantColumn>

            <VariantColumn label="Outline — Sharp Border">
              <p className="text-caption">
                Secondary action. Border reads as a technical frame, not
                decoration.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  Small
                </Button>
                <Button variant="outline" size="md">
                  Medium
                </Button>
                <Button variant="outline" size="lg">
                  Large
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" iconStart={<Mail size={14} />}>
                  GitHub
                </Button>
                <Button variant="outline" iconEnd={<ArrowUpRight size={14} />}>
                  Repository
                </Button>
              </div>
              <Button variant="outline" disabled>
                Disabled State
              </Button>
            </VariantColumn>

            <VariantColumn label="Ghost — Underline Accent">
              <p className="text-caption">
                Tertiary. Invisible until hover — the underline appears in
                amber. Correct for nav links and inline actions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" size="sm">
                  Small
                </Button>
                <Button variant="ghost" size="md">
                  Medium
                </Button>
                <Button variant="ghost" size="lg">
                  Large
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" iconStart={<Mail size={14} />}>
                  Contact
                </Button>
                <Button variant="ghost" iconEnd={<Terminal size={14} />}>
                  Terminal
                </Button>
              </div>
              <Button variant="ghost" disabled>
                Disabled State
              </Button>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 02 · Links ──────────────────────────────────────────────────── */}
        <ShowcaseSection title="02 — AppLink.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VariantColumn label="Accent — Always Underlined" recommended>
              <p className="text-caption">
                Permanent amber underline. Primary in-body link signal. Never
                ambiguous — always looks clickable.
              </p>
              <AppLink href="#" variant="accent">
                View case study
              </AppLink>
              <AppLink
                href="#"
                variant="accent"
                iconEnd={<ArrowUpRight size={13} />}
                external
              >
                Open live project
              </AppLink>
              <p className="text-body">
                Read more about{" "}
                <AppLink href="#" variant="accent">
                  the architecture decisions
                </AppLink>{" "}
                made during this sprint.
              </p>
            </VariantColumn>

            <VariantColumn label="Hover — Revealed on Interaction">
              <p className="text-caption">
                Underline appears on hover only. For nav items and UI links
                where persistent underlines would be noisy.
              </p>
              <AppLink href="#" variant="hover">
                Work
              </AppLink>
              <AppLink href="#" variant="hover">
                Stack
              </AppLink>
              <AppLink href="#" variant="hover">
                Contact
              </AppLink>
              <AppLink
                href="#"
                variant="hover"
                iconEnd={<ArrowUpRight size={13} />}
              >
                View all projects
              </AppLink>
            </VariantColumn>

            <VariantColumn label="Silent — No Decoration">
              <p className="text-caption">
                No visual affordance. For wrapping cards, logos, and icon-only
                contexts where the element itself signals action.
              </p>
              <AppLink href="#" variant="silent" className="font-mono text-sm">
                yourname.dev
              </AppLink>
              <AppLink href="#" variant="silent" iconStart={<Mail size={14} />}>
                github.com/yourname
              </AppLink>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 03 · Badges ─────────────────────────────────────────────────── */}
        <ShowcaseSection title="03 — Badge.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VariantColumn label="Outline — Sharp Technical Tag" recommended>
              <p className="text-caption">
                The primary tag style. Border without fill reads as annotation —
                a technical label, not a category pill.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "MongoDB",
                  "Node.js",
                  "Tailwind",
                  "REST API",
                ].map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" size="md">
                  Medium Size
                </Badge>
                <Badge variant="outline" size="sm">
                  Small Size
                </Badge>
              </div>
            </VariantColumn>

            <VariantColumn label="Subtle — Low Visual Weight">
              <p className="text-caption">
                Muted background, no border. For secondary metadata where you
                want the info without visual noise.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Frontend", "Backend", "DevOps", "Tooling", "Database"].map(
                  (tag) => (
                    <Badge key={tag} variant="subtle">
                      {tag}
                    </Badge>
                  ),
                )}
              </div>
            </VariantColumn>

            <VariantColumn label="Accent — Status Indicator">
              <p className="text-caption">
                Amber border and text. Reserved for status signals: Live,
                Active, Featured. Never overuse — amber is scarce.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="accent">Live</Badge>
                <Badge variant="accent">Featured</Badge>
                <Badge variant="accent">O(n log n)</Badge>
                <Badge variant="accent" size="md">
                  In Progress
                </Badge>
              </div>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 04 · Cards ──────────────────────────────────────────────────── */}
        <ShowcaseSection title="04 — Card.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VariantColumn label="Image — Project Card" recommended>
              <p className="text-caption mb-2">
                Hover shifts border to amber. Image slot with overlay badges.
              </p>
              <Card.Root variant="image">
                <Card.ImageSlot
                  overlay={
                    <>
                      <Badge
                        variant="outline"
                        size="sm"
                        className="bg-code-bg border-border text-code-text"
                      >
                        Next.js
                      </Badge>
                      <Badge variant="accent" size="sm">
                        Live
                      </Badge>
                    </>
                  }
                />
                <Card.Body>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-subheading">SaaS Platform</h3>
                    <AppLink
                      href="#"
                      variant="hover"
                      iconEnd={<ArrowUpRight size={12} />}
                      className="font-mono text-xs shrink-0"
                      external
                    >
                      Live
                    </AppLink>
                  </div>
                  <p className="text-caption">
                    Real-time dashboard with role-based access and exportable
                    reports. Built on Next.js App Router.
                  </p>
                </Card.Body>
                <Card.Footer>
                  <div className="flex flex-wrap gap-1.5 py-3">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                    <Badge variant="outline">Tailwind</Badge>
                  </div>
                </Card.Footer>
              </Card.Root>
            </VariantColumn>

            <VariantColumn label="Info — Stat / Text Block">
              <p className="text-caption mb-2">
                Surface background. No hover affordance — purely informational.
              </p>
              <Card.Root variant="info">
                <Card.Body>
                  <p className="font-mono text-xs text-accent-warm tracking-widest uppercase mb-3">
                    Statistics
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: "24+", label: "Projects" },
                      { val: "3", label: "Years" },
                      { val: "480", label: "Problems" },
                      { val: "100", label: "Lighthouse" },
                    ].map(({ val, label }) => (
                      <div key={label}>
                        <p className="text-heading">{val}</p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card.Root>
            </VariantColumn>

            <VariantColumn label="Minimal — Border Only">
              <p className="text-caption mb-2">
                Transparent background. The most editorial option — structure
                defined purely by border, not fill.
              </p>
              <Card.Root variant="minimal">
                <Card.Body className="p-6">
                  <p className="font-mono text-xs text-accent-warm tracking-widest uppercase mb-4">
                    Open to opportunities
                  </p>
                  <h3 className="text-subheading mb-2">
                    Let&apos;s work together.
                  </h3>
                  <p className="text-caption mb-4">
                    Available for full-time roles and freelance projects.
                    Response within 24 hours.
                  </p>
                  <Button
                    variant="primary"
                    iconEnd={<ArrowUpRight size={14} />}
                  >
                    Get in touch
                  </Button>
                </Card.Body>
              </Card.Root>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 05 · Inputs ─────────────────────────────────────────────────── */}
        <ShowcaseSection title="05 — Input.tsx + Textarea.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VariantColumn label="Outline — Full Border" recommended>
              <p className="text-caption">
                Full border, amber ring on focus. The standard form control.
              </p>
              <Input
                variant="outline"
                label="Your Name"
                placeholder="Ahmed Hassan"
              />
              <Input
                variant="outline"
                label="Email"
                type="email"
                placeholder="hello@example.com"
                adornStart={<Mail size={14} />}
              />
              <Input
                variant="outline"
                label="Search"
                placeholder="Search projects..."
                adornStart={<Search size={14} />}
              />
              <Input
                variant="outline"
                label="With Error"
                placeholder="..."
                error="This field is required."
              />
              <Textarea
                variant="outline"
                label="Message"
                placeholder="Tell me about the project..."
                rows={3}
              />
            </VariantColumn>

            <VariantColumn label="Underline — Architectural">
              <p className="text-caption">
                Border-bottom only. No background, no side borders. The most
                editorial form style — reads like a printed form.
              </p>
              <Input
                variant="underline"
                label="Your Name"
                placeholder="Ahmed Hassan"
              />
              <Input
                variant="underline"
                label="Email"
                type="email"
                placeholder="hello@example.com"
              />
              <Textarea
                variant="underline"
                label="Message"
                placeholder="Tell me about the project..."
                rows={3}
              />
            </VariantColumn>

            <VariantColumn label="Filled — Surface Background">
              <p className="text-caption">
                Muted fill, no border until focused. Softer visual weight.
              </p>
              <Input
                variant="filled"
                label="Your Name"
                placeholder="Ahmed Hassan"
              />
              <Input
                variant="filled"
                label="Email"
                type="email"
                placeholder="hello@example.com"
              />
              <Textarea
                variant="filled"
                label="Message"
                placeholder="Tell me about the project..."
                rows={3}
              />
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 06 · Separator ──────────────────────────────────────────────── */}
        <ShowcaseSection title="06 — Separator.tsx + SectionLabel.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VariantColumn label="Separator — Border Color" recommended>
              <p className="text-caption">1px border. The standard divider.</p>
              <Separator />
              <p className="text-body">Content above and below.</p>
              <Separator />
              <div className="flex items-center gap-4 h-8">
                <span className="text-caption">Left</span>
                <Separator orientation="vertical" />
                <span className="text-caption">Right</span>
              </div>
            </VariantColumn>

            <VariantColumn label="Separator — Accent">
              <p className="text-caption">
                1px amber. Used under section headers and hero dividers.
              </p>
              <Separator accent />
              <p className="text-body">
                The accent separator signals hierarchy, not just division.
              </p>
            </VariantColumn>

            <VariantColumn label="SectionLabel — Section Header">
              <p className="text-caption">
                The § label above every portfolio section.
              </p>
              <SectionLabel index="01">Selected Work</SectionLabel>
              <SectionLabel index="02">Technical Stack</SectionLabel>
              <SectionLabel index="03">Algorithms</SectionLabel>
              <SectionLabel>Without Index</SectionLabel>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 07 · Skeleton ───────────────────────────────────────────────── */}
        <ShowcaseSection title="07 — Skeleton.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VariantColumn label="Text Lines" recommended>
              <p className="text-caption mb-4">
                Loading state for text content. Sharp edges, pulsing opacity.
              </p>
              <div className="flex flex-col gap-2">
                <Skeleton height="h-8" width="w-3/4" />
                <Skeleton height="h-4" />
                <Skeleton height="h-4" />
                <Skeleton height="h-4" width="w-2/3" />
              </div>
            </VariantColumn>

            <VariantColumn label="Card Skeleton">
              <p className="text-caption mb-4">
                Loading state for a project card.
              </p>
              <div className="border border-border p-0 overflow-hidden">
                <Skeleton height="h-40" width="w-full" />
                <div className="p-4 flex flex-col gap-2">
                  <Skeleton height="h-5" width="w-1/2" />
                  <Skeleton height="h-3" />
                  <Skeleton height="h-3" width="w-4/5" />
                </div>
              </div>
            </VariantColumn>

            <VariantColumn label="Stat Block Skeleton">
              <p className="text-caption mb-4">
                Loading state for the statistics grid.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <Skeleton height="h-8" width="w-16" />
                    <Skeleton height="h-2.5" width="w-20" />
                  </div>
                ))}
              </div>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* ── 08 · Dev Controls ───────────────────────────────────────────── */}
        <ShowcaseSection title="08 — Dev Controls (Remove in Production)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VariantColumn label="ThemeToggle.tsx" recommended>
              <p className="text-caption">
                Cycles: Light → Dark → System. Icon reflects current theme.
                Renders neutral icon until hydrated to prevent SSR mismatch.
              </p>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <span className="text-caption">Click to cycle themes</span>
              </div>
            </VariantColumn>

            <VariantColumn label="LocaleSwitcher.tsx" recommended>
              <p className="text-caption">
                Shows the name of the target language — never the current one.
                Replaces the locale prefix in the URL path preserving the route.
              </p>
              <div className="flex items-center gap-3">
                <LocaleSwitcher />
                <span className="text-caption">Click to switch language</span>
              </div>
            </VariantColumn>
          </div>
        </ShowcaseSection>

        {/* Footer */}
        <footer className="pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            UIBlocksShowcase.tsx · Dev only · Delete before deployment
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Editorial Blueprint · Tailwind v4 · Next.js 15
          </span>
        </footer>
      </div>
    </div>
  );
}
