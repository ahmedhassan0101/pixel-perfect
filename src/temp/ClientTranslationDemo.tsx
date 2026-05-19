// src/components/dev/ClientTranslationDemo.tsx
// Separate file required — "use client" cannot be mixed with async Server Components.

"use client";

import { useTranslations } from "next-intl";

export function ClientTranslationDemo() {
  // Pattern 3 — Client Component translation
  // useTranslations is synchronous — reads from the NextIntlClientProvider context.
  // Same strict typing as getTranslations — autocomplete works identically.
  const t = useTranslations("Contact");

  return (
    <div
      className="border border-border p-6"
      style={{ borderRadius: "var(--radius)" }}
    >
      <h3 className="text-subheading mb-2">{t("headline")}</h3>
      <p className="text-body text-muted-foreground mb-4">{t("body")}</p>
      <button className="font-mono text-xs tracking-widest uppercase border border-border px-4 py-2 transition-base hover:border-ring">
        {t("send")}
      </button>
    </div>
  );
}
