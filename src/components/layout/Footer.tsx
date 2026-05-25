import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border" role="contentinfo">
      {/* ── Coordinates bar ───────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container-content py-2 flex items-center justify-between text-label text-[9px]!">
          <span>30.0444° N, 31.2357° E</span>
          <span>Portfolio v3.0 · {year}</span>
        </div>
      </div>

      {/* ── Main footer bar ───────────────────────────────── */}
      <div className="container-content py-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left: rights */}
          <p className="text-label">© {year} — All rights reserved</p>

          {/* Center: built with */}
          <p className="text-label">
            Built with{" "}
            <span className="text-muted">
              Next.js · Tailwind v4 · Framer Motion
            </span>
          </p>

          {/* Right: back to top */}
          <a
            href="#hero"
            className="
              inline-flex items-center gap-2
              text-label
              transition-base hover:text-muted
              group
            "
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp
              size={11}
              className="transition-base group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
