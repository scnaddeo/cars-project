import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import { listPosts } from "@/lib/postStore";
import AdminBar from "@/components/admin/AdminBar";
import DeletePostButton from "@/components/admin/DeletePostButton";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function JournalAdminPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  const posts = await listPosts();

  return (
    <>
      <AdminBar active="journal" />

      <main className="admin-main">
        <div className="container">
          <div className="admin-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "0.3em" }}>Admin</p>
              <h1 style={{ fontSize: "1.8rem", marginBottom: 0 }}>Journal</h1>
            </div>
            <Link href="/admin/journal/new" className="btn btn--solid">
              + New Story
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="admin-empty">No stories yet. Add your first one.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        {post.coverImage ? (
                          <img className="admin-thumb" src={`/api/images/${post.coverImage}`} alt="" />
                        ) : (
                          <div className="admin-thumb" />
                        )}
                      </td>
                      <td>{post.title}</td>
                      <td>{post.tag}</td>
                      <td>{formatDate(post.date)}</td>
                      <td>
                        <div className="admin-row-actions">
                          <Link href={`/admin/journal/${post.id}/edit`} className="btn btn--ghost">
                            Edit
                          </Link>
                          <DeletePostButton id={post.id} label={post.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
