// src/components/dev/ThemeToggle.tsx
// "use client" — uses useTheme (next-themes), a client-only hook.
//
// Atomic position: atom — single icon button in the navbar.
// Cycles: light → dark → system → light
// The icon reflects the CURRENT theme, not what you'll switch to.
// Renders a neutral icon until mounted to prevent SSR mismatch.

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted]  = useState(false);

  // Avoid hydration mismatch — only read theme after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  function cycle() {
    if (theme === "light")  return setTheme("dark");
    if (theme === "dark")   return setTheme("system");
    return setTheme("light");
  }

  const Icon = !mounted
    ? Monitor                                  // neutral until hydrated
    : theme === "light"
      ? Sun
      : theme === "dark"
        ? Moon
        : Monitor;

  const label = !mounted
    ? "Theme"
    : theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
        ? "Switch to system preference"
        : "Switch to light mode";

  return (
    <button
      onClick={cycle}
      aria-label={label}
      disabled={!mounted}
      className={cn(
        "inline-flex items-center justify-center",
        "w-8 h-8",
        "border border-border rounded-sm",
        "text-muted-foreground",
        "transition-base",
        "hover:border-ring hover:text-foreground",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
    >
      <Icon size={14} aria-hidden />
    </button>
  );
}