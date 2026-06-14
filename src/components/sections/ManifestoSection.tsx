import Reveal from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import principlesData from "@/data/manifesto.json";

export function ManifestoSection() {
  return (
    <Section id="manifesto" aria-label="Engineering philosophy">
      {/* ── Section header ────────────────────────────────── */}
      <SectionHeader
        label="The Manifesto"
        titleLine1="How I think"
        titleLine2="before I build."
        description="Three principles that have shaped every project, every refactor, and every decision to say no."
      />
      <Reveal activeClass="animate-fade-up animate-delay-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
          {principlesData.map(({ id, titleBase, titleEm, body, label }) => (
            <article
              key={id}
              className="
              bg-bg p-8 flex flex-col gap-6
              transition-colors duration-300 group hover:bg-surface
            "
            >
              {/* Index + label */}
              <div className="flex items-center justify-between text-label">
                <span>{id}</span>
                <span>{label}</span>
              </div>

              {/* Separator */}
              <span className="block w-full h-px bg-border group-hover:bg-muted/30 transition-colors duration-300" />

              {/* Principle title */}
              <h3 className="text-subheading leading-snug">
                <span className="text-muted">{titleBase} </span>
                <em className="italic text-text">{titleEm}</em>
              </h3>

              {/* Body */}
              <p className="text-body text-muted leading-relaxed flex-1">
                {body}
              </p>

              {/* Bottom accent — يظهر عند عمل Hover */}
              <span
                aria-hidden="true"
                className="
                block w-0 h-px bg-gold 
                transition-all duration-300 ease-in
                group-hover:w-8
              "
              />
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── Closing statement ─────────────────────────────── */}
      <Reveal activeClass="animate-fade-up animate-delay-100">
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-subheading text-center max-w-prose mx-auto text-muted">
            These are not aspirations.
            <br />
            <em className="italic text-text font-serif">
              They are the receipts.
            </em>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
