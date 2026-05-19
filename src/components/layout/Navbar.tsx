/**
 * Navbar.tsx — "use client"
 *
 * Ghost on first load — transparent, invisible background.
 * The hero breathes without a border cutting across its head.
 *
 * After 80px of scroll: bg-bg/95 materializes with border-bottom.
 * CSS transition handles the shift — no Framer Motion needed here.
 * Framer Motion is reserved for content reveals, not chrome behavior.
 *
 * Mobile: always visible with border — small screens can't afford
 * hidden navigation. The ghost behavior is desktop-only.
 *
 * Logo: three stacked lines (geometric mark) + wordmark in mono.
 * The middle line is gold — the only color in an otherwise neutral bar.
 * On hover, the lines expand their gap slightly — a quiet breath.
 *
 * Nav links: text-ghost at rest, text-muted on hover, border-bottom
 * gold on active. No background changes. Color and underline only.
 */

"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: NavLink[];
}

// ── Constants ─────────────────────────────────────────────────

const DEFAULT_LINKS: NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#algorithms", label: "Algorithms" },
  { href: "#contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80; // px before navbar materializes

// ── Component ─────────────────────────────────────────────────

export function Navbar({ links = DEFAULT_LINKS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // ── Scroll detection ───────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    // Run once on mount in case page loads scrolled
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close menu on navigation ───────────────────────────────
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ── Lock body scroll when mobile menu is open ──────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Main header bar ─────────────────────────────────── */}
      <header
        className={cn(
          // Always: sticky, full-width, high z-index
          "fixed top-0 inset-x-0 z-50",
          // Transition only visual properties — never layout
          "transition-all duration-300",
          // Materialized state (after scroll threshold)
          scrolled
            ? "border-b border-border backdrop-blur-[2px]"
            : "border-b border-transparent",
        )}
        style={{
          backgroundColor: scrolled
            ? "rgba(15, 14, 12, 0.95)" // --bg at 95% opacity
            : "transparent",
        }}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo / wordmark ─────────────────────────── */}
            <NextLink
              href="/"
              className="group flex items-center gap-3"
              aria-label="Back to top"
            >
              {/* Geometric mark — three lines, middle is gold */}
              <span
                className="flex flex-col gap-[3px] transition-all duration-300 group-hover:gap-[5px]"
                aria-hidden="true"
              >
                <span className="block w-5 h-px bg-text" />
                <span className="block w-3.5 h-px bg-gold" />
                <span className="block w-5 h-px bg-text" />
              </span>

              {/* Wordmark */}
              <span className="text-label text-text group-hover:text-muted transition-base">
                Portfolio<span className="text-gold">.</span>
              </span>
            </NextLink>

            {/* ── Desktop nav ─────────────────────────────── */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Primary navigation"
            >
              {links.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <NextLink
                    key={href}
                    href={href}
                    className={cn(
                      "text-label pb-px transition-base",
                      "border-b",
                      isActive
                        ? "text-text border-gold"
                        : "text-ghost border-transparent hover:text-muted hover:border-border",
                    )}
                  >
                    {label}
                  </NextLink>
                );
              })}
            </nav>

            {/* ── Desktop CTA ──────────────────────────────── */}
            <div className="hidden md:flex items-center gap-4">
              {/* Coordinate label — editorial detail */}
              <span className="text-label text-ghost hidden lg:block">
                33.8869° N
              </span>
              <span
                className="w-px h-3 bg-border hidden lg:block"
                aria-hidden="true"
              />
              <NextLink
                href="#contact"
                className="
                  text-label text-ghost
                  border border-border
                  px-3 py-1.5 rounded-default
                  transition-base
                  hover:border-border-em hover:text-muted
                "
              >
                Let&apos;s Talk
              </NextLink>
            </div>

            {/* ── Mobile menu trigger ──────────────────────── */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="
                md:hidden
                inline-flex items-center justify-center
                w-9 h-9
                border border-border rounded-default
                text-muted
                transition-base
                hover:border-border-em hover:text-text
              "
            >
              {menuOpen ? (
                <X size={15} aria-hidden />
              ) : (
                <Menu size={15} aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* ── Coordinate bar — desktop only ─────────────────── */}
        {/* Appears only when navbar is materialized            */}
        <div
          className={cn(
            "hidden lg:flex items-center justify-between",
            "container-content py-1 border-t border-border",
            "transition-all duration-300",
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <span className="text-label text-ghost" style={{ fontSize: "9px" }}>
            33.8869° N, 9.5375° E
          </span>
          <span className="text-label text-ghost" style={{ fontSize: "9px" }}>
            v2.0 · {new Date().getFullYear()}
          </span>
        </div>
      </header>

      {/* ── Mobile menu overlay ───────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="
            fixed inset-0 z-40
            bg-bg
            flex flex-col
            md:hidden
          "
        >
          {/* Spacer matching header height */}
          <div className="h-16 shrink-0" />

          {/* Links */}
          <nav className="flex flex-col flex-1 container-content py-8">
            {links.map(({ href, label }, i) => (
              <NextLink
                key={href}
                href={href}
                className="
                  flex items-center justify-between
                  py-5 border-b border-border
                  text-body text-muted
                  transition-base
                  hover:text-text hover:ps-1
                "
              >
                <span>{label}</span>
                <span className="text-label text-ghost">0{i + 1}</span>
              </NextLink>
            ))}
          </nav>

          {/* Mobile footer */}
          <div className="container-content py-6 border-t border-border">
            <p className="text-label text-ghost">
              33.8869° N, 9.5375° E · v2.0
            </p>
          </div>
        </div>
      )}
    </>
  );
}
