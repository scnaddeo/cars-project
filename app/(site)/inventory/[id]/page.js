import Link from "next/link";
import { notFound } from "next/navigation";
import { getCar } from "@/lib/carStore";
import ImageCarousel from "@/components/ImageCarousel";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) return { title: "Car Not Found" };
  return {
    title: `${car.make} ${car.model}`,
    description: car.description,
  };
}

export default async function CarDetailPage({ params }) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/inventory/">Available Cars</Link> / {car.make} {car.model}
          </div>
          <p className="eyebrow">{car.year} · {car.make}</p>
          <h1>{car.model}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="car-detail">
            <ImageCarousel images={car.images} alt={`${car.make} ${car.model}`} />

            <div>
              <span className="car-badge" style={{ position: "static", display: "inline-block", marginBottom: "1em" }}>
                {car.badge}
              </span>
              <p style={{ fontSize: "1.02rem" }}>{car.description}</p>

              <div className="car-specs" style={{ marginBottom: "1.6em" }}>
                {(car.specs || []).map((spec) => (
                  <span key={spec}>{spec}</span>
                ))}
              </div>

              <div className="car-price" style={{ fontSize: "1.4rem", marginBottom: "1.6em" }}>
                {car.price || "Price on Request"}
              </div>

              <div className="hero-actions">
                <Link href="/contact/" className="btn btn--solid">Enquire About This Car</Link>
                <Link href="/inventory/" className="btn btn--ghost">Back to All Cars</Link>
              </div>
            </div>
          </div>

          {car.videos?.length > 0 && (
            <div className="mt-lg">
              <h3 style={{ marginBottom: "1rem" }}>Video</h3>
              <div className="video-grid">
                {car.videos.map((key) => (
                  <video key={key} className="car-video" src={`/api/videos/${key}`} controls playsInline />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
