import Link from "next/link";

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function PostCard({ post, featured = false }) {
  const href = `/journal/${post.id}/`;
  const className = featured ? "post-card post-card--feature" : "post-card";

  return (
    <article className={className}>
      <Link href={href} className="post-media">
        {post.coverImage && <img src={`/api/images/${post.coverImage}`} alt={post.title} />}
      </Link>
      <div className="post-body">
        <div className="post-meta">
          <span className="tag">{post.tag}</span> · {formatDate(post.date)}
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link href={href} className="read-more">
          Read the Story →
        </Link>
      </div>
    </article>
  );
}
