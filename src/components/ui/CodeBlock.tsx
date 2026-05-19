/**
 * CodeBlock.tsx
 *
 * Philosophical Reasoning:
 * Code is the primary artifact of this portfolio. It deserves the
 * deepest, darkest surface in the system (#141310 — darker than the
 * page background itself). This contrast pulls the eye exactly where
 * the work lives.
 *
 * Zero border-radius. Code blocks are the sharpest element in the
 * design — they should feel like a terminal window, not a widget.
 *
 * The titlebar pattern — gold filename on the left, language label
 * on the right — mirrors real IDE tab bars. It is functional before
 * it is decorative. The bottom border separates metadata from content
 * at exactly 1px, consistent with every other divider in the system.
 *
 * Two modes:
 * 1. Static: accepts `children` as pre-formatted ReactNode (for MDX
 *    or server-rendered highlighted HTML from shiki).
 * 2. Raw: accepts a plain `code` string and renders it in a <pre>.
 *    Use shiki on the server for real syntax highlighting in production.
 *
 * The copy-to-clipboard action is client-side and uses the native
 * Clipboard API — no library dependency.
 */

"use client";

import { useState, type ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────

export interface CodeBlockProps {
  /** Filename shown in gold — e.g. "get-projects.ts" */
  filename?: string;
  /** Language label shown on the right — e.g. "typescript" */
  language?: string;
  /** Plain string code — rendered in <pre><code> */
  code?: string;
  /** Pre-highlighted ReactNode (from shiki or MDX) */
  children?: ReactNode;
  /** Show copy button — defaults to true when `code` is provided */
  copyable?: boolean;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────

export function CodeBlock({
  filename,
  language,
  code,
  children,
  copyable = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silent fail
    }
  }

  const hasTitlebar = filename || language || (copyable && code);

  return (
    <div
      className={cn(
        "border border-border",
        "rounded-none",               // 0px — sharpest element in system
        "overflow-hidden",
        className,
      )}
    >
      {/* ── Titlebar ──────────────────────────────────────── */}
      {hasTitlebar && (
        <div className="
          flex items-center justify-between
          bg-elevated border-b border-border
          px-4 py-2.5
          gap-4
        ">
          {/* Left: gold filename */}
          <span className="text-label text-gold truncate">
            {filename ?? ""}
          </span>

          {/* Right: language + copy button */}
          <div className="flex items-center gap-3 shrink-0">
            {language && (
              <span className="text-label text-ghost">
                {language}
              </span>
            )}
            {copyable && code && (
              <button
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy code"}
                className="
                  text-ghost hover:text-muted
                  transition-base
                  focus-visible:outline-none
                  focus-visible:ring-[1.5px] focus-visible:ring-gold
                "
              >
                {copied
                  ? <Check size={12} aria-hidden />
                  : <Copy size={12} aria-hidden />
                }
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Code area ─────────────────────────────────────── */}
      <div className="bg-code-bg overflow-x-auto">
        {children ? (
          // Pre-highlighted content (shiki / MDX)
          <div className="text-mono text-code-text p-5 leading-relaxed">
            {children}
          </div>
        ) : (
          // Plain string — formatted in <pre><code>
          <pre className="text-mono text-code-text p-5 leading-relaxed m-0">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}