import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import LogoutButton from "@/components/admin/LogoutButton";
import CarForm from "@/components/admin/CarForm";

export default async function NewCarPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  return (
    <>
      <div className="admin-bar">
        <div className="container">
          <div className="wordmark">FERRAIO <span>MOTORS</span></div>
          <LogoutButton />
        </div>
      </div>

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
