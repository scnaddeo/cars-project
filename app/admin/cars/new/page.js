import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import AdminBar from "@/components/admin/AdminBar";
import CarForm from "@/components/admin/CarForm";

export default async function NewCarPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  return (
    <>
      <AdminBar active="cars" />

      <main className="admin-main">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="breadcrumb">
            <Link href="/admin/dashboard">Dashboard</Link> / Add Car
          </div>
          <h1 style={{ fontSize: "1.8rem" }}>Add a Car</h1>
          <CarForm mode="new" />
        </div>
      </main>
    </>
  );
}
