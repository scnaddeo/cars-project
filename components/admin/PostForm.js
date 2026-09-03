"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB — must match app/api/images/route.js

function formatMB(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

// Journal cards are landscape boxes cropped with object-fit: cover — a
// portrait cover photo gets cropped down to a sliver instead of showing
// the photo, so catch it before upload rather than after the card looks broken.
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

export default function PostForm({ mode, post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || "");
  const [tag, setTag] = useState(post?.tag || "News");
  const [date, setDate] = useState(post?.date || new Date().toISOString().slice(0, 10));
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [body, setBody] = useState(post?.body || "");
  const [coverImage, setCoverImage] = useState(post?.coverImage || null);
  const [newCoverFile, setNewCoverFile] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);

  async function handleCoverFile(fileList) {
    const file = fileList?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setError(`${file.name} is larger than ${formatMB(MAX_IMAGE_BYTES)}MB — please use a smaller photo.`);
      return;
    }

    try {
      const { width, height } = await getImageDimensions(file);
      if (height > width) {
        setError(
          `${file.name} is a portrait photo (${width}×${height}). Journal cards are wide, landscape boxes — a ` +
            `portrait photo gets cropped down to a sliver. Please upload a landscape photo instead (width ` +
            `greater than height).`
        );
        return;
      }
    } catch (err) {
      setError(err.message || "Could not read this photo.");
      return;
    }

    setError(null);
    setNewCoverFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setProgress(null);

    try {
      let finalCoverImage = coverImage;
      if (newCoverFile) {
        setProgress("Uploading cover photo…");
        const formData = new FormData();
        formData.append("image", newCoverFile);
        const res = await fetch("/api/images", { method: "POST", body: formData });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(body.error || "Cover photo upload failed.");
          setSubmitting(false);
          setProgress(null);
          return;
        }
        finalCoverImage = body.key;
      }

      setProgress("Saving…");

      const payload = { title, tag, date, excerpt, body: body, coverImage: finalCoverImage };
      const url = mode === "edit" ? `/api/posts/${post.id}` : "/api/posts";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const resBody = await res.json().catch(() => ({}));
        setError(resBody.error || "Could not save this story.");
        setSubmitting(false);
        setProgress(null);
        return;
      }

      router.push("/admin/journal");
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
        <div className="field full">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="tag">Category</label>
          <input id="tag" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Heritage, Builds, News…" />
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field full">
          <label htmlFor="excerpt">Excerpt (shown on the Journal listing card)</label>
          <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required />
        </div>
        <div className="field full">
          <label htmlFor="body">Story</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ minHeight: 260 }}
            placeholder={
              "Write in plain paragraphs, separated by a blank line.\n\nStart a line with \"## \" for a subheading.\n\nStart a line with \"> \" for a pull quote, and put \"— Name\" on the next line for a citation."
            }
            required
          />
        </div>
      </div>

      <div className="field mt-lg">
        <label htmlFor="cover">Cover Photo</label>
        <label htmlFor="cover" className="image-drop">
          Click to choose a cover photo (JPG, PNG, WEBP, GIF — up to {formatMB(MAX_IMAGE_BYTES)}MB)
        </label>
        <input
          id="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: "none" }}
          onChange={(e) => {
            handleCoverFile(e.target.files);
            e.target.value = "";
          }}
        />

        {(coverImage || newCoverFile) && (
          <div className="image-preview-grid">
            <div className="image-preview">
              <img src={newCoverFile ? URL.createObjectURL(newCoverFile) : `/api/images/${coverImage}`} alt="" />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setNewCoverFile(null);
                }}
                aria-label="Remove cover photo"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn--solid mt-lg" disabled={submitting}>
        {submitting ? progress || "Saving…" : mode === "edit" ? "Save Changes" : "Publish Story"}
      </button>
      {error && <div className="admin-error">{error}</div>}
    </form>
  );
}
