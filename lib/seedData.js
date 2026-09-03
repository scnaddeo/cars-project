// Initial car lineup — used to seed the car store the first time it's read.
// Once the admin panel saves any change, this file is no longer the source
// of truth; live data lives in the store (see lib/carStore.js).
export const SEED_CARS = [
  {
    id: "maserati-450s",
    year: "1957",
    make: "Maserati",
    model: "450S",
    badge: "Recreation",
    description:
      "V8 endurance racer recreated with period-correct aluminum bodywork and full competition specification.",
    specs: ["V8 · 4.5L", "5-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "aston-martin-db2",
    year: "1951",
    make: "Aston Martin",
    model: "DB2",
    badge: "Recreation",
    description:
      "The gentleman's grand tourer, hand-built with the cabin detail and long-distance comfort of the original.",
    specs: ["Inline-6 · 2.6L", "4-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "ferrari-335-vignale",
    year: "1957",
    make: "Ferrari",
    model: "335 Vignale",
    badge: "Recreation",
    description:
      "A Vignale-bodied V12 recreation, built for the sound and stance of Maranello's golden era.",
    specs: ["V12 · 4.0L", "4-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "cobra-427",
    year: "1966",
    make: "Shelby",
    model: "Cobra 427",
    badge: "Recreation",
    description:
      "Big-block American muscle wrapped in hand-formed aluminum, built for serious performance.",
    specs: ["V8 · 7.0L", "4-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "mercedes-300slr-roadster",
    year: "1955",
    make: "Mercedes-Benz",
    model: "300 SLR Roadster",
    badge: "Recreation",
    description:
      "The open-top sibling to one of racing's most legendary machines, recreated true to its original engineering.",
    specs: ["Inline-8 · 3.0L", "5-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "mercedes-300slr-uhlenhaut-coupe",
    year: "1955",
    make: "Mercedes-Benz",
    model: "300 SLR Uhlenhaut Coupé",
    badge: "Recreation",
    description:
      "One of the rarest closed-cockpit racers ever built, recreated as a tribute to Rudolf Uhlenhaut's masterpiece.",
    specs: ["Inline-8 · 3.0L", "5-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "alfa-romeo-giulia-tz",
    year: "1964",
    make: "Alfa Romeo",
    model: "Giulia TZ",
    badge: "Recreation",
    description:
      "Lightweight, Zagato-inspired coachwork wrapped around a giant-killing four-cylinder heart.",
    specs: ["Inline-4 · 1.6L", "5-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "maserati-a6gcs-monofaro",
    year: "1953",
    make: "Maserati",
    model: "A6GCS Monofaro",
    badge: "Recreation",
    description:
      "The single-headlight variant of Maserati's celebrated sports racer, built true to its competition roots.",
    specs: ["Inline-6 · 2.0L", "4-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
  {
    id: "corvette-ss",
    year: "1957",
    make: "Chevrolet",
    model: "Corvette SS",
    badge: "Recreation",
    description:
      "America's answer to the European sports racers, recreated from its one-off 1957 racing form.",
    specs: ["V8 · 4.3L", "4-Speed Manual", "Aluminum Body"],
    price: "Price on Request",
    images: [],
  },
];

// Initial journal post — used to seed the post store the first time it's
// read, so the Journal isn't empty before the admin adds real stories.
// Body text uses a lightweight convention: blank lines separate
// paragraphs, "## " starts a subheading, and "> " starts a pull quote
// (an immediately following line starting with "— " becomes its citation).
export const SEED_POSTS = [
  {
    id: "the-guitian-family-on-the-track",
    title: "The Guitian Family on the Track",
    tag: "Heritage",
    date: "2026-03-01",
    excerpt:
      "Long before the workshop existed, the Guitian name was known on Argentinian racetracks. We trace the family history that shaped how — and why — we build cars today.",
    coverImage: null,
    body: `Long before Ferraio Motors existed as a workshop, it existed as a way of life. Luciano and Lucas Guitian grew up in a family with racing in its blood — relatives who spent their weekends on Argentinian circuits, chasing the same cars that would later define an era of motorsport.

"We didn't grow up dreaming about these cars from the outside," Lucas recalls. "We grew up around the noise of them, the smell of them, the work of keeping them running. That's a very different relationship to a car than just admiring a photograph."

## A Trade Passed Down, Not Taught

Neither brother can point to a single moment they decided to build cars for a living. It was less a decision than an inheritance — the kind of knowledge absorbed by spending enough weekends in a garage, watching engines come apart and go back together.

> We didn't inherit a business. We inherited a passion for these cars, and we built the business around it.
— Luciano & Lucas Guitian, Founders

## From the Track to the Workshop

That early exposure to competition cars — their construction, their compromises, the way they were built to be used rather than simply displayed — still shapes every commission that leaves the workshop today. It's why original components matter so much to the brothers, and why every recreation is built to be driven, not just admired.

It's also why the brothers place such weight on craftsmanship. Growing up around racing means growing up around people who could fabricate a part by hand when nothing else was available — a skill that has become central to how Ferraio Motors builds every car.

## Continuing the Line

Today, that same family instinct drives the search for rare donor cars and components, the insistence on hand-formed aluminum bodywork, and the bespoke approach that lets every client shape their own car. It's a family history that, one commission at a time, keeps being written.`,
  },
];
