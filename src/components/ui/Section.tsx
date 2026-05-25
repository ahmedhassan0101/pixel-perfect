import React from "react";

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  id: string;
  "aria-label": string;
  children: React.ReactNode;
  containerClassName?: string;
  heroSection?: boolean;
}

export function Section({
  id,
  "aria-label": ariaLabel,
  className = "",
  containerClassName = "",
  heroSection = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`border-b border-border ${
        !heroSection ? "section-padding" : ""
      } ${className}`}
      {...props}
    >
      <div className={`container-content ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
