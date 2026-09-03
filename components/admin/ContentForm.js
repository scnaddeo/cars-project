"use client";

import { useState } from "react";

const SECTIONS = [
  {
    title: "Homepage — Hero",
    fields: [
      { key: "home_hero_eyebrow", label: "Eyebrow", type: "text" },
      { key: "home_hero_title", label: "Headline", type: "text" },
      { key: "home_hero_lede", label: "Subtext", type: "textarea" },
      { key: "home_stat1_number", label: "Stat 1 — Number", type: "text" },
      { key: "home_stat1_label", label: "Stat 1 — Label", type: "text" },
      { key: "home_stat2_number", label: "Stat 2 — Number", type: "text" },
      { key: "home_stat2_label", label: "Stat 2 — Label", type: "text" },
      { key: "home_stat3_number", label: "Stat 3 — Number", type: "text" },
      { key: "home_stat3_label", label: "Stat 3 — Label", type: "text" },
    ],
  },
  {
    title: "Homepage — The Workshop",
    fields: [
      { key: "home_workshop_title", label: "Headline", type: "text" },
      { key: "home_workshop_body", label: "Body", type: "textarea" },
    ],
  },
  {
    title: "Homepage — Bespoke by Design",
    fields: [
      { key: "home_bespoke_title", label: "Headline", type: "text" },
      { key: "home_bespoke_body1", label: "Body, paragraph 1", type: "textarea" },
      { key: "home_bespoke_body2", label: "Body, paragraph 2", type: "textarea" },
    ],
  },
  {
    title: "Homepage — Contact CTA Banner",
    fields: [
      { key: "home_cta_title", label: "Headline", type: "text" },
      { key: "home_cta_lede", label: "Body", type: "textarea" },
    ],
  },
  {
    title: "About — Hero",
    fields: [
      { key: "about_hero_title", label: "Headline", type: "text" },
      { key: "about_hero_lede", label: "Subtext", type: "textarea" },
    ],
  },
  {
    title: "About — Founders",
    fields: [
      { key: "about_founders_body1", label: "Body, paragraph 1", type: "textarea" },
      { key: "about_founders_body2", label: "Body, paragraph 2", type: "textarea" },
      { key: "about_quote_text", label: "Pull Quote", type: "textarea" },
    ],
  },
  {
    title: "Contact Info",
    fields: [
      { key: "contact_email", label: "Email", type: "text" },
      { key: "contact_phone", label: "Phone", type: "text" },
      { key: "contact_address", label: "Address (2 lines)", type: "textarea" },
      { key: "contact_hours", label: "Hours (2 lines)", type: "textarea" },
    ],
  },
];

export default function ContentForm({ initialContent }) {
  const [values, setValues] = useState(initialContent);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function update(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        setStatus("Could not save. Please try again.");
        return;
      }
      setStatus("Saved — changes are live on the site now.");
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {SECTIONS.map((section) => (
        <div key={section.title} style={{ marginBottom: "2.6rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>{section.title}</h3>
          <div className="form-grid">
            {section.fields.map((field) => (
              <div className="field full" key={field.key}>
                <label htmlFor={field.key}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    value={values[field.key] || ""}
                    onChange={(e) => update(field.key, e.target.value)}
                  />
                ) : (
                  <input
                    id={field.key}
                    type="text"
                    value={values[field.key] || ""}
                    onChange={(e) => update(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button type="submit" className="btn btn--solid" disabled={submitting}>
        {submitting ? "Saving…" : "Save Changes"}
      </button>
      {status && <div className="admin-error" style={{ color: "var(--color-accent)" }}>{status}</div>}
    </form>
  );
}
