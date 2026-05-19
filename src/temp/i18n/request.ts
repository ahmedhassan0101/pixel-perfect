// next-intl server-side config.
// Called on every request to resolve locale + load messages.
// Must use next-intl/server imports only — never client imports here.

import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is the value from the [locale] segment.
  // Validate it — fall back to default if invalid or missing.
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Dynamic import — Next.js code-splits each locale automatically.
    // Only the active locale's JSON is sent to the client.
    messages: (await import(`../messages/${locale}.json`))
      .default as IntlMessages,
  };
});
