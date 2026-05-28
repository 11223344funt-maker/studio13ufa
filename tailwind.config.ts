import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Light base ──────────────────────────────────────
        bg:        "#FDF9F3",
        "bg-alt":  "#F5EFE4",
        "bg-card": "#FFFFFF",
        "bg-dark": "#130E08",   // contrast dark sections
        "bg-dark2":"#1E1710",

        // ── Gold metallic ───────────────────────────────────
        gold:        "#D4AF37",
        "gold-light":"#F0D860",
        "gold-dark": "#9A7400",
        "gold-pale":  "#FDF3D3",

        // ── Silver metallic ─────────────────────────────────
        silver:      "#B8B8B8",
        "silver-light":"#EFEFEF",
        "silver-dark":"#7A7A7A",

        // ── Rose gold ────────────────────────────────────────
        "rose-gold":      "#C9826A",
        "rose-gold-light":"#E8B0A0",
        "rose-gold-dark": "#8B4030",

        // ── Text ─────────────────────────────────────────────
        ink:     "#130E08",
        "ink-2": "#3D3020",
        "ink-3": "#7A6248",
        muted:   "#B8A898",

        // ── Legacy neon (kept for admin) ─────────────────────
        magenta:    "#FF0FA0",
        "lime-neon":"#B9FF00",
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "Impact", "sans-serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif:   ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        "display-3xl": ["clamp(4rem, 13vw, 13rem)", { lineHeight: "0.88", letterSpacing: "-0.03em" }],
        "display-2xl": ["clamp(3rem, 9vw, 9rem)",  { lineHeight: "0.9",  letterSpacing: "-0.02em" }],
        "display-xl":  ["clamp(2.2rem, 5.5vw, 5.5rem)", { lineHeight: "0.95" }],
        "display-lg":  ["clamp(1.8rem, 3.5vw, 3.5rem)", { lineHeight: "1" }],
        "label":       ["clamp(0.6rem, 0.9vw, 0.7rem)", { lineHeight: "1", letterSpacing: "0.28em" }],
      },
      spacing: {
        section:    "clamp(5rem, 10vw, 9rem)",
        "section-sm":"clamp(3rem, 6vw, 5rem)",
      },
      animation: {
        marquee:       "marquee 32s linear infinite",
        "marquee-rev": "marqueeRev 32s linear infinite",
        shimmer:       "shimmerGold 2.5s linear infinite",
        "pulse-gold":  "pulseGold 3s ease-in-out infinite",
        float:         "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee:    { "0%": { transform: "translateX(0)" },    "100%": { transform: "translateX(-50%)" } },
        marqueeRev: { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        shimmerGold: {
          "0%":   { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "0.7" },
          "50%":      { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
