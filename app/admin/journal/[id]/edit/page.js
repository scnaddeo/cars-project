import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getPost } from "@/lib/postStore";
import AdminBar from "@/components/admin/AdminBar";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({ params }) {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <>
      <AdminBar active="journal" />

      <main className="admin-main">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="breadcrumb">
            <Link href="/admin/journal">Journal</Link> / Edit Story
          </div>
          <h1 style={{ fontSize: "1.8rem" }}>Edit &ldquo;{post.title}&rdquo;</h1>
          <PostForm mode="edit" post={post} />
        </div>
      </main>
    </>
  );
}
