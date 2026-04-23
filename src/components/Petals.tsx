import { useEffect, useRef } from "react";
import anime from "animejs";

// Cherry-blossom petal SVG: teardrop with a small notch at the tip
const PETAL_SVG = `
<svg viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="pg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#ffe6ee" />
      <stop offset="60%" stop-color="#ffb6c9" />
      <stop offset="100%" stop-color="#f48aa8" />
    </radialGradient>
  </defs>
  <path d="M12 1 C 4 7, 1 16, 6 24 C 8 26, 10 27, 11 25 L 12 22 L 13 25 C 14 27, 16 26, 18 24 C 23 16, 20 7, 12 1 Z"
        fill="url(#pg)" stroke="#f48aa8" stroke-opacity="0.35" stroke-width="0.5"/>
</svg>`;

export function Petals({ count = 18 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    const petals: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.style.position = "fixed";
      p.style.top = "-40px";
      p.style.left = "0";
      p.style.width = "22px";
      p.style.height = "26px";
      p.style.pointerEvents = "none";
      p.style.zIndex = "1";
      p.style.willChange = "transform, opacity";
      p.innerHTML = PETAL_SVG;
      const scale = 0.55 + Math.random() * 1.0;
      p.dataset.scale = String(scale);
      p.style.opacity = "0";
      container.appendChild(p);
      petals.push(p);
    }

    petals.forEach((petal) => {
      const startX = Math.random() * window.innerWidth;
      const drift = (Math.random() - 0.5) * 320;
      const duration = 9000 + Math.random() * 8000;
      const delay = Math.random() * 8000;
      const scale = parseFloat(petal.dataset.scale || "1");
      const startRot = Math.random() * 360;

      anime({
        targets: petal,
        translateX: [startX, startX + drift],
        translateY: [-40, window.innerHeight + 40],
        rotate: [startRot, startRot + 360 + Math.random() * 360],
        scale,
        opacity: [
          { value: 0.95, duration: 700 },
          { value: 0.95, duration: duration - 1400 },
          { value: 0, duration: 700 },
        ],
        easing: "linear",
        duration,
        delay,
        loop: true,
      });
    });

    return () => {
      petals.forEach((p) => p.remove());
    };
  }, [count]);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" />;
}
