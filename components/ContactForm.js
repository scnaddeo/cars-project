"use client";

import { useRef, useState } from "react";

function encodeForm(form) {
  const data = new FormData(form);
  const pairs = [];
  data.forEach((value, key) => {
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
  });
  return pairs.join("&");
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setSubmitting(true);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(form),
    })
      .then(() => {
        setStatus(
          "Thank you — your message has been received. A member of our team will be in touch shortly."
        );
        form.reset();
      })
      .catch(() => {
        setStatus("Sorry — something went wrong sending your message. Please email us directly instead.");
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <form
      ref={formRef}
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="company"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>
          Leave this field empty <input tabIndex={-1} autoComplete="off" name="company" />
        </label>
      </p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className="field">
          <label htmlFor="interest">I&rsquo;m Interested In</label>
          <select id="interest" name="interest" defaultValue="General Enquiry">
            <option>General Enquiry</option>
            <option>Bespoke Commission</option>
            <option>An Available Car</option>
            <option>Press / Media</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Tell us about the car you have in mind..."
          />
        </div>
      </div>
      <button type="submit" className="btn btn--solid mt-lg" disabled={submitting}>
        {submitting ? "Sending…" : "Send Enquiry"}
      </button>
      <div className={`form-status${status ? " is-visible" : ""}`} role="status">
        {status}
      </div>
      <p className="form-note">
        By submitting this form, you agree to be contacted by Ferraio Motors regarding your enquiry.
      </p>
    </form>
  );
}
