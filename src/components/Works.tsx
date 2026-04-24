import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-reveal";
import hanami from "@/assets/work-hanami.jpg";
import lofi from "@/assets/work-lofi.jpg";
import kira from "@/assets/work-kira.jpg";

const works = [
  {
    img: hanami,
    tag: "Game Development · Unity Engine",
    title: "The Green Void",
    desc: "A 3D Game made using unity engine as part of my Game Development journey!",
    chips: ["Unity", "C-Sharp", "3D"],
  },
  {
    img: lofi,
    tag: "E-Commerce · Website",
    title: "Aesthetic",
    desc: "An E-Commerce site that was built using Next.JS, Supabase and Resend.",
    chips: ["E-Commerce", "Aesthetic", "Next.JS"],
  },
  {
    img: kira,
    tag: "Web Development · Placement Preparation",
    title: "Cassiora",
    desc: "A placement preparation site which is done completely using AI. Here you can take coding practices, MCQ Questions, Mock Interview with AI and more.",
    chips: ["React JS", "Preparation site", "Open Source"],
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
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 chip max-w-[85%] text-left whitespace-normal break-words leading-snug !text-[0.6rem] sm:!text-[0.7rem]">{w.tag}</span>
                <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 icon-circle shadow-lg w-8 h-8 sm:w-11 sm:h-11">
                  <ArrowUpRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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
