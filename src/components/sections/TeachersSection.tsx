"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const TEACHERS = [
  {
    id: 1,
    name: "Анастасия",
    surname: "Иванова",
    role: "Heels / Lady Style",
    exp: "8 лет",
    bio: "Победитель Всероссийских соревнований по Heels. Ставит на технику и уверенность — каждая ученица выходит с новым ощущением тела.",
    color: "#FF0FA0",
    glow: "rgba(255,15,160,0.5)",
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
    color: "#FFD166",
    glow: "rgba(255,209,102,0.5)",
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
    color: "#B9FF00",
    glow: "rgba(185,255,0,0.4)",
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
    color: "#E91E8C",
    glow: "rgba(233,30,140,0.45)",
    img: "/teachers/teacher-4.svg",
    instagram: "@kristina_kids",
  },
];

function TiltCard({ teacher, index }: { teacher: (typeof TEACHERS)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const sheen = sheenRef.current;
      const content = contentRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateX: -y * 14,
        rotateY: x * 14,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });

      if (content) {
        gsap.to(content, {
          x: x * 6,
          y: y * 6,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      if (sheen) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        gsap.to(sheen, {
          opacity: 0.12,
          duration: 0.3,
        });
        sheen.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.9) 0%, transparent 60%)`;
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    const content = contentRef.current;

    if (card) {
      gsap.to(card, {
        rotateX: 0, rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        transformPerspective: 900,
      });
    }
    if (content) {
      gsap.to(content, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    }
    if (sheen) {
      gsap.to(sheen, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-card"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden group tilt-inner"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid rgba(255,255,255,0.07)`,
          cursor: "none",
          willChange: "transform",
        }}
      >
        {/* Sheen overlay */}
        <div ref={sheenRef} className="absolute inset-0 z-20 pointer-events-none opacity-0" />

        {/* Neon top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${teacher.color}, transparent)`,
            boxShadow: `0 0 12px ${teacher.glow}`,
          }}
        />

        <div ref={contentRef} className="flex flex-col h-full">
          {/* Photo area */}
          <div className="relative h-64 md:h-72 overflow-hidden">
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to bottom, transparent 50%, rgba(8,5,8,0.95) 100%)`,
              }}
            />
            <div
              className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 120%, ${teacher.glow} 0%, transparent 60%)`,
              }}
            />
            {/* Placeholder gradient if no image */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
              }}
            />
            <Image
              src={teacher.img}
              alt={`${teacher.name} ${teacher.surname}`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 300px"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            {/* Number accent */}
            <div className="absolute top-4 right-4 z-20">
              <span
                className="font-display text-[10px] tracking-[0.3em] px-2.5 py-1 border font-900"
                style={{
                  color: teacher.color,
                  borderColor: `rgba(255,255,255,0.12)`,
                  background: "rgba(8,5,8,0.7)",
                  fontWeight: 900,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col gap-3">
            <div>
              <p
                className="text-[9px] tracking-[0.35em] uppercase font-display mb-1"
                style={{ color: teacher.color }}
              >
                {teacher.role}
              </p>
              <h3
                className="font-display uppercase leading-tight"
                style={{ fontWeight: 900, fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "#fff" }}
              >
                {teacher.name}
                <br />
                <span style={{ color: teacher.color, textShadow: `0 0 16px ${teacher.glow}` }}>
                  {teacher.surname}
                </span>
              </h3>
            </div>
            <p className="text-[rgba(255,255,255,0.45)] text-xs leading-relaxed">
              {teacher.bio}
            </p>
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <div>
                <span className="text-[8px] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase font-display block">
                  Опыт
                </span>
                <span className="font-display text-sm" style={{ color: teacher.color, fontWeight: 700 }}>
                  {teacher.exp}
                </span>
              </div>
              <span className="text-[10px] text-[rgba(255,255,255,0.3)] font-body">
                {teacher.instagram}
              </span>
            </div>
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
    <section ref={sectionRef} id="teachers" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden">
      <div className="absolute -right-40 top-1/3 w-80 h-80 opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD166 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="section-tag mb-5">Преподаватели</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display uppercase leading-[0.9] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              КОМУ{" "}
              <span style={{ color: "#FFD166", textShadow: "0 0 30px rgba(255,209,102,0.5)" }}>
                ДОВЕРЯТЬ
              </span>
              <br />
              СВОЁ ТЕЛО
            </h2>
            <p className="text-[rgba(255,255,255,0.45)] text-sm max-w-xs leading-relaxed">
              Опытные хореографы, которые горят своим делом и передают энергию каждому ученику.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEACHERS.map((t, i) => (
            <TiltCard key={t.id} teacher={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
