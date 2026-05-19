/**
 * Card.tsx
 *
 * Philosophical Reasoning:
 * Cards in this system do not float — they sit. No shadows by default.
 * Depth is expressed through background contrast: bg-surface (#1A1916)
 * against bg (#0F0E0C) creates a 1-stop lift that the eye reads as
 * hierarchy without any drop shadow theatrics.
 *
 * The hover interaction is the border shifting from border-default to
 * border-em — a barely-visible change that rewards attention without
 * demanding it. No scale. No lift. No glow.
 *
 * The elevated variant gets the single shadow defined in the manifesto.
 * It is used only for featured or modal-level content — used twice on
 * a page it loses meaning entirely.
 *
 * Compound pattern (Card.Root / Card.Header / Card.Body / Card.Footer /
 * Card.Image) gives callers full layout control while enforcing the
 * visual contract at the container level. Each sub-component is typed
 * independently so TypeScript catches structural misuse.
 */

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────

export type CardVariant = "default" | "elevated";

export interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

// ── Sub-components ────────────────────────────────────────────

/** Mono gold label + title — the chapter opener inside a card */
function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start justify-between gap-3 px-6 pt-6 pb-0", className)}
      {...props}
    />
  );
}

/** Main content area — generous padding, no opinion on layout */
function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-5", className)} {...props} />
  );
}

/** Links and actions — sits at the bottom, separated by a border */
function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-6 pb-5 pt-0",
        "border-t border-border mt-auto",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Image slot — zero radius, fills full width.
 * Applies .img-cinematic: grayscale(20%) at rest, full saturation on hover.
 * Pass a placeholder node as children when no real image is available.
 */
function CardImage({
  src,
  alt = "",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string }) {
  return (
    <div
      className={cn(
        "relative w-full h-44 bg-elevated overflow-hidden",
        className,
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="img-cinematic w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        // Architectural placeholder — shown when no image is provided
        <div className="absolute inset-0 flex items-center justify-center bg-elevated">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-border-em"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" />
            <path d="M3 9h18M9 21V9" />
          </svg>
          {/* Slot for overlay badges */}
          {children && (
            <div className="absolute bottom-3 start-3 end-3 flex flex-wrap gap-1.5">
              {children}
            </div>
          )}
        </div>
      )}
      {/* Overlay slot when src exists */}
      {src && children && (
        <div className="absolute bottom-3 start-3 end-3 flex flex-wrap gap-1.5">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────

function CardRoot({ variant = "default", className, children, ...props }: CardRootProps) {
  return (
    <div
      className={cn(
        // ── Base ─────────────────────────────────────────
        "flex flex-col",
        "bg-surface border border-border",
        "rounded-card",              // 4px — approachable, not soft
        "transition-base",
        // ── Variant ──────────────────────────────────────
        variant === "default"  && "hover:border-border-em",
        variant === "elevated" && "shadow-card",
        className,
      )}
      style={variant === "elevated" ? { boxShadow: "var(--shadow-card)" } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Compound export ───────────────────────────────────────────

/**
 * Usage:
 *   <Card.Root>
 *     <Card.Image src="..." alt="...">
 *       <TechBadge>Next.js</TechBadge>
 *     </Card.Image>
 *     <Card.Header>
 *       <p className="text-label text-gold">§ PROJECT</p>
 *     </Card.Header>
 *     <Card.Body>
 *       <h3 className="text-heading">SaaS Platform</h3>
 *       <p className="text-body text-muted">...</p>
 *     </Card.Body>
 *     <Card.Footer>
 *       <Button variant="ghost" iconEnd={<ArrowRight />}>Live</Button>
 *     </Card.Footer>
 *   </Card.Root>
 */
export const Card = {
  Root:   CardRoot,
  Header: CardHeader,
  Body:   CardBody,
  Footer: CardFooter,
  Image:  CardImage,
};