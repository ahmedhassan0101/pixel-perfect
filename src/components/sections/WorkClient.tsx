/**
 * WorkClient.tsx — "use client"
 *
 * Handles:
 *   - Filter state (useState — no URL params, no router)
 *   - Show more toggle (useState)
 *   - Animated filter transitions (CSS classes, no Framer Motion)
 *
 * Featured projects: always rendered, never filtered.
 * They sit above the filter bar as permanent anchors.
 *
 * Filter bar: text-only buttons. Active state: gold bottom border.
 * No background fill on active — color shift only.
 *
 * Grid: 3 columns desktop, 2 tablet, 1 mobile.
 * Initial render: 6 projects max. "Show more" reveals rest.
 *
 * Status badge mapping:
 *   live         → gold border, gold text
 *   in-progress  → border-border, muted text
 *   archived     → ghost text, no border
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project, FilterValue } from "../../lib/types";
import { FILTERS } from "../../lib/types";
import { ProjectCard } from "../ui/ProjectCard";
import { Button } from "../ui/Button";

const INITIAL_VISIBLE = 6;

// ── Main client component ─────────────────────────────────────

export function WorkClient({
  featured,
  rest,
}: {
  featured: Project[];
  rest: Project[];
}) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showAll, setShowAll] = useState(false);

  // 1. FILTER LOGIC:
  // We only filter the 'rest' array. Featured projects bypass this logic
  // and are always displayed at the top regardless of the selected category.
  // Filter rest projects (featured are never filtered)
  const filtered =
    filter === "all"
      ? rest
      : rest.filter((p) =>
          p.category.includes(filter as Project["category"][number]),
        );

  // 2. PAGINATION / VISIBILITY LOGIC:
  // If 'showAll' is true, render all filtered projects.
  // Otherwise, slice the array to show only the initial limit (6 projects).
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  // Boolean flag to determine if the "Show More" button should be rendered.
  const hasMore = filtered.length > INITIAL_VISIBLE;

  // Calculate exactly how many projects are hidden to display in the button.
  const hiddenCount = filtered.length - INITIAL_VISIBLE;

  // 3. BADGE COUNTERS LOGIC:
  // Iterate through all possible filters to calculate how many projects
  // belong to each category. This populates the numbers next to the filter labels.
  const counts = FILTERS.reduce<Record<FilterValue, number>>(
    (acc, { value }) => {
      acc[value] =
        value === "all"
          ? rest.length
          : rest.filter((p) =>
              p.category.includes(value as Project["category"][number]),
            ).length;
      return acc;
    },
    {} as Record<FilterValue, number>,
  );

  // 4. EVENT HANDLER: FILTER CHANGE
  // When a user clicks a new filter category, we update the active filter
  // and immediately collapse the grid back to its initial state (INITIAL_VISIBLE).
  function handleFilterChange(value: FilterValue) {
    setFilter(value);
    setShowAll(false);
  }

  // 5. EVENT HANDLER: SHOW LESS & SCROLL
  // Collapses the grid and smoothly scrolls the user's viewport back up
  // to the filter bar to prevent layout-shift disorientation.
  function handleShowLess() {
    setShowAll(false);

    // Small timeout ensures the DOM has painted the collapsed state
    // before the browser calculates the smooth scroll distance.
    setTimeout(() => {
      document.getElementById("project-filters")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 10);
  }

  return (
    <div>
      {/* ── Featured projects — always visible ─────────────── */}
      {featured.length > 0 && (
        <div className="flex flex-col gap-4 mb-12">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} size="featured" />
          ))}
        </div>
      )}

      {/* ── Filter bar ─────────────────────────────────────── */}
      <div id="project-filters" className="scroll-mt-32">
        <FilterBar
          active={filter}
          onChange={handleFilterChange}
          counts={counts}
        />
      </div>

      {/* ── Project grid ───────────────────────────────────── */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        // Empty state when a specific filter has no projects
        <div className="border border-border py-16 flex flex-col items-center gap-4">
          <span className="text-label">No projects in this category yet.</span>
        </div>
      )}

      {/* ── Show more Button ──────────────────────────────────────── */}
      {hasMore && !showAll && (
        <div className="mt-8 flex gap-5 justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            className="group"
          >
            Show{" "}
            <span className="group-hover:text-gold transition-base">
              {hiddenCount}
            </span>{" "}
            more <span>{filter === "all" ? "" : `in ${filter}`}</span>
          </Button>
        </div>
      )}

      {/* ── Show less — collapses back ──────────────────────── */}
      {showAll && filtered.length > INITIAL_VISIBLE && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={handleShowLess}>
            Show less
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Filter bar ────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
}) {
  return (
    <div
      role="toolbar"
      aria-label="Filter projects by technology"
      className="
        flex items-center
        border border-border mb-10
        overflow-x-auto hide-scrollbar
      "
    >
      {FILTERS.map(({ label, value }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            className={cn(
              "text-label shrink-0 whitespace-nowrap px-5 py-3",
              "border-e border-border last:border-e-0",
              "transition-base",
              "flex items-center gap-2",
              isActive
                ? "text-text bg-surface"
                : "text-ghost hover:text-muted hover:bg-surface/50",
            )}
          >
            {label}
            <span
              className={cn(
                "text-label transition-base",
                isActive ? "text-gold" : "text-ghost",
              )}
            >
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
