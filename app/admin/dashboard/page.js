import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminRequest } from "@/lib/requireAdmin";
import { listCars } from "@/lib/carStore";
import LogoutButton from "@/components/admin/LogoutButton";
import DeleteCarButton from "@/components/admin/DeleteCarButton";

export default async function DashboardPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin");
  }

  const cars = await listCars();

  return (
    <>
      <div className="admin-bar">
        <div className="container">
          <div className="wordmark">FERRAIO <span>MOTORS</span></div>
          <LogoutButton />
        </div>
      </div>

      <main className="admin-main">
        <div className="container">
          <div className="admin-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: "0.3em" }}>Admin</p>
              <h1 style={{ fontSize: "1.8rem", marginBottom: 0 }}>Cars</h1>
            </div>
            <Link href="/admin/cars/new" className="btn btn--solid">
              + Add Car
            </Link>
          </div>

          {cars.length === 0 ? (
            <p className="admin-empty">No cars yet. Add your first one.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Car</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Photos</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td>
                        {car.images?.[0] ? (
                          <img className="admin-thumb" src={`/api/images/${car.images[0]}`} alt="" />
                        ) : (
                          <div className="admin-thumb" />
                        )}
                      </td>
                      <td>{car.make} {car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.badge}</td>
                      <td>{car.price}</td>
                      <td>{car.images?.length || 0}</td>
                      <td>
                        <div className="admin-row-actions">
                          <Link href={`/admin/cars/${car.id}/edit`} className="btn btn--ghost">
                            Edit
                          </Link>
                          <DeleteCarButton id={car.id} label={`${car.make} ${car.model}`} />
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
