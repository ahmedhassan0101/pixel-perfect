import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";

import { Badge } from "./Badges";
import { LinkBtn } from "./Button";

export function ProjectCard({
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
          "bg-elevated relative overflow-hidden shrink-0",
          "border-b border-border group-hover:border-border-em transition-base",
          isFeatured
            ? "lg:w-96 lg:border-b-0 lg:border-e h-52 lg:h-auto"
            : "h-52",
        )}
        aria-hidden="true"
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 img-cinematic-warm "
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
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
        )}
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className={cn("flex flex-col flex-1 p-6", isFeatured && "lg:p-8")}>
        {/* Top row: index + year + status */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-label text-ghost">
            {project.id} · {project.year}
          </span>
          <Badge variant={project.status}>
            {project.status.replace("-", " ")}
          </Badge>
        </div>

        {/* Title */}

        <h3
          className={cn(
            "text-text font-serif! transition-base group-hover:text-gold",
            isFeatured ? "text-subheading" : "text-body font-medium!",
          )}
        >
          {project.title}
        </h3>
        {/* Description */}
        <p className="text-body text-muted flex-1 mb-6">
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="tech">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 pt-5 border-t border-border mt-auto">
          {project.liveUrl ? (
            <LinkBtn href={project.liveUrl}>
              <ArrowUpRight size={12} aria-hidden />
              View live
            </LinkBtn>
          ) : (
            <span className="text-label text-ghost">No live demo</span>
          )}

          {project.repoUrl && (
            <LinkBtn href={project.repoUrl}>
              <ArrowUpRight size={12} aria-hidden />
              Repository
            </LinkBtn>
          )}
        </div>
      </div>
    </article>
  );
}
