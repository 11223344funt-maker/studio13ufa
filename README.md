# Studio 13 Ufa — Сайт студии танца и растяжки

> Молодой, дерзкий, неоновый. Next.js 15 · Tailwind · GSAP · Framer Motion.

---

## Стек

| Технология | Версия |
|---|---|
| Next.js | 15.x (App Router) |
| TypeScript | 5.x |
| Tailwind CSS | 3.x |
| Framer Motion | — |
| GSAP + ScrollTrigger | — |
| Lenis | — |
| React Hook Form + Zod | — |
| Embla Carousel | — |

---

## Быстрый старт

```bash
# 1. Клонируй репозиторий
git clone https://github.com/YOUR_USERNAME/studio13ufa.git
cd studio13ufa

# 2. Установи зависимости
npm install

# 3. Скопируй переменные окружения
cp .env.example .env.local
# → отредактируй .env.local

# 4. Запусти dev-сервер
npm run dev
# → http://localhost:3000
```

---

## Скрипты

```bash
npm run dev      # dev-сервер с hot reload
npm run build    # production build
npm run start    # запуск production build локально
npm run lint     # ESLint проверка
```

---

## Деплой на Vercel (рекомендуется)

### Автоматически через GitHub

1. Запушь проект на GitHub
2. Зайди на [vercel.com](https://vercel.com) → **New Project** → выбери репозиторий
3. Vercel автоматически определит Next.js и настроит всё
4. В разделе **Environment Variables** добавь переменные из `.env.example`
5. Нажми **Deploy** 🚀

### Вручную через Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Структура проекта

```
studio13ufa/
├── public/                    # Статические ассеты
│   ├── gallery/               # Фотографии для галереи (g1.svg → заменить на jpg)
│   ├── teachers/              # Фото преподавателей (teacher-N.svg → заменить на jpg)
│   ├── hero-video.mp4         # ← ДОБАВИТЬ: видео для hero-секции
│   ├── og-image.jpg           # ← ДОБАВИТЬ: OG-изображение 1200×630px
│   └── favicon.svg
│
├── src/
│   ├── app/
│   │   ├── globals.css        # Дизайн-система: цвета, утилиты, анимации
│   │   ├── layout.tsx         # Root layout: шрифты, метаданные, CustomCursor
│   │   └── page.tsx           # Главная страница
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SmoothScrollProvider.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Neon blobs + GSAP glitch
│   │   │   ├── AboutSection.tsx
│   │   │   ├── DirectionsSection.tsx # Magnetic cards
│   │   │   ├── TeachersSection.tsx   # 3D tilt
│   │   │   ├── ScheduleSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── GallerySection.tsx    # Masonry + neon hover
│   │   │   ├── TrialFormSection.tsx  # Wow submit
│   │   │   └── ContactsSection.tsx
│   │   └── ui/
│   │       ├── CustomCursor.tsx      # Neon GSAP cursor
│   │       ├── MarqueeStrip.tsx
│   │       └── SectionLabel.tsx
│   └── hooks/
│       └── useFadeInView.ts
│
├── .env.example               # Шаблон переменных окружения
├── vercel.json                # Конфиг деплоя Vercel
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Что нужно заменить перед запуском

### Обязательно

| Файл | Что заменить |
|---|---|
| `public/hero-video.mp4` | Добавить видео с танцующими людьми (рекомендуется: 1920×1080, H.264) |
| `public/og-image.jpg` | OG-картинка 1200×630px для соцсетей |
| `public/teachers/teacher-N.svg` | Фото преподавателей (jpg/webp, рек. 400×500px) |
| `public/gallery/gN.svg` | Фото студии и занятий (jpg/webp) |
| `public/favicon.svg` | Можно оставить или заменить на .ico |

### В коде

| Файл | Что обновить |
|---|---|
| `src/app/layout.tsx` | `metadataBase` → реальный URL |
| `src/components/sections/ContactsSection.tsx` | Реальные адреса, телефоны, ссылки на карты |
| `src/components/sections/ScheduleSection.tsx` | Актуальное расписание |
| `src/components/sections/PricingSection.tsx` | Актуальные цены |
| `src/components/sections/TeachersSection.tsx` | Реальные имена, описания |
| `src/components/layout/Header.tsx` | Телефон в мобильном меню |
| Все файлы | `studio13ufa` → реальный хэндл Instagram |

### Форма записи (опционально, но желательно)

Чтобы форма в `TrialFormSection.tsx` реально отправляла заявки, нужно:

1. Создать API route `/src/app/api/trial/route.ts`
2. Настроить Telegram bot или email (через Resend)
3. Прописать токены в `.env.local`

---

## Кастомный домен на Vercel

1. В Vercel → **Settings → Domains** → добавь `studio13ufa.ru`
2. В DNS-панели регистратора добавь:
   - `A 76.76.21.21` (Vercel IP)
   - или `CNAME www cname.vercel-dns.com`

---

## Производительность

- Lazy loading изображений через `next/image`
- Viewport-triggered animations (не грузят CPU заранее)
- Шрифты через `next/font/google` (no layout shift)
- GSAP с `gsap.context()` (правильная очистка)
- Lenis smooth scroll
- `will-change: transform` только на анимированных элементах

---

## Лицензия

Проект создан для Studio 13 Ufa. Все права защищены.
