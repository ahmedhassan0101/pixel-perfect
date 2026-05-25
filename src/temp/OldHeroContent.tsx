// /**
//  * HeroContent.tsx — "use client"
//  *
//  * The animated layer of the Hero. Receives all content as props
//  * from the Server Component parent (HeroSection.tsx) — this keeps
//  * the "use client" boundary minimal and data fetching on the server.
//  *
//  * Animation choreography (staggered entrance):
//  *   0ms    → meta label (Geist Mono coordinates)
//  *   200ms  → section label (§ role)
//  *   450ms  → headline line 1
//  *   650ms  → headline line 2 + italic gold word
//  *   950ms  → gold accent divider (width: 0 → 32px)
//  *   1150ms → body copy
//  *   1400ms → CTAs
//  *   1650ms → availability badge
//  *
//  * All reveals: Y drift 14px → 0 + opacity 0 → 1.
//  * Exception: gold divider uses scaleX, CTAs use opacity only.
//  * No blur reveals on text. No bouncy spring physics.
//  *
//  * Easing: easeOut custom curve for entrances (0.25, 0, 0, 1).
//  * Duration: 0.65s for text, 0.4s for structural elements.
//  */

// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/Button";
// import { AvailabilityBadge } from "@/components/ui/Badges";
// import { cn } from "@/lib/utils";

// // ── Animation primitives ──────────────────────────────────────

// const EASE = [0.25, 0, 0, 1] as const; // our --ease-in curve

// /** Reusable fade + Y drift variant */
// const fadeUp = (delay: number) => ({
//   initial: { opacity: 0, y: 14 },
//   animate: { opacity: 1, y: 0 },
//   transition: {
//     delay: delay / 1000,
//     duration: 0.65,
//     ease: EASE,
//   },
// });

// /** Opacity-only variant — for elements that must not shift */
// const fadeIn = (delay: number) => ({
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   transition: {
//     delay: delay / 1000,
//     duration: 0.5,
//     ease: EASE,
//   },
// });

// /** Gold line: scaleX from 0 → 1, origin left */
// const lineReveal = {
//   initial: { scaleX: 0, originX: 0 },
//   animate: { scaleX: 1 },
//   transition: {
//     delay: 0.95,
//     duration: 0.4,
//     ease: EASE,
//   },
// };

// // ── Types ─────────────────────────────────────────────────────

// interface HeroContentProps {
//   coordinates?: string;
//   role?: string;
//   headlineLineOne?: string;
//   headlineLineTwo?: string;
//   headlineEmWord?: string; // italic gold word at end of line two
//   body?: string;
//   ctaPrimary?: string;
//   ctaSecondary?: string;
//   availableLabel?: string;
//   className?: string;
// }

// // ── Component ─────────────────────────────────────────────────

// export function HeroContent({
//   coordinates = "30.0444° N, 31.2357° E",
//   role = "Full-Stack Engineer",
//   headlineLineOne = "I engineer systems",
//   headlineLineTwo = "with",
//   headlineEmWord = "warmth.",
//   body = "Node.js to Next.js — from schema to the pixel you see right now.",
//   ctaPrimary = "View the Work",
//   ctaSecondary = "Let's Talk",
//   availableLabel = "Available for new projects",
//   className,
// }: HeroContentProps) {
//   return (
//     <div className={cn("flex flex-col", className)}>
//       {/* ── Layer 1: Coordinates (data / context) ─────────── */}
//       {/* Appears first — the most abstract, sets the frame    */}
//       <motion.p className="text-label text-ghost mb-6" {...fadeUp(0)}>
//         {coordinates}
//       </motion.p>

//       {/* ── Layer 2: Role label ───────────────────────────── */}
//       <motion.p
//         className="text-label text-gold mb-8 flex items-center gap-2"
//         {...fadeUp(200)}
//       >
//         <span aria-hidden="true">§</span>
//         <span>{role}</span>
//       </motion.p>

//       {/* ── Layer 3: Display headline ─────────────────────── */}
//       <h1 className="mb-0">
//         {/* Line one — full color */}
//         <motion.span className="block text-display text-text" {...fadeUp(450)}>
//           {headlineLineOne}
//         </motion.span>

//         {/* Line two — muted base + italic gold em at end */}
//         <motion.span className="block text-display text-muted" {...fadeUp(650)}>
//           {headlineLineTwo}{" "}
//           <em
//             className="text-em not-italic"
//             // not-italic resets browser default — the gold IS the emphasis
//             // Fraunces italic is controlled via font-variation-settings
//             style={{ fontStyle: "italic" }}
//           >
//             {headlineEmWord}
//           </em>
//         </motion.span>
//       </h1>

//       {/* ── Layer 4: Gold accent line ─────────────────────── */}
//       <motion.span
//         aria-hidden="true"
//         className="block w-8 h-px bg-gold mt-8 mb-0"
//         {...lineReveal}
//       />

//       {/* ── Layer 5: Body copy ────────────────────────────── */}
//       <motion.p
//         className="text-body text-muted mt-6 max-w-[46ch]"
//         {...fadeUp(1150)}
//       >
//         {body}
//       </motion.p>

//       {/* ── Layer 6: CTAs ─────────────────────────────────── */}
//       {/* Opacity only — buttons must not appear to float in  */}
//       <motion.div
//         className="flex flex-wrap items-center gap-4 mt-10"
//         {...fadeIn(1400)}
//       >
//         <Button
//           variant="primary"
//           size="md"
//           iconEnd={<ArrowRight size={14} />}
//           onClick={() => {
//             document
//               .getElementById("work")
//               ?.scrollIntoView({ behavior: "smooth" });
//           }}
//         >
//           {ctaPrimary}
//         </Button>
//         <Button
//           variant="ghost"
//           size="md"
//           onClick={() => {
//             document
//               .getElementById("contact")
//               ?.scrollIntoView({ behavior: "smooth" });
//           }}
//         >
//           {ctaSecondary}
//         </Button>
//       </motion.div>

//       {/* ── Layer 7: Availability badge ───────────────────── */}
//       {/* Last — the only moving element after load completes  */}
//       <motion.div className="mt-10" {...fadeIn(1650)}>
//         <AvailabilityBadge label={availableLabel} />
//       </motion.div>
//     </div>
//   );
// }
/**
 * HeroContent.tsx — "use client"
 * Revised: single viewport height. The hero announces, it does not explain.
 *
 * Choreography:
 *   0ms    → coordinates
 *   180ms  → role label
 *   400ms  → headline line 1
 *   600ms  → headline line 2 + italic gold
 *   880ms  → gold divider (scaleX)
 *   1050ms → body (one sentence only)
 *   1280ms → CTAs (opacity only)
 *   1500ms → availability badge
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0, 0, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: delay / 1000, duration: 0.6, ease: EASE },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: delay / 1000, duration: 0.5, ease: EASE },
});

export interface HeroContentProps {
  coordinates?: string;
  role?: string;
  headlineOne?: string;
  headlineTwo?: string;
  headlineEm?: string;
  body?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  available?: string;
  className?: string;
}

export function HeroContent({
  coordinates = "30.0444° N · 31.2357° E",
  role = "Full-Stack Engineer",
  headlineOne = "I engineer systems",
  headlineTwo = "with cinematic",
  headlineEm = "warmth.",
  body = "Node.js to Next.js — from schema to the pixel you see right now.",
  ctaPrimary = "View the Work",
  ctaSecondary = "Let's Talk",
  available = "Available for new projects",
  className,
}: HeroContentProps) {
  return (
    <div className={cn("flex flex-col justify-center", className)}>
      <motion.p className="text-label text-ghost mb-5" {...fadeUp(0)}>
        {coordinates}
      </motion.p>

      <motion.p
        className="text-label text-gold mb-7 flex items-center gap-2"
        {...fadeUp(180)}
      >
        <span aria-hidden="true">§</span>
        {role}
      </motion.p>

      <h1 className="mb-0 leading-none">
        <motion.span className="block text-display text-text" {...fadeUp(400)}>
          {headlineOne}
        </motion.span>
        <motion.span className="block text-display text-muted" {...fadeUp(600)}>
          {headlineTwo}{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
            {headlineEm}
          </em>
        </motion.span>
      </h1>

      <motion.span
        aria-hidden="true"
        className="block h-px bg-gold mt-7"
        initial={{ scaleX: 0, originX: "0%", width: "2rem" }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.88, duration: 0.4, ease: EASE }}
      />

      <motion.p
        className="text-body text-muted mt-5 max-w-[40ch]"
        {...fadeUp(1050)}
      >
        {body}
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center gap-4 mt-8"
        {...fadeIn(1280)}
      >
        <Button
          variant="primary"
          size="md"
          iconEnd={<ArrowRight size={14} />}
          onClick={() =>
            document
              .getElementById("work")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {ctaPrimary}
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {ctaSecondary}
        </Button>
      </motion.div>

      <motion.div className="mt-8" {...fadeIn(1500)}>
        <AvailabilityBadge label={available} />
      </motion.div>
    </div>
  );
}
