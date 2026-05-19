/**
 * HeroSection.tsx — Server Component (revised: no portrait)
 *
 * Without a portrait, the composition shifts entirely to typography
 * and structured data. The layout becomes a magazine spread:
 * left column holds the cinematic voice (Fraunces headlines),
 * right column holds the technical identity (stats, terminal, stack).
 *
 * This is stronger than a placeholder image. The data IS the portrait.
 *
 * Layout:
 *   Desktop: 55% content / 45% metadata panel
 *   Mobile:  single column, metadata panel below content
 *
 * The metadata panel contains three blocks:
 *   1. Stats grid — years, projects, problems, score
 *   2. Terminal block — role, location, status with blinking cursor
 *   3. Stack row — current tech in mono uppercase
 *
 * All data is static — no client JS, no database.
 * The terminal cursor blink uses .cursor-blink from globals.css.
 */

import { HeroContentTwo }        from "./HeroContentTwo";
import { HeroMetaPanel }      from "./HeroMetaPanel";

interface HeroSectionProps {
  /** Override any hero content from the parent page */
  content?: React.ComponentProps<typeof HeroContentTwo>;
}

function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      className="
        absolute bottom-6 start-0 end-0
        flex flex-col items-center gap-2
        pointer-events-none
      "
    >
      <span className="block w-px h-8 bg-border relative overflow-hidden">
        <span
          className="absolute inset-x-0 top-0 h-1/2 bg-gold"
          style={{
            animation: "scrollPulse 1.8s cubic-bezier(0.25,0,0,1) infinite",
          }}
        />
      </span>
      <p className="text-label text-ghost" style={{ fontSize: "9px" }}>
        scroll
      </p>
    </div>
  );
}

export function HeroSectionTwo({ content }: HeroSectionProps) {
  return (
    <>
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
          relative min-h-[100dvh]
          pt-16 pb-16
          border-b border-border
          overflow-hidden
        "
        aria-label="Introduction"
      >
        <div className="container-content h-full">
          <div className="
            grid grid-cols-1 lg:grid-cols-[55fr_45fr]
            gap-12 lg:gap-0
            min-h-[calc(100dvh-8rem)]
            items-center
          ">

            {/* ── Left: Cinematic content ─────────────────── */}
            <div className="lg:pe-16 lg:border-e lg:border-border flex flex-col justify-center">
              <HeroContentTwo {...content} />
            </div>

            {/* ── Right: Metadata panel ───────────────────── */}
            <div className="lg:ps-12 flex flex-col justify-center">
              <HeroMetaPanel />
            </div>

          </div>
        </div>

        <ScrollIndicator />
      </section>
    </>
  );
}