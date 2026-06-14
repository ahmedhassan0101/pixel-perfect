// src/app/page.tsx

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
      {/* ── Navigation ──────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ─────────────────────────────────── */}
      <main id="main-content">
        <HeroSection />

        <AboutSection />

        <ManifestoSection />

        <WorkSection />

        <StackSection />

        <ContactSection />
      </main>

      {/* ── Punctuation ──────────────────────────────────── */}
      <Footer />
    </>
  );
}
