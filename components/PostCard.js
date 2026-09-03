import Link from "next/link";

export default function PostCard({ post }) {
  const href = post.slug ? `/journal/${post.slug}/` : null;
  const className = post.featured ? "post-card post-card--feature" : "post-card";

  return (
    <article className={className}>
      <div className="post-media" />
      <div className="post-body">
        <div className="post-meta">
          <span className="tag">{post.tag}</span> · {post.date}
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        {href ? (
          <Link href={href} className="read-more">
            Read the Story →
          </Link>
        ) : (
          <span className="read-more">Read the Story →</span>
        )}
      </div>
    </article>
  );
}
