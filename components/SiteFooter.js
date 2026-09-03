import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="wordmark" style={{ marginBottom: "1em" }}>
              FERRAIO <span>MOTORS</span>
            </div>
            <p>
              Bespoke aluminum-bodied recreations of the world&rsquo;s most celebrated classic cars,
              hand built by master craftsmen and finished to each owner&rsquo;s exact specification.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link href="/about/">About Us</Link></li>
              <li><Link href="/inventory/">Available Cars</Link></li>
              <li><Link href="/journal/">Journal</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Enquiries</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@ferraiomotors.com">info@ferraiomotors.com</a></li>
              <li><a href="tel:+10000000000">+1 (000) 000-0000</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <div className="social-row">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M10 9.5l5 2.5-5 2.5z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7 10v6M7 7v.01M12 16v-3.5c0-1.5 1-2.5 2.3-2.5S17 11 17 12.5V16M12 16v-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ferraio Motors. All rights reserved.</span>
          <span>Placeholder content — replace imagery and inventory status before launch.</span>
        </div>
      </div>
    </footer>
  );
}
