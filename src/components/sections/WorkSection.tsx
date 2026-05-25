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

import projectsData from "@/data/projects.json";
import { WorkClient } from "./WorkClient";
import type { Project } from "../../lib/types";
import { SectionHeader } from "../ui/SectionHeader";
import { Section } from "../ui/Section";

const projects = projectsData as Project[];

export function WorkSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="work" aria-label="Selected work">
      {/* ── Section header ─────────────────────────────────── */}
      <SectionHeader
        index="03"
        label="Selected Artifacts"
        titleLine1="Digital products"
        titleLine2="engineered for scale."
        description={
          <>
            {projects.length} projects. Each one a decision, not a deliverable.
          </>
        }
      />
      {/* ── Client shell — handles filter + show more ─────── */}
      <WorkClient featured={featured} rest={rest} />
    </Section>
  );
}
