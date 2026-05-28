"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { IconHeels, IconWave, IconFire, IconLotus, IconStar, IconHeart } from "@/components/ui/Icons";

const DIRECTIONS = [
  {
    id: "heels",
    name: "Heels",
    Icon: IconHeels,
    tag: "ЖЕНСКИЙ СТИЛЬ",
    desc: "Сексуальность, пластика и уверенность через движение на каблуках. Хореография, техника, образ.",
  },
  {
    id: "contemporary",
    name: "Contemporary",
    Icon: IconWave,
    tag: "СОВРЕМЕННЫЙ ТАНЕЦ",
    desc: "Свобода тела, импровизация и глубокий контакт с музыкой. Техника Release и Контактная импровизация.",
  },
  {
    id: "hiphop",
    name: "Hip-Hop",
    Icon: IconFire,
    tag: "УЛИЧНЫЙ СТИЛЬ",
    desc: "Свэг, дроп, фристайл. Учим реальный уличный хип-хоп: Popping, Breaking, New Style.",
  },
  {
    id: "stretching",
    name: "Stretching",
    Icon: IconLotus,
    tag: "РАСТЯЖКА",
    desc: "Гибкость и шпагат для всех уровней. Мягкая работа с телом, сила и баланс.",
  },
  {
    id: "ladystyle",
    name: "Lady Style",
    Icon: IconStar,
    tag: "ЖЕНСТВЕННОСТЬ",
    desc: "Плавность, чувственность и грация. Женственная пластика для каждой.",
  },
  {
    id: "kids",
    name: "Kids Dance",
    Icon: IconHeart,
    tag: "ДЕТИ 3.5+",
    desc: "Ритм, координация и радость движения. Занятия для детей с 3,5 лет в игровой форме.",
  },
];

function DirectionCard({ item, index }: { item: (typeof DIRECTIONS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;
    const rect = card.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    gsap.to(card,  { x: cx * 0.12, y: cy * 0.10, duration: 0.5, ease: "power2.out" });
    gsap.to(inner, { x: -cx * 0.04, y: -cy * 0.04, duration: 0.6, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !innerRef.current) return;
    gsap.to(cardRef.current,  { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
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
      className="card-light metallic-shine relative overflow-hidden p-7 md:p-8 flex flex-col gap-5 group cursor-none"
      style={{ willChange: "transform", borderRadius: "4px" }}
    >
      {/* Gold shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
      />

      <div ref={innerRef} className="flex flex-col gap-5">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <item.Icon size={44} />
          <div
            className="text-[9px] tracking-[0.3em] uppercase font-display px-2.5 py-1"
            style={{
              color: "#9A7400",
              border: "1px solid rgba(212,175,55,0.3)",
              background: "rgba(212,175,55,0.05)",
            }}
          >
            {item.tag}
          </div>
        </div>

        {/* Name */}
        <h3
          className="font-display text-2xl md:text-3xl uppercase text-ink leading-[1]"
          style={{ fontWeight: 900 }}
        >
          {item.name}
        </h3>

        {/* Desc */}
        <p className="text-ink-3 text-sm leading-relaxed">
          {item.desc}
        </p>

        {/* CTA line */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
          <span className="text-[10px] tracking-[0.25em] uppercase font-display text-gold">
            Подробнее
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(212,175,55,0.4), transparent)" }} />
          <span className="text-gold">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export function DirectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="directions" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden" style={{ background: "#F5EFE4" }}>
      {/* Subtle metallic background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 60%)", filter: "blur(60px)" }} />

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
              className="font-display uppercase text-ink leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              ЧТО МЫ{" "}
              <span className="text-metallic-gold">ТАНЦУЕМ</span>
            </h2>
            <p className="text-ink-3 text-sm leading-relaxed max-w-xs font-body">
              6 направлений — от сексуального heels до контактного contemporary.
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
