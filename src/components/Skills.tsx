import { useEffect, useRef } from "react";
import anime from "animejs";
import { useScrollReveal } from "@/hooks/use-reveal";

const skills = [
  ["UI / Visual Design", 95],
  ["React · Next.js", 90],
  ["Motion · anime.js", 88],
  ["Illustration", 80],
  ["SwiftUI · iOS", 72],
] as const;

export function Skills() {
  const ref = useScrollReveal<HTMLDivElement>();
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          el.querySelectorAll<HTMLElement>(".skill-fill").forEach((bar) => {
            const target = bar.dataset.value || "0";
            anime({
              targets: bar,
              width: `${target}%`,
              duration: 1400,
              easing: "easeOutExpo",
            });
          });
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8">
      <div ref={ref} className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="reveal">
          <p className="section-label">03 — Craft</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
            Tools shaped by years of play.
          </h2>
          <p className="mt-6 max-w-md text-foreground/80 leading-relaxed">
            A deliberate toolkit chosen to keep interfaces calm, expressive and fast.
          </p>
        </div>
        <div className="reveal space-y-7 lg:pt-2">
          {skills.map(([name, val]) => (
            <div key={name}>
              <div className="flex justify-between mb-2">
                <span className="text-sm">{name}</span>
                <span className="text-sm tracking-[0.18em] text-primary">{val}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" data-value={val} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
