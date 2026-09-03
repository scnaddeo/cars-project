"use client";

import { useState } from "react";

export default function ImageCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery-main car-media" />
      </div>
    );
  }

  function prev() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={`/api/images/${images[index]}`} alt={alt} />
        {images.length > 1 && (
          <>
            <button type="button" className="gallery-arrow gallery-arrow--prev" onClick={prev} aria-label="Previous photo">
              ‹
            </button>
            <button type="button" className="gallery-arrow gallery-arrow--next" onClick={next} aria-label="Next photo">
              ›
            </button>
            <div className="gallery-count">{index + 1} / {images.length}</div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((key, i) => (
            <button
              key={key}
              type="button"
              className={`gallery-thumb${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
            >
              <img src={`/api/images/${key}`} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
