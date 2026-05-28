import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = [
  "image/jpeg", "image/jpg", "image/png", "image/webp",
  "image/svg+xml", "video/mp4", "video/webm",
];

const MAX_SIZE_MB = 100;

function checkAuth(req: NextRequest): boolean {
  const password = req.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD || "studio13admin";
  return password === expected;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const slot = formData.get("slot") as string | null; // e.g. "gallery/g1", "teachers/teacher-1", "hero-video"

  if (!file || !slot) {
    return NextResponse.json({ error: "Missing file or slot" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Недопустимый тип файла" }, { status: 400 });
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_SIZE_MB) {
    return NextResponse.json({ error: `Файл слишком большой (макс. ${MAX_SIZE_MB}MB)` }, { status: 400 });
  }

  // Determine file extension from original file
  const originalExt = path.extname(file.name).toLowerCase();
  const ext = originalExt || (file.type.startsWith("video") ? ".mp4" : ".jpg");

  // Build the final filename
  const isRoot = !slot.includes("/"); // e.g. "hero-video"
  const finalFilename = isRoot ? `${slot}${ext}` : `${path.basename(slot)}${ext}`;
  const subDir = isRoot ? "" : path.dirname(slot);
  const uploadDir = path.join(process.cwd(), "public", subDir);

  try {
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, finalFilename);
    await writeFile(filePath, buffer);

    const publicPath = isRoot
      ? `/${finalFilename}`
      : `/${subDir}/${finalFilename}`;

    return NextResponse.json({ success: true, path: publicPath });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Ошибка сохранения файла" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slot } = await req.json();
  if (!slot) {
    return NextResponse.json({ error: "Missing slot" }, { status: 400 });
  }

  const { unlink, readdir } = await import("fs/promises");

  // Find and delete any file matching the slot (any extension)
  const isRoot = !slot.includes("/");
  const dir = isRoot
    ? path.join(process.cwd(), "public")
    : path.join(process.cwd(), "public", path.dirname(slot));
  const baseName = path.basename(slot);

  try {
    const files = await readdir(dir);
    const match = files.find((f) => f.startsWith(baseName + ".") || f === baseName);
    if (match) {
      await unlink(path.join(dir, match));
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // no file to delete, that's fine
  }
}
