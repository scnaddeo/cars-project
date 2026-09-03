import { NextResponse } from "next/server";
import { listPosts, createPost } from "@/lib/postStore";
import { isAdminRequest } from "@/lib/requireAdmin";

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  if (!data.title?.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  const post = await createPost(data);
  return NextResponse.json({ post }, { status: 201 });
}
