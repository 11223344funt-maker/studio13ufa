"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";

const schema = z.object({
  name: z.string().min(2, "Введите имя (мин. 2 символа)"),
  phone: z.string().regex(/^[\+7\d][\d\s\-\(\)]{9,}$/, "Введите корректный номер"),
  direction: z.string().min(1, "Выберите направление"),
  location: z.string().min(1, "Выберите студию"),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const DIRECTIONS_LIST = [
  "Heels", "Contemporary", "Hip-Hop", "Lady Style", "Stretching",
  "Kids Dance (детям)", "Не знаю, посоветуйте",
];

const LOCATIONS = ["Студия на Ленина", "Студия в Центре"];

export function TrialFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate network
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);

    // Wow submit animation
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 1.05,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      });
    }

    setLoading(false);
    setSubmitted(true);
    reset();

    // Burst particles
    setTimeout(() => {
      if (!submitted) {
        // Simple CSS class trigger for burst
      }
    }, 100);
  };

  return (
    <section
      ref={sectionRef}
      id="trial"
      className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-[0.08]"
          style={{ background: "radial-gradient(ellipse, #FF0FA0 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #B9FF00 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag mb-6">Пробное занятие</div>
            <h2
              className="font-display uppercase leading-[0.9] text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900 }}
            >
              ПЕРВЫЙ{" "}
              <span style={{ color: "#FF0FA0", textShadow: "0 0 30px rgba(255,15,160,0.7)" }}>
                ШАГ
              </span>
              <br />
              ВСЕГДА{" "}
              <span style={{ color: "#B9FF00", textShadow: "0 0 24px rgba(185,255,0,0.5)" }}>
                БЕСПЛАТНЫЙ
              </span>
            </h2>
            <p className="text-[rgba(255,255,255,0.55)] text-sm leading-relaxed mb-8 max-w-sm">
              Запишись на пробное занятие — ощути атмосферу Studio 13 без обязательств.
              Первый класс бесплатно для всех новых учеников.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-4">
              {[
                { icon: "⚡", text: "Ответим в течение 15 минут" },
                { icon: "🎯", text: "Подберём подходящую группу по уровню" },
                { icon: "🔥", text: "Без обязательств — просто попробуй" },
              ].map((p) => (
                <div key={p.text} className="flex items-center gap-4">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-sm text-[rgba(255,255,255,0.6)]">{p.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,15,160,0.15)",
              }}
            >
              {/* Top neon line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #FF0FA0, transparent)",
                  boxShadow: "0 0 20px rgba(255,15,160,0.8)",
                }}
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  // Success state
                  <motion.div
                    ref={successRef}
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-20 px-8 text-center gap-6"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center text-3xl relative"
                      style={{
                        background: "rgba(255,15,160,0.1)",
                        border: "2px solid #FF0FA0",
                        boxShadow: "0 0 30px rgba(255,15,160,0.4), 0 0 60px rgba(255,15,160,0.15)",
                      }}
                    >
                      ✓
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ background: "#FF0FA0" }} />
                    </motion.div>

                    <div>
                      <h3
                        className="font-display uppercase text-white mb-2"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}
                      >
                        ОТЛИЧНО!
                      </h3>
                      <p className="text-[rgba(255,255,255,0.55)] text-sm leading-relaxed">
                        Заявка принята! Мы свяжемся с тобой в ближайшие{" "}
                        <span style={{ color: "#FF0FA0" }}>15 минут.</span>
                        <br />
                        Готовься — это будет 🔥
                      </p>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline-neon px-6 py-3 text-xs"
                    >
                      Записаться снова
                    </button>
                  </motion.div>
                ) : (
                  // Form
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-7 md:p-9 flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[9px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.4)] mb-2">
                          Имя *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Как тебя зовут?"
                          className={`form-input ${errors.name ? "error" : ""}`}
                        />
                        {errors.name && (
                          <p className="text-[10px] mt-1" style={{ color: "#ff6b6b" }}>
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[9px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.4)] mb-2">
                          Телефон *
                        </label>
                        <input
                          {...register("phone")}
                          placeholder="+7 (___) ___-__-__"
                          className={`form-input ${errors.phone ? "error" : ""}`}
                        />
                        {errors.phone && (
                          <p className="text-[10px] mt-1" style={{ color: "#ff6b6b" }}>
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.4)] mb-2">
                        Направление *
                      </label>
                      <select
                        {...register("direction")}
                        className={`form-input ${errors.direction ? "error" : ""}`}
                      >
                        <option value="">Выбери стиль...</option>
                        {DIRECTIONS_LIST.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      {errors.direction && (
                        <p className="text-[10px] mt-1" style={{ color: "#ff6b6b" }}>
                          {errors.direction.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.4)] mb-2">
                        Студия *
                      </label>
                      <select
                        {...register("location")}
                        className={`form-input ${errors.location ? "error" : ""}`}
                      >
                        <option value="">Выбери студию...</option>
                        {LOCATIONS.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                      {errors.location && (
                        <p className="text-[10px] mt-1" style={{ color: "#ff6b6b" }}>
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.4)] mb-2">
                        Комментарий
                      </label>
                      <textarea
                        {...register("comment")}
                        placeholder="Уровень, пожелания, вопросы..."
                        rows={3}
                        className="form-input resize-none"
                      />
                    </div>

                    <button
                      ref={btnRef}
                      type="submit"
                      disabled={loading}
                      className="btn-neon w-full py-4 mt-2 relative overflow-hidden"
                    >
                      <span className="flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Отправляем...
                          </>
                        ) : (
                          <>
                            ЗАПИСАТЬСЯ БЕСПЛАТНО
                            <span>→</span>
                          </>
                        )}
                      </span>
                    </button>

                    <p className="text-[9px] text-[rgba(255,255,255,0.25)] text-center">
                      Нажимая кнопку, ты соглашаешься с обработкой персональных данных
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
