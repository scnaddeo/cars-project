import Link from "next/link";
import CarCard from "@/components/CarCard";
import PostCard from "@/components/PostCard";
import { BLOG_POSTS } from "@/lib/data";
import { listCars } from "@/lib/carStore";

const featuredPosts = BLOG_POSTS.slice(0, 3);

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cars = await listCars();
  const featuredCars = cars.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Handbuilt · Aluminum-Bodied · Bespoke</p>
          <h1>Own a piece of automotive history, built for you.</h1>
          <p className="lede">
            Ferraio Motors recreates the world&rsquo;s most beautiful and celebrated cars for a new
            generation of enthusiasts — each one hand formed in aluminum, built on original
            components, and finished bespoke to its owner.
          </p>
          <div className="hero-actions">
            <Link href="/inventory/" className="btn btn--solid">View Available Cars</Link>
            <Link href="/about/" className="btn btn--ghost">Our Story</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><b>2</b><span>Founding Brothers</span></div>
            <div className="stat"><b>100%</b><span>Hand Formed Aluminum</span></div>
            <div className="stat"><b>Bespoke</b><span>Every Commission</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">The Workshop</p>
            <h2>A family passion, built by hand.</h2>
            <p>
              Founded by brothers Luciano and Lucas Guitian, Ferraio Motors was born from a family
              of Argentinian racing drivers and a lifelong fascination with the cars they raced.
              What began as a personal pursuit has become an atelier trusted by collectors around
              the world.
            </p>
          </div>
          <div className="grid-3 reveal">
            <div className="feature">
              <span className="num">01</span>
              <h3>Master Craftsmen</h3>
              <p>
                We work exclusively with some of the finest coachbuilders and technicians in the
                world, each contributing decades of hand-forming and fabrication expertise to
                every commission.
              </p>
            </div>
            <div className="feature">
              <span className="num">02</span>
              <h3>Original Components</h3>
              <p>
                Every recreation is built using authentic period components, supplemented — where
                it matters — with discreet modern upgrades to power, handling, and safety.
              </p>
            </div>
            <div className="feature">
              <span className="num">03</span>
              <h3>Sourced Privately</h3>
              <p>
                Our network reaches into private collections around the globe, allowing us to
                locate the rarest donor cars and components long before they ever reach the open
                market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="split reverse">
            <div className="split-media reveal">
              <div className="media-caption">Workshop — final assembly, aluminum body panel fitting</div>
            </div>
            <div className="reveal">
              <p className="eyebrow">Bespoke by Design</p>
              <h2>Every car is built once — for one owner.</h2>
              <p>
                No two commissions leave our workshop the same. From cabin trim to mechanical
                specification, each build is shaped in close collaboration with its owner, so the
                finished car carries their signature as much as its own history.
              </p>
              <p>
                The result is a car that looks, sounds, and drives as it did the day its legend
                began — with the personal touch of the person who commissioned it.
              </p>
              <Link href="/about/" className="btn btn--ghost">Meet the Founders</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center reveal" style={{ maxWidth: 680 }}>
            <p className="eyebrow">The Current Lineup</p>
            <h2>Icons, recreated by hand.</h2>
            <p>
              A look at the cars currently in the workshop — from Le Mans-bred racers to grand
              tourers, each rebuilt in aluminum, true to the original.
            </p>
          </div>

          <div className="car-grid reveal">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} detailsHref="/inventory/" detailsLabel="Details" />
            ))}
          </div>

          <p className="inventory-note reveal">
            Photography still to come — see{" "}
            <Link href="/inventory/" style={{ color: "var(--color-accent)" }}>
              Available Cars
            </Link>{" "}
            for the full current lineup ({cars.length} cars).
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">From the Journal</p>
            <h2>News, builds, and stories from the workshop.</h2>
          </div>
          <div className="blog-grid reveal">
            {featuredPosts.map((post) => (
              <PostCard key={post.title} post={{ ...post, featured: false }} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner" id="contact">
        <div className="container">
          <p className="eyebrow">Start a Commission</p>
          <h2>Tell us the car you&rsquo;ve always wanted.</h2>
          <p className="lede">
            Whether you&rsquo;re commissioning a bespoke build or enquiring about a completed car,
            our team will respond personally within one business day.
          </p>
          <div className="cta-actions">
            <Link href="/contact/" className="btn btn--solid">Get in Touch</Link>
            <Link href="/inventory/" className="btn btn--ghost">View Available Cars</Link>
          </div>
        </div>
      </section>
    </>
  );
}
