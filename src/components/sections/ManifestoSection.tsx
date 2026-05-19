/**
 * ManifestoSection.tsx — Server Component
 *
 * The three engineering principles drawn from this portfolio's own
 * construction: every decision made during this project — dropping
 * dark mode toggle, refusing lorem ipsum, debating radius values,
 * choosing Fraunces over a generic serif — reveals a philosophy.
 *
 * This section names that philosophy explicitly.
 *
 * Layout:
 *   - Full-width section header (SectionHeader pattern)
 *   - Three principles in a bordered grid
 *   - Each principle: index + title (Fraunces italic) + body (Geist)
 *   - A closing statement — one line, centered, gold accent
 *
 * No animations here — this section is read, not watched.
 * The stillness is intentional. Contrast with the Hero's choreography.
 *
 * Server Component — zero client JS.
 */

const PRINCIPLES = [
    {
      index: "01",
      title: "Structure before aesthetics.",
      titleEm: "before aesthetics.",
      titleBase: "Structure",
      body: "I build the backend before I open Figma. Systems that scale are designed from the schema outward — the interface is a consequence of good architecture, not the other way around. Beautiful code that breaks under load is just expensive decoration.",
      label: "Engineering Philosophy",
    },
    {
      index: "02",
      title: "Performance is a form of respect.",
      titleEm: "a form of respect.",
      titleBase: "Performance is",
      body: "Every unnecessary kilobyte, every blocking request, every layout shift is a decision made against the person using what I built. Speed is not a feature to add later. It is the baseline from which everything else begins.",
      label: "User Philosophy",
    },
    {
      index: "03",
      title: "Interfaces have opinions.",
      titleEm: "have opinions.",
      titleBase: "Interfaces",
      body: "Every color, every radius, every spacing value is a decision. I refuse templates because they carry someone else's decisions. The portfolio you are reading right now was built token by token, argument by argument — because defaults are for people who haven't thought it through.",
      label: "Design Philosophy",
    },
  ] as const;
  
  export function ManifestoSection() {
    return (
      <section
        id="manifesto"
        className="section-padding border-b border-border"
        aria-label="Engineering philosophy"
      >
        <div className="container-content">
  
          {/* ── Section header ────────────────────────────────── */}
          <header className="mb-16">
            <p className="text-label text-gold flex items-center gap-2 mb-6">
              <span aria-hidden="true">§</span>
              <span>02</span>
              <span aria-hidden="true">—</span>
              <span>The Manifesto</span>
            </p>
  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              <h2 className="text-heading text-text">
                How I think
                <br />
                <em
                  className="not-italic"
                  style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
                >
                  before I build.
                </em>
              </h2>
  
              <p className="text-body text-muted max-w-[44ch] lg:pb-1">
                Three principles that have shaped every project, every refactor,
                and every decision to say no.
              </p>
            </div>
  
            {/* Gold accent line */}
            <span
              aria-hidden="true"
              className="block w-8 h-px bg-gold mt-8"
            />
          </header>
  
          {/* ── Principles grid ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
            {PRINCIPLES.map(({ index, titleBase, titleEm, body, label }) => (
              <article
                key={index}
                className="
                  bg-bg
                  p-8
                  flex flex-col gap-6
                  transition-base
                  group
                  hover:bg-surface
                "
              >
                {/* Index + label */}
                <div className="flex items-center justify-between">
                  <span className="text-label text-ghost">{index}</span>
                  <span className="text-label text-ghost">{label}</span>
                </div>
  
                {/* Separator */}
                <span className="block w-full h-px bg-border group-hover:bg-border-em transition-base" />
  
                {/* Principle title — Fraunces, two-tone */}
                <h3 className="text-subheading text-text leading-snug">
                  <span className="text-muted">{titleBase} </span>
                  <em
                    className="not-italic"
                    style={{ fontStyle: "italic", color: "var(--text-primary)" }}
                  >
                    {titleEm}
                  </em>
                </h3>
  
                {/* Body */}
                <p className="text-body text-muted leading-relaxed flex-1">
                  {body}
                </p>
  
                {/* Bottom accent — hidden, appears on hover */}
                <span
                  aria-hidden="true"
                  className="
                    block w-0 h-px bg-gold
                    transition-all duration-300
                    group-hover:w-8
                  "
                  style={{ transitionTimingFunction: "cubic-bezier(0.25,0,0,1)" }}
                />
              </article>
            ))}
          </div>
  
          {/* ── Closing statement ─────────────────────────────── */}
          <div className="mt-16 pt-12 border-t border-border">
            <p
              className="text-subheading text-center max-w-prose mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              These are not aspirations.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  color: "var(--text-primary)",
                }}
              >
                They are the receipts.
              </em>
            </p>
          </div>
  
        </div>
      </section>
    );
  }