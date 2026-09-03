import { NextResponse } from "next/server";
import { saveImage } from "@/lib/imageStore";
import { isAdminRequest } from "@/lib/requireAdmin";

const MAX_BYTES = 6 * 1024 * 1024; // 6MB per image
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("images").filter((f) => typeof f === "object" && "arrayBuffer" in f);

  if (!files.length) {
    return NextResponse.json({ error: "No images provided" }, { status: 400 });
  }

  const keys = [];
  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `${file.name} is larger than 6MB` }, { status: 400 });
    }
    const buffer = await file.arrayBuffer();
    const key = await saveImage(buffer, file.type);
    keys.push(key);
  }

  return NextResponse.json({ keys });
}
