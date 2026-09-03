import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Ferraio Motors about a bespoke commission, an available car, or a general enquiry.",
};

export default function ContactPage() {
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
                  <div className="value"><a href="mailto:info@ferraiomotors.com">info@ferraiomotors.com</a></div>
                </div>
                <div className="info-item">
                  <div className="label">Phone</div>
                  <div className="value"><a href="tel:+10000000000">+1 (000) 000-0000</a></div>
                </div>
                <div className="info-item">
                  <div className="label">Workshop</div>
                  <div className="value">Address Line 1<br />City, State, ZIP</div>
                </div>
                <div className="info-item">
                  <div className="label">Hours</div>
                  <div
                    className="value"
                    style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-text-dim)" }}
                  >
                    Monday – Friday, 9:00 – 18:00<br />By appointment on weekends
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
