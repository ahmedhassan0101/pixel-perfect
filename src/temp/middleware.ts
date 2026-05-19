// Middleware runs on every request before rendering.
// Responsibilities:
//   1. Detect locale from URL / Accept-Language header / cookie
//   2. Redirect to prefixed URL if needed (/about → /en/about)
//   3. Set locale cookie for persistence
//
// Admin protection (if added later) goes ABOVE the intl middleware.

import createMiddleware from "next-intl/middleware";
import { routing } from "@/temp/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except Next.js internals and static files.
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
