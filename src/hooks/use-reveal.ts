import { useEffect, useRef } from "react";
import anime from "animejs";

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            anime({
              targets: items,
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 900,
              delay: anime.stagger(100),
              easing: "easeOutExpo",
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
