import Link from "next/link";
import LogoutButton from "./LogoutButton";

const LINKS = [
  { key: "cars", href: "/admin/dashboard", label: "Cars" },
  { key: "journal", href: "/admin/journal", label: "Journal" },
  { key: "messages", href: "/admin/messages", label: "Messages" },
  { key: "content", href: "/admin/content", label: "Content" },
];

export default function AdminBar({ active }) {
  return (
    <div className="admin-bar">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div className="wordmark">FERRAIO <span>MOTORS</span></div>
          <nav style={{ display: "flex", gap: 18 }}>
            {LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={active === link.key ? "is-active" : undefined}
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active === link.key ? "var(--color-text)" : "var(--color-text-dim)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
