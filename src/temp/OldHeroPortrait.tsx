/**
 * HeroPortrait.tsx — "use client"
 *
 * The visual anchor of the Hero. Absolutely positioned on the right,
 * bleeding to the screen edge with no container padding.
 *
 * Chiaroscuro treatment:
 *   - At rest: grayscale(100%) contrast(1.15) brightness(0.82)
 *     The image almost merges with the dark background — intentional.
 *     Only the lit areas of the face are clearly visible.
 *   - On hover: grayscale(0%) — color returns slowly (600ms)
 *     This is the "coming alive" moment. The human reveals itself.
 *
 * The left edge gradient (bg → transparent) blends the image into
 * the content area without a hard cut. The text can safely overlap
 * the image in this transition zone.
 *
 * Architectural placeholder: shown when no src is provided.
 * Uses the same blueprint grid pattern from our design language.
 *
 * Framer Motion: entrance only — fades in from opacity 0 with
 * a 300ms delay (after the coordinates label appears but before
 * the headline — the portrait and text load together, not sequentially).
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────

interface HeroPortraitProps {
  src?: string;
  alt?: string;
  className?: string;
}

// ── Architectural placeholder ──────────────────────────────────

function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 bg-surface flex items-center justify-center overflow-hidden">
      {/* Blueprint grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="portrait-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="var(--border-default)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portrait-grid)" />
      </svg>

      {/* Center annotation */}
      <div className="relative flex flex-col items-center gap-2 text-center">
        <span className="text-label text-ghost">Portrait</span>
        <span
          className="block w-6 h-px bg-gold opacity-40"
          aria-hidden="true"
        />
        <span className="text-label text-ghost">Chiaroscuro</span>
        <span className="text-label text-ghost opacity-50">
          400 × 600px recommended
        </span>
      </div>

      {/* Coordinate overlay */}
      <div className="absolute bottom-0 inset-x-0 bg-code-bg/80 px-4 py-2">
        <p className="text-label text-ghost" style={{ fontSize: "9px" }}>
          30.0444° N, 31.2357° E
        </p>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────

export function HeroPortrait({
  src,
  alt = "Portrait",
  className,
}: HeroPortraitProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn("relative w-full h-full", className)}
      // Entrance: portrait fades in from opacity 0
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.9,
        ease: [0.25, 0, 0, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {src ? (
        <>
          {/* The actual portrait image */}
          <Image
            src={src}
            alt={alt}
            fill
            priority // LCP element — load immediately
            sizes="(max-width: 768px) 0vw, 40vw"
            className="object-cover object-top"
            style={{
              // Chiaroscuro filter treatment
              filter: hovered
                ? "grayscale(0%) contrast(1.05) brightness(0.95)"
                : "grayscale(100%) contrast(1.15) brightness(0.82)",
              transition: "filter 600ms cubic-bezier(0.25, 0, 0, 1)",
            }}
          />

          {/* Left-edge gradient — blends image into content area */}
          {/* This is what allows the headline text to overlap    */}
          <div
            className="absolute inset-y-0 inset-s-0 w-32 pointer-events-none"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to right, var(--bg), transparent)",
            }}
          />

          {/* Bottom gradient — fades the portrait into the page  */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to top, var(--bg), transparent)",
            }}
          />
        </>
      ) : (
        <PortraitPlaceholder />
      )}
    </motion.div>
  );
}
