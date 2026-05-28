"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GALLERY = [
  { id: 1, src: "/gallery/g1.svg", alt: "Heels choreo", label: "Heels", col: "tall" },
  { id: 2, src: "/gallery/g2.svg", alt: "Hip-Hop battle", label: "Hip-Hop", col: "normal" },
  { id: 3, src: "/gallery/g3.svg", alt: "Contemporary", label: "Contemporary", col: "wide" },
  { id: 4, src: "/gallery/g4.svg", alt: "Lady Style", label: "Lady Style", col: "normal" },
  { id: 5, src: "/gallery/g5.svg", alt: "Stretching", label: "Stretching", col: "tall" },
  { id: 6, src: "/gallery/g6.svg", alt: "Kids Dance", label: "Kids Dance", col: "normal" },
  { id: 7, src: "/gallery/g7.svg", alt: "Showcase", label: "Showcase", col: "normal" },
  { id: 8, src: "/gallery/g8.svg", alt: "Breaking", label: "Breaking", col: "wide" },
];

const COLORS = ["#FF0FA0", "#B9FF00", "#FFD166", "#E91E8C", "#00FFB2", "#FF0FA0", "#FFD166", "#B9FF00"];

function GalleryItem({
  item,
  idx,
}: {
  item: (typeof GALLERY)[number];
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);
  const color = COLORS[idx % COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-xl cursor-none"
      style={{
        gridRowEnd: item.col === "tall" ? "span 2" : "span 1",
        gridColumnEnd: item.col === "wide" ? "span 2" : "span 1",
        aspectRatio: item.col === "tall" ? "auto" : item.col === "wide" ? "16/7" : "1/1",
        minHeight: item.col === "tall" ? 360 : 180,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
        sizes="(max-width: 768px) 50vw, 33vw"
        onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
      />

      {/* Placeholder gradient if no image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(${idx % 2 === 0 ? "255,15,160" : "185,255,0"},0.07) 0%, transparent 60%)`,
        }}
      />

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 z-10"
            style={{
              background: `linear-gradient(to top, rgba(8,5,8,0.92) 0%, rgba(8,5,8,0.5) 50%, transparent 100%)`,
            }}
          >
            {/* neon top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                boxShadow: `0 0 12px ${color}`,
              }}
            />
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <p
                className="text-[9px] tracking-[0.35em] uppercase font-display mb-1"
                style={{ color }}
              >
                Studio 13
              </p>
              <h3
                className="font-display uppercase text-white leading-tight"
                style={{ fontWeight: 900, fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
              >
                {item.label}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="gallery" className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-64 opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #B9FF00 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="section-tag mb-5">Галерея</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display uppercase leading-[0.9] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              ЖИЗНЬ{" "}
              <span style={{ color: "#B9FF00", textShadow: "0 0 30px rgba(185,255,0,0.5)" }}>
                СТУДИИ
              </span>
            </h2>
            <a
              href="https://instagram.com/studio13ufa"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-lime px-6 py-3 text-[10px] inline-flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Смотреть всё в Instagram
            </a>
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          style={{ gridAutoRows: "minmax(180px, auto)" }}
        >
          {GALLERY.map((item, i) => (
            <GalleryItem key={item.id} item={item} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
