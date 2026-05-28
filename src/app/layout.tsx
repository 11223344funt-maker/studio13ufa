import type { Metadata, Viewport } from "next";
import { Unbounded, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://studio13ufa.ru"),
  title: "Studio 13 — Студия танца и растяжки в Уфе",
  description:
    "Studio 13 — яркая студия танца и растяжки в Уфе. Heels, Contemporary, Hip-Hop, Stretching. Взрослые и дети от 3,5 лет. Первое занятие бесплатно.",
  keywords: [
    "студия танца Уфа",
    "растяжка Уфа",
    "heels Уфа",
    "contemporary Уфа",
    "hip-hop Уфа",
    "студия 13 Уфа",
    "Studio 13",
  ],
  authors: [{ name: "Studio 13 Ufa" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://studio13ufa.ru",
    title: "Studio 13 — Студия танца и растяжки в Уфе",
    description: "Танцуй. Тянись. Преображайся. Heels · Contemporary · Hip-Hop · Stretching.",
    siteName: "Studio 13 Ufa",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Studio 13 Ufa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio 13 — Студия танца и растяжки",
    description: "Танцуй. Тянись. Преображайся.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`lenis ${unbounded.variable} ${dmSans.variable} ${cormorant.variable}`}
    >
      <body>
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
