import { useEffect, useRef, useState } from "react";
import anime from "animejs";

export function Loader() {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({ easing: "easeOutExpo" });
    tl.add({
      targets: ".loader-petal",
      scale: [0, 1],
      rotate: [0, 360],
      opacity: [0, 1],
      delay: anime.stagger(80),
      duration: 700,
    })
    .add({
      targets: ".loader-text",
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 500,
    }, "-=400")
    .add({
      targets: ref.current,
      opacity: [1, 0],
      duration: 600,
      delay: 500,
      complete: () => setDone(true),
    });
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative w-24 h-24">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <span
            key={i}
            className="loader-petal absolute top-1/2 left-1/2 w-7 h-7 rounded-[70%_30%_70%_30%/50%_50%_50%_50%]"
            style={{
              background: "var(--gradient-pink)",
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-26px)`,
              transformOrigin: "center",
              opacity: 0,
            }}
          />
        ))}
      </div>
      <p className="loader-text mt-8 font-jp text-sm text-muted-foreground opacity-0">花 ・ HOSHINO</p>
    </div>
  );
}
