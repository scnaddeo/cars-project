import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { SEED_POSTS } from "./seedData";

const KEY = "posts.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "posts.json");

function useNetlifyBlobs() {
  return process.env.NODE_ENV === "production";
}

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("ferraio-posts");
}

async function readLocal() {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeLocal(posts) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(posts, null, 2), "utf8");
}

async function readAll() {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    const posts = await store.get(KEY, { type: "json" });
    if (posts) return posts;
    await store.setJSON(KEY, SEED_POSTS);
    return SEED_POSTS;
  }

  const local = await readLocal();
  if (local) return local;
  await writeLocal(SEED_POSTS);
  return SEED_POSTS;
}

async function writeAll(posts) {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    await store.setJSON(KEY, posts);
    return;
  }
  await writeLocal(posts);
}

function slugify(title) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "post"
  );
}

export async function listPosts() {
  const posts = await readAll();
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPost(id) {
  const posts = await readAll();
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(data) {
  const posts = await readAll();
  let id = slugify(data.title || "");
  let suffix = 2;
  while (posts.some((p) => p.id === id)) {
    id = `${slugify(data.title || "")}-${suffix++}`;
  }
  const post = {
    id,
    title: data.title || "",
    tag: data.tag || "News",
    date: data.date || new Date().toISOString().slice(0, 10),
    excerpt: data.excerpt || "",
    body: data.body || "",
    coverImage: data.coverImage || null,
  };
  posts.push(post);
  await writeAll(posts);
  return post;
}

export async function updatePost(id, data) {
  const posts = await readAll();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data, id };
  await writeAll(posts);
  return posts[idx];
}

export async function deletePost(id) {
  const posts = await readAll();
  const next = posts.filter((p) => p.id !== id);
  await writeAll(next);
  return next.length !== posts.length;
}
