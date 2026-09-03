import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import AdminBar from "@/components/admin/AdminBar";
import PostForm from "@/components/admin/PostForm";

export default async function NewPostPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  return (
    <>
      <AdminBar active="journal" />

      <main className="admin-main">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="breadcrumb">
            <Link href="/admin/journal">Journal</Link> / New Story
          </div>
          <h1 style={{ fontSize: "1.8rem" }}>New Story</h1>
          <PostForm mode="new" />
        </div>
      </main>
    </>
  );
}
