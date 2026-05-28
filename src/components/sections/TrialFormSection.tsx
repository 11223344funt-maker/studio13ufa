"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";

const schema = z.object({
  name:      z.string().min(2, "Введите имя (мин. 2 символа)"),
  phone:     z.string().regex(/^[\+7\d][\d\s\-\(\)]{9,}$/, "Введите корректный номер"),
  direction: z.string().min(1, "Выберите направление"),
  location:  z.string().min(1, "Выберите студию"),
  comment:   z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const DIRECTIONS_LIST = [
  "Heels", "Contemporary", "Hip-Hop", "Lady Style", "Stretching",
  "Kids Dance (детям)", "Не знаю, посоветуйте",
];
const LOCATIONS = ["Студия на Ленина", "Студия в Центре"];

const PERKS = [
  { icon: "⚡", text: "Ответим в течение 15 минут" },
  { icon: "🎯", text: "Подберём подходящую группу по уровню" },
  { icon: "✨", text: "Без обязательств — просто попробуй" },
];

export function TrialFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1 });
    }
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <section
      ref={sectionRef}
      id="trial"
      className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden dark-section"
    >
      {/* Metallic gold glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
          style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 60%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
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
              className="font-display uppercase leading-[0.9] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, color: "#FAF6EE" }}
            >
              ПЕРВЫЙ{" "}
              <span className="text-metallic-gold">ШАГ</span>
              <br />
              ВСЕГДА{" "}
              <span className="text-metallic-gold">БЕСПЛАТНЫЙ</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "rgba(250,246,238,0.55)" }}>
              Запишись на пробное занятие — ощути атмосферу Studio 13 без обязательств.
              Первый класс бесплатно для всех новых учеников.
            </p>

            <div className="flex flex-col gap-4">
              {PERKS.map((p) => (
                <div key={p.text} className="flex items-center gap-4">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-sm" style={{ color: "rgba(250,246,238,0.6)" }}>{p.text}</span>
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
              className="relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "4px",
              }}
            >
              {/* Gold top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)",
                  boxShadow: "0 0 12px rgba(212,175,55,0.4)",
                }}
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-20 px-8 text-center gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center text-3xl relative"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "2px solid #D4AF37",
                        boxShadow: "0 0 30px rgba(212,175,55,0.35), 0 0 60px rgba(212,175,55,0.12)",
                        color: "#D4AF37",
                      }}
                    >
                      ✓
                      <div className="absolute inset-0 rounded-full animate-ping opacity-15"
                        style={{ background: "#D4AF37" }} />
                    </motion.div>
                    <div>
                      <h3
                        className="font-display uppercase mb-2 text-metallic-gold"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}
                      >
                        ОТЛИЧНО!
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(250,246,238,0.55)" }}>
                        Заявка принята! Мы свяжемся с тобой в ближайшие{" "}
                        <span className="text-gold">15 минут.</span>
                        <br />Готовься — это будет незабываемо ✨
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline-gold px-6 py-3 text-xs"
                    >
                      Записаться снова
                    </button>
                  </motion.div>
                ) : (
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
                        <label className="block text-[9px] tracking-[0.3em] uppercase font-display mb-2" style={{ color: "rgba(250,246,238,0.4)" }}>
                          Имя *
                        </label>
                        <input {...register("name")} placeholder="Как тебя зовут?"
                          className={`form-input ${errors.name ? "error" : ""}`} />
                        {errors.name && <p className="text-[10px] mt-1 text-red-400">{errors.name.message}</p>}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[9px] tracking-[0.3em] uppercase font-display mb-2" style={{ color: "rgba(250,246,238,0.4)" }}>
                          Телефон *
                        </label>
                        <input {...register("phone")} placeholder="+7 (___) ___-__-__"
                          className={`form-input ${errors.phone ? "error" : ""}`} />
                        {errors.phone && <p className="text-[10px] mt-1 text-red-400">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase font-display mb-2" style={{ color: "rgba(250,246,238,0.4)" }}>
                        Направление *
                      </label>
                      <select {...register("direction")} className={`form-input ${errors.direction ? "error" : ""}`}>
                        <option value="">Выбери стиль...</option>
                        {DIRECTIONS_LIST.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.direction && <p className="text-[10px] mt-1 text-red-400">{errors.direction.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase font-display mb-2" style={{ color: "rgba(250,246,238,0.4)" }}>
                        Студия *
                      </label>
                      <select {...register("location")} className={`form-input ${errors.location ? "error" : ""}`}>
                        <option value="">Выбери студию...</option>
                        {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                      {errors.location && <p className="text-[10px] mt-1 text-red-400">{errors.location.message}</p>}
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase font-display mb-2" style={{ color: "rgba(250,246,238,0.4)" }}>
                        Комментарий
                      </label>
                      <textarea {...register("comment")} placeholder="Уровень, пожелания, вопросы..."
                        rows={3} className="form-input resize-none" />
                    </div>

                    <button
                      ref={btnRef}
                      type="submit"
                      disabled={loading}
                      className="btn-gold metallic-shine w-full py-4 mt-2"
                      style={{ borderRadius: "2px" }}
                    >
                      <span className="flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full"
                            />
                            Отправляем...
                          </>
                        ) : (
                          <>ЗАПИСАТЬСЯ БЕСПЛАТНО →</>
                        )}
                      </span>
                    </button>

                    <p className="text-[9px] text-center" style={{ color: "rgba(250,246,238,0.2)" }}>
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
