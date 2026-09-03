"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const BADGE_OPTIONS = ["Recreation", "In Production", "Completed", "Ready to Import", "Sold"];

function emptySpecs(specs) {
  const s = specs && specs.length ? specs : ["", "", ""];
  return [s[0] || "", s[1] || "", s[2] || ""];
}

export default function CarForm({ mode, car }) {
  const router = useRouter();
  const [make, setMake] = useState(car?.make || "");
  const [model, setModel] = useState(car?.model || "");
  const [year, setYear] = useState(car?.year || "");
  const [badge, setBadge] = useState(car?.badge || "Recreation");
  const [price, setPrice] = useState(car?.price || "Price on Request");
  const [description, setDescription] = useState(car?.description || "");
  const [specs, setSpecs] = useState(emptySpecs(car?.specs));
  const [images, setImages] = useState(car?.images || []); // existing image keys
  const [newFiles, setNewFiles] = useState([]); // File objects staged for upload
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    setNewFiles((prev) => [...prev, ...files]);
  }

  function removeExistingImage(key) {
    setImages((prev) => prev.filter((k) => k !== key));
  }

  function removeNewFile(index) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSpec(index, value) {
    setSpecs((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let uploadedKeys = [];
      if (newFiles.length) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append("images", file));
        const uploadRes = await fetch("/api/images", { method: "POST", body: formData });
        const uploadBody = await uploadRes.json();
        if (!uploadRes.ok) {
          setError(uploadBody.error || "Image upload failed.");
          setSubmitting(false);
          return;
        }
        uploadedKeys = uploadBody.keys;
      }

      const payload = {
        make,
        model,
        year,
        badge,
        price,
        description,
        specs: specs.filter((s) => s.trim() !== ""),
        images: [...images, ...uploadedKeys],
      };

      const url = mode === "edit" ? `/api/cars/${car.id}` : "/api/cars";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Could not save this car.");
        setSubmitting(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="make">Make</label>
          <input id="make" value={make} onChange={(e) => setMake(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="model">Model</label>
          <input id="model" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="year">Year</label>
          <input id="year" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="badge">Status</label>
          <select id="badge" value={badge} onChange={(e) => setBadge(e.target.value)}>
            {BADGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price on Request, or $225,000"
          />
        </div>
        <div className="field full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label>Engine</label>
          <input value={specs[0]} onChange={(e) => updateSpec(0, e.target.value)} placeholder="V8 · 4.5L" />
        </div>
        <div className="field">
          <label>Transmission</label>
          <input value={specs[1]} onChange={(e) => updateSpec(1, e.target.value)} placeholder="5-Speed Manual" />
        </div>
        <div className="field">
          <label>Body</label>
          <input value={specs[2]} onChange={(e) => updateSpec(2, e.target.value)} placeholder="Aluminum Body" />
        </div>
      </div>

      <div className="field mt-lg">
        <label htmlFor="photos">Photos</label>
        <label htmlFor="photos" className="image-drop">
          Click to choose photos (JPG, PNG, WEBP, GIF — up to 6MB each)
        </label>
        <input
          id="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        {(images.length > 0 || newFiles.length > 0) && (
          <div className="image-preview-grid">
            {images.map((key) => (
              <div className="image-preview" key={key}>
                <img src={`/api/images/${key}`} alt="" />
                <button type="button" onClick={() => removeExistingImage(key)} aria-label="Remove photo">
                  ×
                </button>
              </div>
            ))}
            {newFiles.map((file, i) => (
              <div className="image-preview" key={`${file.name}-${i}`}>
                <img src={URL.createObjectURL(file)} alt="" />
                <button type="button" onClick={() => removeNewFile(i)} aria-label="Remove photo">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn--solid mt-lg" disabled={submitting}>
        {submitting ? "Saving…" : mode === "edit" ? "Save Changes" : "Add Car"}
      </button>
      {error && <div className="admin-error">{error}</div>}
    </form>
  );
}
