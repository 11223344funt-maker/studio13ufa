"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LOCATIONS = [
  {
    id: 1,
    name: "Студия на Ленина",
    address: "ул. Ленина, 12, 2 этаж",
    metro: "5 мин от ТЦ «Галерея»",
    phone: "+7 (347) 000-00-01",
    hours: "Пн–Сб: 9:00–22:00 / Вс: 10:00–20:00",
    mapUrl: "https://yandex.ru/maps",
    color: "#FF0FA0",
    glow: "rgba(255,15,160,0.4)",
  },
  {
    id: 2,
    name: "Студия в Центре",
    address: "ул. Пушкина, 55, 3 этаж",
    metro: "3 мин от площади Ленина",
    phone: "+7 (347) 000-00-02",
    hours: "Пн–Вс: 10:00–22:00",
    mapUrl: "https://yandex.ru/maps",
    color: "#B9FF00",
    glow: "rgba(185,255,0,0.3)",
  },
];

export function ContactsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="contacts" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden">
      <div className="absolute left-1/4 bottom-0 w-64 h-64 opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF0FA0 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="section-tag mb-5">Контакты</div>
          <h2
            className="font-display uppercase leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
          >
            ГДЕ НАС{" "}
            <span style={{ color: "#FF0FA0", textShadow: "0 0 30px rgba(255,15,160,0.6)" }}>
              НАЙТИ
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Top neon line */}
              <div
                className="h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${loc.color}, transparent)`,
                  boxShadow: `0 0 12px ${loc.glow}`,
                }}
              />

              <div className="p-7 md:p-8">
                <p
                  className="text-[9px] tracking-[0.35em] uppercase font-display mb-3"
                  style={{ color: loc.color }}
                >
                  Студия {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-display uppercase text-white leading-tight mb-5"
                  style={{ fontWeight: 900, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
                >
                  {loc.name}
                </h3>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: "📍", text: loc.address },
                    { icon: "🚶", text: loc.metro },
                    { icon: "📞", text: loc.phone },
                    { icon: "🕐", text: loc.hours },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <span className="text-sm flex-shrink-0 mt-0.5">{item.icon}</span>
                      <span className="text-[rgba(255,255,255,0.6)] text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-display transition-all duration-300"
                  style={{ color: loc.color }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 12px ${loc.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = "";
                  }}
                >
                  Открыть на карте →
                </a>
              </div>

              {/* Mini map placeholder */}
              <div
                className="h-40 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[rgba(255,255,255,0.1)] text-xs font-display tracking-widest uppercase">
                    Яндекс.Карта
                  </span>
                </div>
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-4 h-4 rounded-full animate-ping"
                    style={{ background: loc.color, opacity: 0.5 }}
                  />
                  <div
                    className="w-4 h-4 rounded-full absolute inset-0"
                    style={{ background: loc.color, boxShadow: `0 0 12px ${loc.glow}` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.3)]">
            Мы в соцсетях:
          </span>
          {[
            { label: "Instagram", href: "https://instagram.com/studio13ufa", color: "#FF0FA0" },
            { label: "Telegram", href: "https://t.me/studio13ufa", color: "#B9FF00" },
            { label: "VK", href: "https://vk.com/studio13ufa", color: "#FFD166" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link text-sm font-display font-700 transition-all duration-300"
              style={{ color: s.color, textShadow: "none", fontWeight: 700 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 14px ${s.color}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textShadow = "";
              }}
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
