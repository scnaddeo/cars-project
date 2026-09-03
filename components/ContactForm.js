"use client";

import { useRef, useState } from "react";

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setSubmitting(true);
    setIsError(false);

    const payload = Object.fromEntries(new FormData(form).entries());

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Something went wrong.");
        }
        setStatus(
          "Thank you — your message has been received. A member of our team will be in touch shortly."
        );
        form.reset();
      })
      .catch((err) => {
        setIsError(true);
        setStatus(err.message || "Sorry — something went wrong sending your message. Please email us directly instead.");
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit}>
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
      <div
        className={`form-status${status ? " is-visible" : ""}`}
        role="status"
        style={isError ? { borderColor: "#b0574a", color: "#e0a25a" } : undefined}
      >
        {status}
      </div>
      <p className="form-note">
        By submitting this form, you agree to be contacted by Ferraio Motors regarding your enquiry.
      </p>
    </form>
  );
}
