"use client";

import React from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  titleLine1: string;
  titleLine2: string;
  description: React.ReactNode;
}
export function SectionHeader({
  label,
  titleLine1,
  titleLine2,
  description,
}: SectionHeaderProps) {
  return (
    <header className="mb-16">
      {/* Label Section */}
      <Reveal activeClass="animate-fade-up animate-delay-100">
        <p className="text-label text-gold! flex items-center gap-2 mb-6 ">
          <span>{label}</span>
        </p>
      </Reveal>

      {/* Title & Description Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        <Reveal activeClass="animate-fade-up animate-delay-100">
          <h2 className="text-heading text-text timeline-view">
            {titleLine1}
            <br />
            <em className="italic text-gold">{titleLine2}</em>
          </h2>
        </Reveal>
        <Reveal activeClass="animate-fade animate-delay-600">
          <p className="text-body text-muted max-w-[44ch] lg:pb-1">
            {description}
          </p>
        </Reveal>
      </div>

      {/* Gold accent line */}
      <Reveal activeClass="animate-fade-right animate-delay-300">
        <span
          aria-hidden="true"
          className="block w-8 h-px bg-gold mt-8 timeline-view"
        />
      </Reveal>
    </header>
  );
}

// ----------------------------------
// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// interface SectionHeaderProps {
//   label: string;
//   titleLine1: string;
//   titleLine2: string;
//   description: React.ReactNode;
// }
// export function SectionHeader({
//   label,
//   titleLine1,
//   titleLine2,
//   description,
// }: SectionHeaderProps) {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.7,
//         ease: [0.25, 0.1, 0.25, 1] as const,
//       },
//     },
//   };

//   return (
//     <motion.header
//       className="mb-16"
//       variants={containerVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//     >
//       {/* Label Section */}
//       <motion.p
//         variants={itemVariants}
//         className="text-label text-gold! flex items-center gap-2 mb-6"
//       >
//         <span>{label}</span>
//       </motion.p>

//       {/* Title & Description Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
//         <motion.h2 variants={itemVariants} className="text-heading text-text">
//           {titleLine1}
//           <br />
//           <em className="italic text-gold">{titleLine2}</em>
//         </motion.h2>

//         <motion.p
//           variants={itemVariants}
//           className="text-body text-muted max-w-[44ch] lg:pb-1"
//         >
//           {description}
//         </motion.p>
//       </div>

//       {/* Gold accent line */}
//       <motion.span
//         variants={itemVariants}
//         aria-hidden="true"
//         className="block w-8 h-px bg-gold mt-8"
//       />
//     </motion.header>
//   );
// }

// ---------------------------------------------------
// import React from "react";

// interface SectionHeaderProps {
//   index: string;
//   label: string;
//   titleLine1: string;
//   titleLine2: string;
//   description: React.ReactNode;
// }

// export function SectionHeader({
//   index,
//   label,
//   titleLine1,
//   titleLine2,
//   description,
// }: SectionHeaderProps) {
//   return (
//     <header className="mb-16">
//       {/* Label Section */}
//       <p className="text-label text-gold flex items-center gap-2 mb-6">
//         <span aria-hidden="true">§</span>
//         <span>{index}</span>
//         <span aria-hidden="true">—</span>
//         <span>{label}</span>
//       </p>

//       {/* Title & Description Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
//         <h2 className="text-heading text-text">
//           {titleLine1}
//           <br />
//           <em className="italic text-gold">{titleLine2}</em>
//         </h2>

//         <p className="text-body text-muted max-w-[44ch] lg:pb-1">
//           {description}
//         </p>
//       </div>

//       {/* Gold accent line */}
//       <span aria-hidden="true" className="block w-8 h-px bg-gold mt-8" />
//     </header>
//   );
// }

// import { cn } from "@/lib/utils";

// interface SectionHeaderProps {
//   /** Small mono label above headline — e.g. "§ 01 — SELECTED WORK" */
//   label: string;
//   /** Optional section index prefix — e.g. "01" */
//   index?: string;
//   /** Large Fraunces headline */
//   headline: React.ReactNode;
//   /** Optional body copy in Geist light */
//   body?: string;
//   /** Alignment — default is start (left in LTR) */
//   align?: "start" | "center";
//   className?: string;
// }

// export function SectionHeader({
//   label,
//   index,
//   // ----
//   headline,
//   body,
//   align = "start",
//   className,
// }: SectionHeaderProps) {
//   const centered = align === "center";

//   return (
//     <header
//       className={cn(
//         "flex flex-col",
//         centered ? "items-center text-center" : "items-start",
//         className,
//       )}
//     >
//       {/* ── Small gold label ──────────────────────────────── */}
//       <p className="text-label text-gold flex items-center gap-2 mb-6">
//         <span aria-hidden="true">§</span>
//         {index && (
//           <>
//             <span>{index}</span>
//             <span aria-hidden="true">—</span>
//           </>
//         )}
//         <span>{label}</span>
//       </p>

//       {/* ── Fraunces headline ─────────────────────────────── */}
//       {/* Accepts ReactNode so callers can inject <em className="text-em"> */}
//       <h2 className="text-heading text-text mb-0">{headline}</h2>

//       {/* ── 32px gold accent line ─────────────────────────── */}

//         <span
//           aria-hidden="true"
//           className="block w-8 h-px bg-gold mt-6 mb-0"
//         />

//       {/* ── Optional body copy ────────────────────────────── */}
//       {body && (
//         <p
//           className={cn(
//             "text-body text-muted mt-6",
//             centered ? "max-w-prose" : "max-w-[52ch]",
//           )}
//         >
//           {body}
//         </p>
//       )}
//     </header>
//   );
// }
