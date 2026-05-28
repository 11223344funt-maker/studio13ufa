"use client";

interface MarqueeStripProps {
  items?: string[];
  reverse?: boolean;
  dark?: boolean;
}

const DEFAULT = [
  "HEELS", "·", "CONTEMPORARY", "·", "HIP-HOP", "·", "STRETCHING",
  "·", "LADY STYLE", "·", "KIDS DANCE", "·", "STUDIO 13", "·",
];

export function MarqueeStrip({ items = DEFAULT, reverse = false, dark = false }: MarqueeStripProps) {
  const doubled = [...items, ...items];
  const bg = dark ? "rgba(255,255,255,0.04)" : "rgba(212,175,55,0.05)";
  const border = dark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.2)";
  const fadeFrom = dark ? "#130E08" : "#FDF9F3";

  return (
    <div
      className="relative py-4 overflow-hidden"
      style={{
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        background: bg,
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${fadeFrom}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${fadeFrom}, transparent)` }} />

      <div className={reverse ? "marquee-track-rev" : "marquee-track"}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-display text-[11px] tracking-[0.3em] uppercase whitespace-nowrap px-5"
              style={{
                fontWeight: item === "·" ? 900 : 400,
                color: item === "·"
                  ? "#D4AF37"
                  : dark ? "rgba(255,255,255,0.6)" : "rgba(19,14,8,0.55)",
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
