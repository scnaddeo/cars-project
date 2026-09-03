import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import { getCar } from "@/lib/carStore";
import LogoutButton from "@/components/admin/LogoutButton";
import CarForm from "@/components/admin/CarForm";

export default async function EditCarPage({ params }) {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

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
            <Link href="/admin/dashboard">Dashboard</Link> / Edit Car
          </div>
          <h1 style={{ fontSize: "1.8rem" }}>
            Edit {car.make} {car.model}
          </h1>
          <CarForm mode="edit" car={car} />
        </div>
      </main>
    </>
  );
}
