"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteLeadButton({ id }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this message?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        window.alert("Could not delete this message. Please try again.");
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
