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

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { GrainOverlay } from "@/components/ui/GrainOverlay";

import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContactSection } from "@/components/sections/ContactSection";

import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

// ── Page metadata ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Full-Stack Engineer — Portfolio",
  description:
    "I engineer systems with structural rigor, and design interfaces with cinematic warmth. Node.js · Next.js · React.",
  openGraph: {
    title: "Full-Stack Engineer — Portfolio",
    description: "Systems built to last. Interfaces built to feel.",
    type: "website",
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
        <AboutSection />

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
      <Footer />
    </>
  );
}
