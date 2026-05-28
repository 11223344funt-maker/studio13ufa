interface SectionLabelProps {
  number?: string;
  title: string;
  dark?: boolean; // for dark-section usage
}

export function SectionLabel({ number, title, dark = false }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {number && (
        <span
          className="font-display text-[10px] tracking-[0.3em] opacity-50"
          style={{ color: "#D4AF37" }}
        >
          {number}
        </span>
      )}
      <div className={`section-tag ${dark ? "dark-section" : ""}`}>
        {title}
      </div>
    </div>
  );
}
