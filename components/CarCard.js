import Link from "next/link";

export default function CarCard({ car, detailsHref = "/inventory/", detailsLabel = "Enquire" }) {
  const cover = car.images?.[0];

  return (
    <article className="car-card">
      <div className="car-media">
        {cover && <img src={`/api/images/${cover}`} alt={`${car.make} ${car.model}`} />}
        <span className="car-badge">{car.badge}</span>
      </div>
      <div className="car-body">
        <div className="car-year">
          {car.year} · {car.make}
        </div>
        <h3>{car.model}</h3>
        <p>{car.description}</p>
        <div className="car-specs">
          {(car.specs || []).map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
        <div className="car-footer">
          <span className="car-price">{car.price || "Price on Request"}</span>
          <Link href={detailsHref} className="btn btn--ghost">
            {detailsLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
