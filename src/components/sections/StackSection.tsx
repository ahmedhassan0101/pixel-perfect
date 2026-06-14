import stackData from "@/data/stack.json";
import { Globe, Server, Database, Cloud, Wrench } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { Section } from "../ui/Section";
import Reveal from "../ui/Reveal";

// ── Types ─────────────────────────────────────────────────────

interface Tool {
  name: string;
  note: string;
  status: "core" | "exploring";
}

interface StackCategory {
  category: string;
  index: string;
  tools: Tool[];
}

const stack = stackData as StackCategory[];

// ── Icon map ──────────────────────────────────────────────────

const ICONS: Record<string, React.ElementType> = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  Infrastructure: Cloud,
  Tooling: Wrench,
};

export function StackSection() {
  return (
    <Section id="stack" aria-label="Technical stack">
      <SectionHeader
        label="The Architecture"
        titleLine1="Tools I reach for"
        titleLine2="by instinct."
        description="Five layers. Each one chosen after something broke without it."
      />

      {/* ── Bento grid ─────────────────────────────────── */}
      {/* 5 category cards + 1 philosophy cell = 6 cells   */}
      {/* 3-column desktop, 2 tablet, 1 mobile             */}
      <Reveal activeClass="animate-fade-up animate-delay-100">
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
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                      w-8 h-8 flex items-center justify-center
                      border border-border
                      group-hover:border-border-em
                      transition-base
                    "
                    >
                      <Icon
                        size={12}
                        className="text-ghost group-hover:text-gold transition-base"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-label text-text">{cat.category}</span>
                  </div>
                  <span className="text-label text-ghost">{cat.index}</span>
                </div>

                {/* Divider */}
                <span
                  className="
                  block w-full h-px bg-border
                  group-hover:bg-border-em transition-base
                "
                />

                {/* Tools */}
                <div className="flex flex-col gap-4 flex-1">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="flex flex-col gap-1">
                      {/* Tool name + exploring tag */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-body text-text">{tool.name}</span>
                        {tool.status === "exploring" && <ExploringTag />}
                      </div>

                      {/* Note — technical depth signal */}
                      <p className="text-label text-ghost">{tool.note}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom accent — 0 → 2rem on hover */}
                {/* Uses Tailwind arbitrary ease — no inline styles */}
                <span
                  className="
                  block w-0 h-px bg-gold
                  group-hover:w-8
                  transition-all duration-300
                  ease-in
                "
                />
              </div>
            );
          })}

          {/* ── 6th cell: Current Focus ─────────────────── */}
          <CurrentFocusCell />
        </div>
      </Reveal>
    </Section>
  );
}

function ExploringTag() {
  return (
    <span
      className="
      inline-flex items-center
      text-label text-ghost
      border border-border
      px-1.5 py-px
      rounded-none
      leading-none
    "
    >
      exploring
    </span>
  );
}

function CurrentFocusCell() {
  return (
    <div className="bg-bg p-6 flex flex-col gap-9">
      {/* Label */}
      <p className="text-label">Current focus</p>

      {/* Statement */}
      <div className="flex flex-col gap-4">
        <p
          className="text-subheading text-text leading-snug"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 300,
          }}
        >
          Architecture before{" "}
          <em
            className="not-italic"
            style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
          >
            abstractions.
          </em>
        </p>
        <p className="text-body text-muted">
          Frameworks come and go, but architecture remains. I prioritize
          understanding underlying principles—how the event loop works, how data
          flows, and why a tool exists—over blindly memorizing syntax.
        </p>
      </div>
    </div>
  );
}
