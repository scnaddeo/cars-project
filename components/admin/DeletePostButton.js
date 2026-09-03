"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ id, label }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${label}"? This can't be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        window.alert("Could not delete this story. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" className="btn btn--ghost" onClick={handleDelete} disabled={busy}>
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
