// src/components/layout/Navbar.tsx
// Atomic position: layout organism — the global navigation header.
//
// Architecture:
//   - Server Component wrapper (reads locale for static rendering)
//   - NavbarClient handles the mobile menu toggle ("use client")
//   - Sticky: stays at top, 1px border-bottom separates it from content
//   - Nav links use AppLink variant="hover" — underline-accent on hover
//   - Utility area: ThemeToggle + LocaleSwitcher grouped with separator
//   - Logical properties throughout: ps-/pe- flip in RTL automatically
//
// Mobile: links collapse into a full-height drawer-style menu.

import { getTranslations } from "next-intl/server";
import type { Locale } from "@/temp/i18n/routing";
import { NavbarClient } from "./NavbarClient";

interface NavbarProps {
  locale: Locale;
}

export async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: "Navbar" });

  const navLinks = [
    { href: `/${locale}#work`, label: t("work") },
    { href: `/${locale}#expertise`, label: t("expertise") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#contact`, label: t("contact") },
  ] as const;

  return (
    <NavbarClient
      navLinks={navLinks}
      locale={locale}
      labels={{
        openMenu: t("openMenu"),
        closeMenu: t("closeMenu"),
        toggleTheme: t("toggleTheme"),
        switchLocale: t("switchLocale"),
      }}
    />
  );
}
