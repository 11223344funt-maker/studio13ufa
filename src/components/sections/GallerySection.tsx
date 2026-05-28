"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY = [
  { id: 1, src: "/gallery/g1.svg", alt: "Heels choreo",  label: "Heels",       col: "tall"   },
  { id: 2, src: "/gallery/g2.svg", alt: "Hip-Hop battle", label: "Hip-Hop",    col: "normal" },
  { id: 3, src: "/gallery/g3.svg", alt: "Contemporary",   label: "Contemporary",col: "wide"  },
  { id: 4, src: "/gallery/g4.svg", alt: "Lady Style",     label: "Lady Style",  col: "normal" },
  { id: 5, src: "/gallery/g5.svg", alt: "Stretching",     label: "Stretching",  col: "tall"   },
  { id: 6, src: "/gallery/g6.svg", alt: "Kids Dance",     label: "Kids Dance",  col: "normal" },
  { id: 7, src: "/gallery/g7.svg", alt: "Showcase",       label: "Showcase",    col: "normal" },
  { id: 8, src: "/gallery/g8.svg", alt: "Breaking",       label: "Breaking",    col: "wide"   },
];

function GalleryItem({ item, idx }: { item: (typeof GALLERY)[number]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden cursor-none"
      style={{
        gridRowEnd:    item.col === "tall"   ? "span 2" : "span 1",
        gridColumnEnd: item.col === "wide"   ? "span 2" : "span 1",
        aspectRatio:   item.col === "tall"   ? "auto"
                     : item.col === "wide"   ? "16/7"
                     : "1/1",
        minHeight: item.col === "tall" ? 360 : 180,
        background: "#F0EAE0",
        border: "1px solid rgba(212,175,55,0.12)",
        borderRadius: "2px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
        sizes="(max-width: 768px) 50vw, 33vw"
        onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
      />

      {/* Gradient placeholder */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, hsl(${(idx * 47) % 360}, 20%, 88%) 0%, hsl(${(idx * 47 + 30) % 360}, 15%, 82%) 100%)`,
        }}
      />

      {/* Gold hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: "linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(240,208,96,0.15) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between transition-all duration-400"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(19,14,8,0.6), transparent)"
            : "transparent",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.4s ease",
        }}
      >
        <span className="font-display text-[10px] tracking-[0.3em] uppercase text-white">
          {item.label}
        </span>
        <div className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.9)", fontSize: "10px", color: "#1A0E00" }}>
          ↗
        </div>
      </div>

      {/* Metallic corner accent */}
      <div
        className="absolute top-0 right-0 w-8 h-8"
        style={{
          background: "linear-gradient(135deg, transparent 50%, rgba(212,175,55,0.3) 50%)",
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.4s",
        }}
      />
    </motion.div>
  );
}

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-section px-6 md:px-10 lg:px-16 relative overflow-hidden"
      style={{ background: "#F5EFE4" }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="section-tag mb-5">Галерея</div>
            <h2
              className="font-display uppercase text-ink leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
            >
              ЖИЗНЬ{" "}
              <span className="text-metallic-gold">СТУДИИ</span>
            </h2>
          </div>
          <p className="text-ink-3 text-sm max-w-xs leading-relaxed">
            Фотографии с занятий, шоукейсов и выступлений. Добавьте свои через Instagram.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "180px",
          }}
        >
          {GALLERY.map((item, idx) => (
            <GalleryItem key={item.id} item={item} idx={idx} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://instagram.com/studio13_ufa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-3 cursor-none"
            style={{ borderRadius: "2px" }}
          >
            Смотреть в Instagram →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
