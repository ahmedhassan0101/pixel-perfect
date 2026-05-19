/**
 * HeroContent.tsx — "use client" (revised: no portrait)
 *
 * Without a portrait competing for attention on the right,
 * the left column becomes more spacious and deliberate.
 * The headline can breathe more — max-w removed from h1,
 * letting Fraunces fill the full column width.
 *
 * Body copy tightened to 40ch — one precise sentence.
 * CTAs remain at the bottom, availability badge last.
 *
 * Animation choreography unchanged:
 *   0ms    → coordinates
 *   180ms  → role label
 *   400ms  → headline line 1
 *   600ms  → headline line 2 + italic gold
 *   880ms  → gold divider (scaleX)
 *   1050ms → body copy
 *   1280ms → CTAs
 *   1500ms → availability badge
 */

"use client";

import { motion }            from "framer-motion";
import { ArrowRight }        from "lucide-react";
import { Button }            from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/Badges";
import { cn }                from "@/lib/utils";

const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 12 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay: delay / 1000, duration: 0.6, ease: EASE },
});

const fadeIn = (delay: number) => ({
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { delay: delay / 1000, duration: 0.5, ease: EASE },
});

export interface HeroContentProps {
  coordinates?:  string;
  role?:         string;
  headlineOne?:  string;
  headlineTwo?:  string;
  headlineEm?:   string;
  body?:         string;
  ctaPrimary?:   string;
  ctaSecondary?: string;
  available?:    string;
  className?:    string;
}

export function HeroContentTwo({
  coordinates  = "33.8869° N · 9.5375° E · v2.0",
  role         = "Full-Stack Engineer",
  headlineOne  = "I engineer systems",
  headlineTwo  = "with cinematic",
  headlineEm   = "warmth.",
  body         = "Node.js to Next.js — from schema to the pixel you see right now.",
  ctaPrimary   = "View the Work",
  ctaSecondary = "Let's Talk",
  available    = "Available for new projects",
  className,
}: HeroContentProps) {
  return (
    <div className={cn("flex flex-col", className)}>

      {/* ── Coordinates ──────────────────────────────────── */}
      <motion.p
        className="text-label text-ghost mb-6"
        {...fadeUp(0)}
      >
        {coordinates}
      </motion.p>

      {/* ── Role ─────────────────────────────────────────── */}
      <motion.p
        className="text-label text-gold mb-8 flex items-center gap-2"
        {...fadeUp(180)}
      >
        <span aria-hidden="true">§</span>
        {role}
      </motion.p>

      {/* ── Headline ─────────────────────────────────────── */}
      {/* Full column width — no max-w constraint           */}
      <h1 className="mb-0">
        <motion.span
          className="block text-display text-text"
          {...fadeUp(400)}
        >
          {headlineOne}
        </motion.span>
        <motion.span
          className="block text-display text-muted"
          {...fadeUp(600)}
        >
          {headlineTwo}{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
            {headlineEm}
          </em>
        </motion.span>
      </h1>

      {/* ── Gold divider ─────────────────────────────────── */}
      <motion.span
        aria-hidden="true"
        className="block h-px bg-gold mt-8"
        style={{ width: "2rem" }}
        initial={{ scaleX: 0, originX: "0%" }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.88, duration: 0.4, ease: EASE }}
      />

      {/* ── Body ─────────────────────────────────────────── */}
      <motion.p
        className="text-body text-muted mt-6 max-w-[40ch]"
        {...fadeUp(1050)}
      >
        {body}
      </motion.p>

      {/* ── CTAs ─────────────────────────────────────────── */}
      <motion.div
        className="flex flex-wrap items-center gap-4 mt-10"
        {...fadeIn(1280)}
      >
        <Button
          variant="primary"
          size="md"
          iconEnd={<ArrowRight size={14} />}
          onClick={() =>
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {ctaPrimary}
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {ctaSecondary}
        </Button>
      </motion.div>

      {/* ── Availability ─────────────────────────────────── */}
      <motion.div className="mt-8" {...fadeIn(1500)}>
        <AvailabilityBadge label={available} />
      </motion.div>

    </div>
  );
}