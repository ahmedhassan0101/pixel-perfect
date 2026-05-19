// src/app/page.tsx
// ─────────────────────────────────────────────────────────────
// The complete portfolio page.
// Assembly order matches the narrative arc:
//
//   Atmosphere  → GrainOverlay (always on, z-9999)
//   Navigation  → Navbar (ghost → solid on scroll)
//   ──────────────────────────────────────────────
//   §01 Hero    → The Prologue     (who I am)
//   §02 Manifesto → The Identity   (how I think)
//   §03 Work    → The Artifacts    (what I built)
//   §04 Stack   → The Architecture (how I build)
//   §05 Contact → The Sign-off     (let's talk)
//   ──────────────────────────────────────────────
//   Footer      → Punctuation
//
// Every section is a Server Component.
// Client JS lives only where browser APIs are required.
// ─────────────────────────────────────────────────────────────

import { GrainOverlay }       from "@/components/ui/GrainOverlay";
import { Navbar }             from "@/components/layout/Navbar";
import { HeroSection }        from "@/components/sections/HeroSection";
import { ManifestoSection }   from "@/components/sections/ManifestoSection";
import { WorkSection }        from "@/components/sections/WorkSection";

// Stack: choose ONE and rename it StackSection
import { StackTableVariation as StackSection }
  from "@/components/sections/StackSection";
// import { StackGridVariation as StackSection }
//   from "@/components/sections/StackSection";

import { ContactSection, SiteFooter }
  from "@/components/sections/ContactSection";

import type { Metadata } from "next";
import { HeroSectionTwo } from "@/components/sections/HeroSectionTwo";

// ── Page metadata ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Full-Stack Engineer — Portfolio",
  description:
    "I engineer systems with structural rigor, and design interfaces with cinematic warmth. Node.js · Next.js · React.",
  openGraph: {
    title:       "Full-Stack Engineer — Portfolio",
    description: "Systems built to last. Interfaces built to feel.",
    type:        "website",
  },
};

// ── Page ──────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Atmosphere — fixed, GPU, always on ──────────── */}
      <GrainOverlay />

      {/* ── Navigation ──────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ─────────────────────────────────── */}
      <main id="main-content">

        {/* § 01 — The Prologue */}
        <HeroSection />
        <HeroSectionTwo />

        {/* § 02 — The Identity */}
        <ManifestoSection />

        {/* § 03 — The Artifacts */}
        <WorkSection />

        {/* § 04 — The Architecture */}
        <StackSection />

        {/* § 05 — The Sign-off */}
        <ContactSection />

      </main>

      {/* ── Punctuation ──────────────────────────────────── */}
      <SiteFooter />
    </>
  );
}

// //
// // Note: GrainOverlay and Navbar are rendered here at the page level
// // so they sit outside the section and cover the full viewport.
// // In production, move Navbar to layout.tsx if it persists across routes.

// import { GrainOverlay } from "@/components/ui/GrainOverlay";
// import { Navbar } from "@/components/layout/Navbar";
// import { HeroSection } from "@/components/sections/HeroSection";
// import { ManifestoSection } from "@/components/sections/ManifestoSection";
// import { WorkSection } from "@/components/sections/work/WorkSection";
// import { StackGridVariation, StackTableVariation } from "@/components/sections/stack/StackSection";
// import { ContactSection } from "@/components/sections/ContactSection";

// export default function HomePage() {
//   return (
//     <>
//       {/* ── Atmosphere ──────────────────────────────────────── */}
//       {/* GrainOverlay is fixed, z-[9999], pointer-events-none  */}
//       {/* It renders once on the GPU — zero scroll cost         */}
//       <GrainOverlay />

//       {/* ── Navigation ──────────────────────────────────────── */}
//       {/* Ghost on load. Materializes at 80px scroll.           */}
//       <Navbar />

//       {/* ── Prologue ─────────────────────────────────────────── */}
//       {/*                                                        */}
//       {/* Pass portraitSrc when you have the photo:             */}
//       <HeroSection portraitSrc="https://asset.imagine.art/processed/e683e3e2-00c7-4082-a76f-6e9d98b711f4" />
//       {/*                                                        */}
//       {/* The architectural placeholder shows until then.       */}
//       {/* <HeroSection /> */}

//       {/* ── Coming sections — uncomment as built ─────────────── */}
//       <ManifestoSection />  
//       <WorkSection />       
//       <StackGridVariation />      
//       <StackTableVariation />   
//       <ContactSection />    
//     </>
//   );
// }
