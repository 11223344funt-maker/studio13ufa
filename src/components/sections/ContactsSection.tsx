"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconPin, IconPhone, IconClock, IconInstagram, IconTelegram, IconVK } from "@/components/ui/Icons";

const LOCATIONS = [
  {
    id: 1,
    name: "Студия на Ленина",
    address: "ул. Ленина, 12, 2 этаж",
    metro: "5 мин от ТЦ «Галерея»",
    phone: "+7 (347) 000-00-01",
    hours: "Пн–Сб: 9:00–22:00 / Вс: 10:00–20:00",
    mapUrl: "https://yandex.ru/maps",
  },
  {
    id: 2,
    name: "Студия в Центре",
    address: "ул. Пушкина, 55, 3 этаж",
    metro: "3 мин от площади Ленина",
    phone: "+7 (347) 000-00-02",
    hours: "Пн–Вс: 10:00–22:00",
    mapUrl: "https://yandex.ru/maps",
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/studio13_ufa", Icon: IconInstagram },
  { label: "Telegram",  href: "https://t.me/studio13ufa",           Icon: IconTelegram  },
  { label: "VK",        href: "https://vk.com/studio13ufa",         Icon: IconVK        },
];

export function ContactsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="contacts" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden" style={{ background: "#F5EFE4" }}>
      <div className="absolute left-1/4 bottom-0 w-64 h-64 opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="section-tag mb-5">Контакты</div>
          <h2
            className="font-display uppercase leading-[0.9] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
          >
            ГДЕ НАС{" "}
            <span className="text-metallic-gold">НАЙТИ</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-light overflow-hidden"
              style={{ borderRadius: "4px" }}
            >
              {/* Gold top line */}
              <div
                className="h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)" }}
              />

              <div className="p-7 md:p-8">
                <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-3 text-gold">
                  Студия {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display uppercase text-ink leading-tight mb-5" style={{ fontWeight: 900, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                  {loc.name}
                </h3>

                <div className="space-y-3 mb-6">
                  {[
                    { Icon: IconPin,   text: loc.address },
                    { Icon: IconPin,   text: loc.metro },
                    { Icon: IconPhone, text: loc.phone },
                    { Icon: IconClock, text: loc.hours },
                  ].map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <item.Icon size={18} className="flex-shrink-0 mt-0.5" />
                      <span className="text-ink-3 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-display text-gold hover:text-gold-dark transition-colors duration-300 cursor-none"
                >
                  Открыть на карте →
                </a>
              </div>

              {/* Map placeholder */}
              <div className="h-40 relative overflow-hidden" style={{ background: "#F0EAE0" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted text-xs font-display tracking-widest uppercase">
                    Яндекс.Карта
                  </span>
                </div>
                {/* Gold grid */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 rounded-full animate-ping opacity-40" style={{ background: "#D4AF37" }} />
                  <div className="w-4 h-4 rounded-full absolute inset-0" style={{ background: "#D4AF37", boxShadow: "0 0 12px rgba(212,175,55,0.6)" }} />
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
          className="flex flex-wrap gap-5 items-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-display text-muted">
            Мы в соцсетях:
          </span>
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ink-3 hover:text-gold transition-colors duration-300 cursor-none group"
            >
              <Icon size={20} />
              <span className="text-xs font-display tracking-wider">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
