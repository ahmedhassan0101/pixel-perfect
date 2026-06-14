"use client";

import { ArrowRight, FileUser } from "lucide-react"; // استيراد أيقونة الملف للـ CV
import { Button } from "@/components/ui/Button";
import { AvailabilityBadge } from "@/components/ui/Badges";
import heroData from "@/data/hero.json";
import Reveal from "../ui/Reveal";

export function HeroContent() {
  const {
    role,
    headlineOne,
    headlineTwo,
    headlineEm,
    body,
    ctaPrimary,
    ctaSecondary,
    available,
  } = heroData.content;

  return (
    <div className="flex flex-col items-start">
      {/* ── Role  ──────────────────────── */}
      <Reveal activeClass="animate-fade-up animate-delay-100">
        <p className="text-label text-gold! mb-4 md:mb-6 flex items-center gap-2">
          {role}
        </p>
      </Reveal>

      {/* ── Headline ──────────────────── */}
      <Reveal activeClass="animate-fade-up animate-delay-400">
        <h1 className="mb-0 flex flex-col gap-1 md:gap-2">
          <span className="block text-display text-text">{headlineOne}</span>
          <span className="block text-display text-muted">
            {headlineTwo}{" "}
            <em className="italic text-gold not-italic-fallback">
              {headlineEm}
            </em>
          </span>
        </h1>
      </Reveal>

      {/* ── Gold divider ─────────── */}
      <Reveal activeClass="animate-fade-right animate-delay-500">
        <span
          aria-hidden="true"
          className="block h-px bg-gold mt-6 md:mt-8 w-12"
        />
      </Reveal>

      {/* ── Body ─────────────────── */}
      <Reveal activeClass="animate-fade-right animate-delay-1000">
        <p className="text-body text-muted mt-5 md:mt-6 max-w-[40ch]">{body}</p>
      </Reveal>

      {/* ── CTAs ─────────────── */}

      <Reveal activeClass="animate-fade animate-delay-1300">
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 mt-8 md:mt-10 w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            className="w-full sm:w-auto justify-center"
            iconEnd={<ArrowRight size={14} />}
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {ctaPrimary}
          </Button>

          <Button
            variant="ghost"
            size="md"
            className="w-full sm:w-auto justify-center"
            iconEnd={<FileUser size={14} />}
            onClick={() =>
              window.open("/resume.pdf", "_blank", "noopener,noreferrer")
            }
          >
            {ctaSecondary}
          </Button>
        </div>
      </Reveal>

      {/* ── Availability ─────── */}
      <Reveal activeClass="animate-fade animate-delay-1400">
        <div className="mt-8">
          <AvailabilityBadge label={available} />
        </div>
      </Reveal>
    </div>
  );
}

// animate-fade animate-duration-700 animate-delay-[400ms] animate-ease-in

// "use client";

// import { motion } from "framer-motion";
// import { ArrowDown, ArrowRight, FileText } from "lucide-react"; // استيراد أيقونة الملف للـ CV
// import { Button } from "@/components/ui/Button";
// import { AvailabilityBadge } from "@/components/ui/Badges";
// import heroData from "@/data/hero.json";

// const EASE = [0.25, 0, 0, 1] as const;

// const fadeUp = (delay: number) => ({
//   initial: { opacity: 0, y: 12 },
//   animate: { opacity: 1, y: 0 },
//   transition: { delay: delay / 1000, duration: 0.5, ease: EASE },
// });

// const fadeIn = (delay: number) => ({
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   transition: { delay: delay / 1000, duration: 0.4, ease: EASE },
// });

// export function HeroContent() {
//   const {
//     role,
//     headlineOne,
//     headlineTwo,
//     headlineEm,
//     body,
//     ctaPrimary,
//     ctaSecondary,
//     available,
//   } = heroData.content;

//   return (
//     <div className="flex flex-col items-start">
//       {/* ── Role ─────────────────────────────────────────── */}
//       <motion.p
//         className="text-label text-gold! mb-4 md:mb-6 flex items-center gap-2"
//         {...fadeUp(100)}
//       >
//         {role}
//       </motion.p>

//       {/* ── Headline ─────────────────────────────────────── */}
//       <h1 className="mb-0 flex flex-col gap-1 md:gap-2">
//         <motion.span className="block text-display text-text" {...fadeUp(250)}>
//           {headlineOne}
//         </motion.span>
//         <motion.span className="block text-display text-muted" {...fadeUp(400)}>
//           {headlineTwo}{" "}
//           <em className="italic text-gold not-italic-fallback">{headlineEm}</em>
//         </motion.span>
//       </h1>

//       {/* ── Gold divider ─────────────────────────────────── */}
//       <motion.span
//         aria-hidden="true"
//         className="block h-px bg-gold mt-6 md:mt-8 w-12"
//         initial={{ scaleX: 0, originX: "0%" }}
//         animate={{ scaleX: 1 }}
//         transition={{ delay: 0.6, duration: 0.4, ease: EASE }}
//       />

//       {/* ── Body ─────────────────────────────────────────── */}
//       <motion.p
//         className="text-body text-muted mt-5 md:mt-6 max-w-[40ch]"
//         {...fadeUp(750)}
//       >
//         {body}
//       </motion.p>

//       {/* ── CTAs ─────────────────────────────────────────── */}
//       <motion.div
//         className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 mt-8 md:mt-10 w-full sm:w-auto"
//         {...fadeIn(950)}
//       >
//         <Button
//           variant="primary"
//           size="md"
//           className="w-full sm:w-auto justify-center"
//           iconEnd={<ArrowRight size={14} />}
//           onClick={() =>
//             document
//               .getElementById("work")
//               ?.scrollIntoView({ behavior: "smooth" })
//           }
//         >
//           {ctaPrimary}
//         </Button>

//         <Button
//           variant="ghost"
//           size="md"
//           className="w-full sm:w-auto justify-center" // كلاسات الموبايل فقط، الباقي نظيف كلياً
//           iconEnd={<ArrowDown size={14} />} // الأيقونة أصبحت على اليمين (في النهاية)
//           onClick={() =>
//             window.open("/resume.pdf", "_blank", "noopener,noreferrer")
//           }
//         >
//           {ctaSecondary}
//         </Button>
//       </motion.div>

//       {/* ── Availability ─────────────────────────────────── */}
//       <motion.div className="mt-8" {...fadeIn(1100)}>
//         <AvailabilityBadge label={available} />
//       </motion.div>
//     </div>
//   );
// }
