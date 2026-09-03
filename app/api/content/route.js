import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/contentStore";
import { isAdminRequest } from "@/lib/requireAdmin";

export async function GET() {
  const content = await getContent();
  return NextResponse.json({ content });
}

export async function PUT(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  const content = await updateContent(data);
  return NextResponse.json({ content });
}
