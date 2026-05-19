// Every page uses this pattern.
// Server Component fetches data + translations.
// PageTransition wraps output for the CSS fade-blur effect.

import { getTranslations } from "next-intl/server";
import { PageTransition } from "@/temp/PageTransition";
import type { LocaleParams } from "@/temp/i18n/routing";
import { I18nShowcase } from "@/temp/I18nShowcase";
import UIBlocksShowcase from "@/temp/UIBlocksShowcase";
import { Navbar } from "@/temp/Navbar";
import { HeroMatrix } from "@/temp/sections/HeroMatrix";
import { HeroDesk } from "@/temp/sections/HeroDesk";
import { HeroBlueprint } from "@/temp/sections/HeroBlueprint";

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;

  // Server-side translation — zero client JS for static strings
  const t = await getTranslations({ locale, namespace: "Hero" });

  return (
    <PageTransition>
      <>
        <Navbar locale={locale} />
        <HeroMatrix locale={locale} />
        <HeroBlueprint locale={locale} />
        <HeroDesk locale={locale} />
      </>
    </PageTransition>
  );
}
