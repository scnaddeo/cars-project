import { getImage } from "@/lib/imageStore";

export async function GET(request, { params }) {
  const { key } = await params;
  const image = await getImage(key);
  if (!image) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(image.buffer, {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
