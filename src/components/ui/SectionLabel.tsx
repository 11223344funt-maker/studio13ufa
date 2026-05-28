interface SectionLabelProps {
  number?: string;
  title: string;
  accent?: "magenta" | "lime" | "gold";
}

const COLORS = {
  magenta: "#FF0FA0",
  lime: "#B9FF00",
  gold: "#FFD166",
};

export function SectionLabel({ number, title, accent = "magenta" }: SectionLabelProps) {
  const color = COLORS[accent];
  return (
    <div className="flex items-center gap-3 mb-5">
      {number && (
        <span
          className="font-display text-[10px] tracking-[0.3em]"
          style={{ color, opacity: 0.7 }}
        >
          {number}
        </span>
      )}
      <div
        className="section-tag"
        style={{
          color,
          borderColor: `rgba(${accent === "magenta" ? "255,15,160" : accent === "lime" ? "185,255,0" : "255,209,102"},0.35)`,
        }}
      >
        {title}
      </div>
    </div>
  );
}
