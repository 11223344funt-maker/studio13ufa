"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const TYPES = ["Все", "Heels", "Hip-Hop", "Contemporary", "Stretching", "Kids"];

interface ScheduleItem {
  time: string;
  name: string;
  teacher: string;
  level: string;
  levelColor: string;
  color: string;
  day: string;
  type: string;
}

const SCHEDULE: ScheduleItem[] = [
  { time: "09:00", name: "Morning Stretch", teacher: "Алина С.", level: "All levels", levelColor: "#B9FF00", color: "#00FFB2", day: "Пн", type: "Stretching" },
  { time: "12:00", name: "Heels Basics", teacher: "Анастасия И.", level: "Beginner", levelColor: "#FF0FA0", color: "#FF0FA0", day: "Пн", type: "Heels" },
  { time: "18:00", name: "Hip-Hop Flow", teacher: "Дмитрий К.", level: "Intermediate", levelColor: "#FFD166", color: "#FFD166", day: "Пн", type: "Hip-Hop" },
  { time: "20:00", name: "Heels Advanced", teacher: "Анастасия И.", level: "Advanced", levelColor: "#E91E8C", color: "#FF0FA0", day: "Пн", type: "Heels" },

  { time: "10:00", name: "Kids Dance", teacher: "Кристина В.", level: "Kids", levelColor: "#B9FF00", color: "#B9FF00", day: "Вт", type: "Kids" },
  { time: "19:00", name: "Contemporary", teacher: "Алина С.", level: "Intermediate", levelColor: "#B9FF00", color: "#B9FF00", day: "Вт", type: "Contemporary" },
  { time: "21:00", name: "Heels Choreo", teacher: "Анастасия И.", level: "Advanced", levelColor: "#E91E8C", color: "#FF0FA0", day: "Вт", type: "Heels" },

  { time: "09:00", name: "Morning Stretch", teacher: "Алина С.", level: "All levels", levelColor: "#B9FF00", color: "#00FFB2", day: "Ср", type: "Stretching" },
  { time: "17:00", name: "Kids Hip-Hop", teacher: "Кристина В.", level: "Kids", levelColor: "#B9FF00", color: "#B9FF00", day: "Ср", type: "Kids" },
  { time: "19:30", name: "Lady Style", teacher: "Анастасия И.", level: "Beginner", levelColor: "#FF0FA0", color: "#E91E8C", day: "Ср", type: "Heels" },

  { time: "18:00", name: "Breaking Fundamentals", teacher: "Дмитрий К.", level: "All levels", levelColor: "#FFD166", color: "#FFD166", day: "Чт", type: "Hip-Hop" },
  { time: "20:00", name: "Contemporary Impro", teacher: "Алина С.", level: "Advanced", levelColor: "#E91E8C", color: "#B9FF00", day: "Чт", type: "Contemporary" },

  { time: "12:00", name: "Heels Basics", teacher: "Анастасия И.", level: "Beginner", levelColor: "#FF0FA0", color: "#FF0FA0", day: "Пт", type: "Heels" },
  { time: "18:00", name: "Hip-Hop Freestyle", teacher: "Дмитрий К.", level: "All levels", levelColor: "#FFD166", color: "#FFD166", day: "Пт", type: "Hip-Hop" },
  { time: "20:30", name: "Night Heels", teacher: "Анастасия И.", level: "Intermediate", levelColor: "#E91E8C", color: "#FF0FA0", day: "Пт", type: "Heels" },

  { time: "11:00", name: "Kids Dance", teacher: "Кристина В.", level: "Kids", levelColor: "#B9FF00", color: "#B9FF00", day: "Сб", type: "Kids" },
  { time: "13:00", name: "Stretching Intensive", teacher: "Алина С.", level: "All levels", levelColor: "#B9FF00", color: "#00FFB2", day: "Сб", type: "Stretching" },
  { time: "16:00", name: "Hip-Hop Battle Prep", teacher: "Дмитрий К.", level: "Advanced", levelColor: "#E91E8C", color: "#FFD166", day: "Сб", type: "Hip-Hop" },
  { time: "18:00", name: "Heels Show", teacher: "Анастасия И.", level: "All levels", levelColor: "#FF0FA0", color: "#FF0FA0", day: "Сб", type: "Heels" },

  { time: "12:00", name: "Open Contemporary", teacher: "Алина С.", level: "All levels", levelColor: "#B9FF00", color: "#B9FF00", day: "Вс", type: "Contemporary" },
  { time: "15:00", name: "Lady Style Intro", teacher: "Кристина В.", level: "Beginner", levelColor: "#FF0FA0", color: "#E91E8C", day: "Вс", type: "Heels" },
];

export function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDay, setActiveDay] = useState("Пн");
  const [activeType, setActiveType] = useState("Все");
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered = SCHEDULE.filter(
    (s) => s.day === activeDay && (activeType === "Все" || s.type === activeType)
  );

  return (
    <section ref={sectionRef} id="schedule" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden" style={{ background: "#F5EFE4" }}>
      <div className="absolute left-0 top-1/3 w-64 h-64 opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="section-tag mb-5">Расписание</div>
          <h2
            className="font-display uppercase leading-[0.9] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
          >
            КОГДА{" "}
            <span className="text-metallic-gold">ТРЕНИРУЕМСЯ</span>
          </h2>
        </motion.div>

        {/* Day tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none"
        >
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="relative flex-shrink-0 px-5 py-2.5 transition-all duration-300"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activeDay === day ? "#9A7400" : "rgba(19,14,8,0.4)",
                border: activeDay === day ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(19,14,8,0.1)",
                background: activeDay === day ? "rgba(212,175,55,0.08)" : "#FFFFFF",
                boxShadow: activeDay === day ? "0 0 16px rgba(212,175,55,0.15)" : "none",
              }}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Type filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className="flex-shrink-0 px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase font-display transition-all duration-300"
              style={{
                color: activeType === type ? "#9A7400" : "rgba(19,14,8,0.4)",
                borderBottom: activeType === type ? "1px solid #D4AF37" : "1px solid transparent",
                fontWeight: activeType === type ? 700 : 400,
              }}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Schedule list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDay}-${activeType}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-muted text-sm font-body">
                В этот день нет занятий выбранного типа
              </div>
            ) : (
              filtered.map((item, i) => (
                <motion.div
                  key={`${item.time}-${item.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group flex items-center gap-4 md:gap-6 p-4 md:p-5 transition-all duration-300 cursor-none"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(212,175,55,0.12)",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.4)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(212,175,55,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.12)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  {/* Gold indicator */}
                  <div
                    className="w-[3px] self-stretch flex-shrink-0"
                    style={{ background: "linear-gradient(to bottom, #D4AF37, #F0D060, #D4AF37)" }}
                  />

                  {/* Time */}
                  <div className="flex-shrink-0 w-16">
                    <span className="font-display text-ink text-lg" style={{ fontWeight: 700 }}>
                      {item.time}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-ink font-bold text-sm md:text-base uppercase tracking-wide truncate"
                      style={{ fontWeight: 700 }}>
                      {item.name}
                    </h4>
                    <p className="text-ink-3 text-xs mt-0.5">{item.teacher}</p>
                  </div>

                  {/* Level badge */}
                  <div
                    className="hidden sm:block px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-display flex-shrink-0"
                    style={{
                      color: "#9A7400",
                      border: "1px solid rgba(212,175,55,0.3)",
                      background: "rgba(212,175,55,0.05)",
                    }}
                  >
                    {item.level}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => document.querySelector("#trial")?.scrollIntoView({ behavior: "smooth" })}
                    className="hidden md:block flex-shrink-0 text-[10px] tracking-[0.2em] uppercase font-display text-muted group-hover:text-gold transition-colors duration-300 cursor-none"
                  >
                    Записаться →
                  </button>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <p className="text-muted text-xs">
            Расписание может меняться. Актуальное — в{" "}
            <a href="#" className="text-gold hover-link">Telegram / Instagram</a>
          </p>
          <button
            onClick={() => document.querySelector("#trial")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold metallic-shine px-6 py-3 text-[11px] cursor-none"
            style={{ borderRadius: "2px" }}
          >
            <span>Выбрать время</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
