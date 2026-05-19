// Development reference only — remove before production.
// Demonstrates all three translation patterns in one file.

import { getTranslations } from "next-intl/server";
import { ClientTranslationDemo } from "./ClientTranslationDemo";
import type { LocaleParams } from "@/temp/i18n/routing";

// ── Server Component (default) ────────────────────────────────────────────────
export async function I18nShowcase({ locale }: LocaleParams) {
  // Pattern 1 — Server Component translation
  // getTranslations is async, called in Server Components or generateMetadata.
  // Returns a typed t() function. Autocomplete works on every key.
  const t = await getTranslations({ locale, namespace: "Hero" });
  const tA = await getTranslations({ locale, namespace: "Algorithms" });

  return (
    <div className="max-w-layout mx-auto px-gutter py-section space-y-12">
      {/* ── Pattern 1: Server Component ───────────────────────────────── */}
      <section>
        <p
          className="text-caption uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent-raw)" }}
        >
          Pattern 1 — Server Component (getTranslations)
        </p>
        <p className="text-mono text-muted-foreground mb-6">
          {`const t = await getTranslations({ locale, namespace: 'Hero' });`}
        </p>

        <h1 className="text-heading mb-2">
          {/* Autocomplete: t('headline') ✓ — t('headlne') ✗ TypeScript error */}
          {t("headline")}
        </h1>
        <p className="text-body text-muted-foreground">{t("bio")}</p>
      </section>

      <hr />

      {/* ── Pattern 2: Variable interpolation ────────────────────────── */}
      <section>
        <p
          className="text-caption uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent-raw)" }}
        >
          Pattern 2 — Variable Interpolation
        </p>
        <p className="text-mono text-muted-foreground mb-6">
          {`// en.json: "problems": "{count} problems solved"`}
          <br />
          {`t('problems', { count: 480 })`}
        </p>
        <p className="text-subheading">
          {/* {count} is replaced at runtime — typed as MessageValue */}
          {tA("problems", { count: 480 })}
        </p>
      </section>

      <hr />

      {/* ── Pattern 3: Client Component ───────────────────────────────── */}
      <section>
        <p
          className="text-caption uppercase tracking-widest mb-4"
          style={{ color: "var(--color-accent-raw)" }}
        >
          Pattern 3 — Client Component (useTranslations)
        </p>
        <p className="text-mono text-muted-foreground mb-6">
          {`// "use client"\nconst t = useTranslations('Contact');`}
        </p>
        {/* Messages are passed down from the NextIntlClientProvider in layout */}
        <ClientTranslationDemo />
      </section>
    </div>
  );
}
