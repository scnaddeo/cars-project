import { NextResponse } from "next/server";
import { listCars, createCar } from "@/lib/carStore";
import { isAdminRequest } from "@/lib/requireAdmin";

export async function GET() {
  const cars = await listCars();
  return NextResponse.json({ cars });
}

export async function POST(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  const car = await createCar(data);
  return NextResponse.json({ car }, { status: 201 });
}
