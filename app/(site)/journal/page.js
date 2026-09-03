import Link from "next/link";
import PostCard from "@/components/PostCard";
import { BLOG_POSTS } from "@/lib/data";

export const metadata = {
  title: "Journal",
  description: "News, build stories, and heritage features from Ferraio Motors' workshop.",
};

export default function JournalPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Journal</div>
          <p className="eyebrow">The Journal</p>
          <h1>Stories from the workshop.</h1>
          <p className="lede">
            News, build diaries, and the heritage behind the cars we recreate — written from
            inside the workshop.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid reveal">
            {BLOG_POSTS.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>

          <p className="inventory-note reveal">
            Only the featured story links to a full sample article — the rest are placeholder
            entries demonstrating the journal layout.
          </p>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <p className="eyebrow">Stay Informed</p>
          <h2>Follow the workshop&rsquo;s latest builds and news.</h2>
          <div className="cta-actions">
            <Link href="/contact/" className="btn btn--solid">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
