import fs from "node:fs/promises";
import path from "node:path";

const KEY = "content.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "content.json");

// The editable text blocks on the public site. Whatever isn't customized
// yet falls back to these defaults, so the site always renders correctly
// even before anyone touches the admin Content page.
export const DEFAULT_CONTENT = {
  home_hero_eyebrow: "Handbuilt · Aluminum-Bodied · Bespoke",
  home_hero_title: "Own a piece of automotive history, built for you.",
  home_hero_lede:
    "Ferraio Motors recreates the world's most beautiful and celebrated cars for a new generation of enthusiasts — each one hand formed in aluminum, built on original components, and finished bespoke to its owner.",
  home_stat1_number: "2",
  home_stat1_label: "Founding Brothers",
  home_stat2_number: "100%",
  home_stat2_label: "Hand Formed Aluminum",
  home_stat3_number: "Bespoke",
  home_stat3_label: "Every Commission",
  home_workshop_title: "A family passion, built by hand.",
  home_workshop_body:
    "Founded by brothers Luciano and Lucas Guitian, Ferraio Motors was born from a family of Argentinian racing drivers and a lifelong fascination with the cars they raced. What began as a personal pursuit has become an atelier trusted by collectors around the world.",
  home_bespoke_title: "Every car is built once — for one owner.",
  home_bespoke_body1:
    "No two commissions leave our workshop the same. From cabin trim to mechanical specification, each build is shaped in close collaboration with its owner, so the finished car carries their signature as much as its own history.",
  home_bespoke_body2:
    "The result is a car that looks, sounds, and drives as it did the day its legend began — with the personal touch of the person who commissioned it.",
  home_cta_title: "Tell us the car you've always wanted.",
  home_cta_lede:
    "Whether you're commissioning a bespoke build or enquiring about a completed car, our team will respond personally within one business day.",

  about_hero_title: "A family of racers, building history by hand.",
  about_hero_lede:
    "Ferraio Motors exists because two brothers couldn't stop thinking about the cars their family raced. What started as a personal obsession is now an atelier trusted by collectors around the world.",
  about_founders_body1:
    "Ferraio Motors was founded by brothers Luciano and Lucas Guitian, whose fascination with classic car recreation was inherited rather than learned. They come from a family of Argentinian racing drivers, and grew up around the sound, smell, and mechanics of the cars their relatives raced.",
  about_founders_body2:
    "That upbringing became a calling. Rather than simply admire the great cars of motorsport history, the brothers set out to make it possible for enthusiasts to actually own and drive them — rebuilt by hand, to the same standard that first made them legendary.",
  about_quote_text:
    "We didn't inherit a business. We inherited a passion for these cars, and we built the business around it.",

  contact_email: "info@ferraiomotors.com",
  contact_phone: "+1 (000) 000-0000",
  contact_address: "Address Line 1\nCity, State, ZIP",
  contact_hours: "Monday – Friday, 9:00 – 18:00\nBy appointment on weekends",
};

function useNetlifyBlobs() {
  return process.env.NODE_ENV === "production";
}

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore("ferraio-content");
}

async function readOverrides() {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    const content = await store.get(KEY, { type: "json" });
    return content || {};
  }
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeOverrides(overrides) {
  if (useNetlifyBlobs()) {
    const store = await getBlobStore();
    await store.setJSON(KEY, overrides);
    return;
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(overrides, null, 2), "utf8");
}

export async function getContent() {
  const overrides = await readOverrides();
  return { ...DEFAULT_CONTENT, ...overrides };
}

export async function updateContent(partial) {
  const overrides = await readOverrides();
  const next = { ...overrides, ...partial };
  await writeOverrides(next);
  return { ...DEFAULT_CONTENT, ...next };
}
