/**
 * WorkSection.tsx — Server Component
 *
 * Reads from /data/projects.json at build time — no database, no API.
 * Passes data to WorkClient which handles filter state.
 *
 * Layout decisions:
 *   1. Two featured projects at full width — they tell the story first.
 *   2. Filter bar — minimal, text-only, no button chrome.
 *   3. Remaining projects in a 3-column grid — max 6 shown initially.
 *   4. "Show more" reveals the rest — no pagination, no route change.
 *
 * The featured projects are always visible regardless of filter.
 * They are the permanent anchor of this section.
 */

import projectsData               from "@/data/projects.json";
import { WorkClient }             from "./WorkClient";
import type { Project }           from "./types";

const projects = projectsData as Project[];

export function WorkSection() {
  const featured = projects.filter((p) => p.featured);
  const rest      = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="section-padding border-b border-border"
      aria-label="Selected work"
    >
      <div className="container-content">

        {/* ── Section header ─────────────────────────────────── */}
        <header className="mb-16">
          <p className="text-label text-gold flex items-center gap-2 mb-6">
            <span aria-hidden="true">§</span>
            <span>03</span>
            <span aria-hidden="true">—</span>
            <span>Selected Artifacts</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-heading text-text">
              Things I built
              <br />
              <em style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
                that work.
              </em>
            </h2>
            <p className="text-body text-muted max-w-[44ch] lg:pb-1">
              {projects.length} projects. Each one a decision, not a deliverable.
            </p>
          </div>

          <span
            aria-hidden="true"
            className="block w-8 h-px bg-gold mt-8"
          />
        </header>

        {/* ── Client shell — handles filter + show more ─────── */}
        <WorkClient featured={featured} rest={rest} />

      </div>
    </section>
  );
}