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

import { useState }        from "react";
import { ArrowUpRight } from "lucide-react";
import { cn }              from "@/lib/utils";
import type { Project, FilterValue } from "./types";
import { FILTERS }         from "./types";

const INITIAL_VISIBLE = 6;

// ── Status badge ──────────────────────────────────────────────

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "live") {
    return (
      <span className="text-label border border-gold text-gold px-2 py-0.5 rounded-none">
        Live
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="text-label border border-border text-muted px-2 py-0.5 rounded-none">
        In progress
      </span>
    );
  }
  return (
    <span className="text-label text-ghost px-2 py-0.5">
      Archived
    </span>
  );
}

// ── Project card ──────────────────────────────────────────────

function ProjectCard({
  project,
  size = "default",
}: {
  project: Project;
  size?: "featured" | "default";
}) {
  const isFeatured = size === "featured";

  return (
    <article
      className={cn(
        "group flex flex-col",
        "bg-bg border border-border",
        "transition-base hover:border-border-em",
        isFeatured && "lg:flex-row",
      )}
    >
      {/* ── Image placeholder ─────────────────────────────── */}
      <div
        className={cn(
          "bg-elevated flex items-center justify-center shrink-0",
          "border-b border-border group-hover:border-border-em transition-base",
          isFeatured
            ? "lg:w-80 lg:border-b-0 lg:border-e h-48 lg:h-auto"
            : "h-36",
        )}
        aria-hidden="true"
      >
        {/* Blueprint grid placeholder */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          className="text-border-em"
        >
          <rect x="2" y="2" width="20" height="20" />
          <path d="M2 8h20M8 22V8" />
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className={cn("flex flex-col flex-1 p-6", isFeatured && "lg:p-8")}>

        {/* Top row: index + year + status */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-label text-ghost">
            {project.id} · {project.year}
          </span>
          <StatusBadge status={project.status} />
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-text mb-3 font-serif transition-base group-hover:text-gold",
            isFeatured ? "text-subheading" : "text-body font-medium",
          )}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 300,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-body text-muted leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-label text-ghost border border-border px-2 py-0.5 rounded-none"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 pt-5 border-t border-border">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-label text-muted
                flex items-center gap-1.5
                transition-base hover:text-text hover:underline-gold
              "
            >
              <ArrowUpRight size={12} aria-hidden />
              View live
            </a>
          ) : (
            <span className="text-label text-ghost">No live demo</span>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-label text-muted
                flex items-center gap-1.5
                transition-base hover:text-text hover:underline-gold
              "
            >
              <ArrowUpRight size={12} aria-hidden />
              Repository
            </a>
          )}
        </div>

      </div>
    </article>
  );
}

// ── Filter bar ────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
  counts,
}: {
  active:   FilterValue;
  onChange: (v: FilterValue) => void;
  counts:   Record<FilterValue, number>;
}) {
  return (
    <div
      role="toolbar"
      aria-label="Filter projects by technology"
      className="
        flex flex-wrap items-center gap-0
        border border-border mb-10
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
              "text-label px-5 py-3",
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

// ── Main client component ─────────────────────────────────────

export function WorkClient({
  featured,
  rest,
}: {
  featured: Project[];
  rest:     Project[];
}) {
  const [filter,      setFilter]      = useState<FilterValue>("all");
  const [showAll,     setShowAll]      = useState(false);

  // Filter rest projects (featured are never filtered)
  const filtered = filter === "all"
    ? rest
    : rest.filter((p) => p.category.includes(filter as Project["category"][number]));

  // Show more logic
  const visible      = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore      = filtered.length > INITIAL_VISIBLE;
  const hiddenCount  = filtered.length - INITIAL_VISIBLE;

  // Counts for filter bar
  const counts = FILTERS.reduce<Record<FilterValue, number>>(
    (acc, { value }) => {
      acc[value] = value === "all"
        ? rest.length
        : rest.filter((p) => p.category.includes(value as Project["category"][number])).length;
      return acc;
    },
    {} as Record<FilterValue, number>,
  );

  // Reset show more when filter changes
  function handleFilterChange(value: FilterValue) {
    setFilter(value);
    setShowAll(false);
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
      <FilterBar
        active={filter}
        onChange={handleFilterChange}
        counts={counts}
      />

      {/* ── Project grid ───────────────────────────────────── */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="border border-border py-16 flex flex-col items-center gap-4">
          <span className="text-label text-ghost">
            No projects in this category yet.
          </span>
        </div>
      )}

      {/* ── Show more ──────────────────────────────────────── */}
      {hasMore && !showAll && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="
              text-label text-muted
              border border-border
              px-6 py-3
              transition-base
              hover:border-border-em hover:text-text
            "
          >
            Show {hiddenCount} more{" "}
            <span className="text-ghost">
              {filter === "all" ? "" : `in ${filter}`}
            </span>
          </button>
        </div>
      )}

      {/* ── Show less — collapses back ──────────────────────── */}
      {showAll && filtered.length > INITIAL_VISIBLE && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="
              text-label text-ghost
              transition-base hover:text-muted
            "
          >
            Show less
          </button>
        </div>
      )}

    </div>
  );
}