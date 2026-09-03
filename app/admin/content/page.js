import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getContent } from "@/lib/contentStore";
import AdminBar from "@/components/admin/AdminBar";
import ContentForm from "@/components/admin/ContentForm";

export default async function ContentPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  const content = await getContent();

  return (
    <>
      <AdminBar active="content" />

      <main className="admin-main">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="admin-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "0.3em" }}>Admin</p>
              <h1 style={{ fontSize: "1.8rem", marginBottom: 0 }}>Site Content</h1>
            </div>
          </div>
          <p style={{ color: "var(--color-text-faint)", fontSize: "0.85rem", marginBottom: "2rem" }}>
            Edit the text shown on the Home, About, and Contact pages. Changes go live as soon as
            you save — no redeploy needed.
          </p>
          <ContentForm initialContent={content} />
        </div>
      </main>
    </>
  );
}
