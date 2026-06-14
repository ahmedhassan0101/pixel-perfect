import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo">
      <div className="container-content py-10 md:py-12">
        {/* ── The Signature (Your Logo) ────────────────────────── */}
        <div className="flex justify-center mb-10 md:mb-12">
          <span className="text-personal text-muted! transition-colors duration-500 hover:text-gold! cursor-default">
            Ahmed Hassan
          </span>
        </div>

        {/* ── The Footer Meta (Rights, Stack, Back to top) ────── */}
        <div
          className="
          flex flex-col lg:flex-row 
          items-center justify-between 
          gap-6 md:gap-4
          border-t border-border/50 pt-6
        "
        >
          {/* Left: Rights */}
          <p className="text-label text-muted text-center lg:text-left order-2 lg:order-1">
            © {year} — Engineered with intent.
          </p>

          {/* Center: Stack */}
          <p className="text-label text-ghost text-center order-3 lg:order-2">
            Built with <span className="text-muted">Next.js & Tailwind</span>
          </p>

          {/* Right: Back to top */}
          <a
            href="#hero"
            className="
              inline-flex items-center justify-center gap-2
              text-label text-muted transition-base hover:text-gold
              group order-1 lg:order-3
            "
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp
              size={12}
              className="transition-base group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
