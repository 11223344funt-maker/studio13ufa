"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const TESTIMONIALS = [
  {
    id: 1,
    text: "Пришла в Studio 13 с нулевым уровнем — теперь выступаю на шоукейсах. Атмосфера здесь просто магическая, каждый урок это кайф!",
    name: "Алия К.",
    direction: "Heels",
    color: "#FF0FA0",
  },
  {
    id: 2,
    text: "Наконец-то студия, где не стыдно быть новичком. Дмитрий объясняет так, что даже самые сложные муви кажутся лёгкими.",
    name: "Тимур М.",
    direction: "Hip-Hop",
    color: "#FFD166",
  },
  {
    id: 3,
    text: "Contemporary с Алиной изменил моё отношение к телу. Раньше я была зажатой, сейчас двигаюсь свободно везде — даже на улице.",
    name: "Дарья Н.",
    direction: "Contemporary",
    color: "#B9FF00",
  },
  {
    id: 4,
    text: "Отдала дочку в 4 года — теперь она танцует дома круглосуточно 😂 Кристина — лучший педагог для малышей!",
    name: "Юлия Р.",
    direction: "Kids Dance",
    color: "#00FFB2",
  },
  {
    id: 5,
    text: "Шпагат за 2 месяца с нуля — это реально! Занятия по растяжке в Studio 13 — вот где настоящий результат.",
    name: "Карина Ш.",
    direction: "Stretching",
    color: "#E91E8C",
  },
  {
    id: 6,
    text: "Studio 13 — это не просто занятия, это тусовка. Здесь нашла подруг, уверенность и новое увлечение на всю жизнь.",
    name: "Эля В.",
    direction: "Lady Style",
    color: "#FF0FA0",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <section ref={sectionRef} id="testimonials" className="py-section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #FF0FA0 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag mb-5">Отзывы</div>
          <h2
            className="font-display uppercase leading-[0.9] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
          >
            ЧТО ГОВОРЯТ{" "}
            <span style={{ color: "#FF0FA0", textShadow: "0 0 30px rgba(255,15,160,0.6)" }}>
              НАШИ
            </span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex gap-5 pl-6 md:pl-10 lg:pl-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-[300px] md:w-[360px] rounded-2xl p-7 flex flex-col gap-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Quote mark */}
              <div
                className="font-display text-5xl leading-none"
                style={{ color: t.color, opacity: 0.5, textShadow: `0 0 16px ${t.color}` }}
              >
                &ldquo;
              </div>
              <p className="text-[rgba(255,255,255,0.7)] text-sm leading-relaxed flex-1">
                {t.text}
              </p>
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-4">
                <div>
                  <p className="font-display text-white text-sm font-700" style={{ fontWeight: 700 }}>
                    {t.name}
                  </p>
                  <p className="text-[9px] tracking-[0.25em] uppercase font-display mt-0.5" style={{ color: t.color }}>
                    {t.direction}
                  </p>
                </div>
                <div
                  className="flex gap-0.5"
                  style={{ color: t.color }}
                >
                  {"★★★★★".split("").map((s, j) => (
                    <span key={j} className="text-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Spacer */}
          <div className="flex-shrink-0 w-6" />
        </div>
      </motion.div>
    </section>
  );
}
