"use client";

import { type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface RevealProps {
  children: ReactNode;
  activeClass?: string;
}

export default function Reveal({
  children,
  activeClass = "animate-fade-up",
}: RevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-300 ${
        inView ? `opacity-100 ${activeClass}` : "opacity-0"
      } animate-duration-600 animate-ease-linear`}
    >
      {children}
    </div>
  );
}
