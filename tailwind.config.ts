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
        bg: "#080508",
        "bg-card": "rgba(255,255,255,0.04)",
        // Neon accents
        magenta: "#FF0FA0",
        fuchsia: "#E91E8C",
        "lime-neon": "#B9FF00",
        mint: "#00FFB2",
        // Metallic gold
        gold: "#FFD166",
        "gold-warm": "#F0A500",
        // Legacy / dark
        burgundy: "#6B0028",
        "dark-plum": "#1A0818",
        ivory: "#F5F0E8",
        obsidian: "#080508",
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "Impact", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        // kept for minor legacy use
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        "display-3xl": ["clamp(4.5rem, 14vw, 14rem)", { lineHeight: "0.88", letterSpacing: "-0.03em" }],
        "display-2xl": ["clamp(3.5rem, 10vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.05" }],
        "label": ["clamp(0.65rem, 1vw, 0.75rem)", { lineHeight: "1", letterSpacing: "0.25em" }],
      },
      spacing: {
        section: "clamp(5rem, 10vw, 9rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      screens: {
        xs: "480px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-rev": "marqueeRev 30s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        blob: "blob 8s ease-in-out infinite",
        scanline: "scanlines 6s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%" },
          "25%": { borderRadius: "30% 70% 40% 60% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "50% 50% 60% 40% / 30% 70% 40% 60%" },
          "75%": { borderRadius: "70% 30% 30% 70% / 70% 40% 60% 30%" },
        },
        scanlines: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
