// src/components/atoms/Input.tsx
// Atomic position: atom — text input primitive.
//
// Three variants:
//   outline    → full border all sides                ← RECOMMENDED
//   underline  → border-block-end only — most architectural
//   filled     → bg-muted, no border (except focus)
//
// Logical properties: ps-/pe- for padding, text-start for alignment.
// Amber ring on focus — consistent with :focus-visible in globals.css.
// Accessible: label association via id/htmlFor, aria-describedby for errors.
import { useId } from "react";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export type InputVariant = "outline" | "underline" | "filled";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  /** Node rendered inside the input on the start side (icon, prefix) */
  adornStart?: ReactNode;
  /** Node rendered inside the input on the end side (icon, suffix) */
  adornEnd?: ReactNode;
}

// ── Variant classes ───────────────────────────────────────────────────────────

const variantClasses: Record<InputVariant, string> = {
  outline: [
    "bg-background",
    "border border-input",
    "rounded-sm",
    "focus:border-ring focus:ring-[1.5px] focus:ring-ring",
  ].join(" "),

  underline: [
    "bg-transparent",
    "border-0 border-b border-input rounded-none",
    "focus:border-ring focus:ring-0",
    "px-0", // no side padding for underline style
  ].join(" "),

  filled: [
    "bg-muted",
    "border border-transparent",
    "rounded-sm",
    "focus:border-ring focus:ring-[1.5px] focus:ring-ring",
  ].join(" "),
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Input({
  variant = "outline",
  label,
  error,
  adornStart,
  adornEnd,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;

  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="font-mono text-xs tracking-wider uppercase text-muted-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Start adornment — icon or prefix */}
        {adornStart && (
          <span className="absolute start-3 flex items-center text-muted-foreground pointer-events-none">
            {adornStart}
          </span>
        )}

        <input
          id={inputId}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            // Base
            "w-full text-sm text-foreground font-sans",
            "ps-3 pe-3 py-2", // logical padding — flips in RTL
            "text-start", // text alignment follows dir
            "placeholder:text-muted-foreground",
            "outline-none transition-base",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Adornment padding adjustments
            adornStart && "ps-9",
            adornEnd && "pe-9",
            // Variant
            variantClasses[variant],
            className,
          )}
          {...props}
        />

        {/* End adornment — icon or action */}
        {adornEnd && (
          <span className="absolute end-3 flex items-center text-muted-foreground">
            {adornEnd}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="font-mono text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
