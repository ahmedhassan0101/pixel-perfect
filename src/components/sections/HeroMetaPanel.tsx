import heroData from "@/data/hero.json";
import Reveal from "../ui/Reveal";

export function HeroMetaPanel() {
  const { stats, terminalLines, stack } = heroData.meta;
  return (
    <div className="flex flex-col">
      {/* ── Block 1: Stats ────────────────────────────────── */}
      <Reveal activeClass="animate-fade-left animate-delay-200">
        <div className="grid grid-cols-2 gap-px bg-border border border-border">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-bg px-5 py-6">
              {/* Large Fraunces numeral — the display scale for data */}
              <p
                className="text-heading  mb-1 leading-none"
                aria-label={`${value} ${label}`}
              >
                {value}
              </p>
              <p className="text-label">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Block 2: Terminal ─────────────────────────────── */}
      <Reveal activeClass="animate-fade-left animate-delay-600">
        <div className="border border-border ">
          {/* Titlebar */}
          <div
            className="
          flex items-center justify-between
          bg-elevated border-b border-border
          px-4 py-2.5
        "
          >
            {/* Window dots — purely decorative */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="block w-2.5 h-2.5 rounded-full bg-border" />
              <span className="block w-2.5 h-2.5 rounded-full bg-border" />
              <span className="block w-2.5 h-2.5 rounded-full bg-border" />
            </div>
            <span className="text-label text-ghost!">bash</span>
          </div>

          {/* Terminal lines */}
          <div className="bg-code-bg px-4 py-4 flex flex-col gap-2.5">
            {terminalLines.map(({ cmd, out }) => (
              <div key={cmd}>
                {/* Command line */}
                <p
                  className="text-mono text-code-text"
                  style={{ fontSize: "12px" }}
                >
                  <span className="text-gold">~ $</span> <span>{cmd}</span>
                </p>
                {/* Output line */}
                <p
                  className="text-mono ps-5"
                  style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                >
                  {out}
                </p>
              </div>
            ))}

            {/* Blinking cursor line */}
            <p className="text-mono text-gold" style={{ fontSize: "12px" }}>
              ~ ${" "}
              <span
                className="cursor-blink inline-block w-2 h-3.5 bg-gold align-middle"
                aria-hidden="true"
              />
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── Block 3: Stack ────────────────────────────────── */}
      <Reveal activeClass="animate-fade-left animate-delay-1000">
        <div className="px-5 py-5 border border-border">
          <p className="text-label text-ghost mb-4">Current stack</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
            {stack.map((tech, i) => (
              <span key={tech} className="flex items-center gap-3">
                <span className="text-label text-muted">{tech}</span>
                {i < stack.length - 1 && (
                  <span className="text-gold text-label" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import heroData from "@/data/hero.json";

// const EASE = [0.25, 0, 0, 1] as const;

// const fadeUp = (delay: number) => ({
//   initial: { opacity: 0, y: 12 },
//   animate: { opacity: 1, y: 0 },
//   transition: { delay: delay / 1000, duration: 0.6, ease: EASE },
// });

// export function HeroMetaPanel() {
//   const { stats, terminalLines, stack } = heroData.meta;
//   return (
//     <div className="flex flex-col">
//       {/* ── Block 1: Stats ────────────────────────────────── */}
//       <motion.div
//         className="grid grid-cols-2 gap-px bg-border border border-border"
//         {...fadeUp(200)}
//       >
//         {stats.map(({ value, label }) => (
//           <div key={label} className="bg-bg px-5 py-6">
//             {/* Large Fraunces numeral — the display scale for data */}
//             <p
//               className="text-heading  mb-1 leading-none"
//               aria-label={`${value} ${label}`}
//             >
//               {value}
//             </p>
//             <p className="text-label">{label}</p>
//           </div>
//         ))}
//       </motion.div>

//       {/* ── Block 2: Terminal ─────────────────────────────── */}
//       <motion.div className="border border-border" {...fadeUp(400)}>
//         {/* Titlebar */}
//         <div
//           className="
//           flex items-center justify-between
//           bg-elevated border-b border-border
//           px-4 py-2.5
//         "
//         >
//           {/* Window dots — purely decorative */}
//           <div className="flex items-center gap-1.5" aria-hidden="true">
//             <span className="block w-2.5 h-2.5 rounded-full bg-border" />
//             <span className="block w-2.5 h-2.5 rounded-full bg-border" />
//             <span className="block w-2.5 h-2.5 rounded-full bg-border" />
//           </div>
//           <span className="text-label text-ghost!">bash</span>
//         </div>

//         {/* Terminal lines */}
//         <div className="bg-code-bg px-4 py-4 flex flex-col gap-2.5">
//           {terminalLines.map(({ cmd, out }) => (
//             <div key={cmd}>
//               {/* Command line */}
//               <p
//                 className="text-mono text-code-text"
//                 style={{ fontSize: "12px" }}
//               >
//                 <span className="text-gold">~ $</span> <span>{cmd}</span>
//               </p>
//               {/* Output line */}
//               <p
//                 className="text-mono ps-5"
//                 style={{ fontSize: "12px", color: "var(--text-secondary)" }}
//               >
//                 {out}
//               </p>
//             </div>
//           ))}

//           {/* Blinking cursor line */}
//           <p className="text-mono text-gold" style={{ fontSize: "12px" }}>
//             ~ ${" "}
//             <span
//               className="cursor-blink inline-block w-2 h-3.5 bg-gold align-middle"
//               aria-hidden="true"
//             />
//           </p>
//         </div>
//       </motion.div>

//       {/* ── Block 3: Stack ────────────────────────────────── */}
//       <motion.div className="px-5 py-5 border border-border" {...fadeUp(600)}>
//         <p className="text-label text-ghost mb-4">Current stack</p>
//         <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
//           {stack.map((tech, i) => (
//             <span key={tech} className="flex items-center gap-3">
//               <span className="text-label text-muted">{tech}</span>
//               {i < stack.length - 1 && (
//                 <span className="text-gold text-label" aria-hidden="true">
//                   ·
//                 </span>
//               )}
//             </span>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }
