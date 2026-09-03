import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminBar({ active }) {
  return (
    <div className="admin-bar">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div className="wordmark">FERRAIO <span>MOTORS</span></div>
          <nav style={{ display: "flex", gap: 18 }}>
            <Link
              href="/admin/dashboard"
              className={active === "cars" ? "is-active" : undefined}
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active === "cars" ? "var(--color-text)" : "var(--color-text-dim)",
              }}
            >
              Cars
            </Link>
            <Link
              href="/admin/messages"
              className={active === "messages" ? "is-active" : undefined}
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active === "messages" ? "var(--color-text)" : "var(--color-text-dim)",
              }}
            >
              Messages
            </Link>
          </nav>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
