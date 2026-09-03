import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/postStore";
import ArticleBody from "@/components/ArticleBody";

export const dynamic = "force-dynamic";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Story Not Found" };
  return {
    title: `${post.title} — Journal`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/journal/">Journal</Link> / {post.title}
          </div>
          <p className="eyebrow">{post.tag} · {formatDate(post.date)}</p>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {post.coverImage && (
            <div className="split-media reveal" style={{ aspectRatio: "21/9", marginBottom: "3rem" }}>
              <img
                src={`/api/images/${post.coverImage}`}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 1 }}
              />
            </div>
          )}

          <ArticleBody text={post.body} />
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <p className="eyebrow">Read More</p>
          <h2>More stories from the workshop.</h2>
          <div className="cta-actions">
            <Link href="/journal/" className="btn btn--solid">Back to the Journal</Link>
            <Link href="/contact/" className="btn btn--ghost">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
