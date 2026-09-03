import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const KEY = "leads.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "leads.json");

function useNetlifyBlobs() {
  return Boolean(process.env.NETLIFY);
}

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("ferraio-leads");
}

async function readAll() {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    const leads = await store.get(KEY, { type: "json" });
    return leads || [];
  }
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeAll(leads) {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    await store.setJSON(KEY, leads);
    return;
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(leads, null, 2), "utf8");
}

export async function listLeads() {
  const leads = await readAll();
  return [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createLead(data) {
  const leads = await readAll();
  const lead = {
    id: randomUUID(),
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    interest: data.interest || "General Enquiry",
    message: data.message || "",
    createdAt: new Date().toISOString(),
  };
  leads.push(lead);
  await writeAll(leads);
  return lead;
}

export async function deleteLead(id) {
  const leads = await readAll();
  const next = leads.filter((l) => l.id !== id);
  await writeAll(next);
  return next.length !== leads.length;
}
