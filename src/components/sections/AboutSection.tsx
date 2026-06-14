import aboutData from "@/data/about.json";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";

// ── Types ─────────────────────────────────────────────────────

interface Contribution {
  label: string;
  detail: string;
}

interface ExperienceData {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  contributions: Contribution[];
}

// ── Experience entry — timeline style ─────────────────────────
// Flat row layout: scales to multiple companies without ballooning.
// Left gold accent border signals "this is a timeline entry."

function ExperienceEntry({ exp }: { exp: ExperienceData }) {
  return (
    <article
      className="
      group
      border-s-2 border-s-border
      ps-6
      transition-base
      hover:border-s-gold
    "
    >
      {/* ── Meta row: period + type ──────────────────────── */}
      <div className="flex items-center gap-3 mb-2">
        <p className="text-label">{exp.period}</p>
        <span className="w-px h-3 bg-border" aria-hidden="true" />
        <p className="text-label">{exp.type}</p>
      </div>

      {/* ── Company + role ───────────────────────────────── */}
      <div className="flex items-baseline gap-3 mb-5">
        <h3 className="text-subheading text-text transition-base group-hover:text-gold">
          {exp.company}
        </h3>
        <span className="text-label text-muted">{exp.role}</span>
      </div>

      {/* ── Contributions — compact list ─────────────────── */}
      <ul className="flex flex-col gap-3">
        {exp.contributions.map(({ label, detail }) => (
          <li key={label} className="flex gap-3 items-start">
            <span
              className="mt-[0.45em] block w-1.5 h-1.5 bg-gold shrink-0 rounded-none"
              aria-hidden="true"
            />
            <p className="text-body text-muted leading-relaxed">
              <span className="text-text font-medium">{label}</span>
              {" — "}
              {detail}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────────

export function AboutSection() {
  const { name, bio, experience } = aboutData;

  return (
    <Section id="about" aria-label="About">
      {/* ── Section header ───────────────────────────── */}

      <SectionHeader
        label="The Engineer"
        titleLine1={name}
        titleLine2="Self-Taught."
        description={bio}
      />
      {/* ── Experience ──────────────────────────────── */}
      <Reveal activeClass="animate-fade-up animate-delay-100">
        <div>
          <p className="text-label mb-8">Experience</p>

          {/* Gap between entries — generous but not wasteful */}
          <div className="flex flex-col gap-10">
            {experience.map((exp) => (
              <ExperienceEntry key={exp.id} exp={exp as ExperienceData} />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
