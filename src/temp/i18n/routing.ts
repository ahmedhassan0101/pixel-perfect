// Atomic position: config — consumed by middleware + request.ts
// Single source of truth for locale definitions.
// Adding a locale here automatically updates middleware routing.

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales:       ["en", "ar"],
  defaultLocale: "en",

  // Always prefix the URL with locale: /en/... and /ar/...
  // Avoids ambiguity and makes locale detection deterministic.
  localePrefix: "always",
});

// Derived types — used in layouts and pages for strict param typing
export type Locale       = (typeof routing.locales)[number]; // "en" | "ar"
export type LocaleParams = { locale: Locale };