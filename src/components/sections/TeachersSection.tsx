"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { IconInstagram } from "@/components/ui/Icons";

const TEACHERS = [
  {
    id: 1,
    name: "Анастасия",
    surname: "Иванова",
    role: "Heels / Lady Style",
    exp: "8 лет",
    bio: "Победитель Всероссийских соревнований по Heels. Ставит на технику и уверенность — каждая ученица выходит с новым ощущением тела.",
    img: "/teachers/teacher-1.svg",
    instagram: "@nastya_heels",
  },
  {
    id: 2,
    name: "Дмитрий",
    surname: "Корнев",
    role: "Hip-Hop / Breaking",
    exp: "10 лет",
    bio: "Freestyle champion. Соединяет уличную культуру с академической техникой. Его урок — это всегда событие.",
    img: "/teachers/teacher-2.svg",
    instagram: "@dmitry_hiphop",
  },
  {
    id: 3,
    name: "Алина",
    surname: "Сайфутдинова",
    role: "Contemporary / Stretch",
    exp: "6 лет",
    bio: "Хореограф с образованием классического балета. Работает с телом мягко, но результат всегда глубокий.",
    img: "/teachers/teacher-3.svg",
    instagram: "@alina_contemporary",
  },
  {
    id: 4,
    name: "Кристина",
    surname: "Волкова",
    role: "Kids Dance / Lady Style",
    exp: "5 лет",
    bio: "Специалист по детской хореографии. Дети обожают её занятия за игровой подход и неиссякаемую энергию.",
    img: "/teachers/teacher-4.svg",
    instagram: "@kristina_kids",
  },
];

function TiltCard({ teacher, index }: { teacher: (typeof TEACHERS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(card, {
      rotateY: cx * 10,
      rotateX: -cy * 8,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
    if (sheen) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      sheen.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(212,175,55,0.15) 0%, transparent 55%)`;
      gsap.to(sheen, { opacity: 1, duration: 0.3 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    if (sheen) gsap.to(sheen, { opacity: 0, duration: 0.5 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden group cursor-none"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(212,175,55,0.15)",
          borderRadius: "4px",
          boxShadow: "0 2px 12px rgba(19,14,8,0.06)",
          transition: "border-color 0.3s, box-shadow 0.3s",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.4)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(212,175,55,0.12)";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.15)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(19,14,8,0.06)";
        }}
      >
        {/* Sheen */}
        <div ref={sheenRef} className="absolute inset-0 opacity-0 pointer-events-none z-10" />

        {/* Gold top border on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
        />

        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-bg-alt">
          <Image
            src={teacher.img}
            alt={`${teacher.name} ${teacher.surname}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          {/* Subtle gold overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(212,175,55,0.12) 100%)" }}
          />
          {/* Exp badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 font-display text-[10px] tracking-[0.2em] uppercase"
            style={{
              background: "rgba(253,249,243,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#9A7400",
            }}
          >
            {teacher.exp}
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="mb-1">
            <span
              className="font-display text-[10px] tracking-[0.25em] uppercase"
              style={{ color: "#D4AF37" }}
            >
              {teacher.role}
            </span>
          </div>
          <h3 className="font-display text-xl font-black text-ink uppercase mb-3" style={{ fontWeight: 900 }}>
            {teacher.name} {teacher.surname}
          </h3>
          <p className="text-ink-3 text-xs leading-relaxed mb-4">{teacher.bio}</p>

          {/* Instagram */}
          <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}>
            <IconInstagram size={16} />
            <span className="text-[11px] text-muted font-body tracking-wide">{teacher.instagram}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TeachersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="teachers"
      className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden"
      style={{ background: "#FDF9F3" }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="section-tag mb-5">Педагоги</div>
            <h2
              className="font-display uppercase text-ink leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              КОМАНДА{" "}
              <span className="text-metallic-gold">МАСТЕРОВ</span>
            </h2>
          </div>
          <p className="text-ink-3 text-sm leading-relaxed max-w-xs">
            Каждый педагог — практикующий хореограф с соревновательным опытом и любовью к своему делу.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEACHERS.map((t, i) => (
            <TiltCard key={t.id} teacher={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
