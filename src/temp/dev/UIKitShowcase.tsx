/**
 * UIKitShowcase.tsx
 *
 * Drop this into src/app/page.tsx temporarily:
 *   import UIKitShowcase from "@/components/dev/UIKitShowcase";
 *   export default function Page() { return <UIKitShowcase />; }
 *
 * Every component here comes from our ui-kit.
 * Every className comes from globals.css.
 * No hardcoded values. No inline colors.
 * Delete this file before production.
 */

import { ArrowRight,  Mail, ExternalLink, Terminal } from "lucide-react";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TechBadge, AvailabilityBadge } from "@/components/ui/Badges";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Separator, Ticker, Skeleton } from "@/components/ui/Extras";

// ── Demo data ─────────────────────────────────────────────────

const STACK_TICKER = [
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
  "Tailwind v4",
  "·",
  "REST API",
  "·",
  "Vercel",
  "·",
];

const SAMPLE_CODE = `import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const { default: data } = await import("@/data/projects.json");
  return data as Project[];
}`;

// ── Section wrapper ───────────────────────────────────────────

function ShowSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="section-padding-sm border-t border-border">
      <div className="container-content">{children}</div>
    </section>
  );
}

// ── Main showcase ─────────────────────────────────────────────

export default function UIKitShowcase() {
  return (
    <div className="bg-bg text-text min-h-screen">
      {/* Grain lives above everything — always */}
      <GrainOverlay />

      {/* ── Hero-style header ────────────────────────────── */}
      <header className="section-padding border-b border-border">
        <div className="container-content">
          <p className="text-label text-ghost mb-6">
            Dev · UI Kit Showcase · Delete before production
          </p>

          <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
            <h1 className="text-display">
              Cinematic Dark
              <br />
              <em className="text-em">UI Kit.</em>
            </h1>
            <AvailabilityBadge />
          </div>

          <Separator accent className="mb-8" />

          <p className="text-body text-muted max-w-prose mb-10">
            Every component built from{" "}
            <span className="text-mono text-gold">globals.css</span> tokens. No
            hardcoded values. No inline styles. The system working as intended.
          </p>

          {/* All three button variants */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" iconEnd={<ArrowRight size={14} />}>
              View the Work
            </Button>
            <Button variant="outline" iconStart={<Mail size={14} />}>
              Let&apos;s Talk
            </Button>
            <Button variant="ghost" iconStart={<Terminal size={14} />}>
              GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* ── Ticker ───────────────────────────────────────── */}
      <Ticker items={STACK_TICKER} />

      {/* ══════════════════════════════════════════════════
          SECTION HEADER
      ══════════════════════════════════════════════════ */}
      <ShowSection>
        <p className="text-label text-ghost mb-8">Component: SectionHeader</p>

        <SectionHeader
          index="01"
          label="Selected Work"
          headline={
            <>
              Projects built
              <br />
              <em className="text-em">with intention.</em>
            </>
          }
          body="End-to-end products from schema design to deployed interface. Each one a deliberate decision, not a template."
        />
      </ShowSection>

      {/* ══════════════════════════════════════════════════
          CARDS
      ══════════════════════════════════════════════════ */}
      <ShowSection>
        <SectionHeader
          index="02"
          label="Cards"
          headline="The containers."
          accentLine={false}
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Default card */}

          <Card.Root variant="default">
            
            <Card.Image src="https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg">
              {/* Overlay badges rendered as children */}
              <TechBadge className="bg-elevated border-border text-ghost">
                Next.js
              </TechBadge>
              <TechBadge accent>Live</TechBadge>
            </Card.Image>

            <Card.Header>
              <p className="text-label text-gold">§ PROJECT</p>
            </Card.Header>
            <Card.Body>
              <h3 className="text-heading mb-3">SaaS Platform</h3>
              <p className="text-body text-muted">
                Real-time dashboard with role-based access and exportable
                reports.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <TechBadge>Next.js</TechBadge>
                <TechBadge>MongoDB</TechBadge>
                <TechBadge>TypeScript</TechBadge>
              </div>
            </Card.Body>

            <Card.Footer>
              <Button
                variant="ghost"
                size="sm"
                iconEnd={<ExternalLink size={12} />}
              >
                Live
              </Button>
              <Button variant="ghost" size="sm" iconEnd={<Terminal size={12} />}>
                Repo
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* Elevated card */}
          <Card.Root variant="elevated">
            <Card.Image src="">
              <TechBadge accent>Featured</TechBadge>
            </Card.Image>
            <Card.Header>
              <p className="text-label text-gold">§ FEATURED</p>
            </Card.Header>
            <Card.Body>
              <h3 className="text-heading mb-3">E-Commerce API</h3>
              <p className="text-body text-muted">
                Full REST API with JWT auth, Stripe integration, and order
                tracking.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <TechBadge>Node.js</TechBadge>
                <TechBadge>REST</TechBadge>
                <TechBadge>MongoDB</TechBadge>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm" iconEnd={<Terminal size={12} />}>
                Repo
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* Stats card */}
          <Card.Root variant="default">
            <Card.Body>
              <p className="text-label text-gold mb-6">§ AT A GLANCE</p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { val: "3+", lbl: "Years building" },
                  { val: "24+", lbl: "Projects shipped" },
                  { val: "480", lbl: "Problems solved" },
                  { val: "100", lbl: "Lighthouse score" },
                ].map(({ val, lbl }) => (
                  <div key={lbl}>
                    <p className="text-heading text-text">{val}</p>
                    <p className="text-label text-muted mt-1">{lbl}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card.Root>
        </div>
      </ShowSection>

      {/* ══════════════════════════════════════════════════
          BADGES
      ══════════════════════════════════════════════════ */}
      <ShowSection>
        <SectionHeader
          index="03"
          label="Badges"
          headline="The labels."
          accentLine={false}
          className="mb-10"
        />

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-label text-ghost mb-4">TechBadge — default</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "TypeScript",
                "Node.js",
                "React",
                "MongoDB",
                "Tailwind v4",
                "REST API",
                "Vercel",
                "Docker",
              ].map((tag) => (
                <TechBadge key={tag}>{tag}</TechBadge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-4">
              TechBadge — accent (gold)
            </p>
            <div className="flex flex-wrap gap-2">
              <TechBadge accent>Live</TechBadge>
              <TechBadge accent>Featured</TechBadge>
              <TechBadge accent>O(n log n)</TechBadge>
              <TechBadge accent>Open Source</TechBadge>
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-4">
              AvailabilityBadge — the only pill in the system
            </p>
            <div className="flex flex-wrap gap-3">
              <AvailabilityBadge />
              <AvailabilityBadge label="Open to full-time roles" />
            </div>
          </div>
        </div>
      </ShowSection>

      {/* ══════════════════════════════════════════════════
          CODE BLOCK
      ══════════════════════════════════════════════════ */}
      <ShowSection>
        <SectionHeader
          index="04"
          label="Code Block"
          headline="The work itself."
          accentLine={false}
          className="mb-10"
        />

        <div className="flex flex-col gap-6">
          <CodeBlock
            filename="get-projects.ts"
            language="typescript"
            code={SAMPLE_CODE}
          />

          <CodeBlock
            filename="middleware.ts"
            language="typescript"
            code={`export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};`}
          />
        </div>
      </ShowSection>

      {/* ══════════════════════════════════════════════════
          EXTRAS
      ══════════════════════════════════════════════════ */}
      <ShowSection>
        <SectionHeader
          index="05"
          label="Extras"
          headline="The details."
          accentLine={false}
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-label text-ghost mb-4">Separator — standard</p>
            <div className="flex flex-col gap-4">
              <Separator />
              <p className="text-body text-muted">Content above and below.</p>
              <Separator />
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-4">
              Separator — accent (gold)
            </p>
            <div className="flex flex-col gap-4">
              <Separator accent />
              <p className="text-body text-muted">
                Used at section transitions — sparingly.
              </p>
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-4">
              Skeleton — loading state
            </p>
            <div className="flex flex-col gap-3 bg-surface border border-border rounded-card p-5">
              <Skeleton height="h-7" width="w-2/3" />
              <Skeleton height="h-4" />
              <Skeleton height="h-4" />
              <Skeleton height="h-4" width="w-3/4" />
              <div className="flex gap-2 mt-2">
                <Skeleton height="h-5" width="w-16" />
                <Skeleton height="h-5" width="w-16" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-label text-ghost mb-4">
              Button sizes — sm and md
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" size="sm">
                  Primary sm
                </Button>
                <Button variant="primary" size="md">
                  Primary md
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="outline" size="sm">
                  Outline sm
                </Button>
                <Button variant="outline" size="md">
                  Outline md
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="ghost" size="sm">
                  Ghost sm
                </Button>
                <Button variant="ghost" size="md">
                  Ghost md
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
                <Button variant="outline" size="md" fullWidth>
                  Full Width
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ShowSection>

      {/* ══════════════════════════════════════════════════
          TYPOGRAPHY QUICK REFERENCE
      ══════════════════════════════════════════════════ */}
      <ShowSection>
        <SectionHeader
          index="06"
          label="Typography"
          headline={<>The voice.</>}
          accentLine={false}
          className="mb-10"
        />

        <div className="flex flex-col gap-0 border border-border">
          {[
            {
              cls: "text-display",
              sample: "I build things that outlast.",
              spec: "Fraunces 300 · clamp(3.5rem, 9vw, 8rem) · lh 0.94",
            },
            {
              cls: "text-heading",
              sample: "Selected Work",
              spec: "Fraunces 300 · clamp(2rem, 5vw, 4rem) · lh 1.05",
            },
            {
              cls: "text-subheading",
              sample: "Full-Stack Engineer.",
              spec: "Geist 300 · clamp(1.1rem, 2.5vw, 1.6rem) · lh 1.4",
            },
            {
              cls: "text-body",
              sample:
                "Building end-to-end products with Node.js, Next.js, and React.",
              spec: "Geist 300 · 1rem · lh 1.75",
            },
            {
              cls: "text-caption",
              sample: "§ 01 — SELECTED WORK",
              spec: "Geist Mono · 0.8125rem · uppercase · tracking 0.1em",
            },
            {
              cls: "text-label",
              sample: "AVAILABLE FOR NEW PROJECTS",
              spec: "Geist Mono · 0.6875rem · uppercase · tracking 0.15em",
            },
            {
              cls: "text-mono",
              sample: "const fn = async () => {}",
              spec: "Geist Mono · 0.875rem · lh 1.65",
            },
          ].map(({ cls, sample, spec }) => (
            <div
              key={cls}
              className="flex items-baseline gap-6 border-b border-border last:border-b-0 px-5 py-5"
            >
              <div className="flex-1 overflow-hidden">
                <p className={cls}>{sample}</p>
              </div>
              <div className="hidden lg:block shrink-0 text-right">
                <p className="text-label text-ghost">.{cls}</p>
                <p className="text-label text-ghost mt-0.5 opacity-60">
                  {spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ShowSection>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-border section-padding-sm">
        <div className="container-content flex items-center justify-between flex-wrap gap-4">
          <p className="text-label text-ghost">UIKitShowcase.tsx · Dev only</p>
          <p className="text-label text-ghost">
            Cinematic Dark · Tailwind v4 · Next.js 16
          </p>
        </div>
      </footer>
    </div>
  );
}
