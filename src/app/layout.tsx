// src/app/layout.tsx
// Root layout — Server Component.
// No ThemeProvider. No NextIntlClientProvider.
// One language. One identity. No toggles.
//
// Font variables injected on <html> must match globals.css @theme exactly:
//   --font-fraunces  → @theme: --font-serif: var(--font-fraunces)
//   --font-geist     → @theme: --font-sans:  var(--font-geist)
//   --font-geist-mono→ @theme: --font-mono:  var(--font-geist-mono)

import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ── Fraunces — the human voice ────────────────────────────────────────────────
// Variable font: supports weight 100–900 and the SOFT + WONK axes.
// SOFT: rounds the terminals slightly — warmth without losing structure.
// WONK: activates the quirky letterform variants — uniqueness.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"], // enables font-variation-settings in CSS
  display: "swap",
});

// ── Geist — the technical precision ──────────────────────────────────────────
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// ── Geist Mono — labels and code ─────────────────────────────────────────────
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    template: "%s — Portfolio",
    default: "Full-Stack Engineer",
  },
  description:
    "Full-Stack Engineer building end-to-end systems with Node.js, Next.js, and React.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

// ── Layout ────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-9998 focus:bg-elevated focus:px-4 focus:py-2 focus:text-text focus:border focus:border-border"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
