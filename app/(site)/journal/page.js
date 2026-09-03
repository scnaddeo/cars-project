import Link from "next/link";
import PostCard from "@/components/PostCard";
import { listPosts } from "@/lib/postStore";

export const metadata = {
  title: "Journal",
  description: "News, build stories, and heritage features from Ferraio Motors' workshop.",
};

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await listPosts();
  const [featured, ...rest] = posts;

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
          {posts.length === 0 ? (
            <p className="admin-empty">No stories yet.</p>
          ) : (
            <div className="blog-grid reveal">
              <PostCard post={featured} featured />
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
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
