/**
 * ManifestoSection.tsx — Server Component
 *
 * The three engineering principles drawn from this portfolio's own
 * construction: every decision made during this project — dropping
 * dark mode toggle, refusing lorem ipsum, debating radius values,
 * choosing Fraunces over a generic serif — reveals a philosophy.
 *
 * This section names that philosophy explicitly.
 *
 * Layout:
 *   - Full-width section header (SectionHeader pattern)
 *   - Three principles in a bordered grid
 *   - Each principle: index + title (Fraunces italic) + body (Geist)
 *   - A closing statement — one line, centered, gold accent
 *
 * No animations here — this section is read, not watched.
 * The stillness is intentional. Contrast with the Hero's choreography.
 *
 * Server Component — zero client JS.
 */
"use client";

import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import principlesData from "@/data/manifesto.json";

export function ManifestoSection() {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <Section id="manifesto" aria-label="Engineering philosophy">
      {/* ── Section header ────────────────────────────────── */}
      <SectionHeader
        index="02"
        label="The Manifesto"
        titleLine1="How I think"
        titleLine2="before I build."
        description="Three principles that have shaped every project, every refactor, and every decision to say no."
      />

      {/* ── Principles grid (Animated) ────────────────────── */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border"
      >
        {principlesData.map(({ id, titleBase, titleEm, body, label }) => (
          <motion.article
            key={id}
            variants={cardVariants}
            className="
              bg-bg p-8 flex flex-col gap-6
              transition-colors duration-300 group hover:bg-surface
            "
          >
            {/* Index + label */}
            <div className="flex items-center justify-between text-label">
              <span>{id}</span>
              <span>{label}</span>
            </div>

            {/* Separator */}
            <span className="block w-full h-px bg-border group-hover:bg-muted/30 transition-colors duration-300" />

            {/* Principle title */}
            <h3 className="text-subheading leading-snug">
              <span className="text-muted">{titleBase} </span>
              {/* تخلصنا من الـ inline style هنا */}
              <em className="italic text-text">{titleEm}</em>
            </h3>

            {/* Body */}
            <p className="text-body text-muted leading-relaxed flex-1">
              {body}
            </p>

            {/* Bottom accent — يظهر عند عمل Hover */}
            {/* استخدمنا ease-out مخصص عبر Tailwind */}
            <span
              aria-hidden="true"
              className="
                block w-0 h-px bg-gold 
                transition-all duration-300 ease-in
                group-hover:w-8
              "
            />
          </motion.article>
        ))}
      </motion.div>

      {/* ── Closing statement ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        viewport={{ once: true }}
        className="mt-16 pt-12 border-t border-border"
      >
        <p className="text-subheading text-center max-w-prose mx-auto text-muted">
          These are not aspirations.
          <br />
          <em className="italic text-text font-serif">
            They are the receipts.
          </em>
        </p>
      </motion.div>
    </Section>
  );
}

// import { Section } from "../ui/Section";
// import { SectionHeader } from "../ui/SectionHeader";

// const PRINCIPLES = [
//   {
//     index: "01",
//     title: "Structure before aesthetics.",
//     titleEm: "before aesthetics.",
//     titleBase: "Structure",
//     body: "I build the backend before I open Figma. Systems that scale are designed from the schema outward — the interface is a consequence of good architecture, not the other way around. Beautiful code that breaks under load is just expensive decoration.",
//     label: "Engineering Philosophy",
//   },
//   {
//     index: "02",
//     title: "Performance is a form of respect.",
//     titleEm: "a form of respect.",
//     titleBase: "Performance is",
//     body: "Every unnecessary kilobyte, every blocking request, every layout shift is a decision made against the person using what I built. Speed is not a feature to add later. It is the baseline from which everything else begins.",
//     label: "User Philosophy",
//   },
//   {
//     index: "03",
//     title: "Interfaces have opinions.",
//     titleEm: "have opinions.",
//     titleBase: "Interfaces",
//     body: "Every color, every radius, every spacing value is a decision. I refuse templates because they carry someone else's decisions. The portfolio you are reading right now was built token by token, argument by argument — because defaults are for people who haven't thought it through.",
//     label: "Design Philosophy",
//   },
// ] as const;

// export function ManifestoSection() {
//   return (
//     <Section id="manifesto" aria-label="Engineering philosophy">
//       {/* ── Section header ────────────────────────────────── */}
//       <SectionHeader
//         index="02"
//         label="The Manifesto"
//         titleLine1="How I think"
//         titleLine2="before I build."
//         description="Three principles that have shaped every project, every refactor, and every decision to say no."
//       />
//       {/* ── Principles grid ───────────────────────────────── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
//         {PRINCIPLES.map(({ index, titleBase, titleEm, body, label }) => (
//           <article
//             key={index}
//             className="
//                   bg-bg
//                   p-8
//                   flex flex-col gap-6
//                   transition-base
//                   group
//                   hover:bg-surface
//                 "
//           >
//             {/* Index + label */}
//             <div className="flex items-center justify-between">
//               <span className="text-label">{index}</span>
//               <span className="text-label">{label}</span>
//             </div>

//             {/* Separator */}
//             <span className="block w-full h-px bg-border group-hover:bg-border-em transition-base" />

//             {/* Principle title — Fraunces, two-tone */}
//             <h3 className="text-subheading text-text leading-snug">
//               <span className="text-muted">{titleBase} </span>
//               <em
//                 className="not-italic"
//                 style={{ fontStyle: "italic", color: "var(--text-primary)" }}
//               >
//                 {titleEm}
//               </em>
//             </h3>

//             {/* Body */}
//             <p className="text-body text-muted leading-relaxed flex-1">
//               {body}
//             </p>

//             {/* Bottom accent — hidden, appears on hover */}
//             <span
//               aria-hidden="true"
//               className="
//                     block w-0 h-px bg-gold
//                     transition-all duration-300
//                     group-hover:w-8
//                   "
//               style={{ transitionTimingFunction: "cubic-bezier(0.25,0,0,1)" }}
//             />
//           </article>
//         ))}
//       </div>

//       {/* ── Closing statement ─────────────────────────────── */}
//       <div className="mt-16 pt-12 border-t border-border">
//         <p
//           className="text-subheading text-center max-w-prose mx-auto"
//           style={{ color: "var(--text-secondary)" }}
//         >
//           These are not aspirations.
//           <br />
//           <em
//             style={{
//               fontStyle: "italic",
//               fontFamily: "var(--font-fraunces), Georgia, serif",
//               color: "var(--text-primary)",
//             }}
//           >
//             They are the receipts.
//           </em>
//         </p>
//       </div>
//     </Section>
//   );
// }
