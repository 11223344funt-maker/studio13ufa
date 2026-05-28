"use client";

interface MarqueeStripProps {
  items?: string[];
  reverse?: boolean;
  accent?: "magenta" | "lime" | "gold";
}

const DEFAULT_ITEMS = [
  "HEELS", "·", "CONTEMPORARY", "·", "HIP-HOP", "·", "STRETCHING",
  "·", "LADY STYLE", "·", "KIDS DANCE", "·", "STUDIO 13", "·",
];

export function MarqueeStrip({
  items = DEFAULT_ITEMS,
  reverse = false,
  accent = "magenta",
}: MarqueeStripProps) {
  const accentColors: Record<string, string> = {
    magenta: "#FF0FA0",
    lime: "#B9FF00",
    gold: "#FFD166",
  };
  const glowColors: Record<string, string> = {
    magenta: "rgba(255,15,160,0.5)",
    lime: "rgba(185,255,0,0.4)",
    gold: "rgba(255,209,102,0.4)",
  };
  const color = accentColors[accent];
  const glow = glowColors[accent];

  const doubled = [...items, ...items];

  return (
    <div
      className="relative py-4 overflow-hidden"
      style={{
        borderTop: `1px solid rgba(255,255,255,0.06)`,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080508, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080508, transparent)" }} />

      <div
        className={reverse ? "marquee-track-rev" : "marquee-track"}
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-display text-[11px] tracking-[0.3em] uppercase whitespace-nowrap px-5"
              style={{
                color: item === "·" ? color : "rgba(255,255,255,0.7)",
                textShadow: item === "·" ? `0 0 10px ${glow}` : "none",
                fontWeight: item === "·" ? 900 : 400,
              }}
            >
              {item}
            </span>
            {item !== "·" && i < doubled.length - 1 && (
              <span
                className="font-display text-[11px]"
                style={{ color, textShadow: `0 0 10px ${glow}` }}
              >
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
