/**
 * ContactSection.tsx — Server Component
 *
 * The Sign-off. The last thing a visitor reads.
 *
 * Philosophy:
 * No form. No validation. No database writes.
 * A form says "I will process your request."
 * A direct email says "I am a human. Talk to me."
 *
 * The email address is the primary CTA — large, Fraunces,
 * styled as a link with the gold underline. Clicking it
 * opens the system mail client. Zero friction.
 *
 * Social links are secondary — small, mono, icon + label.
 * They exist to verify identity, not to drive engagement.
 *
 * The availability indicator with a date signals honesty —
 * "this information is current as of [date]."
 *
 * Layout:
 *   Left  → the invitation (headline + email + availability)
 *   Right → social links + a closing statement
 *
 * Footer is a separate component below the section.
 * It is minimal — rights + year + a single link back to top.
 */

import { ArrowUp } from "lucide-react";

// ── Contact data — replace with your real information ─────────

const CONTACT = {
  email:      "hello@yourname.dev",
  github:     "https://github.com/yourname",
  linkedin:   "https://linkedin.com/in/yourname",
  twitter:    "https://twitter.com/yourname",      // set to null to hide
  available:  true,
  since:      "January 2025",
  location:   "Remote / Worldwide",
};

// ── Social links ──────────────────────────────────────────────

const SOCIALS = [
  {
    label:  "GitHub",
    href:   CONTACT.github,
    icon:   ArrowUp,
    note:   "Source code & contributions",
  },
  {
    label:  "LinkedIn",
    href:   CONTACT.linkedin,
    icon:   ArrowUp,
    note:   "Professional history",
  },
  ...(CONTACT.twitter
    ? [{
        label: "Twitter / X",
        href:  CONTACT.twitter,
        icon:  ArrowUp,
        note:  "Occasional thoughts",
      }]
    : []),
] as const;

// ═══════════════════════════════════════════════════════════════
// ContactSection
// ═══════════════════════════════════════════════════════════════

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-padding border-b border-border"
      aria-label="Contact"
    >
      <div className="container-content">

        {/* ── Section label ────────────────────────────────── */}
        <p className="text-label text-gold flex items-center gap-2 mb-16">
          <span aria-hidden="true">§</span>
          <span>05</span>
          <span aria-hidden="true">—</span>
          <span>The Sign-off</span>
        </p>

        {/* ── Main grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">

          {/* ── Left: The invitation ─────────────────────── */}
          <div className="p-10 lg:border-e border-border flex flex-col justify-between gap-12">

            {/* Headline */}
            <div>
              <h2 className="text-heading text-text mb-6">
                Something worth
                <br />
                <em style={{ fontStyle: "italic", color: "var(--accent-gold)" }}>
                  building?
                </em>
              </h2>
              <p className="text-body text-muted max-w-[38ch]">
                I read every message. If the project is interesting,
                I will respond within 24 hours.
              </p>
            </div>

            {/* Email — the primary CTA */}
            <div>
              <p className="text-label text-ghost mb-3">Direct line</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="
                  text-subheading text-text
                  underline-gold
                  transition-base hover:text-gold
                  block
                "
                aria-label={`Send email to ${CONTACT.email}`}
              >
                {CONTACT.email}
              </a>
            </div>

            {/* Availability status */}
            <div className="flex flex-col gap-3 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                {/* Pulsing dot */}
                <span
                  className="relative flex h-2 w-2 shrink-0"
                  aria-hidden="true"
                >
                  <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-body text-text">
                  {CONTACT.available ? "Available for new projects" : "Currently unavailable"}
                </span>
              </div>
              <div className="flex items-center gap-6 ps-5">
                <div>
                  <p className="text-label text-ghost">Status since</p>
                  <p className="text-label text-muted mt-0.5">{CONTACT.since}</p>
                </div>
                <span className="w-px h-6 bg-border" aria-hidden="true" />
                <div>
                  <p className="text-label text-ghost">Location</p>
                  <p className="text-label text-muted mt-0.5">{CONTACT.location}</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right: Socials + closing ─────────────────── */}
          <div className="p-10 flex flex-col justify-between gap-12">

            {/* Social links */}
            <div>
              <p className="text-label text-ghost mb-6">Find me elsewhere</p>
              <div className="flex flex-col gap-0 border border-border">
                {SOCIALS.map(({ label, href, icon: Icon, note }, i) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group flex items-center justify-between
                      px-5 py-4
                      transition-base hover:bg-surface
                      ${i > 0 ? "border-t border-border" : ""}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={14}
                        className="text-ghost group-hover:text-gold transition-base"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-body text-text group-hover:text-gold transition-base">
                          {label}
                        </p>
                        <p className="text-label text-ghost">{note}</p>
                      </div>
                    </div>
                    <span className="
                      text-label text-ghost
                      opacity-0 group-hover:opacity-100
                      transition-base
                      translate-x-0 group-hover:translate-x-1
                    ">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="pt-8 border-t border-border">
              <p
                className="text-body text-muted leading-relaxed"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 300 }}
              >
                "The best work comes from people who care about the craft —
                not just the deadline."
              </p>
              <span className="block w-8 h-px bg-gold mt-4" aria-hidden="true" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════
// Footer — minimal, structural, honest
// ═══════════════════════════════════════════════════════════════

/**
 * SiteFooter
 *
 * Three elements only:
 *   1. Copyright + year (auto-updated)
 *   2. "Built with" — a single honest line
 *   3. Back to top — arrow, no label needed
 *
 * No sitemap links. No cookie notice. No social icons (they're in Contact).
 * The footer is punctuation, not a second navigation.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border" role="contentinfo">

      {/* ── Coordinates bar ───────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container-content py-2 flex items-center justify-between">
          <span className="text-label text-ghost" style={{ fontSize: "9px" }}>
            33.8869° N, 9.5375° E
          </span>
          <span className="text-label text-ghost" style={{ fontSize: "9px" }}>
            Portfolio v2.0 · {year}
          </span>
        </div>
      </div>

      {/* ── Main footer bar ───────────────────────────────── */}
      <div className="container-content py-5">
        <div className="flex items-center justify-between flex-wrap gap-4">

          {/* Left: rights */}
          <p className="text-label text-ghost">
            © {year} — All rights reserved
          </p>

          {/* Center: built with */}
          <p className="text-label text-ghost">
            Built with{" "}
            <span className="text-muted">Next.js · Tailwind v4 · Framer Motion</span>
          </p>

          {/* Right: back to top */}
          <a
            href="#hero"
            className="
              inline-flex items-center gap-2
              text-label text-ghost
              transition-base hover:text-muted
              group
            "
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp
              size={11}
              className="transition-base group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

        </div>
      </div>

    </footer>
  );
}