"use client";

import Link from "next/link";

const NAV = [
  { href: "#about",      label: "О нас" },
  { href: "#directions", label: "Направления" },
  { href: "#teachers",   label: "Преподаватели" },
  { href: "#schedule",   label: "Расписание" },
  { href: "#pricing",    label: "Цены" },
  { href: "#gallery",    label: "Галерея" },
  { href: "#contacts",   label: "Контакты" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/studio13ufa", color: "#FF0FA0" },
  { label: "Telegram",  href: "https://t.me/studio13ufa",          color: "#B9FF00" },
  { label: "VK",        href: "https://vk.com/studio13ufa",        color: "#FFD166" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-16 pb-8 px-6 md:px-10 lg:px-16"
      style={{
        borderTop: "1px solid rgba(255,15,160,0.15)",
        background: "rgba(8,5,8,0.98)",
      }}
    >
      {/* Neon glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #FF0FA0, transparent)",
          boxShadow: "0 0 20px rgba(255,15,160,0.8)",
        }}
      />

      {/* Blobs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF0FA0 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #B9FF00 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-[1440px] mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-display text-white text-2xl" style={{ fontWeight: 900 }}>
                STUDIO
              </span>
              <span
                className="font-display text-2xl"
                style={{
                  fontWeight: 900,
                  color: "#FF0FA0",
                  textShadow: "0 0 16px rgba(255,15,160,0.7)",
                }}
              >
                13
              </span>
            </div>
            <p className="text-[rgba(255,255,255,0.4)] text-xs leading-relaxed max-w-[220px] font-body">
              Студия танца и растяжки в Уфе. Heels · Contemporary · Hip-Hop · Stretching · Kids.
            </p>
            <div className="flex gap-4 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-display tracking-wider transition-all duration-300"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = s.color;
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 12px ${s.color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = "";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-5"
              style={{ color: "#FF0FA0" }}>
              Навигация
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover-link text-[rgba(255,255,255,0.45)] hover:text-white text-xs font-body transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-5"
              style={{ color: "#B9FF00" }}>
              Контакты
            </p>
            <div className="flex flex-col gap-3 text-xs text-[rgba(255,255,255,0.45)]">
              <p>+7 (347) 000-00-01</p>
              <p>studio13@mail.ru</p>
              <p>Уфа, ул. Ленина, 12</p>
              <p>Уфа, ул. Пушкина, 55</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[9px] tracking-[0.2em] text-[rgba(255,255,255,0.2)] font-display">
            © {new Date().getFullYear()} STUDIO 13 UFA — ВСЕ ПРАВА ЗАЩИЩЕНЫ
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[9px] text-[rgba(255,255,255,0.2)] hover:text-[rgba(255,255,255,0.5)] transition-colors duration-200 font-display tracking-wider">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
