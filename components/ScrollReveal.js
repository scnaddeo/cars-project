"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    let ticking = false;

    function checkReveals() {
      ticking = false;
      const vh = window.innerHeight;
      revealEls = revealEls.filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.92) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (!revealEls.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkReveals);
      }
    }

    if (revealEls.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      checkReveals();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
