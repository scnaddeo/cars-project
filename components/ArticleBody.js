// Renders plain-text post bodies with a lightweight, non-HTML convention:
// blank lines separate paragraphs, "## " starts a subheading, and "> "
// starts a pull quote (an immediately following "— " line becomes its
// citation). Kept intentionally simple — no markdown/HTML parsing — so
// admin-entered text can never inject markup.
export default function ArticleBody({ text }) {
  const blocks = (text || "").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return <h2 key={i}>{block.slice(3).trim()}</h2>;
        }

        if (block.startsWith("> ")) {
          const lines = block.split("\n");
          const quote = lines[0].slice(2).trim();
          const citeLine = lines[1] && lines[1].trim().replace(/^—\s*|^-\s*/, "");
          return (
            <div className="quote-block" key={i}>
              <p>&ldquo;{quote}&rdquo;</p>
              {citeLine && <cite>{citeLine}</cite>}
            </div>
          );
        }

        const lines = block.split("\n");
        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {line}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
