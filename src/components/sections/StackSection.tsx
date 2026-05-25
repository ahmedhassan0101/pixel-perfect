// import stackData from "@/data/stack.json";
// import { Globe, Server, Database, Cloud, Wrench } from "lucide-react";
// import { SectionHeader } from "../ui/SectionHeader";
// import { Section } from "../ui/Section";

// // ── Types ─────────────────────────────────────────────────────

// interface Tool {
//   name: string;
//   level: number;
//   note: string;
// }

// interface StackCategory {
//   category: string;
//   index: string;
//   tools: Tool[];
// }

// const stack = stackData as StackCategory[];

// // ── Icon map ──────────────────────────────────────────────────

// const ICONS: Record<string, React.ElementType> = {
//   Frontend: Globe,
//   Backend: Server,
//   Database: Database,
//   Infrastructure: Cloud,
//   Tooling: Wrench,
// };

// export function StackSection() {
//   return (

//     <Section id="stack" aria-label="Technical stack">
//       <SectionHeader
//         index="04"
//         label="The Architecture"
//         titleLine1="Tools I reach for"
//         titleLine2="by instinct."
//         description="Five layers. Each one chosen after something broke without it."
//       />

//       {/* ── Grid ─────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
//         {stack.map((cat) => {
//           const Icon = ICONS[cat.category] ?? Wrench;

//           return (
//             <div
//               key={cat.category}
//               className="
//                 bg-bg hover:bg-surface
//                 transition-base
//                 p-6
//                 flex flex-col gap-6
//                 group relative overflow-hidden
//               "
//             >
//               {/* Card header */}
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 flex items-center justify-center border border-border group-hover:border-border-em transition-base">
//                     <Icon
//                       size={14}
//                       className="text-ghost group-hover:text-gold transition-base"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <span className="text-label text-text">{cat.category}</span>
//                 </div>
//                 <span className="text-label text-ghost">{cat.index}</span>
//               </div>

//               {/* Tools List (بدون النسب المئوية الكاذبة) */}
//               <div className="flex flex-col gap-4 flex-1">
//                 {cat.tools.map((tool) => (
//                   <div key={tool.name} className="flex flex-col gap-1">
//                     <span className="text-body text-text font-medium">
//                       {tool.name}
//                     </span>
//                     <span className="text-label text-ghost">{tool.note}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Bottom accent line (Tailwind Pure) */}
//               <span
//                 className="
//                   absolute bottom-0 left-0
//                   block w-0 h-[2px] bg-gold
//                   group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.25,0,0,1)]
//                 "
//               />
//             </div>
//           );
//         })}

//         <div className="bg-bg p-6 flex flex-col justify-between group hover:bg-surface transition-base">
//           <div className="flex flex-col gap-2">
//             <span className="text-label text-gold">Philosophy</span>
//             <p className="text-body text-text leading-relaxed">
//               I prioritize understanding core concepts over chasing new
//               frameworks. A solid foundation in JavaScript and architecture
//               outlasts any trend.
//             </p>
//           </div>
//           <div className="mt-6 pt-6 border-t border-border">
//             <a
//               href="#projects"
//               className="text-label text-ghost hover:text-gold transition-base flex items-center gap-2"
//             >
//               See these in action →
//             </a>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }
// export function StackSection() {
//   return (
//     <Section id="stack" aria-label="Technical stack">
//       <SectionHeader
//         index="04"
//         label="The Architecture"
//         titleLine1="Tools I reach for"
//         titleLine2="by instinct."
//         description="Five layers. Each one chosen after something broke without it."
//       />

//       {/* ── Grid ─────────────────────────────────────────── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
//         {stack.map((cat) => {
//           const Icon = ICONS[cat.category] ?? Wrench;

//           return (
//             <div
//               key={cat.category}
//               className="
//                   bg-bg hover:bg-surface
//                   transition-base
//                   p-6
//                   flex flex-col gap-5
//                   group
//                 "
//             >
//               {/* Card header: icon + index + category */}
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="
//                       w-8 h-8 flex items-center justify-center
//                       border border-border
//                       group-hover:border-border-em
//                       transition-base
//                     "
//                   >
//                     <Icon
//                       size={14}
//                       className="text-ghost group-hover:text-gold transition-base"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <span className="text-label text-text">{cat.category}</span>
//                 </div>
//                 <span className="text-label text-ghost">{cat.index}</span>
//               </div>

//               {/* Divider */}
//               <span
//                 className="
//                   block w-full h-px bg-border
//                   group-hover:bg-border-em transition-base
//                 "
//               />

//               {/* Tools */}
//               <div className="flex flex-col gap-3 flex-1">
//                 {cat.tools.map((tool) => (
//                   <div key={tool.name} className="flex flex-col gap-1.5">
//                     {/* Tool name + level */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-body text-text">{tool.name}</span>
//                       <span className="text-label text-ghost">
//                         {tool.level}%
//                       </span>
//                     </div>

//                     {/* Progress bar */}
//                     <div className="w-full h-px bg-border">
//                       <div
//                         className="h-full bg-gold"
//                         style={{ width: `${tool.level}%` }}
//                         aria-label={`${tool.level}% proficiency in ${tool.name}`}
//                         role="meter"
//                         aria-valuenow={tool.level}
//                         aria-valuemin={0}
//                         aria-valuemax={100}
//                       />
//                     </div>

//                     {/* Note */}
//                     <p className="text-label text-ghost">{tool.note}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Bottom accent line */}
//               <span
//                 className="
//                   block w-0 h-px bg-gold
//                   group-hover:w-8 transition-all duration-300
//                 "
//                 style={{
//                   transitionTimingFunction: "cubic-bezier(0.25,0,0,1)",
//                 }}
//               />
//             </div>
//           );
//         })}

//         {/* Sixth cell — summary / total count */}
//         <div className="bg-bg p-6 flex flex-col justify-between">
//           <p className="text-label text-ghost mb-6">Total tools</p>
//           <div className="flex flex-col gap-3">
//             {stack.map((cat) => (
//               <div
//                 key={cat.category}
//                 className="flex items-center justify-between"
//               >
//                 <span className="text-label text-muted">{cat.category}</span>
//                 <span className="text-label text-gold">{cat.tools.length}</span>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 pt-6 border-t border-border">
//             <p className="text-heading text-text leading-none">
//               {stack.reduce((sum, c) => sum + c.tools.length, 0)}
//             </p>
//             <p className="text-label text-ghost mt-1">Tools total</p>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// }

import stackData from "@/data/stack.json";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Wrench,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { Section } from "../ui/Section";

// ── Types ─────────────────────────────────────────────────────

interface Tool {
  name: string;
  note: string;
  status: "core" | "exploring";
}

interface StackCategory {
  category: string;
  index: string;
  tools: Tool[];
}

const stack = stackData as StackCategory[];

// ── Icon map ──────────────────────────────────────────────────

const ICONS: Record<string, React.ElementType> = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  Infrastructure: Cloud,
  Tooling: Wrench,
};

export function StackSection() {
  return (
    <>
      <Section id="stack" aria-label="Technical stack">
        <SectionHeader
          index="04"
          label="The Architecture"
          titleLine1="Tools I reach for"
          titleLine2="by instinct."
          description="Five layers. Each one chosen after something broke without it."
        />

        {/* ── Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {stack.map((cat) => {
            const Icon = ICONS[cat.category] ?? Wrench;

            return (
              <div
                key={cat.category}
                className="
                bg-bg hover:bg-surface
                transition-base
                p-6 md:p-8
                flex flex-col gap-6
                group relative
              "
              >
                {/* Card header: icon + index + category */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                      w-8 h-8 flex items-center justify-center
                      border border-border
                      group-hover:border-border-em
                      transition-base
                    "
                    >
                      <Icon
                        size={14}
                        className="text-ghost group-hover:text-gold transition-base"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-label text-text">{cat.category}</span>
                  </div>
                  <span className="text-label text-ghost">{cat.index}</span>
                </div>

                {/* Divider */}
                <span
                  className="
                  block w-full h-px bg-border
                  group-hover:bg-border-em transition-base
                "
                />

                {/* Tools List */}
                <div className="flex flex-col gap-4 flex-1">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="flex flex-col gap-1">
                      {/* Tool name + Optional Status Tag */}
                      <div className="flex items-center gap-2">
                        <span className="text-body text-text font-medium">
                          {tool.name}
                        </span>
                        {tool.status === "exploring" && (
                          <span
                            className="
                            text-[9px] uppercase tracking-widest px-1.5 py-0.5 
                            rounded-sm border border-gold/30 text-gold bg-gold/5
                          "
                          >
                            Focus
                          </span>
                        )}
                      </div>

                      {/* Note replacing the progress bar */}
                      <span className="text-label text-ghost">{tool.note}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line (Tailwind Only) */}
                <span
                  className="
                  absolute bottom-0 left-0
                  block w-0 h-px bg-gold
                  group-hover:w-full transition-all duration-500 ease-in
                "
                />
              </div>
            );
          })}

          {/* ── Sixth cell — Philosophy & CTA (Replaces the empty checklist) ── */}
          <div className="bg-bg p-6 md:p-8 flex flex-col justify-between group hover:bg-surface transition-base relative">
            <div className="flex flex-col gap-4">
              <span className="text-label text-gold">
                Development Philosophy
              </span>
              <p className="text-body text-text leading-relaxed">
                Frameworks come and go, but architecture remains. I prioritize
                understanding underlying principles—how the event loop works,
                how data flows, and why a tool exists—over blindly memorizing
                syntax.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-label text-ghost">Current focus</span>
                <span className="text-body text-text">
                  Scalable System Design
                </span>
              </div>

              <a
                href="#work"
                className="
                w-10 h-10 flex items-center justify-center 
                border border-border rounded-full
                group-hover:border-gold group-hover:text-gold 
                text-ghost transition-base
              "
                aria-label="View projects"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Bottom accent line for consistency */}
            <span
              className="
              absolute bottom-0 left-0
              block w-0 h-px bg-gold
              group-hover:w-full transition-all duration-500 ease-in
            "
            />
          </div>
        </div>
      </Section>
      <section
        id="stack"
        className="section-padding border-b border-border"
        aria-label="Technical stack"
      >
        <div className="container-content">
          <SectionHeader
            index="04"
            label="The Architecture"
            titleLine1="Tools I reach for"
            titleLine2="by instinct."
            description="Five layers. Each one chosen after something broke without it."
          />

          {/* ── Bento grid ─────────────────────────────────── */}
          {/* 5 category cards + 1 philosophy cell = 6 cells   */}
          {/* 3-column desktop, 2 tablet, 1 mobile             */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {stack.map((cat) => {
              const Icon = ICONS[cat.category] ?? Wrench;

              return (
                <div
                  key={cat.category}
                  className="
                  bg-bg hover:bg-surface
                  transition-base
                  p-6
                  flex flex-col gap-5
                  group
                "
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                      w-8 h-8 flex items-center justify-center
                      border border-border
                      group-hover:border-border-em
                      transition-base
                    "
                      >
                        <Icon
                          size={12}
                          className="text-ghost group-hover:text-gold transition-base"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-label text-text">
                        {cat.category}
                      </span>
                    </div>
                    <span className="text-label text-ghost">{cat.index}</span>
                  </div>

                  {/* Divider */}
                  <span
                    className="
                  block w-full h-px bg-border
                  group-hover:bg-border-em transition-base
                "
                  />

                  {/* Tools */}
                  <div className="flex flex-col gap-4 flex-1">
                    {cat.tools.map((tool) => (
                      <div key={tool.name} className="flex flex-col gap-1">
                        {/* Tool name + exploring tag */}
                        <div className="flex items-center gap-2.5">
                          <span className="text-body text-text">
                            {tool.name}
                          </span>
                          {tool.status === "exploring" && <ExploringTag />}
                        </div>

                        {/* Note — technical depth signal */}
                        <p className="text-label text-ghost">{tool.note}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent — 0 → 2rem on hover */}
                  {/* Uses Tailwind arbitrary ease — no inline styles */}
                  <span
                    className="
                  block w-0 h-px bg-gold
                  group-hover:w-8
                  transition-all duration-300
                  ease-in
                "
                  />
                </div>
              );
            })}

            {/* ── 6th cell: Current Focus ─────────────────── */}
            <CurrentFocusCell />
          </div>

          {/* ── Legend ────────────────────────────────────────── */}
          <div
            className="
          border-x border-b border-border
          flex items-center gap-6
          px-5 py-3
        "
          >
            <span className="text-label text-ghost">Legend:</span>
            <span className="text-label text-muted">
              No tag → core, daily driver
            </span>
            <span className="w-px h-3 bg-border" aria-hidden="true" />
            <span className="flex items-center gap-2 text-label text-muted">
              <ExploringTag /> → actively going deeper
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Exploring badge ───────────────────────────────────────────
// Shown ONLY for status === "exploring". Nothing for "core".
// Ghost text — signals curiosity, not weakness.

function ExploringTag() {
  return (
    <span
      className="
      inline-flex items-center
      text-label text-ghost
      border border-border
      px-1.5 py-px
      rounded-none
      leading-none
    "
    >
      exploring
    </span>
  );
}

// ── Current Focus cell — replaces the old summary cell ────────
// A philosophy statement. Says more than "21 tools total" ever could.

function CurrentFocusCell() {
  return (
    <div className="bg-bg p-6 flex flex-col justify-between gap-8">
      {/* Label */}
      <p className="text-label text-ghost">Current focus</p>

      {/* Statement */}
      <div className="flex flex-col gap-4">
        <p
          className="text-subheading text-text leading-snug"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 300,
          }}
        >
          Architecture before{" "}
          <em
            className="not-italic"
            style={{ fontStyle: "italic", color: "var(--accent-gold)" }}
          >
            abstractions.
          </em>
        </p>
        <p className="text-body text-muted">
          I chase fundamentals, not frameworks. Every tool here earned its place
          by solving a real problem — not by trending on Twitter.
        </p>
      </div>

      {/* CTA — links to work section */}
      <a
        href="#work"
        className="
          inline-flex items-center gap-2
          text-label text-muted
          transition-base
          hover:text-text hover:underline-gold
          group
        "
      >
        See it in practice
        <ArrowRight
          size={11}
          className="transition-base group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
