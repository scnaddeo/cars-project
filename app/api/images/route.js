import { NextResponse } from "next/server";
import { saveImage } from "@/lib/imageStore";
import { isAdminRequest } from "@/lib/requireAdmin";

// Netlify's synchronous function invocation caps request bodies at 6MB, so
// this stays well under that with room for multipart overhead. Callers
// should send one image per request (not batched) to stay safe regardless
// of how many photos an admin selects at once.
const MAX_BYTES = 5 * 1024 * 1024; // 5MB per image
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `${file.name} is larger than 5MB` }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const key = await saveImage(buffer, file.type);
  return NextResponse.json({ key });
}
