"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const BADGE_OPTIONS = ["Recreation", "In Production", "Completed", "Ready to Import", "Sold"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB — must match app/api/images/route.js
const MAX_VIDEO_BYTES = 4 * 1024 * 1024; // 4MB — must match app/api/videos/route.js

function emptySpecs(specs) {
  const s = specs && specs.length ? specs : ["", "", ""];
  return [s[0] || "", s[1] || "", s[2] || ""];
}

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

// Car cards, the gallery, and thumbnails are all landscape boxes that crop
// with object-fit: cover — a portrait photo gets cropped down to a thin
// vertical sliver instead of showing the car. Reading dimensions client-side
// lets us catch this before upload instead of after the card looks broken.
function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read ${file.name} as an image.`));
    };
    img.src = url;
  });
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
  const [newImageFiles, setNewImageFiles] = useState([]); // File objects staged for upload
  const [videos, setVideos] = useState(car?.videos || []); // existing video keys
  const [newVideoFiles, setNewVideoFiles] = useState([]); // File objects staged for upload
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);

  async function handleImageFiles(fileList) {
    const files = Array.from(fileList || []);

    const oversized = files.find((f) => f.size > MAX_IMAGE_BYTES);
    if (oversized) {
      setError(`${oversized.name} is larger than ${formatMB(MAX_IMAGE_BYTES)}MB — please use a smaller photo.`);
      return;
    }

    try {
      for (const file of files) {
        const { width, height } = await getImageDimensions(file);
        if (height > width) {
          setError(
            `${file.name} is a portrait photo (${width}×${height}). Car cards are wide, landscape boxes — a ` +
              `portrait photo gets cropped down to a sliver of the car. Please upload a landscape photo instead ` +
              `(width greater than height).`
          );
          return;
        }
      }
    } catch (err) {
      setError(err.message || "Could not read one of the selected photos.");
      return;
    }

    setError(null);
    setNewImageFiles((prev) => [...prev, ...files]);
  }

  function handleVideoFiles(fileList) {
    const files = Array.from(fileList || []);
    const oversized = files.find((f) => f.size > MAX_VIDEO_BYTES);
    if (oversized) {
      setError(
        `${oversized.name} is larger than ${formatMB(MAX_VIDEO_BYTES)}MB — trim the clip or lower the export quality.`
      );
      return;
    }
    setError(null);
    setNewVideoFiles((prev) => [...prev, ...files]);
  }

  function removeExistingImage(key) {
    setImages((prev) => prev.filter((k) => k !== key));
  }
  function removeNewImageFile(index) {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  }
  function removeExistingVideo(key) {
    setVideos((prev) => prev.filter((k) => k !== key));
  }
  function removeNewVideoFile(index) {
    setNewVideoFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSpec(index, value) {
    setSpecs((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  // Uploads one file per request (not batched) so a single multipart body
  // never risks exceeding Netlify's ~6MB function payload limit, regardless
  // of how many files are staged.
  async function uploadOneByOne(files, endpoint, fieldName, onProgress) {
    const keys = [];
    for (let i = 0; i < files.length; i++) {
      onProgress?.(i + 1, files.length);
      const formData = new FormData();
      formData.append(fieldName, files[i]);
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || `Upload failed for ${files[i].name}`);
      }
      keys.push(body.key);
    }
    return keys;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setProgress(null);

    try {
      let uploadedImageKeys = [];
      if (newImageFiles.length) {
        uploadedImageKeys = await uploadOneByOne(newImageFiles, "/api/images", "image", (done, total) =>
          setProgress(`Uploading photo ${done} of ${total}…`)
        );
      }

      let uploadedVideoKeys = [];
      if (newVideoFiles.length) {
        uploadedVideoKeys = await uploadOneByOne(newVideoFiles, "/api/videos", "video", (done, total) =>
          setProgress(`Uploading video ${done} of ${total}…`)
        );
      }

      setProgress("Saving…");

      const payload = {
        make,
        model,
        year,
        badge,
        price,
        description,
        specs: specs.filter((s) => s.trim() !== ""),
        images: [...images, ...uploadedImageKeys],
        videos: [...videos, ...uploadedVideoKeys],
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
        setProgress(null);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
      setProgress(null);
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
          Click to choose photos (JPG, PNG, WEBP, GIF — up to {formatMB(MAX_IMAGE_BYTES)}MB each)
        </label>
        <input
          id="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            handleImageFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {(images.length > 0 || newImageFiles.length > 0) && (
          <div className="image-preview-grid">
            {images.map((key) => (
              <div className="image-preview" key={key}>
                <img src={`/api/images/${key}`} alt="" />
                <button type="button" onClick={() => removeExistingImage(key)} aria-label="Remove photo">
                  ×
                </button>
              </div>
            ))}
            {newImageFiles.map((file, i) => (
              <div className="image-preview" key={`${file.name}-${i}`}>
                <img src={URL.createObjectURL(file)} alt="" />
                <button type="button" onClick={() => removeNewImageFile(i)} aria-label="Remove photo">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="field mt-lg">
        <label htmlFor="videos">Videos</label>
        <label htmlFor="videos" className="image-drop">
          Click to choose short video clips (MP4, WebM, MOV — up to {formatMB(MAX_VIDEO_BYTES)}MB each,
          roughly a few seconds at compressed quality)
        </label>
        <input
          id="videos"
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            handleVideoFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {(videos.length > 0 || newVideoFiles.length > 0) && (
          <div className="image-preview-grid">
            {videos.map((key) => (
              <div className="image-preview" key={key}>
                <video src={`/api/videos/${key}`} muted />
                <button type="button" onClick={() => removeExistingVideo(key)} aria-label="Remove video">
                  ×
                </button>
              </div>
            ))}
            {newVideoFiles.map((file, i) => (
              <div className="image-preview" key={`${file.name}-${i}`}>
                <video src={URL.createObjectURL(file)} muted />
                <button type="button" onClick={() => removeNewVideoFile(i)} aria-label="Remove video">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn--solid mt-lg" disabled={submitting}>
        {submitting ? progress || "Saving…" : mode === "edit" ? "Save Changes" : "Add Car"}
      </button>
      {error && <div className="admin-error">{error}</div>}
    </form>
  );
}
