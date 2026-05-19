// src/components/layout/LocaleSwitcher.tsx
// "use client" — uses useLocale, useRouter, usePathname (client hooks).
//
// Atomic position: atom — language toggle in the navbar.
// Label: always shows the name of the OTHER language (what you'll switch TO).
//   In English → shows "العربية"
//   In Arabic  → shows "English"
// This is the correct UX pattern — not "current language" labeling.

"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/temp/i18n/routing";

// Labels hardcoded intentionally — not translated because the label
// must always appear in the TARGET language, not the current one.
const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "en" ? "ar" : "en";
  const label = LOCALE_LABELS[nextLocale];

  function handleSwitch() {
    // Replace the locale prefix in the current path.
    // /en/contact → /ar/contact — preserves the full path.
    const next = pathname.replace(`/${locale}`, `/${nextLocale}`);

    startTransition(() => {
      router.push(next);
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={`Switch language to ${label}`}
      className={cn(
        "inline-flex items-center",
        "font-mono text-xs tracking-widest uppercase",
        "text-muted-foreground",
        "border border-border rounded-sm",
        "px-3 py-1.5",
        "transition-base",
        "hover:border-ring hover:text-foreground",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        isPending && "opacity-60",
        className,
      )}
    >
      {/* Pending state — subtle indicator without layout shift */}
      {isPending ? <span aria-hidden>···</span> : label}
    </button>
  );
}

// // "use client" — uses useLocale, usePathname, useRouter (client hooks).
// //
// // Atomic position: atom — single interactive element in the navbar.
// // Minimalist: one button, zero dropdown.
// // The label is always the OTHER language name (shows what you'll switch TO).

// "use client";

// import { useLocale, useTranslations } from "next-intl";
// import { useRouter, usePathname } from "next/navigation";
// import { useTransition } from "react";
// import type { Locale } from "@/i18n/routing";

// export function LocaleSwitcher() {
//   const t = useTranslations("Nav");
//   const locale = useLocale() as Locale;
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isPending, startTransition] = useTransition();

//   function handleSwitch() {
//     const next: Locale = locale === "en" ? "ar" : "en";

//     // Replace current locale segment in the pathname.
//     // /en/... → /ar/... without losing the rest of the path.
//     const newPath = pathname.replace(`/${locale}`, `/${next}`);

//     startTransition(() => {
//       router.push(newPath);
//     });
//   }

//   return (
//     <button
//       onClick={handleSwitch}
//       disabled={isPending}
//       aria-label={`Switch language — ${t("switchLocale")}`}
//       className="
//         font-mono text-xs tracking-widest uppercase
//         text-muted-foreground
//         border border-border
//         px-3 py-1.5
//         rounded-sm
//         transition-base
//         hover:border-ring hover:text-foreground
//         disabled:opacity-40
//         disabled:cursor-not-allowed
//       "
//     >
//       {/* Shows what you'll switch TO, not where you are */}
//       {t("switchLocale")}
//     </button>
//   );
// }
