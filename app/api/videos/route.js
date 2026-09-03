import { NextResponse } from "next/server";
import { saveVideo } from "@/lib/videoStore";
import { isAdminRequest } from "@/lib/requireAdmin";

// Netlify's synchronous function invocation caps request bodies at 6MB, so
// this stays well under that with room for multipart overhead. Callers
// should send one video file per request (not batched) to stay safe
// regardless of how many videos an admin selects at once.
const MAX_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export async function POST(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("video");

  if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
    return NextResponse.json({ error: "No video provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported video type: ${file.type || "unknown"}. Use MP4, WebM, or MOV.` },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `${file.name} is larger than 4MB. Trim the clip or lower the export quality and try again.` },
      { status: 400 }
    );
  }

  const buffer = await file.arrayBuffer();
  const key = await saveVideo(buffer, file.type);
  return NextResponse.json({ key });
}
