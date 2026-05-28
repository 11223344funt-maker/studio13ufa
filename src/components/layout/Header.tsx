"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { href: "#about",       label: "О нас" },
  { href: "#directions",  label: "Направления" },
  { href: "#teachers",    label: "Педагоги" },
  { href: "#schedule",    label: "Расписание" },
  { href: "#gallery",     label: "Галерея" },
  { href: "#contacts",    label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(253,249,243,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.18)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(19,14,8,0.06)" : "none",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-none">
            <div className="relative">
              <span
                className="font-display text-3xl font-black leading-none"
                style={{
                  background: "linear-gradient(135deg, #9A7400 0%, #D4AF37 35%, #F0D060 50%, #D4AF37 65%, #9A7400 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                13
              </span>
              <span
                className="absolute -top-1 -right-2 w-2 h-2 rounded-full"
                style={{ background: "#D4AF37", boxShadow: "0 0 6px rgba(212,175,55,0.8)" }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[10px] tracking-[0.35em] text-ink-3 uppercase leading-none">
                STUDIO
              </span>
              <span className="font-display text-[10px] tracking-[0.35em] text-ink-3 uppercase leading-none">
                УФА
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover-link font-body text-[13px] tracking-wide text-ink-3 hover:text-ink transition-colors duration-200 cursor-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#trial"
              className="btn-gold metallic-shine px-6 py-2.5 cursor-none"
              style={{ borderRadius: "2px" }}
            >
              <span>Записаться</span>
            </a>
          </div>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-[6px] cursor-none p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="menu"
          >
            <span
              className="w-6 h-[1.5px] block transition-all duration-300"
              style={{
                background: "#D4AF37",
                transform: menuOpen ? "rotate(45deg) translateY(7.5px)" : "none",
              }}
            />
            <span
              className="w-6 h-[1.5px] block transition-all duration-300"
              style={{
                background: "#D4AF37",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-6 h-[1.5px] block transition-all duration-300"
              style={{
                background: "#D4AF37",
                transform: menuOpen ? "rotate(-45deg) translateY(-7.5px)" : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#FDF9F3" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col justify-center items-center h-full gap-8 px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="font-display text-4xl font-bold text-ink hover:text-gold transition-colors cursor-none"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <a
                  href="#trial"
                  className="btn-gold metallic-shine mt-4 block px-10 py-4 cursor-none"
                  style={{ borderRadius: "2px" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Записаться на пробное</span>
                </a>
              </motion.div>
            </div>

            {/* Gold dividers */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
