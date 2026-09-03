import { NextResponse } from "next/server";
import { deleteLead } from "@/lib/leadStore";
import { isAdminRequest } from "@/lib/requireAdmin";

export async function DELETE(request, { params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteLead(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
