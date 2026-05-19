/**
 * HeroMetaPanel.tsx — Server Component
 *
 * The right panel of the hero. Replaces the portrait.
 * Three blocks stacked vertically with 1px borders between them:
 *
 * Block 1 — Stats grid (2×2)
 *   Numbers tell the story a portrait can't: experience, scale, quality.
 *   Large Fraunces numerals + small mono labels.
 *
 * Block 2 — Terminal block
 *   Role, location, status — rendered as if read from a live system.
 *   The cursor blinks. The system is alive.
 *   bg-code-bg (deepest black) — the only block darker than the page.
 *
 * Block 3 — Current stack
 *   Tech listed as mono uppercase with gold separators.
 *   Reads like a technical specification.
 *
 * Pure Server Component — all data is static, zero client JS.
 * Cursor blink uses .cursor-blink CSS class from globals.css.
 */

const STATS = [
  { value: "3+",  label: "Years building"   },
  { value: "24+", label: "Projects shipped" },
  { value: "480", label: "Problems solved"  },
  { value: "100", label: "Lighthouse score" },
] as const;

const TERMINAL_LINES = [
  { cmd: "whoami",       out: "full-stack-engineer"  },
  { cmd: "location",     out: "remote / worldwide"   },
  { cmd: "availability", out: "open — hire me"       },
] as const;

const STACK = [
  "Next.js", "Node.js", "React",
  "TypeScript", "MongoDB", "Tailwind",
] as const;

export function HeroMetaPanel() {
  return (
    <div className="flex flex-col border border-border">

      {/* ── Block 1: Stats ────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-px bg-border border-b border-border">
        {STATS.map(({ value, label }, i) => (
          <div
            key={label}
            className="bg-bg px-5 py-6"
          >
            {/* Large Fraunces numeral — the display scale for data */}
            <p
              className="text-heading text-text mb-1 leading-none"
              aria-label={`${value} ${label}`}
            >
              {value}
            </p>
            <p className="text-label text-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Block 2: Terminal ─────────────────────────────── */}
      <div className="border-b border-border">
        {/* Titlebar */}
        <div className="
          flex items-center justify-between
          bg-elevated border-b border-border
          px-4 py-2.5
        ">
          {/* Window dots — purely decorative */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="block w-2.5 h-2.5 rounded-full bg-border" />
            <span className="block w-2.5 h-2.5 rounded-full bg-border" />
            <span className="block w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-label text-ghost">bash</span>
        </div>

        {/* Terminal lines */}
        <div className="bg-code-bg px-4 py-4 flex flex-col gap-2.5">
          {TERMINAL_LINES.map(({ cmd, out }) => (
            <div key={cmd}>
              {/* Command line */}
              <p className="text-mono text-code-text" style={{ fontSize: "11px" }}>
                <span className="text-gold">~ $</span>{" "}
                <span>{cmd}</span>
              </p>
              {/* Output line */}
              <p
                className="text-mono ps-5"
                style={{ fontSize: "11px", color: "var(--text-secondary)" }}
              >
                {out}
              </p>
            </div>
          ))}

          {/* Blinking cursor line */}
          <p className="text-mono text-gold" style={{ fontSize: "11px" }}>
            ~ ${" "}
            <span
              className="cursor-blink inline-block w-2 h-3.5 bg-gold align-middle"
              aria-hidden="true"
            />
          </p>
        </div>
      </div>

      {/* ── Block 3: Stack ────────────────────────────────── */}
      <div className="px-5 py-5">
        <p className="text-label text-ghost mb-4">Current stack</p>
        <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
          {STACK.map((tech, i) => (
            <span key={tech} className="flex items-center gap-3">
              <span className="text-label text-muted">{tech}</span>
              {i < STACK.length - 1 && (
                <span className="text-gold text-label" aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}