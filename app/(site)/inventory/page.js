import Link from "next/link";
import CarCard from "@/components/CarCard";
import { listCars } from "@/lib/carStore";

export const metadata = {
  title: "Available Cars",
  description:
    "Browse Ferraio Motors' current lineup of classic car recreations, from Le Mans-bred racers to grand tourers.",
};

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const cars = await listCars();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Available Cars</div>
          <p className="eyebrow">The Current Lineup</p>
          <h1>{cars.length} icons, currently in the workshop.</h1>
          <p className="lede">
            From Le Mans-bred racers to grand tourers, each recreation is hand-built in aluminum,
            true to the original — enquire for current build status and availability on any car
            below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {cars.length === 0 ? (
            <p className="admin-empty">No cars listed yet.</p>
          ) : (
            <div className="car-grid reveal">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} detailsHref="/contact/" detailsLabel="Enquire" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center reveal" style={{ maxWidth: 640 }}>
            <p className="eyebrow">Importing to the US</p>
            <h2>Sorted for the road, ready for the paperwork.</h2>
            <p>
              Every completed car in our collection carries period-correct registration and
              documentation, streamlining the import process for US-based collectors. Our team can
              walk you through logistics from purchase to delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <p className="eyebrow">Interested in a Car?</p>
          <h2>Ask about availability, specification, or import timing.</h2>
          <div className="cta-actions">
            <Link href="/contact/" className="btn btn--solid">Enquire Now</Link>
            <Link href="/about/" className="btn btn--ghost">Learn About Our Process</Link>
          </div>
        </div>
      </section>
    </>
  );
}
