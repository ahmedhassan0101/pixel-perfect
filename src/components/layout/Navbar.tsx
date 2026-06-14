"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
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
  { href: "#about", label: "About" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80; // px before navbar materializes

// ── Component ─────────────────────────────────────────────────

export function Navbar({ links = DEFAULT_LINKS }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // ── Scroll detection ───────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      // Update state only if it passes the threshold
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    // Run once on mount in case page loads scrolled
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Hash detection ──────────────────────────────────────────
  // This is for in-page section highlighting. It listens to hash changes
  useEffect(() => {
    // Set initial hash on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveHash(window.location.hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // ── Close menu on navigation ───────────────────────────────
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [activeHash]);

  // ── Lock body scroll when mobile menu is open ──────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle mobile link click to close menu
  const handleMobileLinkClick = () => setMenuOpen(false);
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
            <NextLink
              href="/"
              onClick={() => setActiveHash("")}
              className="group flex items-center gap-3"
              aria-label="Back to top"
            >
              <span className="text-personal">
                Ahmed Hassan{" "}
                <span className="font-light! text-lg">Portfolio</span>
              </span>
            </NextLink>

            {/* ── Desktop nav ─────────────────────────────── */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Primary navigation"
            >
              {links.map(({ href, label }) => {
                const isActive = activeHash === href;

                return (
                  <NextLink
                    key={href}
                    href={href}
                    onClick={() => setActiveHash(href)}
                    className={cn(
                      "text-muted pb-px transition-base",
                      "border-b border-transparent ",
                      isActive
                        ? "text-text border-gold"
                        : "hover:text-text! hover:border-gold",
                    )}
                  >
                    {label}
                  </NextLink>
                );
              })}
            </nav>
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
                hover:border-border-em hover:text-gold
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
      </header>

      {/* ── Mobile menu overlay ───────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-bg flex flex-col md:hidden"
        >
          <nav className="flex flex-col flex-1 container-content justify-center items-center h-full">
            {links.map(({ href, label }) => {
              const isActive = activeHash === href;
              return (
                <NextLink
                  key={href}
                  href={href}
                  onClick={() => {
                    setActiveHash(href);
                    handleMobileLinkClick();
                  }}
                  className={cn(
                    "py-5 pb-px border-b border-border",
                    "text-muted text-lg transition-base",
                    isActive
                      ? "text-text border-gold"
                      : "hover:text-text! hover:border-gold",
                  )}
                >
                  <span>{label}</span>
                </NextLink>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
