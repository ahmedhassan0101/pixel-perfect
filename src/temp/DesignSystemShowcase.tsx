"use client"
// src/components/DesignSystemShowcase.tsx
// Atomic position: Development audit tool — not part of the production component tree.
// Purpose: Visual verification that every design token, type scale, and interaction
// class in globals.css is rendering correctly before production components are built.
// Server Component — no browser APIs required.

type ColorSwatch = {
  label: string;
  variable: string;
  hex: string;
  dark: boolean; // true = white label text
};

type TypeSample = {
  className: string;
  label: string;
  specimenEn: string;
  specimenAr: string;
};

const COLOR_PALETTE: ColorSwatch[] = [
  {
    label: "Background",
    variable: "--background",
    hex: "#F5F4F0",
    dark: false,
  },
  { label: "Surface / Card", variable: "--card", hex: "#EEEDEA", dark: false },
  { label: "Border", variable: "--border", hex: "#DDDBD6", dark: false },
  { label: "Foreground", variable: "--foreground", hex: "#0A0A0A", dark: true },
  {
    label: "Secondary",
    variable: "--muted-foreground",
    hex: "#6B6B6B",
    dark: true,
  },
  { label: "Accent Amber", variable: "--ring", hex: "#C8A97E", dark: false },
  {
    label: "Code BG",
    variable: "--color-code-bg-raw",
    hex: "#1A1A1A",
    dark: true,
  },
  {
    label: "Code Text",
    variable: "--color-code-text-raw",
    hex: "#E8E6E1",
    dark: false,
  },
  {
    label: "Destructive",
    variable: "--destructive",
    hex: "#C0392B",
    dark: true,
  },
  { label: "Primary", variable: "--primary", hex: "#0A0A0A", dark: true },
  {
    label: "Primary FG",
    variable: "--primary-foreground",
    hex: "#F5F4F0",
    dark: false,
  },
  { label: "Muted", variable: "--muted", hex: "#EEEDEA", dark: false },
];

const TYPE_SCALE: TypeSample[] = [
  {
    className: "text-display",
    label:
      "text-display — clamp(3rem, 8vw, 7rem) / weight 500 / tracking −0.03em",
    specimenEn: "Engineering Craft",
    specimenAr: "هندسة البرمجيات",
  },
  {
    className: "text-heading",
    label:
      "text-heading — clamp(1.75rem, 4vw, 3rem) / weight 500 / tracking −0.02em",
    specimenEn: "Selected Projects",
    specimenAr: "مشاريع مختارة",
  },
  {
    className: "text-subheading",
    label:
      "text-subheading — clamp(1.125rem, 2vw, 1.5rem) / weight 400 / tracking −0.01em",
    specimenEn: "Full-Stack Development",
    specimenAr: "تطوير متكامل",
  },
  {
    className: "text-body",
    label: "text-body — 1rem / line-height 1.625",
    specimenEn:
      "Building systems that are fast, accessible, and maintainable at scale.",
    specimenAr: "بناء أنظمة سريعة وقابلة للوصول وقابلة للصيانة على نطاق واسع.",
  },
  {
    className: "text-caption",
    label:
      "text-caption — 0.8125rem / line-height 1.5 / color: muted-foreground",
    specimenEn: "Last updated May 2025 · Next.js · TypeScript",
    specimenAr: "آخر تحديث مايو 2025 · Next.js · TypeScript",
  },
  {
    className: "text-mono",
    label: "text-mono — Geist Mono / 0.875rem / line-height 1.6",
    specimenEn: "O(n log n) · const handler = async (req) => {",
    specimenAr: "O(n log n) · const handler = async (req) => {",
  },
];

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "4rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-accent-raw)",
            fontWeight: 500,
          }}
        >
          §
        </span>
        <h2
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            fontWeight: 400,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ── Token label ─────────────────────────────────────────────────────────────
function TokenLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.6875rem",
        color: "var(--muted-foreground)",
      }}
    >
      {children}
    </span>
  );
}

export default function DesignSystemShowcase() {
  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        minHeight: "100vh",
        padding: "3rem 2rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: "4rem" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-accent-raw)",
            marginBottom: "0.75rem",
          }}
        >
          Development Audit — Not for production
        </p>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}
        >
          Design System Reference
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
          Editorial Blueprint · globals.css audit · All tokens rendered live
        </p>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          1. COLOR PALETTE
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="01 — Color Palette">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1px",
            backgroundColor: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {COLOR_PALETTE.map((swatch) => (
            <div
              key={swatch.variable}
              style={{ backgroundColor: "var(--background)" }}
            >
              {/* Color block */}
              <div
                style={{
                  backgroundColor: swatch.hex,
                  height: "72px",
                  borderBottom: "1px solid var(--border)",
                }}
              />
              {/* Meta */}
              <div
                style={{
                  padding: "0.75rem",
                  backgroundColor: "var(--background)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    marginBottom: "0.25rem",
                    color: "var(--foreground)",
                  }}
                >
                  {swatch.label}
                </p>
                <TokenLabel>{swatch.variable}</TokenLabel>
                <br />
                <TokenLabel>{swatch.hex}</TokenLabel>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          2. TYPOGRAPHY SCALE — LTR + RTL SIDE BY SIDE
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="02 — Fluid Typography Scale">
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            marginBottom: "2rem",
          }}
        >
          Left column: Geist (LTR / English). Right column: Noto Naskh Arabic
          (RTL / Arabic). RTL overrides — zero letter-spacing, higher weight,
          larger minimum size.
        </p>

        {TYPE_SCALE.map((sample) => (
          <div
            key={sample.className}
            style={{
              marginBottom: "2.5rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* Label */}
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.6875rem",
                color: "var(--color-accent-raw)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              .{sample.className}
            </p>
            <TokenLabel>{sample.label}</TokenLabel>

            {/* Side-by-side specimens */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginTop: "1.25rem",
              }}
            >
              {/* LTR English */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.6875rem",
                    color: "var(--muted-foreground)",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  EN · Geist · LTR
                </p>
                <div className={sample.className} style={{ direction: "ltr" }}>
                  {sample.specimenEn}
                </div>
              </div>

              {/* RTL Arabic */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "0.6875rem",
                    color: "var(--muted-foreground)",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  AR · Noto Naskh · RTL
                </p>
                <div
                  dir="rtl"
                  className={sample.className}
                  style={{
                    fontFamily:
                      "var(--font-noto-naskh), 'Noto Naskh Arabic', serif",
                    textAlign: "right",
                  }}
                >
                  {sample.specimenAr}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          3. GEOMETRY — RADIUS & BORDERS
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="03 — Geometry · Radius Cap at 2px">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* radius: 0 */}
          <div>
            <div
              style={{
                height: "80px",
                border: "1px solid var(--border)",
                borderRadius: "0px",
                backgroundColor: "var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TokenLabel>border-radius: 0</TokenLabel>
            </div>
            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--muted-foreground)",
                marginTop: "0.5rem",
              }}
            >
              --radius-sm: 1px (none)
            </p>
          </div>

          {/* radius: 1px */}
          <div>
            <div
              style={{
                height: "80px",
                border: "1px solid var(--border)",
                borderRadius: "1px",
                backgroundColor: "var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TokenLabel>border-radius: 1px</TokenLabel>
            </div>
            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--muted-foreground)",
                marginTop: "0.5rem",
              }}
            >
              --radius-sm: 1px
            </p>
          </div>

          {/* radius: 2px (max) */}
          <div>
            <div
              style={{
                height: "80px",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                backgroundColor: "var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TokenLabel>border-radius: 2px ← hard cap</TokenLabel>
            </div>
            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--muted-foreground)",
                marginTop: "0.5rem",
              }}
            >
              --radius-md / lg / xl: all 2px
            </p>
          </div>

          {/* pill — only exception */}
          <div>
            <div
              style={{
                height: "80px",
                border: "1px solid var(--border)",
                borderRadius: "9999px",
                backgroundColor: "var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TokenLabel>border-radius: 9999px</TokenLabel>
            </div>
            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--muted-foreground)",
                marginTop: "0.5rem",
              }}
            >
              --radius-full · pill only · tags/avatars
            </p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          4. UI ELEMENTS — CARD, INPUT, BUTTON, LINKS
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="04 — UI Elements">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Card */}
          <div>
            <TokenLabel>
              Card — bg-card / border / border-radius: 2px
            </TokenLabel>
            <div
              style={{
                marginTop: "0.75rem",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "0.6875rem",
                  color: "var(--color-accent-raw)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Next.js · TypeScript
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Portfolio Infrastructure
              </p>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.6,
                }}
              >
                Static site generation with i18n, Tailwind v4, and shadcn
                primitives.
              </p>
            </div>
          </div>

          {/* Input + Focus ring */}
          <div>
            <TokenLabel>
              Input — border: --input / focus ring: --ring (amber)
            </TokenLabel>
            <div style={{ marginTop: "0.75rem" }}>
              <input
                type="text"
                defaultValue="Focus this input to see the amber ring"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--input)",
                  borderRadius: "2px",
                  fontSize: "0.875rem",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  outline: "none",
                  transition: "box-shadow 200ms ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1.5px var(--ring)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <p
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--muted-foreground)",
                  marginTop: "0.5rem",
                }}
              >
                Focus ring: 1.5px solid var(--ring) = #C8A97E
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <TokenLabel>
              Link states — .underline-accent / .hover:underline-accent
            </TokenLabel>
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <a
                href="#"
                className="underline-accent"
                style={{ fontSize: "0.9375rem" }}
              >
                Always underlined — .underline-accent
              </a>
              <a
                href="#"
                className="hover:underline-accent transition-base"
                style={{ fontSize: "0.9375rem" }}
              >
                Hover to reveal — .hover:underline-accent
              </a>
              <a
                href="#"
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                }}
              >
                Plain link — no class — inherits context color
              </a>
            </div>
          </div>

          {/* Tags / Badges */}
          <div>
            <TokenLabel>
              Tag / Badge — border / bg-surface / border-radius variants
            </TokenLabel>
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {["Next.js", "TypeScript", "MongoDB", "Tailwind", "RTL"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.625rem",
                      backgroundColor: "var(--muted)",
                      border: "1px solid var(--border)",
                      borderRadius: "1px",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.6875rem",
                      color: "var(--foreground)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ),
              )}
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.625rem",
                  backgroundColor: "transparent",
                  border: `1px solid var(--color-accent-raw)`,
                  borderRadius: "1px",
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "0.6875rem",
                  color: "var(--color-accent-raw)",
                  letterSpacing: "0.04em",
                }}
              >
                Live
              </span>
            </div>
          </div>

          {/* Button variants */}
          <div>
            <TokenLabel>
              Button variants — primary / ghost / destructive
            </TokenLabel>
            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  padding: "0.5rem 1.25rem",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "1px solid var(--primary)",
                  borderRadius: "2px",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  cursor: "pointer",
                  transition: "opacity 200ms ease",
                }}
              >
                Primary
              </button>
              <button
                style={{
                  padding: "0.5rem 1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  cursor: "pointer",
                }}
              >
                Ghost
              </button>
              <button
                style={{
                  padding: "0.5rem 1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--destructive)",
                  border: "1px solid var(--destructive)",
                  borderRadius: "2px",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  cursor: "pointer",
                }}
              >
                Destructive
              </button>
            </div>
          </div>

          {/* Code block */}
          <div>
            <TokenLabel>
              Code block — bg-code-bg / text-code-text / Geist Mono
            </TokenLabel>
            <pre
              style={{
                marginTop: "0.75rem",
                backgroundColor: "var(--color-code-bg-raw)",
                color: "var(--color-code-text-raw)",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.8125rem",
                lineHeight: 1.65,
                padding: "1.25rem",
                borderRadius: "2px",
                overflowX: "auto",
                direction: "ltr",
                textAlign: "left",
              }}
            >
              <code>{`async function getProjects() {
  const data = await import("@/data/projects.json");
  return ProjectSchema.parse(data.default);
}`}</code>
            </pre>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          5. SPACING TOKENS
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="05 — Spacing Tokens">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            {
              name: "--spacing-section",
              value: "6rem",
              label: "Section vertical padding",
            },
            {
              name: "--spacing-section-sm",
              value: "3.5rem",
              label: "Compact section padding",
            },
            {
              name: "--spacing-gutter",
              value: "1.25rem",
              label: "Horizontal page gutter (mobile)",
            },
          ].map((token) => (
            <div
              key={token.name}
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <div
                style={{
                  width: token.value,
                  height: "24px",
                  backgroundColor: "var(--color-accent-raw)",
                  opacity: 0.4,
                  flexShrink: 0,
                  borderRadius: "1px",
                }}
              />
              <div>
                <TokenLabel>
                  {token.name}: {token.value}
                </TokenLabel>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                    marginTop: "0.125rem",
                  }}
                >
                  {token.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          6. INTERACTION — TRANSITIONS
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="06 — Transitions · Max 200ms">
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {[
            { label: "Fast", value: "100ms", token: "--duration-fast" },
            { label: "Default", value: "200ms", token: "--duration-default" },
          ].map((t) => (
            <div
              key={t.token}
              style={{
                padding: "1.25rem 1.5rem",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                backgroundColor: "var(--card)",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                {t.value}
              </p>
              <TokenLabel>
                {t.token} · {t.label}
              </TokenLabel>
              <p
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--muted-foreground)",
                  marginTop: "0.25rem",
                }}
              >
                Max allowed. Nothing above this.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer
        style={{
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <TokenLabel>
          DesignSystemShowcase.tsx · Development only · Remove before production
        </TokenLabel>
        <TokenLabel>
          Editorial Blueprint · Tailwind v4 · shadcn primitives · Next.js 15
        </TokenLabel>
      </footer>
    </div>
  );
}
