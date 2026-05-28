// Custom metallic SVG icon components
// Inspired by flaticon.com style — clean, modern, outline+fill

interface IconProps {
  size?: number;
  className?: string;
}

export function IconHeels({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-heels" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F0D060" />
          <stop offset="65%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M8 36 C8 36 12 26 20 24 C28 22 36 28 40 32 L38 36 Z" fill="url(#gold-heels)" opacity="0.15"/>
      <path d="M8 36 C8 36 12 26 20 24 C28 22 36 28 40 32 L38 36 Z" stroke="url(#gold-heels)" strokeWidth="1.5" fill="none"/>
      <path d="M14 36 L14 30 C14 28 16 24 20 24" stroke="url(#gold-heels)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 36 L40 36" stroke="url(#gold-heels)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="36" r="2" fill="url(#gold-heels)"/>
    </svg>
  );
}

export function IconWave({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-wave" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#F0D060" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M6 24 C10 16 14 16 18 24 C22 32 26 32 30 24 C34 16 38 16 42 24" stroke="url(#gold-wave)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M6 32 C10 24 14 24 18 32 C22 40 26 40 30 32 C34 24 38 24 42 32" stroke="url(#gold-wave)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      <circle cx="24" cy="14" r="3" fill="url(#gold-wave)" opacity="0.8"/>
    </svg>
  );
}

export function IconFire({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-fire" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F0D060" />
        </linearGradient>
      </defs>
      <path d="M24 8 C24 8 28 14 26 18 C30 14 34 18 32 24 C34 22 36 24 36 28 C36 34 30 40 24 40 C18 40 12 34 12 28 C12 22 16 18 20 18 C18 14 22 8 24 8Z" fill="url(#gold-fire)" opacity="0.15"/>
      <path d="M24 8 C24 8 28 14 26 18 C30 14 34 18 32 24 C34 22 36 24 36 28 C36 34 30 40 24 40 C18 40 12 34 12 28 C12 22 16 18 20 18 C18 14 22 8 24 8Z" stroke="url(#gold-fire)" strokeWidth="1.5" fill="none"/>
      <path d="M24 24 C24 24 26 28 24 32 C22 28 24 24 24 24Z" fill="url(#gold-fire)"/>
    </svg>
  );
}

export function IconLotus({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-lotus" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F0D060" />
        </linearGradient>
      </defs>
      <path d="M24 36 C24 36 14 28 12 20 C14 22 18 24 24 26 C30 24 34 22 36 20 C34 28 24 36 24 36Z" fill="url(#gold-lotus)" opacity="0.2"/>
      <path d="M24 36 C24 36 14 28 12 20 C14 22 18 24 24 26 C30 24 34 22 36 20 C34 28 24 36 24 36Z" stroke="url(#gold-lotus)" strokeWidth="1.5" fill="none"/>
      <path d="M24 26 C24 26 16 18 18 10 C20 14 22 18 24 20 C26 18 28 14 30 10 C32 18 24 26 24 26Z" fill="url(#gold-lotus)" opacity="0.15"/>
      <path d="M24 26 C24 26 16 18 18 10 C20 14 22 18 24 20 C26 18 28 14 30 10 C32 18 24 26 24 26Z" stroke="url(#gold-lotus)" strokeWidth="1.5" fill="none"/>
      <path d="M12 36 L36 36" stroke="url(#gold-lotus)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconStar({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#F0D060" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M24 8 L27.5 18.5 L38.5 18.5 L29.5 25 L33 35.5 L24 29 L15 35.5 L18.5 25 L9.5 18.5 L20.5 18.5 Z" fill="url(#gold-star)" opacity="0.2"/>
      <path d="M24 8 L27.5 18.5 L38.5 18.5 L29.5 25 L33 35.5 L24 29 L15 35.5 L18.5 25 L9.5 18.5 L20.5 18.5 Z" stroke="url(#gold-star)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function IconHeart({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-heart" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9826A" />
          <stop offset="50%" stopColor="#F0B0A0" />
          <stop offset="100%" stopColor="#8B4030" />
        </linearGradient>
      </defs>
      <path d="M24 38 C24 38 8 28 8 18 C8 13 12 10 16 10 C19 10 22 12 24 14 C26 12 29 10 32 10 C36 10 40 13 40 18 C40 28 24 38 24 38Z" fill="url(#gold-heart)" opacity="0.2"/>
      <path d="M24 38 C24 38 8 28 8 18 C8 13 12 10 16 10 C19 10 22 12 24 14 C26 12 29 10 32 10 C36 10 40 13 40 18 C40 28 24 38 24 38Z" stroke="url(#gold-heart)" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export function IconCalendar({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-cal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="22" rx="2" stroke="url(#gold-cal)" strokeWidth="1.5" fill="none"/>
      <path d="M4 12 L28 12" stroke="url(#gold-cal)" strokeWidth="1.5"/>
      <path d="M10 4 L10 8" stroke="url(#gold-cal)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 4 L22 8" stroke="url(#gold-cal)" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="9" y="16" width="4" height="4" rx="0.5" fill="url(#gold-cal)" opacity="0.7"/>
      <rect x="16" y="16" width="4" height="4" rx="0.5" fill="url(#gold-cal)" opacity="0.5"/>
      <rect x="9" y="22" width="4" height="3" rx="0.5" fill="url(#gold-cal)" opacity="0.3"/>
    </svg>
  );
}

export function IconPin({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-pin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M16 4 C11 4 7 8 7 13 C7 20 16 28 16 28 C16 28 25 20 25 13 C25 8 21 4 16 4Z" stroke="url(#gold-pin)" strokeWidth="1.5" fill="none"/>
      <path d="M16 4 C11 4 7 8 7 13 C7 20 16 28 16 28 C16 28 25 20 25 13 C25 8 21 4 16 4Z" fill="url(#gold-pin)" opacity="0.12"/>
      <circle cx="16" cy="13" r="3.5" stroke="url(#gold-pin)" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="13" r="1.5" fill="url(#gold-pin)"/>
    </svg>
  );
}

export function IconPhone({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-phone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M8 6 L12 6 L14 12 L11 14 C12 18 14 20 18 22 L20 19 L26 21 L26 25 C22 27 8 22 6 8 Z" stroke="url(#gold-phone)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M8 6 L12 6 L14 12 L11 14 C12 18 14 20 18 22 L20 19 L26 21 L26 25 C22 27 8 22 6 8 Z" fill="url(#gold-phone)" opacity="0.1"/>
    </svg>
  );
}

export function IconClock({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-clock" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="11" stroke="url(#gold-clock)" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="11" fill="url(#gold-clock)" opacity="0.06"/>
      <path d="M16 9 L16 16 L21 16" stroke="url(#gold-clock)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="16" r="1.5" fill="url(#gold-clock)"/>
    </svg>
  );
}

export function IconInstagram({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-ig" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#gold-ig)" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="4" stroke="url(#gold-ig)" strokeWidth="1.5" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1" fill="url(#gold-ig)"/>
    </svg>
  );
}

export function IconTelegram({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-tg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M22 2 L2 10 L10 13 L13 21 L17 14 L22 2Z" stroke="url(#gold-tg)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M10 13 L14 9" stroke="url(#gold-tg)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconVK({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-vk" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M2 7 C2 7 6 7 8 12 C9 14 9 16 11 16 L11 10 C11 10 11 8 13 8 L17 8 C17 8 22 8 22 12 C22 14 20 16 18 17 L22 22 L18 22 L15 18 C15 18 13 16 12 17 L12 22 L8 22 C8 22 2 22 2 15 L2 7Z" stroke="url(#gold-vk)" strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

export function IconDiamond({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <defs>
        <linearGradient id="silver-dia" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5A5A5A" />
          <stop offset="35%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#EFEFEF" />
          <stop offset="65%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#5A5A5A" />
        </linearGradient>
      </defs>
      <path d="M24 8 L38 20 L24 40 L10 20 Z" fill="url(#silver-dia)" opacity="0.15"/>
      <path d="M24 8 L38 20 L24 40 L10 20 Z" stroke="url(#silver-dia)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M10 20 L38 20" stroke="url(#silver-dia)" strokeWidth="1"/>
      <path d="M16 12 L22 20 L24 8" stroke="url(#silver-dia)" strokeWidth="0.8" opacity="0.6"/>
      <path d="M32 12 L26 20 L24 8" stroke="url(#silver-dia)" strokeWidth="0.8" opacity="0.6"/>
    </svg>
  );
}

export function IconMusicNote({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id="gold-music" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7400" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7400" />
        </linearGradient>
      </defs>
      <path d="M12 24 L12 10 L26 8 L26 22" stroke="url(#gold-music)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M12 10 L26 8" stroke="url(#gold-music)" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="24" r="3" stroke="url(#gold-music)" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="22" r="3" stroke="url(#gold-music)" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
