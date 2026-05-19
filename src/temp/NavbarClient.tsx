/* eslint-disable react-hooks/set-state-in-effect */
// src/components/layout/NavbarClient.tsx
// "use client" — required for mobile menu state and scroll detection.
//
// Atomic position: layout organism (client shell).
// Receives all translated strings as props from the Server Component (Navbar.tsx).
// This pattern keeps the "use client" boundary as small as possible.

"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import { X, Menu, Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/temp/i18n/routing";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  navLinks: readonly NavLink[];
  locale: Locale;
  labels: {
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    switchLocale: string;
  };
}

// ── Sub-component: ThemeToggle ────────────────────────────────────────────────

function ThemeToggle({ label }: { label: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function cycle() {
    if (theme === "light") return setTheme("dark");
    if (theme === "dark") return setTheme("system");
    return setTheme("light");
  }

  const Icon = !mounted
    ? Monitor
    : theme === "light"
      ? Sun
      : theme === "dark"
        ? Moon
        : Monitor;

  return (
    <button
      onClick={cycle}
      aria-label={label}
      disabled={!mounted}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8",
        "border border-border",
        "text-muted-foreground transition-base",
        "hover:border-ring hover:text-foreground",
        "disabled:opacity-40 disabled:cursor-not-allowed",
      )}
    >
      <Icon size={13} aria-hidden />
    </button>
  );
}

// ── Sub-component: LocaleSwitcher ─────────────────────────────────────────────

function LocaleSwitcher({
  label,
  switchLocaleLabel,
}: {
  label: string;
  switchLocaleLabel: string;
}) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const nextLocale: Locale = locale === "en" ? "ar" : "en";

  function handleSwitch() {
    const next = pathname.replace(`/${locale}`, `/${nextLocale}`);
    startTransition(() => router.push(next));
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={label}
      className={cn(
        "font-mono text-[10px] tracking-widest uppercase",
        "border border-border px-2.5 py-1.5",
        "text-muted-foreground transition-base",
        "hover:border-ring hover:text-foreground",
        "disabled:opacity-40",
        isPending && "opacity-60",
      )}
    >
      {isPending ? "···" : switchLocaleLabel}
    </button>
  );
}

// ── Main NavbarClient ─────────────────────────────────────────────────────────

export function NavbarClient({ navLinks, locale, labels }: NavbarClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll to slightly shift navbar opacity
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          // Sticky positioning
          "sticky top-0 z-50",
          // Border + background
          "border-b border-border bg-background",
          // Subtle backdrop for readability over page content
          "backdrop-blur-[2px]",
          // Transition only bg opacity — no layout shift
          "transition-theme",
        )}
      >
        {/* ── Top bar: logo · nav · utilities ───────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-gutter sm:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo / wordmark */}
            <NextLink
              href={`/${locale}`}
              className="flex items-center gap-2 group"
              aria-label="Home"
            >
              {/* Geometric mark — 3 stacked lines, amber accent on hover */}
              <span
                className="flex flex-col gap-[3px] transition-base group-hover:gap-[5px]"
                aria-hidden
              >
                <span className="block w-4 h-px bg-foreground transition-base" />
                <span className="block w-3 h-px bg-accent-warm" />
                <span className="block w-4 h-px bg-foreground transition-base" />
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-foreground">
                Portfolio<span className="text-accent-warm">.</span>
              </span>
            </NextLink>

            {/* Desktop nav links — hidden on mobile */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Primary navigation"
            >
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <NextLink
                    key={href}
                    href={href}
                    className={cn(
                      "font-mono text-[11px] tracking-widest uppercase transition-base",
                      "pb-px border-b border-transparent",
                      isActive
                        ? "text-foreground border-accent-warm"
                        : "text-muted-foreground hover:text-foreground hover:border-accent-warm",
                    )}
                  >
                    {label}
                  </NextLink>
                );
              })}
            </nav>

            {/* Utility area: theme + locale + mobile trigger */}
            <div className="flex items-center gap-2">
              {/* Desktop utilities */}
              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle label={labels.toggleTheme} />
                {/* 1px separator between controls */}
                <span className="w-px h-4 bg-border" aria-hidden />
                <LocaleSwitcher
                  label={labels.switchLocale}
                  switchLocaleLabel={labels.switchLocale}
                />
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
                aria-expanded={menuOpen}
                className={cn(
                  "md:hidden inline-flex items-center justify-center w-8 h-8",
                  "border border-border text-muted-foreground transition-base",
                  "hover:border-ring hover:text-foreground",
                )}
              >
                {menuOpen ? (
                  <X size={14} aria-hidden />
                ) : (
                  <Menu size={14} aria-hidden />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Coordinate bar — below main bar, desktop only ─────────────── */}
        {/* A subtle editorial detail: lat/long + version string */}
        <div className="hidden lg:flex items-center justify-between border-t border-border px-8 py-1 max-w-[1200px] mx-auto">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            33.8869° N, 9.5375° E
          </span>
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
            Portfolio v2.0 · 2025
          </span>
        </div>
      </header>

      {/* ── Mobile menu overlay ────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Spacer matching header height */}
          <div className="h-14 border-b border-border shrink-0" />

          {/* Nav links */}
          <nav className="flex flex-col flex-1 px-gutter py-8 gap-0">
            {navLinks.map(({ href, label }, i) => (
              <NextLink
                key={href}
                href={href}
                className={cn(
                  "flex items-center justify-between",
                  "py-5 border-b border-border",
                  "font-mono text-xs tracking-widest uppercase",
                  "text-muted-foreground transition-base",
                  "hover:text-foreground hover:ps-2",
                )}
              >
                <span>{label}</span>
                <span className="text-muted-foreground text-[10px]">
                  0{i + 1}
                </span>
              </NextLink>
            ))}
          </nav>

          {/* Mobile utilities */}
          <div className="flex items-center gap-3 px-gutter py-6 border-t border-border">
            <ThemeToggle label={labels.toggleTheme} />
            <span className="w-px h-4 bg-border" aria-hidden />
            <LocaleSwitcher
              label={labels.switchLocale}
              switchLocaleLabel={labels.switchLocale}
            />
          </div>
        </div>
      )}
    </>
  );
}
