import { getVideo } from "@/lib/videoStore";

export async function GET(request, { params }) {
  const { key } = await params;
  const video = await getVideo(key);
  if (!video) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(video.buffer, {
    headers: {
      "Content-Type": video.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Accept-Ranges": "bytes",
    },
  });
}
