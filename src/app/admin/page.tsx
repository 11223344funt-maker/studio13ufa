"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

/* ─── Types ──────────────────────────────────────────────────── */
interface Slot {
  id: string;
  label: string;
  hint: string;
  accept: string;
  preview: string; // current file path in /public
  isVideo?: boolean;
}

/* ─── Slot config ────────────────────────────────────────────── */
const SLOTS: Slot[] = [
  {
    id: "hero-video",
    label: "Hero — Видео фон",
    hint: "MP4 · 1920×1080 · до 100MB",
    accept: "video/mp4,video/webm",
    preview: "/hero-video.mp4",
    isVideo: true,
  },
  {
    id: "og-image",
    label: "OG-изображение",
    hint: "JPG/PNG · 1200×630px · для соцсетей",
    accept: "image/*",
    preview: "/og-image.svg",
  },
  {
    id: "teachers/teacher-1",
    label: "Преподаватель 1",
    hint: "JPG/PNG · 400×500px · Heels",
    accept: "image/*",
    preview: "/teachers/teacher-1.svg",
  },
  {
    id: "teachers/teacher-2",
    label: "Преподаватель 2",
    hint: "JPG/PNG · 400×500px · Hip-Hop",
    accept: "image/*",
    preview: "/teachers/teacher-2.svg",
  },
  {
    id: "teachers/teacher-3",
    label: "Преподаватель 3",
    hint: "JPG/PNG · 400×500px · Contemporary",
    accept: "image/*",
    preview: "/teachers/teacher-3.svg",
  },
  {
    id: "teachers/teacher-4",
    label: "Преподаватель 4",
    hint: "JPG/PNG · 400×500px · Kids",
    accept: "image/*",
    preview: "/teachers/teacher-4.svg",
  },
  {
    id: "gallery/g1",
    label: "Галерея 1",
    hint: "JPG/PNG · Heels · вертикаль",
    accept: "image/*",
    preview: "/gallery/g1.svg",
  },
  {
    id: "gallery/g2",
    label: "Галерея 2",
    hint: "JPG/PNG · Hip-Hop",
    accept: "image/*",
    preview: "/gallery/g2.svg",
  },
  {
    id: "gallery/g3",
    label: "Галерея 3",
    hint: "JPG/PNG · Contemporary · горизонталь",
    accept: "image/*",
    preview: "/gallery/g3.svg",
  },
  {
    id: "gallery/g4",
    label: "Галерея 4",
    hint: "JPG/PNG · Lady Style",
    accept: "image/*",
    preview: "/gallery/g4.svg",
  },
  {
    id: "gallery/g5",
    label: "Галерея 5",
    hint: "JPG/PNG · Stretching · вертикаль",
    accept: "image/*",
    preview: "/gallery/g5.svg",
  },
  {
    id: "gallery/g6",
    label: "Галерея 6",
    hint: "JPG/PNG · Kids Dance",
    accept: "image/*",
    preview: "/gallery/g6.svg",
  },
  {
    id: "gallery/g7",
    label: "Галерея 7",
    hint: "JPG/PNG · Showcase",
    accept: "image/*",
    preview: "/gallery/g7.svg",
  },
  {
    id: "gallery/g8",
    label: "Галерея 8",
    hint: "JPG/PNG · Breaking · горизонталь",
    accept: "image/*",
    preview: "/gallery/g8.svg",
  },
];

/* ─── Upload State ───────────────────────────────────────────── */
type UploadState = "idle" | "uploading" | "success" | "error";

interface SlotState {
  state: UploadState;
  progress: number;
  preview: string;
  error?: string;
}

/* ─── Upload Zone ────────────────────────────────────────────── */
function UploadZone({
  slot,
  slotState,
  password,
  onUpload,
}: {
  slot: Slot;
  slotState: SlotState;
  password: string;
  onUpload: (slotId: string, file: File) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file) onUpload(slot.id, file);
    },
    [slot.id, onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const isUploaded = slotState.state === "success";
  const isUploading = slotState.state === "uploading";
  const hasError = slotState.state === "error";

  const statusColor = isUploaded ? "#B9FF00" : hasError ? "#ff6b6b" : "#FF0FA0";

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${
          dragging
            ? "#FF0FA0"
            : isUploaded
            ? "rgba(185,255,0,0.4)"
            : hasError
            ? "rgba(255,107,107,0.4)"
            : "rgba(255,255,255,0.08)"
        }`,
        boxShadow: dragging ? "0 0 20px rgba(255,15,160,0.3)" : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Top neon line */}
      <div
        className="h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)`,
          boxShadow: `0 0 8px ${statusColor}`,
        }}
      />

      {/* Preview area */}
      <div
        className="relative cursor-pointer"
        style={{ height: slot.isVideo ? 160 : 140 }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        {/* Preview image/video */}
        {slotState.preview && !slot.isVideo && (
          <Image
            src={slotState.preview}
            alt={slot.label}
            fill
            className="object-cover opacity-60"
            unoptimized
          />
        )}
        {slot.isVideo && isUploaded && (
          <video
            src={slotState.preview}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            muted
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-200"
          style={{
            background: dragging
              ? "rgba(255,15,160,0.15)"
              : "rgba(8,5,8,0.5)",
          }}
        >
          {isUploading ? (
            <>
              <div
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: "#FF0FA0", borderTopColor: "transparent" }}
              />
              <span className="text-[10px] font-display tracking-widest" style={{ color: "#FF0FA0" }}>
                {slotState.progress}%
              </span>
            </>
          ) : isUploaded ? (
            <>
              <div className="text-2xl">✓</div>
              <span className="text-[10px] font-display tracking-widest" style={{ color: "#B9FF00" }}>
                ЗАГРУЖЕНО
              </span>
            </>
          ) : dragging ? (
            <>
              <div className="text-2xl">⬇</div>
              <span className="text-[10px] font-display tracking-widest" style={{ color: "#FF0FA0" }}>
                ОТПУСТИ
              </span>
            </>
          ) : (
            <>
              <div className="text-xl opacity-40">
                {slot.isVideo ? "🎬" : "🖼"}
              </div>
              <span className="text-[9px] font-display tracking-widest text-[rgba(255,255,255,0.35)]">
                НАЖМИ ИЛИ ПЕРЕТАЩИ
              </span>
            </>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-display text-white text-[11px] font-700" style={{ fontWeight: 700 }}>
            {slot.label}
          </p>
          {isUploaded && (
            <span
              className="text-[8px] tracking-[0.2em] uppercase font-display px-1.5 py-0.5"
              style={{ color: "#B9FF00", border: "1px solid rgba(185,255,0,0.3)" }}
            >
              OK
            </span>
          )}
        </div>
        <p className="text-[rgba(255,255,255,0.3)] text-[9px]">{slot.hint}</p>
        {hasError && (
          <p className="text-[9px] mt-1" style={{ color: "#ff6b6b" }}>
            ⚠ {slotState.error}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={slot.accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ─── Main Admin Page ────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [slotStates, setSlotStates] = useState<Record<string, SlotState>>(
    () =>
      Object.fromEntries(
        SLOTS.map((s) => [s.id, { state: "idle" as UploadState, progress: 0, preview: s.preview }])
      )
  );

  const [uploadedCount, setUploadedCount] = useState(0);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwLoading(true);
    setPwError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwInput }),
      });
      if (res.ok) {
        setPassword(pwInput);
        sessionStorage.setItem("admin_pw", pwInput);
        setAuthed(true);
      } else {
        setPwError("Неверный пароль");
      }
    } catch {
      setPwError("Ошибка соединения");
    } finally {
      setPwLoading(false);
    }
  };

  const handleUpload = useCallback(
    async (slotId: string, file: File) => {
      setSlotStates((prev) => ({
        ...prev,
        [slotId]: { ...prev[slotId], state: "uploading", progress: 0, error: undefined },
      }));

      // Create local preview immediately
      const localUrl = URL.createObjectURL(file);
      setSlotStates((prev) => ({
        ...prev,
        [slotId]: { ...prev[slotId], preview: localUrl },
      }));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("slot", slotId);

      // Fake progress (XHR would give real progress, fetch doesn't)
      let prog = 0;
      const progressInterval = setInterval(() => {
        prog = Math.min(prog + Math.random() * 15, 85);
        setSlotStates((prev) => ({
          ...prev,
          [slotId]: { ...prev[slotId], progress: Math.round(prog) },
        }));
      }, 200);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-admin-password": password },
          body: formData,
        });

        clearInterval(progressInterval);

        if (res.ok) {
          const data = await res.json();
          setSlotStates((prev) => ({
            ...prev,
            [slotId]: {
              state: "success",
              progress: 100,
              preview: data.path + "?t=" + Date.now(),
            },
          }));
          setUploadedCount((c) => c + 1);
        } else {
          const err = await res.json();
          setSlotStates((prev) => ({
            ...prev,
            [slotId]: {
              ...prev[slotId],
              state: "error",
              progress: 0,
              error: err.error || "Ошибка загрузки",
            },
          }));
        }
      } catch {
        clearInterval(progressInterval);
        setSlotStates((prev) => ({
          ...prev,
          [slotId]: { ...prev[slotId], state: "error", progress: 0, error: "Нет соединения" },
        }));
      }
    },
    [password]
  );

  /* ─ Login screen ─ */
  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#080508" }}
      >
        {/* Neon blob */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #FF0FA0 0%, transparent 70%)", filter: "blur(80px)" }} />

        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-sm"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,15,160,0.2)",
            }}
          >
            <div className="h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #FF0FA0, transparent)", boxShadow: "0 0 20px rgba(255,15,160,0.8)" }} />

            <div className="p-8 flex flex-col gap-6">
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-white text-2xl" style={{ fontWeight: 900 }}>STUDIO</span>
                  <span className="font-display text-2xl" style={{ fontWeight: 900, color: "#FF0FA0", textShadow: "0 0 16px rgba(255,15,160,0.7)" }}>13</span>
                </div>
                <p className="text-[rgba(255,255,255,0.4)] text-xs font-display tracking-widest uppercase">
                  Панель управления
                </p>
              </div>

              <div>
                <label className="block text-[9px] tracking-[0.3em] uppercase font-display text-[rgba(255,255,255,0.4)] mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={pwInput}
                  onChange={(e) => setPwInput(e.target.value)}
                  placeholder="Введи пароль..."
                  className="form-input"
                  autoFocus
                />
                {pwError && (
                  <p className="text-[10px] mt-2" style={{ color: "#ff6b6b" }}>{pwError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={pwLoading || !pwInput}
                className="btn-neon w-full py-3.5"
              >
                <span>{pwLoading ? "Проверяю..." : "Войти →"}</span>
              </button>

              <p className="text-[rgba(255,255,255,0.2)] text-[9px] text-center">
                Пароль по умолчанию: <code className="text-[rgba(255,255,255,0.4)]">studio13admin</code>
                <br />Сменить: переменная <code className="text-[rgba(255,255,255,0.4)]">ADMIN_PASSWORD</code> в .env.local
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }

  /* ─ Main admin panel ─ */
  const successCount = Object.values(slotStates).filter((s) => s.state === "success").length;
  const totalSlots = SLOTS.length;

  // Group slots
  const heroSlots = SLOTS.filter((s) => s.id === "hero-video" || s.id === "og-image");
  const teacherSlots = SLOTS.filter((s) => s.id.startsWith("teachers/"));
  const gallerySlots = SLOTS.filter((s) => s.id.startsWith("gallery/"));

  return (
    <div className="min-h-screen" style={{ background: "#080508" }}>
      {/* Fixed header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between"
        style={{
          background: "rgba(8,5,8,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,15,160,0.15)",
        }}
      >
        <div className="flex items-baseline gap-1">
          <span className="font-display text-white text-lg" style={{ fontWeight: 900 }}>STUDIO</span>
          <span className="font-display text-lg" style={{ fontWeight: 900, color: "#FF0FA0", textShadow: "0 0 12px rgba(255,15,160,0.7)" }}>13</span>
          <span className="text-[rgba(255,255,255,0.3)] text-[10px] tracking-[0.3em] uppercase font-display ml-3">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress pill */}
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="text-[10px] font-display" style={{ color: successCount === totalSlots ? "#B9FF00" : "#FF0FA0" }}>
              {successCount}/{totalSlots}
            </span>
            <span className="text-[rgba(255,255,255,0.3)] text-[9px] font-display tracking-wider">загружено</span>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_pw");
              setAuthed(false);
            }}
            className="text-[9px] tracking-[0.25em] uppercase font-display text-[rgba(255,255,255,0.3)] hover:text-white transition-colors"
          >
            Выйти
          </button>
          <a
            href="/"
            target="_blank"
            className="text-[9px] tracking-[0.25em] uppercase font-display text-[rgba(255,255,255,0.3)] hover:text-[#FF0FA0] transition-colors"
          >
            Смотреть сайт →
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className="pt-24 pb-16 px-6 md:px-10 lg:px-16 max-w-[1440px] mx-auto">

        {/* Hero message */}
        {successCount === 0 && (
          <div
            className="mb-10 p-6 rounded-xl"
            style={{
              background: "rgba(255,15,160,0.05)",
              border: "1px solid rgba(255,15,160,0.15)",
            }}
          >
            <p className="text-sm text-[rgba(255,255,255,0.7)]">
              👋 Добро пожаловать! Загрузи фото и видео — просто перетащи файлы в нужные ячейки или кликни на них.
              После загрузки всего контента сделай <code className="text-[#FF0FA0]">git add . && git commit && git push</code> — и сайт задеплоится автоматически.
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-[0.25em] uppercase font-display text-[rgba(255,255,255,0.4)]">
              Прогресс загрузки
            </span>
            <span className="text-[10px] font-display" style={{ color: successCount === totalSlots ? "#B9FF00" : "#FF0FA0" }}>
              {Math.round((successCount / totalSlots) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(successCount / totalSlots) * 100}%`,
                background: successCount === totalSlots
                  ? "linear-gradient(90deg, #B9FF00, #00FFB2)"
                  : "linear-gradient(90deg, #FF0FA0, #E91E8C)",
                boxShadow: `0 0 8px ${successCount === totalSlots ? "#B9FF00" : "#FF0FA0"}`,
              }}
            />
          </div>
        </div>

        {/* ── Hero + OG ── */}
        <Section title="Главный экран" color="#FF0FA0" subtitle="Видео и OG-картинка">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {heroSlots.map((slot) => (
              <UploadZone
                key={slot.id}
                slot={slot}
                slotState={slotStates[slot.id]}
                password={password}
                onUpload={handleUpload}
              />
            ))}
          </div>
        </Section>

        {/* ── Teachers ── */}
        <Section title="Преподаватели" color="#FFD166" subtitle="4 фото · рекомендуемый размер 400×500px">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {teacherSlots.map((slot) => (
              <UploadZone
                key={slot.id}
                slot={slot}
                slotState={slotStates[slot.id]}
                password={password}
                onUpload={handleUpload}
              />
            ))}
          </div>
        </Section>

        {/* ── Gallery ── */}
        <Section title="Галерея" color="#B9FF00" subtitle="8 фото · разные форматы">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallerySlots.map((slot) => (
              <UploadZone
                key={slot.id}
                slot={slot}
                slotState={slotStates[slot.id]}
                password={password}
                onUpload={handleUpload}
              />
            ))}
          </div>
        </Section>

        {/* ── Done CTA ── */}
        {successCount > 0 && (
          <div
            className="mt-10 p-6 rounded-xl"
            style={{
              background: successCount === totalSlots ? "rgba(185,255,0,0.05)" : "rgba(255,255,255,0.03)",
              border: successCount === totalSlots ? "1px solid rgba(185,255,0,0.2)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              className="font-display uppercase text-white mb-2"
              style={{ fontSize: "1rem", fontWeight: 900 }}
            >
              {successCount === totalSlots ? "🎉 Все файлы загружены!" : `Загружено ${successCount} из ${totalSlots}`}
            </h3>
            <p className="text-[rgba(255,255,255,0.5)] text-sm mb-4">
              {successCount === totalSlots
                ? "Теперь сделай коммит и запушь — сайт задеплоится на Vercel автоматически."
                : "Загрузи оставшиеся файлы, или пропусти и задеплой сейчас."}
            </p>
            <div
              className="rounded-lg p-4 font-mono text-sm"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[rgba(255,255,255,0.4)] text-xs mb-2"># В терминале проекта:</p>
              <p style={{ color: "#B9FF00" }}>git add public/</p>
              <p style={{ color: "#B9FF00" }}>git commit -m &quot;feat: add media assets&quot;</p>
              <p style={{ color: "#B9FF00" }}>git push origin main</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Section wrapper ────────────────────────────────────────── */
function Section({
  title,
  subtitle,
  color,
  children,
}: {
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-end gap-4 mb-5">
        <div>
          <p
            className="text-[9px] tracking-[0.35em] uppercase font-display mb-1"
            style={{ color }}
          >
            {subtitle}
          </p>
          <h2
            className="font-display uppercase text-white leading-none"
            style={{ fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {title}
          </h2>
        </div>
        <div
          className="h-px flex-1 mb-1"
          style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }}
        />
      </div>
      {children}
    </section>
  );
}
