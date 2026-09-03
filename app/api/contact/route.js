import { NextResponse } from "next/server";
import { createLead } from "@/lib/leadStore";

export async function POST(request) {
  const data = await request.json().catch(() => null);

  if (!data) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field in.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  await createLead(data);
  return NextResponse.json({ ok: true }, { status: 201 });
}
