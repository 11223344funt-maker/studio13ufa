"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { href: "#about",      label: "О нас" },
  { href: "#directions", label: "Направления" },
  { href: "#teachers",   label: "Преподаватели" },
  { href: "#schedule",   label: "Расписание" },
  { href: "#pricing",    label: "Цены" },
  { href: "#gallery",    label: "Галерея" },
  { href: "#contacts",   label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Pin header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,5,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,15,160,0.12)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
            className="group flex items-baseline gap-1 select-none"
          >
            <span className="font-display font-900 text-white text-xl md:text-2xl tracking-[-0.02em] group-hover:text-neon-magenta transition-colors duration-300"
              style={{ fontWeight: 900 }}>
              STUDIO
            </span>
            <span
              className="font-display text-xl md:text-2xl tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                color: "#FF0FA0",
                textShadow: "0 0 16px rgba(255,15,160,0.7)",
              }}
            >
              13
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                className="hover-link text-[rgba(255,255,255,0.6)] hover:text-white transition-colors duration-200 text-[11px] tracking-[0.18em] uppercase font-display"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav("#trial")}
              className="hidden md:block btn-neon px-5 py-2.5 text-[10px]"
            >
              <span>Записаться</span>
            </button>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-[1.5px] bg-white"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(8,5,8,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Neon blob accents */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #FF0FA0 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, #B9FF00 0%, transparent 70%)", filter: "blur(50px)" }} />

            <div className="flex flex-col justify-center h-full px-8 py-24">
              <nav className="flex flex-col gap-2">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                    className="group flex items-center gap-4 py-3 border-b border-[rgba(255,255,255,0.05)]"
                  >
                    <span className="text-[10px] tracking-[0.3em] text-[rgba(255,15,160,0.5)] font-display w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-700 text-white group-hover:text-neon-magenta transition-colors duration-200"
                      style={{ fontWeight: 700 }}>
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10"
              >
                <button
                  onClick={() => handleNav("#trial")}
                  className="btn-neon w-full py-4 text-sm"
                >
                  <span>Записаться на пробное</span>
                </button>
                <p className="text-center mt-6 text-[rgba(255,255,255,0.3)] text-xs tracking-widest font-display">
                  +7 (347) 000-00-00
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
