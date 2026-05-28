"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  { icon: "👠", title: "7+ направлений", desc: "Heels, Contemporary, Hip-Hop, Stretching, Lady Style, Breaking, Kids" },
  { icon: "📍", title: "2 студии", desc: "В центре Уфы. Удобное расположение, современное оборудование" },
  { icon: "⭐", title: "500+ учеников", desc: "Активное сообщество, шоукейсы, тусовки и поездки на фесты" },
  { icon: "🎯", title: "Любой уровень", desc: "Группы для начинающих, средних и продвинутых. От 3,5 лет и до ∞" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden"
    >
      {/* Accent blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF0FA0 0%, transparent 70%)", filter: "blur(70px)" }} />

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
              className="font-display uppercase leading-[0.9] text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 900 }}
            >
              ГДЕ РОЖДАЕТСЯ{" "}
              <span style={{ color: "#FF0FA0", textShadow: "0 0 30px rgba(255,15,160,0.6)" }}>
                СВОБОДА
              </span>
            </h2>

            <div className="space-y-5 text-[rgba(255,255,255,0.6)] leading-relaxed text-sm">
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
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                &ldquo;Мы не просто учим танцевать — мы учим чувствовать.&rdquo;
              </p>
            </div>

            <div className="mt-8 flex gap-5">
              <div
                className="h-px flex-1 self-center"
                style={{ background: "linear-gradient(90deg, #FF0FA0, transparent)" }}
              />
              <div className="text-[10px] tracking-[0.25em] uppercase font-display text-[rgba(255,255,255,0.3)]">
                с 2019 года
              </div>
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
                className="group p-5 rounded-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,15,160,0.3)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(255,15,160,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-display font-700 text-white text-sm uppercase tracking-wider mb-2"
                  style={{ fontWeight: 700 }}>
                  {f.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.45)] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
