import { NextResponse } from "next/server";
import { getCar, updateCar, deleteCar } from "@/lib/carStore";
import { deleteImage } from "@/lib/imageStore";
import { isAdminRequest } from "@/lib/requireAdmin";

export async function GET(request, { params }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ car });
}

export async function PUT(request, { params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const data = await request.json();
  const car = await updateCar(id, data);
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ car });
}

export async function DELETE(request, { params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const car = await getCar(id);
  if (car?.images?.length) {
    await Promise.all(car.images.map((key) => deleteImage(key)));
  }
  const ok = await deleteCar(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
