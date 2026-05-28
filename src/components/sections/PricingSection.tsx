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
      className="relative overflow-hidden flex flex-col metallic-shine cursor-none"
      style={{
        background: plan.popular ? "rgba(212,175,55,0.06)" : "#FFFFFF",
        border: plan.popular ? "1px solid rgba(212,175,55,0.45)" : "1px solid rgba(212,175,55,0.15)",
        boxShadow: plan.popular ? "0 8px 40px rgba(212,175,55,0.15)" : "0 2px 12px rgba(19,14,8,0.06)",
        borderRadius: "4px",
      }}
    >
      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: plan.popular
            ? "linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
          boxShadow: plan.popular ? "0 0 12px rgba(212,175,55,0.4)" : "none",
        }}
      />

      {plan.popular && (
        <div
          className="absolute top-4 right-4 text-[9px] tracking-[0.3em] uppercase font-display px-2.5 py-1"
          style={{ color: "#9A7400", border: "1px solid rgba(212,175,55,0.5)", background: "rgba(212,175,55,0.08)" }}
        >
          Хит
        </div>
      )}

      <div className="p-7 md:p-8 flex flex-col gap-6 flex-1">
        <div>
          <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-2 text-gold">
            {plan.name}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={plan.popular ? "text-metallic-gold font-display leading-none" : "font-display text-ink leading-none"}
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}
            >
              {plan.price}
            </span>
            <span className="text-muted text-sm font-body">₽ / {plan.period}</span>
          </div>
          <p className="text-[10px] text-muted mt-1 font-display tracking-wider">
            {plan.priceDesc}
          </p>
        </div>

        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-ink-3">
              <span className="text-gold flex-shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => document.querySelector("#trial")?.scrollIntoView({ behavior: "smooth" })}
          className={plan.popular ? "btn-gold metallic-shine w-full py-3.5 cursor-none" : "btn-outline-gold w-full py-3.5 cursor-none"}
          style={{ borderRadius: "2px" }}
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
    <section ref={sectionRef} id="pricing" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden" style={{ background: "#FDF9F3" }}>
      <div className="absolute right-0 bottom-1/4 w-80 h-80 opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)", filter: "blur(60px)" }} />

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
              className="font-display uppercase leading-[0.9] text-ink"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              ИНВЕСТИЦИЯ{" "}
              <span className="text-metallic-gold">В СЕБЯ</span>
            </h2>

            {/* Toggle */}
            <div
              className="flex items-center gap-1 p-1 self-start"
              style={{ background: "#F5EFE4", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              {(["adult", "kids"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-display transition-all duration-300 cursor-none"
                  style={{
                    color: tab === t ? "#9A7400" : "rgba(19,14,8,0.4)",
                    background: tab === t ? "rgba(212,175,55,0.12)" : "transparent",
                    boxShadow: tab === t ? "0 0 12px rgba(212,175,55,0.15)" : "none",
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
          <p className="text-muted text-xs">
            Первое занятие — бесплатно. Заморозка абонемента по запросу.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
