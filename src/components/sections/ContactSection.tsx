import { ArrowUpRight } from "lucide-react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import contactData from "@/data/contact.json";
import { PulsingDot } from "../ui/Badges";
import Reveal from "../ui/Reveal";

export function ContactSection() {
  return (
    <>
      <Section id="contact" aria-label="Contact">
        <SectionHeader
          label="The Sign-off"
          titleLine1="Let's build"
          titleLine2="something solid."
          description="I read every message. If the project aligns, I will respond within 24 hours."
        />

        {/* ── Main grid ────────────────────────────────────── */}
        <Reveal activeClass="animate-fade-up animate-delay-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">
            {/* ── Left: The invitation ─────────────────────── */}
            <div className="p-10 lg:border-e border-border flex flex-col justify-between gap-12">
              {/* Headline */}
              <div>
                <h2 className="text-heading text-text mb-6">
                  Something worth
                  <br />
                  <em className="italic text-gold">building?</em>
                </h2>
              </div>

              {/* Email — the primary CTA */}
              <div>
                <p className="text-label text-ghost mb-3">Direct line</p>
                <a
                  href={`mailto:${contactData.email}`}
                  className="
                  text-subheading text-text
                  underline-gold
                  transition-base hover:text-gold
                  block
                "
                  aria-label={`Send email to ${contactData.email}`}
                >
                  {contactData.email}
                </a>
              </div>

              {/* Availability status */}
              <div className="flex flex-col gap-6 pt-8 border-t border-border">
                <div className="flex items-center gap-3">
                  {/* Pulsing dot */}

                  <PulsingDot />

                  <span className="font-mono text-[12px] text-gold tracking-widest uppercase">
                    {contactData.availability.status
                      ? contactData.availability.availableText
                      : contactData.availability.unavailableText}
                  </span>
                </div>
                <div className="flex items-center gap-6 ps-5">
                  <div>
                    <p className="text-label text-ghost ">Status since</p>
                    <p className="text-label text-muted mt-0.5">
                      {/* {CONTACT.since} */}
                      {contactData.availability.since}
                    </p>
                  </div>
                  <span className="w-px h-6 bg-border" aria-hidden="true" />
                  <div>
                    <p className="text-label text-ghost">Location</p>
                    <p className="text-label text-muted mt-0.5">
                      {/* {CONTACT.location} */}
                      {contactData.availability.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Socials + closing ─────────────────── */}
            <div className="p-10 flex flex-col justify-between gap-12">
              {/* Social links */}
              <div>
                <p className="text-label text-ghost mb-6">Find me elsewhere</p>
                <div className="flex flex-col gap-0 border border-border">
                  {contactData.socials.map(({ label, href, note }, i) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                    group flex items-center justify-between
                    px-5 py-4 bg-bg hover:bg-surface
                    transition-base
                    ${i > 0 ? "border-t border-border" : ""}
                  `}
                    >
                      <div className="flex items-center gap-4">
                        <ArrowUpRight
                          size={16}
                          className="text-ghost group-hover:text-gold transition-base"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-body text-text group-hover:text-gold transition-base">
                            {label}
                          </p>
                          <p className="text-label text-ghost">{note}</p>
                        </div>
                      </div>
                      <span
                        className="
                      text-label text-ghost
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300
                      -translate-x-2 group-hover:translate-x-0
                    "
                      >
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Closing statement */}
              <div className="pt-8 border-t border-border">
                <p
                  className="text-body text-muted leading-relaxed"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 300,
                  }}
                >
                  {contactData.quote}
                </p>
                <span
                  className="block w-8 h-px bg-gold mt-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
