"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconDiamond, IconPin, IconCalendar, IconMusicNote } from "@/components/ui/Icons";

const FEATURES = [
  { Icon: IconMusicNote, title: "6+ направлений", desc: "Heels, Contemporary, Hip-Hop, Stretching, Lady Style, Kids" },
  { Icon: IconPin,       title: "2 студии",        desc: "В центре Уфы. Удобное расположение, современное оборудование" },
  { Icon: IconDiamond,   title: "500+ учеников",   desc: "Активное сообщество, шоукейсы, тусовки и поездки на фесты" },
  { Icon: IconCalendar,  title: "Любой уровень",   desc: "Группы для начинающих, средних и продвинутых. От 3,5 лет" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden"
      style={{ background: "#FDF9F3" }}
    >
      {/* Decorative arcs */}
      <svg className="absolute left-0 top-0 pointer-events-none opacity-10" width="400" height="400" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="about-arc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0"/>
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <circle cx="0" cy="0" r="280" stroke="url(#about-arc)" strokeWidth="0.8" fill="none"/>
        <circle cx="0" cy="0" r="200" stroke="url(#about-arc)" strokeWidth="0.5" fill="none"/>
      </svg>

      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag mb-6">О студии</div>

            <h2
              className="font-display uppercase leading-[0.9] text-ink mb-6"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 900 }}
            >
              ГДЕ РОЖДАЕТСЯ{" "}
              <span className="text-metallic-gold">СВОБОДА</span>
            </h2>

            <div className="space-y-5 text-ink-3 leading-relaxed text-sm">
              <p>
                Studio 13 — это место, где перестают существовать комплексы и появляется
                настоящая уверенность. Мы создали пространство, где каждый может найти
                себя через движение.
              </p>
              <p>
                Наши преподаватели — практики с международным опытом. Наши студенты — люди,
                которые приходят за кайфом и остаются навсегда.
              </p>
              <p
                className="text-ink-2"
                style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                }}
              >
                &ldquo;Мы не просто учим танцевать — мы учим чувствовать.&rdquo;
              </p>
            </div>

            <div className="mt-8 flex gap-5 items-center">
              <div className="divider-gold-glow w-12" />
              <div className="text-[10px] tracking-[0.25em] uppercase font-display text-muted">
                с 2019 года
              </div>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.3), transparent)" }} />
            </div>
          </motion.div>

          {/* Right: features grid */}
          <div className="grid grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-light p-5 flex flex-col gap-3 cursor-none"
                style={{ borderRadius: "4px" }}
              >
                <f.Icon size={36} />
                <h3 className="font-display font-bold text-ink text-sm uppercase tracking-wider">
                  {f.title}
                </h3>
                <p className="text-ink-3 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
