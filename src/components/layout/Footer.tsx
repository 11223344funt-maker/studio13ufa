"use client";

import Link from "next/link";
import { IconInstagram, IconTelegram, IconVK, IconPin, IconPhone } from "@/components/ui/Icons";

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
  { label: "Instagram", href: "https://instagram.com/studio13_ufa", Icon: IconInstagram },
  { label: "Telegram",  href: "https://t.me/studio13ufa",           Icon: IconTelegram  },
  { label: "VK",        href: "https://vk.com/studio13ufa",         Icon: IconVK        },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden dark-section pt-16 pb-8 px-6 md:px-10 lg:px-16"
    >
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)" }} />
      <div className="absolute top-[1px] left-0 right-0 h-[1px] opacity-30"
        style={{ background: "linear-gradient(90deg, transparent, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent)", filter: "blur(4px)" }} />

      {/* Subtle gold glow blobs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-[1440px] mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-2xl text-white" style={{ fontWeight: 900 }}>
                STUDIO
              </span>
              <span className="text-metallic-gold font-display text-2xl" style={{ fontWeight: 900 }}>
                13
              </span>
            </div>
            <p className="text-[rgba(250,246,238,0.45)] text-xs leading-relaxed max-w-[220px] font-body">
              Студия танца и растяжки в Уфе.
              <br />Heels · Contemporary · Hip-Hop · Stretching · Kids.
            </p>
            <div className="flex gap-4 mt-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 opacity-50 hover:opacity-100 cursor-none"
                  aria-label={label}
                  style={{ filter: "brightness(0) invert(1)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.filter = "none";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(0) invert(1)";
                  }}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-5 text-gold">
              Навигация
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover-link text-[rgba(250,246,238,0.4)] hover:text-[rgba(250,246,238,0.9)] text-xs font-body transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-display mb-5 text-gold">
              Контакты
            </p>
            <div className="flex flex-col gap-3 text-xs text-[rgba(250,246,238,0.45)] font-body">
              <div className="flex items-center gap-2">
                <IconPhone size={16} />
                <span>+7 (347) 000-00-01</span>
              </div>
              <div className="flex items-center gap-2">
                <IconPin size={16} />
                <span>Уфа, ул. Ленина, 12</span>
              </div>
              <div className="flex items-center gap-2">
                <IconPin size={16} />
                <span>Уфа, ул. Пушкина, 55</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-6 opacity-20" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[9px] tracking-[0.2em] text-[rgba(250,246,238,0.2)] font-display">
            © {new Date().getFullYear()} STUDIO 13 UFA — ВСЕ ПРАВА ЗАЩИЩЕНЫ
          </p>
          <Link
            href="/privacy"
            className="text-[9px] text-[rgba(250,246,238,0.2)] hover:text-[rgba(250,246,238,0.5)] transition-colors duration-200 font-display tracking-wider"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
