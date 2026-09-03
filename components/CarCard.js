import Link from "next/link";

export default function CarCard({ car }) {
  const cover = car.images?.[0];
  const href = `/inventory/${car.id}/`;

  return (
    <article className="car-card">
      <Link href={href} className="car-media">
        {cover && <img src={`/api/images/${cover}`} alt={`${car.make} ${car.model}`} />}
        <span className="car-badge">{car.badge}</span>
        {car.images?.length > 1 && (
          <span className="car-badge" style={{ left: "auto", right: 14 }}>
            {car.images.length} Photos
          </span>
        )}
      </Link>
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
          <Link href={href} className="btn btn--ghost">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
