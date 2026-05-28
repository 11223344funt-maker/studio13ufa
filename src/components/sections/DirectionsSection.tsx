"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const DIRECTIONS = [
  {
    id: "heels",
    name: "Heels",
    emoji: "👠",
    tag: "ЖЕНСКИЙ СТИЛЬ",
    desc: "Сексуальность, пластика и уверенность через движение на каблуках. Хореография, техника, образ.",
    color: "#FF0FA0",
    glow: "rgba(255,15,160,0.4)",
    accent: "bg-[#FF0FA0]",
  },
  {
    id: "contemporary",
    name: "Contemporary",
    emoji: "🌊",
    tag: "СОВРЕМЕННЫЙ ТАНЕЦ",
    desc: "Свобода тела, импровизация и глубокий контакт с музыкой. Техника Release и Контактная импровизация.",
    color: "#B9FF00",
    glow: "rgba(185,255,0,0.3)",
    accent: "bg-[#B9FF00]",
  },
  {
    id: "hiphop",
    name: "Hip-Hop",
    emoji: "🔥",
    tag: "УЛИЧНЫЙ СТИЛЬ",
    desc: "Свэг, дроп, фристайл. Учим реальный уличный хип-хоп: Popping, Breaking, New Style.",
    color: "#FFD166",
    glow: "rgba(255,209,102,0.35)",
    accent: "bg-[#FFD166]",
  },
  {
    id: "stretching",
    name: "Stretching",
    emoji: "🤸",
    tag: "РАСТЯЖКА",
    desc: "Гибкость и шпагат для всех уровней. Мягкая работа с телом, сила и баланс.",
    color: "#00FFB2",
    glow: "rgba(0,255,178,0.3)",
    accent: "bg-[#00FFB2]",
  },
  {
    id: "ladystyle",
    name: "Lady Style",
    emoji: "✨",
    tag: "ЖЕНСТВЕННОСТЬ",
    desc: "Плавность, чувственность и грация. Женственная пластика для каждой.",
    color: "#E91E8C",
    glow: "rgba(233,30,140,0.35)",
    accent: "bg-[#E91E8C]",
  },
  {
    id: "kids",
    name: "Kids Dance",
    emoji: "🌟",
    tag: "ДЕТИ 3.5+",
    desc: "Ритм, координация и радость движения. Занятия для детей с 3,5 лет в игровой форме.",
    color: "#B9FF00",
    glow: "rgba(185,255,0,0.3)",
    accent: "bg-[#B9FF00]",
  },
];

function DirectionCard({
  item,
  index,
}: {
  item: (typeof DIRECTIONS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const inner = innerRef.current;
      const glow = glowRef.current;
      if (!card || !inner) return;

      const rect = card.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull — card moves towards cursor
      gsap.to(card, {
        x: cx * 0.18,
        y: cy * 0.14,
        duration: 0.5,
        ease: "power2.out",
      });
      // Inner content slight opposite (parallax depth)
      gsap.to(inner, {
        x: -cx * 0.06,
        y: -cy * 0.06,
        duration: 0.6,
        ease: "power2.out",
      });
      // Glow follows cursor
      if (glow) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        glow.style.background = `radial-gradient(circle at ${px}% ${py}%, ${item.glow} 0%, transparent 65%)`;
        gsap.to(glow, { opacity: 1, duration: 0.3 });
      }
    },
    [item.glow]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    if (!card || !inner) return;

    gsap.to(card, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.5 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl p-7 md:p-8 flex flex-col gap-4 group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        cursor: "none",
        willChange: "transform",
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${hexToRgb(item.color)},0.4)`;
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Hover glow */}
      <div ref={glowRef} className="absolute inset-0 opacity-0 pointer-events-none" />

      <div ref={innerRef} className="flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div
            className="text-3xl leading-none"
            style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
          >
            {item.emoji}
          </div>
          <div
            className="text-[9px] tracking-[0.3em] uppercase font-display px-2.5 py-1 border"
            style={{
              color: item.color,
              borderColor: `rgba(${hexToRgb(item.color)},0.35)`,
            }}
          >
            {item.tag}
          </div>
        </div>

        {/* Name */}
        <h3
          className="font-display text-2xl md:text-3xl font-900 uppercase text-white leading-[1] group-hover:transition-colors duration-300"
          style={{
            fontWeight: 900,
            ["--accent" as string]: item.color,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = item.color; (e.currentTarget as HTMLHeadingElement).style.textShadow = `0 0 20px ${item.glow}`; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = ""; (e.currentTarget as HTMLHeadingElement).style.textShadow = ""; }}
        >
          {item.name}
        </h3>

        {/* Desc */}
        <p className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed">
          {item.desc}
        </p>

        {/* CTA line */}
        <div
          className="flex items-center gap-3 mt-auto pt-2 border-t"
          style={{ borderColor: `rgba(${hexToRgb(item.color)},0.15)` }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-display" style={{ color: item.color }}>
            Подробнее
          </span>
          <div
            className="h-px flex-1 opacity-30"
            style={{ background: item.color }}
          />
          <span style={{ color: item.color }}>→</span>
        </div>
      </div>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255,255,255";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

export function DirectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="directions" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #FF0FA0 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="section-tag mb-5">Направления</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display uppercase text-white leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              ЧТО МЫ{" "}
              <span
                className="text-neon-magenta"
                style={{ textShadow: "0 0 30px rgba(255,15,160,0.6)" }}
              >
                ТАНЦУЕМ
              </span>
            </h2>
            <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed max-w-xs font-body">
              7 направлений — от сексуального heels до контактного contemporary.
              Для любого уровня и возраста.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIRECTIONS.map((item, i) => (
            <DirectionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
