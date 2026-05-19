// global.d.ts — placed at project root (next to package.json)
//
// Feeds next-intl's type engine with the exact shape of our messages.
// Result: full autocomplete on t('Hero.headline'), type errors on wrong keys,
// and TypeScript catches missing ar.json keys at build time.
//
// How it works:
//   - next-intl exports IntlMessages as an empty interface
//   - We augment it with our en.json shape (English is always the source of truth)
//   - ar.json must structurally match — enforced by the import in request.ts

import en from "./src/messages/en.json";

type Messages = typeof en;

declare global {
  // Augments next-intl's global IntlMessages interface.
  // This single declaration propagates to every t() call in the project.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
  // Error // An interface declaring no members is equivalent to its supertype.
}