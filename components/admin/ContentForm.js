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
      { key: "home_workshop_image", label: "Photo", type: "image" },
      { key: "home_workshop_caption", label: "Photo caption (shown until a photo is uploaded)", type: "text" },
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

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB — must match app/api/images/route.js

export default function ContentForm({ initialContent }) {
  const [values, setValues] = useState(initialContent);
  const [newImageFiles, setNewImageFiles] = useState({}); // { [fieldKey]: File }
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);

  function update(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleImageFile(key, fileList) {
    const file = fileList?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setError(`${file.name} is larger than ${(MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(1)}MB — please use a smaller photo.`);
      return;
    }
    setError(null);
    setNewImageFiles((prev) => ({ ...prev, [key]: file }));
  }

  function clearImage(key) {
    update(key, null);
    setNewImageFiles((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setError(null);

    try {
      const payload = { ...values };

      const staged = Object.entries(newImageFiles);
      for (let i = 0; i < staged.length; i++) {
        const [key, file] = staged[i];
        setProgress(`Uploading photo ${i + 1} of ${staged.length}…`);
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch("/api/images", { method: "POST", body: formData });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(body.error || "Photo upload failed.");
          setSubmitting(false);
          setProgress(null);
          return;
        }
        payload[key] = body.key;
      }

      setProgress("Saving…");

      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError("Could not save. Please try again.");
        return;
      }
      setValues(payload);
      setNewImageFiles({});
      setStatus("Saved — changes are live on the site now.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setProgress(null);
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
                ) : field.type === "image" ? (
                  <>
                    <label htmlFor={field.key} className="image-drop">
                      Click to choose a photo (JPG, PNG, WEBP, GIF — up to{" "}
                      {(MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(1)}MB)
                    </label>
                    <input
                      id={field.key}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleImageFile(field.key, e.target.files);
                        e.target.value = "";
                      }}
                    />
                    {(values[field.key] || newImageFiles[field.key]) && (
                      <div className="image-preview-grid">
                        <div className="image-preview">
                          <img
                            src={
                              newImageFiles[field.key]
                                ? URL.createObjectURL(newImageFiles[field.key])
                                : `/api/images/${values[field.key]}`
                            }
                            alt=""
                          />
                          <button type="button" onClick={() => clearImage(field.key)} aria-label="Remove photo">
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </>
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
        {submitting ? progress || "Saving…" : "Save Changes"}
      </button>
      {status && <div className="admin-error" style={{ color: "var(--color-accent)" }}>{status}</div>}
      {error && <div className="admin-error">{error}</div>}
    </form>
  );
}
