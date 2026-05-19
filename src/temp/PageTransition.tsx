// "use client" — needed for usePathname (browser API).
//
// Atomic position: layout molecule — wraps every page's content.
// Implements fade + blur transition on route change using CSS animations.
// No Framer Motion. The effect is identical — CSS keyframes with
// filter: blur() are GPU-accelerated and performant on all devices.

"use client";

import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    // Key on pathname triggers React to remount — replaying the CSS animation.
    // This is the correct pattern: no state, no effect, no JS animation loop.
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
