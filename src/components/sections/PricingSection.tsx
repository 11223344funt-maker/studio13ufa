"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  period: string;
  priceDesc: string;
  features: string[];
  cta: string;
  color: string;
  glow: string;
  popular: boolean;
}

const ADULT_PLANS: Plan[] = [
  {
    name: "Разовое",
    price: "900",
    period: "занятие",
    priceDesc: "без обязательств",
    features: [
      "1 любое занятие",
      "Выбор времени и группы",
      "Подходит для первого раза",
    ],
    cta: "Попробовать",
    color: "#B9FF00",
    glow: "rgba(185,255,0,0.35)",
    popular: false,
  },
  {
    name: "Стандарт",
    price: "3 900",
    period: "мес",
    priceDesc: "8 занятий",
    features: [
      "8 занятий в месяц",
      "2 раза в неделю",
      "Доступ к любым направлениям",
      "Видеозаписи уроков",
    ],
    cta: "Выбрать план",
    color: "#FF0FA0",
    glow: "rgba(255,15,160,0.5)",
    popular: true,
  },
  {
    name: "Unlimited",
    price: "5 500",
    period: "мес",
    priceDesc: "без ограничений",
    features: [
      "Неограниченные занятия",
      "Все направления",
      "Видеозаписи уроков",
      "Приоритетная запись",
      "Скидка на мерч 15%",
    ],
    cta: "Максимум",
    color: "#FFD166",
    glow: "rgba(255,209,102,0.5)",
    popular: false,
  },
];

const KIDS_PLANS: Plan[] = [
  {
    name: "8 занятий",
    price: "2 800",
    period: "мес",
    priceDesc: "2 раза в неделю",
    features: [
      "8 занятий в месяц",
      "Группы по возрасту",
      "Регулярные мини-отчётники",
    ],
    cta: "Записать ребёнка",
    color: "#B9FF00",
    glow: "rgba(185,255,0,0.35)",
    popular: false,
  },
  {
    name: "Безлимит",
    price: "3 900",
    period: "мес",
    priceDesc: "без ограничений",
    features: [
      "Все детские классы",
      "Шоукейсы и выступления",
      "Скидка на летний лагерь",
      "Видеозаписи",
    ],
    cta: "Безлимит для детей",
    color: "#E91E8C",
    glow: "rgba(233,30,140,0.45)",
    popular: true,
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: plan.popular ? "rgba(255,15,160,0.06)" : "rgba(255,255,255,0.025)",
        border: plan.popular ? `1px solid rgba(255,15,160,0.35)` : "1px solid rgba(255,255,255,0.07)",
        boxShadow: plan.popular ? "0 0 40px rgba(255,15,160,0.1)" : "none",
      }}
    >
      {/* Top neon line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
          boxShadow: `0 0 12px ${plan.glow}`,
        }}
      />

      {plan.popular && (
        <div
          className="absolute top-4 right-4 text-[9px] tracking-[0.3em] uppercase font-display px-2.5 py-1"
          style={{ color: plan.color, border: `1px solid ${plan.color}`, background: `rgba(255,15,160,0.08)` }}
        >
          Хит
        </div>
      )}

      <div className="p-7 md:p-8 flex flex-col gap-6 flex-1">
        {/* Plan name */}
        <div>
          <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-2" style={{ color: plan.color }}>
            {plan.name}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-white leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}
            >
              {plan.price}
            </span>
            <span className="text-[rgba(255,255,255,0.4)] text-sm font-body">₽ / {plan.period}</span>
          </div>
          <p className="text-[10px] text-[rgba(255,255,255,0.3)] mt-1 font-display tracking-wider">
            {plan.priceDesc}
          </p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.65)]">
              <span style={{ color: plan.color, flexShrink: 0 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => document.querySelector("#trial")?.scrollIntoView({ behavior: "smooth" })}
          className={plan.popular ? "btn-neon w-full py-3.5" : "btn-outline-neon w-full py-3.5"}
          style={!plan.popular ? {
            borderColor: `rgba(${plan.color === "#B9FF00" ? "185,255,0" : "255,209,102"},0.4)`,
            color: plan.color,
          } : {}}
        >
          <span>{plan.cta}</span>
        </button>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const [tab, setTab] = useState<"adult" | "kids">("adult");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const plans = tab === "adult" ? ADULT_PLANS : KIDS_PLANS;

  return (
    <section ref={sectionRef} id="pricing" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden">
      <div className="absolute right-0 bottom-1/4 w-80 h-80 opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD166 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="section-tag mb-5">Цены</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-display uppercase leading-[0.9] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              ИНВЕСТИЦИЯ{" "}
              <span style={{ color: "#FFD166", textShadow: "0 0 30px rgba(255,209,102,0.5)" }}>
                В СЕБЯ
              </span>
            </h2>

            {/* Toggle */}
            <div
              className="flex items-center gap-1 p-1 self-start"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {(["adult", "kids"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-display transition-all duration-300"
                  style={{
                    color: tab === t ? "#fff" : "rgba(255,255,255,0.4)",
                    background: tab === t ? "rgba(255,15,160,0.2)" : "transparent",
                    boxShadow: tab === t ? "0 0 12px rgba(255,15,160,0.2)" : "none",
                  }}
                >
                  {t === "adult" ? "Взрослые" : "Дети"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className={`grid gap-5 ${tab === "adult" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 max-w-2xl"}`}>
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-[rgba(255,255,255,0.3)] text-xs">
            Первое занятие — бесплатно. Заморозка абонемента по запросу.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
