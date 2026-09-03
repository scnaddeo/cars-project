import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Meet the founders of Ferraio Motors and learn how a family of Argentinian racing drivers built an atelier for bespoke classic car recreation.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / About</div>
          <p className="eyebrow">Our Story</p>
          <h1>A family of racers, building history by hand.</h1>
          <p className="lede">
            Ferraio Motors exists because two brothers couldn&rsquo;t stop thinking about the cars
            their family raced. What started as a personal obsession is now an atelier trusted by
            collectors around the world.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="split-media">
              <div className="media-caption">Luciano &amp; Lucas Guitian, Founders</div>
            </div>
            <div>
              <p className="eyebrow">The Founders</p>
              <h2>Luciano &amp; Lucas Guitian</h2>
              <p>
                Ferraio Motors was founded by brothers Luciano and Lucas Guitian, whose fascination
                with classic car recreation was inherited rather than learned. They come from a
                family of Argentinian racing drivers, and grew up around the sound, smell, and
                mechanics of the cars their relatives raced.
              </p>
              <p>
                That upbringing became a calling. Rather than simply admire the great cars of
                motorsport history, the brothers set out to make it possible for enthusiasts to
                actually own and drive them — rebuilt by hand, to the same standard that first made
                them legendary.
              </p>
              <div className="quote-block">
                <p>
                  &ldquo;We didn&rsquo;t inherit a business. We inherited a passion for these cars,
                  and we built the business around it.&rdquo;
                </p>
                <cite>Luciano &amp; Lucas Guitian, Founders</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">How We Work</p>
            <h2>Craftsmanship first, in every detail.</h2>
            <p>
              Every car that leaves our workshop reflects the same standard: authentic
              construction, hand craftsmanship, and a finish worthy of the cars that inspired it.
            </p>
          </div>
          <div className="value-list reveal">
            <div className="value-item">
              <span className="index">01</span>
              <div>
                <h3>The Finest Craftsmen in the World</h3>
                <p>
                  We work with a hand-picked network of coachbuilders, fabricators, and trimmers,
                  many of whom have spent their careers on cars of exactly this era. Their
                  expertise is what allows every aluminum body panel to be hand formed, not
                  stamped.
                </p>
              </div>
            </div>
            <div className="value-item">
              <span className="index">02</span>
              <div>
                <h3>Original Components, Thoughtfully Upgraded</h3>
                <p>
                  Wherever possible, our recreations are built using original, period-correct
                  components. Where it matters for everyday usability, we introduce modern
                  upgrades in power delivery, handling, and safety — always without compromising
                  the character of the original.
                </p>
              </div>
            </div>
            <div className="value-item">
              <span className="index">03</span>
              <div>
                <h3>Built Bespoke, for One Owner</h3>
                <p>
                  No two commissions are alike. Each car is built to order in close collaboration
                  with its client, allowing for the personal touches — trim, specification,
                  detailing — that make the finished car unmistakably theirs.
                </p>
              </div>
            </div>
            <div className="value-item">
              <span className="index">04</span>
              <div>
                <h3>A Global Network of Private Collections</h3>
                <p>
                  Some of the rarest classic cars are never publicly listed. Our network gives us
                  access to hard-to-find donor cars and components held privately by collectors
                  around the world, letting us source what others simply cannot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="process-strip reveal">
            <div className="process-step">
              <div className="step-index">01</div>
              <h3>Consultation</h3>
              <p>We start with a conversation about the car, era, and specification you have in mind.</p>
            </div>
            <div className="process-step">
              <div className="step-index">02</div>
              <h3>Sourcing</h3>
              <p>Our network locates the right donor components and original references for the build.</p>
            </div>
            <div className="process-step">
              <div className="step-index">03</div>
              <h3>Hand Build</h3>
              <p>Craftsmen hand-form the aluminum body and assemble the car to your specification.</p>
            </div>
            <div className="process-step">
              <div className="step-index">04</div>
              <h3>Delivery</h3>
              <p>Your finished car is inspected, sorted, and delivered — ready for the road.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <p className="eyebrow">Begin Your Commission</p>
          <h2>Let&rsquo;s build the car you&rsquo;ve always wanted.</h2>
          <div className="cta-actions">
            <Link href="/contact/" className="btn btn--solid">Start a Conversation</Link>
            <Link href="/inventory/" className="btn btn--ghost">View Available Cars</Link>
          </div>
        </div>
      </section>
    </>
  );
}
