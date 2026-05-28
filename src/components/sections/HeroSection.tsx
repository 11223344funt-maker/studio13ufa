"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["HEELS", "STRETCH", "HIP-HOP", "CONTEMPORARY", "LADY STYLE"];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const wordIdx = useRef(0);
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlitch = useCallback(() => {
    const el = numRef.current;
    if (!el) return;
    el.classList.add("is-glitching");
    setTimeout(() => el.classList.remove("is-glitching"), 280);
  }, []);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Animated blobs
    if (!prefersReduced) {
      [blob1Ref, blob2Ref, blob3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          x: `random(-80, 80)`,
          y: `random(-60, 60)`,
          duration: 7 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 1.5,
        });
      });
    }

    // Entrance timeline
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([titleRef.current, taglineRef.current, ctaRef.current, statsRef.current], {
          opacity: 1, y: 0, yPercent: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1 }
      )
        .fromTo(
          taglineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "<0.2"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "<0.15"
        )
        .fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "<0.1"
        );

      // Glitch fires after entrance
      tl.call(() => {
        triggerGlitch();
        glitchTimer.current = setInterval(triggerGlitch, 5500);
      });
    }, sectionRef);

    // Scroll parallax on blobs
    if (sectionRef.current && !prefersReduced) {
      gsap.to([blob1Ref.current, blob2Ref.current], {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Rotating words
    const rotateWords = () => {
      if (!wordRef.current) return;
      wordIdx.current = (wordIdx.current + 1) % WORDS.length;
      gsap.to(wordRef.current, {
        y: -8,
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          if (wordRef.current) {
            wordRef.current.textContent = WORDS[wordIdx.current];
            gsap.fromTo(
              wordRef.current,
              { y: 12, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
            );
          }
        },
      });
    };
    const wordInterval = setInterval(rotateWords, 2400);

    return () => {
      ctx.revert();
      clearInterval(wordInterval);
      if (glitchTimer.current) clearInterval(glitchTimer.current);
    };
  }, [triggerGlitch]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay scanlines"
    >
      {/* ── Animated neon blobs ── */}
      <div ref={blob1Ref} className="bg-blob w-[600px] h-[600px] top-[-100px] left-[-150px] opacity-25"
        style={{ background: "radial-gradient(circle, #FF0FA0 0%, transparent 70%)" }} />
      <div ref={blob2Ref} className="bg-blob w-[500px] h-[500px] bottom-[-80px] right-[-100px] opacity-20"
        style={{ background: "radial-gradient(circle, #B9FF00 0%, transparent 70%)" }} />
      <div ref={blob3Ref} className="bg-blob w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #FFD166 0%, transparent 70%)" }} />

      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted loop playsInline preload="auto"
          style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* cinematic gradient */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(8,5,8,0.7) 0%, rgba(8,5,8,0.2) 50%, rgba(8,5,8,0.85) 100%)"
          }} />
      </div>

      {/* ── Scroll indicator (left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#FF0FA0] to-transparent" />
        <span style={{ writingMode: "vertical-rl" }}
          className="text-[9px] tracking-[0.5em] text-[rgba(255,15,160,0.5)] uppercase font-display">
          Scroll
        </span>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full pt-28 md:pt-0">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="section-tag">Студия танца и растяжки · Уфа</div>
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[9px] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase font-display">
              сейчас →
            </span>
            <span ref={wordRef}
              className="text-[9px] tracking-[0.25em] uppercase font-display"
              style={{ color: "#B9FF00" }}>
              {WORDS[0]}
            </span>
          </div>
        </motion.div>

        {/* Title block */}
        <div className="overflow-hidden mb-3">
          <div
            ref={titleRef}
            className="opacity-0"
          >
            <h1
              className="font-display uppercase leading-[0.9] tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(5rem, 16vw, 14rem)", fontWeight: 900 }}
            >
              STUDIO
            </h1>
            <div className="flex items-center gap-4 md:gap-6 -mt-2 md:-mt-4">
              <span
                ref={numRef}
                data-text="13"
                className="glitch-container font-display leading-[0.9] tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(5rem, 16vw, 14rem)",
                  fontWeight: 900,
                  color: "#FF0FA0",
                  textShadow: "0 0 30px rgba(255,15,160,0.7), 0 0 80px rgba(255,15,160,0.3)",
                }}
              >
                13
              </span>
              <span
                className="font-display uppercase text-[rgba(255,255,255,0.15)] leading-none"
                style={{
                  fontSize: "clamp(1rem, 3vw, 3rem)",
                  fontWeight: 400,
                  writingMode: "vertical-rl",
                  letterSpacing: "0.2em",
                }}
              >
                UFA
              </span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-[rgba(255,255,255,0.65)] mb-10 md:mb-12 max-w-lg opacity-0"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.4,
          }}
        >
          Танцуй.{" "}
          <span style={{ color: "#FF0FA0", textShadow: "0 0 16px rgba(255,15,160,0.6)" }}>
            Тянись.
          </span>{" "}
          <span style={{ color: "#B9FF00", textShadow: "0 0 14px rgba(185,255,0,0.5)" }}>
            Преображайся.
          </span>
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12 md:mb-16 opacity-0">
          <button
            onClick={() => scrollTo("#trial")}
            className="btn-neon px-8 md:px-10 py-3.5"
          >
            <span>Пробное занятие</span>
          </button>
          <button
            onClick={() => scrollTo("#directions")}
            className="btn-outline-neon px-8 md:px-10 py-3.5"
          >
            Наши направления
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex gap-8 md:gap-12 opacity-0">
          {[
            { num: "7+", label: "направлений" },
            { num: "500+", label: "учеников" },
            { num: "2", label: "студии" },
          ].map((s) => (
            <div key={s.num}>
              <div
                className="font-display text-neon-magenta"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1 }}
              >
                {s.num}
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.35)] font-display mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll pulse ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#FF0FA0] to-transparent"
          style={{ boxShadow: "0 0 6px #FF0FA0" }}
        />
      </motion.div>
    </section>
  );
}
