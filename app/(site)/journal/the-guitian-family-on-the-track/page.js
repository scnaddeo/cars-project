import Link from "next/link";

export const metadata = {
  title: "The Guitian Family on the Track — Journal",
  description:
    "How three generations of Argentinian racing shaped the way Ferraio Motors builds cars today.",
};

export default function ArticlePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/journal/">Journal</Link> / The Guitian Family
            on the Track
          </div>
          <p className="eyebrow">Heritage · March 2026</p>
          <h1>The Guitian Family on the Track</h1>
          <p className="lede">
            How three generations of Argentinian racing shaped the way Ferraio Motors builds cars
            today.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-media reveal" style={{ aspectRatio: "21/9", marginBottom: "3rem" }}>
            <div className="media-caption">Family archive — circuit racing, Argentina</div>
          </div>

          <div className="article-body reveal">
            <p>
              Long before Ferraio Motors existed as a workshop, it existed as a way of life.
              Luciano and Lucas Guitian grew up in a family with racing in its blood — relatives
              who spent their weekends on Argentinian circuits, chasing the same cars that would
              later define an era of motorsport.
            </p>

            <p>
              &ldquo;We didn&rsquo;t grow up dreaming about these cars from the outside,&rdquo;
              Lucas recalls. &ldquo;We grew up around the noise of them, the smell of them, the
              work of keeping them running. That&rsquo;s a very different relationship to a car
              than just admiring a photograph.&rdquo;
            </p>

            <h2>A Trade Passed Down, Not Taught</h2>
            <p>
              Neither brother can point to a single moment they decided to build cars for a
              living. It was less a decision than an inheritance — the kind of knowledge absorbed
              by spending enough weekends in a garage, watching engines come apart and go back
              together.
            </p>

            <div className="quote-block">
              <p>
                &ldquo;We didn&rsquo;t inherit a business. We inherited a passion for these cars,
                and we built the business around it.&rdquo;
              </p>
              <cite>Luciano &amp; Lucas Guitian, Founders</cite>
            </div>

            <h2>From the Track to the Workshop</h2>
            <p>
              That early exposure to competition cars — their construction, their compromises, the
              way they were built to be used rather than simply displayed — still shapes every
              commission that leaves the workshop today. It&rsquo;s why original components matter
              so much to the brothers, and why every recreation is built to be driven, not just
              admired.
            </p>

            <p>
              It&rsquo;s also why the brothers place such weight on craftsmanship. Growing up
              around racing means growing up around people who could fabricate a part by hand when
              nothing else was available — a skill that has become central to how Ferraio Motors
              builds every car.
            </p>

            <h2>Continuing the Line</h2>
            <p>
              Today, that same family instinct drives the search for rare donor cars and
              components, the insistence on hand-formed aluminum bodywork, and the bespoke
              approach that lets every client shape their own car. It&rsquo;s a family history
              that, one commission at a time, keeps being written.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <p className="eyebrow">Read More</p>
          <h2>More stories from the workshop.</h2>
          <div className="cta-actions">
            <Link href="/journal/" className="btn btn--solid">Back to the Journal</Link>
            <Link href="/contact/" className="btn btn--ghost">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
