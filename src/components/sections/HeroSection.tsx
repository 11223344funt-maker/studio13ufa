"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["ТВОЕЙ", "ВАШЕЙ", "ЕЁ", "ЕГО", "НАШЕЙ"];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const bgBlobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((p) => (p + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-title", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-subtitle", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      style={{ background: "#FDF9F3" }}
    >
      {/* Metallic grain background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 75% 30%, rgba(212,175,55,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 70%, rgba(201,168,76,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 40% 50% at 55% 80%, rgba(212,175,55,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Decorative metallic arcs */}
      <svg
        className="absolute top-0 right-0 pointer-events-none opacity-20"
        width="600" height="600" viewBox="0 0 600 600" fill="none"
      >
        <defs>
          <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0"/>
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <circle cx="500" cy="100" r="380" stroke="url(#arc-grad)" strokeWidth="0.8" fill="none"/>
        <circle cx="500" cy="100" r="300" stroke="url(#arc-grad)" strokeWidth="0.5" fill="none"/>
        <circle cx="500" cy="100" r="220" stroke="url(#arc-grad)" strokeWidth="0.4" fill="none"/>
      </svg>
      <svg
        className="absolute bottom-0 left-0 pointer-events-none opacity-15"
        width="400" height="400" viewBox="0 0 400 400" fill="none"
      >
        <circle cx="0" cy="400" r="260" stroke="url(#arc-grad)" strokeWidth="0.8" fill="none"/>
        <circle cx="0" cy="400" r="200" stroke="url(#arc-grad)" strokeWidth="0.5" fill="none"/>
      </svg>

      {/* Big background number */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-display font-black"
          style={{
            fontSize: "clamp(180px, 40vw, 480px)",
            lineHeight: 1,
            background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.04) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.05em",
          }}
        >
          13
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-20 pt-36 w-full">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="divider-gold-glow w-12" />
          <span className="font-display text-[10px] tracking-[0.35em] uppercase" style={{ color: "#D4AF37" }}>
            Studio 13 · Уфа
          </span>
        </motion.div>

        {/* Title */}
        <div className="hero-title overflow-hidden">
          <motion.h1
            className="font-display font-black mb-0 leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="block text-ink">ТАНЦЕВАЛЬНАЯ</span>
            <span className="block text-ink">СТУДИЯ</span>
            <span
              className="block text-metallic-gold"
              style={{ letterSpacing: "-0.03em" }}
            >
              13
            </span>
          </motion.h1>
        </div>

        {/* Subtitle row */}
        <div className="hero-subtitle mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.p
            className="font-body text-lg md:text-xl text-ink-3 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Место, где рождается{" "}
            <span className="text-gold font-semibold">энергия движения</span>.
            <br />
            Почувствуй, как танец меняет всё.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="font-display text-xs tracking-[0.2em] uppercase text-muted">
                Начни с
              </span>
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-display text-xs tracking-[0.2em] uppercase text-metallic-gold"
              >
                {WORDS[wordIndex]}
              </motion.span>
              <span className="font-display text-xs tracking-[0.2em] uppercase text-muted">
                первой тренировки
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#trial" className="btn-gold metallic-shine px-8 py-4 cursor-none" style={{ borderRadius: "2px" }}>
                <span>Пробное бесплатно</span>
              </a>
              <a href="#directions" className="btn-outline-gold px-8 py-4 cursor-none" style={{ borderRadius: "2px" }}>
                Направления
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-2">
              {[
                { n: "500+", l: "учеников" },
                { n: "5",    l: "направлений" },
                { n: "3",    l: "года в Уфе" },
              ].map(({ n, l }) => (
                <div key={n}>
                  <p className="text-metallic-gold font-display text-2xl font-black leading-none">{n}</p>
                  <p className="text-muted text-xs tracking-wide mt-1">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="font-display text-[9px] tracking-[0.3em] uppercase text-muted">Скролл</span>
          <div
            className="w-[1px] h-10 animate-float"
            style={{ background: "linear-gradient(to bottom, #D4AF37, transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
