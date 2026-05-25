/**
 * HeroSection.tsx — Server Component
 *
 * The film's opening shot. The Prologue.
 *
 * This is the orchestrator — a Server Component that holds all the
 * data and composition decisions, passing them down to the two
 * client components that need browser APIs:
 *
 *   HeroPortrait  → hover filter (useState)
 *   HeroContent   → Framer Motion entrance animations
 *
 * Layout composition:
 *   - Full viewport height (100dvh) minus the navbar height (64px)
 *   - Two-column grid on desktop: content 55% / portrait 45%
 *   - Portrait is absolutely positioned, bleeds to the right edge
 *     of the viewport — NOT constrained by the container
 *   - Content sits in the container-content, left-aligned
 *   - On mobile: portrait hidden, content is full-width
 *
 * The scroll indicator at the bottom is a Server Component — purely
 * decorative, CSS animation only, zero client JS needed.
 *
 * Padding-top: 64px to clear the fixed navbar.
 * The navbar is transparent at the top so this is purely spatial.
 */

import { HeroContent } from "./OldHeroContent";
import { HeroPortrait } from "./OldHeroPortrait";

// ── Types ─────────────────────────────────────────────────────

interface HeroSectionProps {
  /**
   * Path to the portrait image.
   * Should be a Chiaroscuro-lit portrait: dark bg, single light source.
   * Recommended dimensions: 800 × 1200px or similar 2:3 ratio.
   * Pass undefined to show the architectural placeholder.
   */
  portraitSrc?: string;
  portraitAlt?: string;
}

// ── Scroll indicator — pure CSS, Server Component ─────────────

function ScrollIndicator() {
  return (
    <div
      className="
        absolute bottom-6 inset-s-0 inset-e-0
        flex flex-col items-center gap-2
        pointer-events-none
      "
      aria-hidden="true"
    >
      {/* Vertical line that pulses down */}
      <span className="block w-px h-8 bg-border relative overflow-hidden">
        <span
          className="absolute inset-x-0 top-0 h-1/2 bg-gold"
          style={{
            animation: "scrollPulse 1.8s cubic-bezier(0.25, 0, 0, 1) infinite",
          }}
        />
      </span>
      <p className="text-label text-ghost" style={{ fontSize: "9px" }}>
        scroll
      </p>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────

export function HeroSection({
  portraitSrc,
  portraitAlt = "Portrait",
}: HeroSectionProps) {
  return (
    <>
      {/* ── Scroll pulse keyframe — injected once, server-side ── */}
      <style>{`
        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(200%);  opacity: 0; }
        }
      `}</style>

      <section
        id="hero"
        className="
          relative
          min-h-dvh
          pt-16
          overflow-hidden
          border-b border-border
        "
        aria-label="Introduction"
      >
        {/* ── Portrait — absolutely positioned, right edge ────── */}
        {/* Sits behind the content layer (z-0) on desktop.       */}
        {/* Hidden on mobile — portrait doesn't compress well.    */}
        <div
          className="
            hidden lg:block
            absolute top-0 bottom-0
            z-0
          "
          style={{
            right: 0,
            width: "45%",
            left: "auto",
          }}
        >
          <HeroPortrait src={portraitSrc} alt={portraitAlt} />
        </div>

        {/* ── Content — sits above portrait (z-10) ────────────── */}
        <div className="relative z-10 container-content h-full">
          <div
            className="
              flex flex-col justify-center
              min-h-[calc(100dvh-4rem)]
              py-section-sm
              lg:max-w-[58%]
            "
          >
            <HeroContent />
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────── */}
        <ScrollIndicator />
      </section>
    </>
  );
}
