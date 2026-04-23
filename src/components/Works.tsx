import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-reveal";
import hanami from "@/assets/work-hanami.jpg";
import lofi from "@/assets/work-lofi.jpg";
import kira from "@/assets/work-kira.jpg";

const works = [
  {
    img: hanami,
    tag: "Web App · Design System",
    title: "Hanami OS",
    desc: "A soft-pastel design system and component library inspired by seasonal Japanese color palettes.",
    chips: ["React", "Tailwind", "Figma"],
  },
  {
    img: lofi,
    tag: "Mobile · iOS",
    title: "Lo-Fi Diary",
    desc: "A journaling companion that sets your day to ambient beats and generates sakura-tinted mood cards.",
    chips: ["SwiftUI", "CoreML", "Audio"],
  },
  {
    img: kira,
    tag: "Open Source",
    title: "Kirameki Portfolio Kit",
    desc: "An anime-aesthetic portfolio starter with anime.js-powered micro-interactions and glass UI.",
    chips: ["anime.js", "Framer", "Open Source"],
  },
];

export function Works() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section id="works" className="relative py-24 px-4 sm:px-8">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="reveal">
            <p className="section-label">02 — Selected Works</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4">
              Where stories take form.
            </h2>
          </div>
          <a href="#contact" className="reveal under-link">Commission a piece →</a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {works.map((w) => (
            <article key={w.title} className="reveal work-card group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 chip">{w.tag}</span>
                <span className="absolute bottom-4 right-4 icon-circle shadow-lg">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl">{w.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {w.chips.map((c) => (
                    <span key={c} className="text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-border text-muted-foreground">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
