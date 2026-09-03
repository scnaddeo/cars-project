import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const LOCAL_DIR = path.join(process.cwd(), ".data", "images");

function useNetlifyBlobs() {
  return process.env.NODE_ENV === "production";
}

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("ferraio-images");
}

function extFromType(contentType) {
  if (contentType === "image/png") return "png";
  if (contentType === "image/webp") return "webp";
  if (contentType === "image/gif") return "gif";
  return "jpg";
}

export async function saveImage(arrayBuffer, contentType) {
  const key = `${randomUUID()}.${extFromType(contentType)}`;
  const buffer = Buffer.from(arrayBuffer);

  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    await store.set(key, buffer, { metadata: { contentType } });
    return key;
  }

  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, key), buffer);
  await fs.writeFile(path.join(LOCAL_DIR, `${key}.type`), contentType, "utf8");
  return key;
}

export async function getImage(key) {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!result) return null;
    return {
      buffer: Buffer.from(result.data),
      contentType: result.metadata?.contentType || "image/jpeg",
    };
  }

  try {
    const buffer = await fs.readFile(path.join(LOCAL_DIR, key));
    let contentType = "image/jpeg";
    try {
      contentType = await fs.readFile(path.join(LOCAL_DIR, `${key}.type`), "utf8");
    } catch {}
    return { buffer, contentType };
  } catch {
    return null;
  }
}

export async function deleteImage(key) {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    await store.delete(key);
    return;
  }
  try {
    await fs.unlink(path.join(LOCAL_DIR, key));
    await fs.unlink(path.join(LOCAL_DIR, `${key}.type`));
  } catch {}
}
