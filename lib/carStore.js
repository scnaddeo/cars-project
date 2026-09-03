import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { SEED_CARS } from "./seedData";

const KEY = "cars.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "cars.json");

// Netlify Blobs is only reachable when running inside a Netlify build/runtime
// (or under `netlify dev`). In plain `next dev`/local builds we fall back to
// a JSON file on disk so the admin panel is fully usable in local dev too.
function useNetlifyBlobs() {
  return process.env.NODE_ENV === "production";
}

async function readLocal() {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeLocal(cars) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(cars, null, 2), "utf8");
}

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("ferraio-cars");
}

async function readAll() {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    const cars = await store.get(KEY, { type: "json" });
    if (cars) return cars;
    await store.setJSON(KEY, SEED_CARS);
    return SEED_CARS;
  }

  const local = await readLocal();
  if (local) return local;
  await writeLocal(SEED_CARS);
  return SEED_CARS;
}

async function writeAll(cars) {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    await store.setJSON(KEY, cars);
    return;
  }
  await writeLocal(cars);
}

export async function listCars() {
  const cars = await readAll();
  return [...cars].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getCar(id) {
  const cars = await readAll();
  return cars.find((c) => c.id === id) || null;
}

export async function createCar(data) {
  const cars = await readAll();
  const id = data.id || randomUUID();
  const car = {
    id,
    make: data.make || "",
    model: data.model || "",
    year: data.year || "",
    badge: data.badge || "Recreation",
    description: data.description || "",
    specs: data.specs || [],
    price: data.price || "Price on Request",
    images: data.images || [],
    videos: data.videos || [],
    order: cars.length,
  };
  cars.push(car);
  await writeAll(cars);
  return car;
}

export async function updateCar(id, data) {
  const cars = await readAll();
  const idx = cars.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  cars[idx] = { ...cars[idx], ...data, id };
  await writeAll(cars);
  return cars[idx];
}

export async function deleteCar(id) {
  const cars = await readAll();
  const next = cars.filter((c) => c.id !== id);
  await writeAll(next);
  return next.length !== cars.length;
}
