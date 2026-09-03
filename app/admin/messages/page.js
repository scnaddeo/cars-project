import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/requireAdmin";
import { listLeads } from "@/lib/leadStore";
import AdminBar from "@/components/admin/AdminBar";
import DeleteLeadButton from "@/components/admin/DeleteLeadButton";

export default async function MessagesPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  const leads = await listLeads();

  return (
    <>
      <AdminBar active="messages" />

      <main className="admin-main">
        <div className="container">
          <div className="admin-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "0.3em" }}>Admin</p>
              <h1 style={{ fontSize: "1.8rem", marginBottom: 0 }}>Messages</h1>
            </div>
          </div>

          {leads.length === 0 ? (
            <p className="admin-empty">No enquiries yet — they&rsquo;ll show up here as visitors submit the contact form.</p>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {leads.map((lead) => (
                <div key={lead.id} className="car-card" style={{ padding: "1.4rem 1.6rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <h3 style={{ marginBottom: "0.2em" }}>{lead.name}</h3>
                      <div className="car-year" style={{ marginBottom: "0.6em" }}>
                        {lead.interest} · {new Date(lead.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <DeleteLeadButton id={lead.id} />
                  </div>
                  <p style={{ marginBottom: "0.6em" }}>{lead.message}</p>
                  <div className="car-specs" style={{ borderTop: "none", paddingTop: 0 }}>
                    <span><a href={`mailto:${lead.email}`} style={{ color: "var(--color-accent)" }}>{lead.email}</a></span>
                    {lead.phone && <span>{lead.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
