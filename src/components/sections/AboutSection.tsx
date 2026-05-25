/**
 * AboutSection.tsx — Server Component
 *
 * Reads from about.json. Renders identity, professional traits,
 * and work experience in a structured editorial layout.
 *
 * This section sits between Manifesto and Work in the page narrative:
 *
 *   Hero       → who I am (headline level)
 *   Manifesto  → how I think (principles)
 *   About      → who I am (ground level — the human, the history)
 *   Work       → what I shipped
 *
 * Layout:
 *   Top: bio paragraphs (Geist light, prose width)
 *   Mid: three trait cards in a bordered grid
 *   Bot: experience entry (timeline style, left border accent)
 *
 * Zero inline styles. All values from CSS variables via Tailwind.
 * Server Component — no client JS needed.
 */

import aboutData from "@/data/about.json";

// ── Types ─────────────────────────────────────────────────────

interface Trait {
  label: string;
  description: string;
}

interface Contribution {
  label: string;
  detail: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  contributions: Contribution[];
}

// ── Sub-components ────────────────────────────────────────────

function TraitCard({ label, description }: Trait) {
  return (
    <div className="bg-bg border-e border-border last:border-e-0 p-6 flex flex-col gap-4">
      {/* Label — the name of the trait, not a buzzword */}
      <p className="text-label text-gold">{label}</p>

      {/* Separator */}
      <span className="block w-full h-px bg-border" aria-hidden="true" />

      {/* Description */}
      <p className="text-body text-muted leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}

function ExperienceEntry({ exp }: { exp: Experience }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0 border border-border">
      {/* ── Left: Company meta ─────────────────────────── */}
      <div
        className="
        bg-surface border-b lg:border-b-0 lg:border-e border-border
        px-6 py-8
        flex flex-col justify-between gap-6
      "
      >
        <div className="flex flex-col gap-1">
          <p className="text-label text-ghost">{exp.type}</p>
          <p className="text-label text-ghost">{exp.period}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-body text-text font-medium">{exp.company}</p>
          <p className="text-label text-muted">{exp.role}</p>
        </div>
      </div>

      {/* ── Right: Contributions ───────────────────────── */}
      <div className="flex flex-col">
        {exp.contributions.map(({ label, detail }, i) => (
          <div
            key={label}
            className={[
              "flex flex-col gap-2 px-6 py-5",
              "border-s-2 border-s-border ms-0",
              "transition-base hover:border-s-gold hover:bg-surface",
              i > 0 ? "border-t border-border" : "",
            ].join(" ")}
          >
            {/* Contribution label */}
            <p className="text-label text-gold">{label}</p>

            {/* Detail */}
            <p className="text-body text-muted leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────────

export function AboutSection() {
  const { name, bio, traits, experience } = aboutData;

  return (
    <section
      id="about"
      className="section-padding border-b border-border"
      aria-label="About"
    >
      <div className="container-content">
        {/* ── Section header ───────────────────────────── */}
        <header className="mb-16">
          <p className="text-label text-gold flex items-center gap-2 mb-6">
            <span aria-hidden="true">§</span>
            <span>02</span>
            <span aria-hidden="true">—</span>
            <span>The Engineer</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-heading text-text">
              {name}.
              <br />
              <em
                className="not-italic"
                style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
              >
                Full-Stack.
              </em>
            </h2>

            {/* First bio paragraph in the header */}
            <p className="text-body text-muted max-w-[44ch] lg:pb-1">
              {bio[0]}
            </p>
          </div>

          <span aria-hidden="true" className="block w-8 h-px bg-gold mt-8" />
        </header>

        {/* ── Extended bio ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-16 pb-16 border-b border-border">
          {bio.slice(1).map((paragraph, i) => (
            <p key={i} className="text-body text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* ── Trait cards ─────────────────────────────── */}
        <div className="mb-16">
          <p className="text-label text-ghost mb-8">How I work</p>
          <div className="border border-border grid grid-cols-1 lg:grid-cols-3">
            {traits.map((trait) => (
              <TraitCard key={trait.label} {...trait} />
            ))}
          </div>
        </div>

        {/* ── Experience ──────────────────────────────── */}
        <div>
          <p className="text-label text-ghost mb-8">Experience</p>
          <div className="flex flex-col gap-4">
            {experience.map((exp) => (
              <ExperienceEntry key={exp.id} exp={exp as Experience} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
