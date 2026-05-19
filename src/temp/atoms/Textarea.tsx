// src/components/atoms/Textarea.tsx
// Atomic position: atom — multiline text input primitive.
// Mirrors Input.tsx variants exactly — same visual language, same focus ring.
//
// Three variants:
//   outline    → full border                         ← RECOMMENDED
//   underline  → border-block-end only
//   filled     → bg-muted surface
import { useId } from "react";

import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaVariant = "outline" | "underline" | "filled";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  label?: string;
  error?: string;
}

const variantClasses: Record<TextareaVariant, string> = {
  outline: [
    "bg-background border border-input rounded-sm",
    "focus:border-ring focus:ring-[1.5px] focus:ring-ring",
  ].join(" "),

  underline: [
    "bg-transparent border-0 border-b border-input rounded-none",
    "focus:border-ring focus:ring-0 px-0",
  ].join(" "),

  filled: [
    "bg-muted border border-transparent rounded-sm",
    "focus:border-ring focus:ring-[1.5px] focus:ring-ring",
  ].join(" "),
};

export function Textarea({
  variant = "outline",
  label,
  error,
  id,
  className,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  // const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;
  const textareaId = id ?? `textarea-${generatedId}`;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="font-mono text-xs tracking-wider uppercase text-muted-foreground"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(
          "w-full text-sm text-foreground font-sans",
          "ps-3 pe-3 py-2.5",
          "text-start",
          "placeholder:text-muted-foreground",
          "outline-none transition-base",
          "resize-none", // resize handled by rows prop
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          className,
        )}
        {...props}
      />

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
