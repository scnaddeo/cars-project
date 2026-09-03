"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Something went wrong.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-login">
      <p className="eyebrow">Ferraio Motors</p>
      <h1 style={{ fontSize: "1.8rem" }}>Admin Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="field" style={{ marginTop: "1.5rem" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn--solid mt-lg" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign In"}
        </button>
        {error && <div className="admin-error">{error}</div>}
      </form>
    </div>
  );
}
