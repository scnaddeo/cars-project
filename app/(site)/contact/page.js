import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { getContent } from "@/lib/contentStore";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Ferraio Motors about a bespoke commission, an available car, or a general enquiry.",
};

export const dynamic = "force-dynamic";

function Multiline({ text }) {
  const lines = (text || "").split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

export default async function ContactPage() {
  const c = await getContent();
  const telHref = `tel:+${(c.contact_phone || "").replace(/\D/g, "")}`;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Contact</div>
          <p className="eyebrow">Get in Touch</p>
          <h1>Let&rsquo;s talk about your car.</h1>
          <p className="lede">
            Whether you&rsquo;re commissioning a bespoke build, enquiring about a completed car, or
            simply have a question, our team responds personally within one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="reveal">
              <ContactForm />
            </div>

            <div className="reveal">
              <div className="info-list">
                <div className="info-item">
                  <div className="label">Email</div>
                  <div className="value"><a href={`mailto:${c.contact_email}`}>{c.contact_email}</a></div>
                </div>
                <div className="info-item">
                  <div className="label">Phone</div>
                  <div className="value"><a href={telHref}>{c.contact_phone}</a></div>
                </div>
                <div className="info-item">
                  <div className="label">Workshop</div>
                  <div className="value"><Multiline text={c.contact_address} /></div>
                </div>
                <div className="info-item">
                  <div className="label">Hours</div>
                  <div
                    className="value"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-text-dim)" }}
                  >
                    <Multiline text={c.contact_hours} />
                  </div>
                </div>
              </div>
              <div className="map-block mt-lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
