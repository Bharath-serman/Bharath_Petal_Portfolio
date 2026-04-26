import { useScrollReveal } from "@/hooks/use-reveal";
import { ExternalLink, Milestone, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import anime from "animejs";

const achievements = [
  {
    id: 1,
    title: "Duolingo Streak",
    issuer: "Duolingo",
    date: "Ongoing",
    tag: "Language Learning",
    desc: "Maintained a 750+ day streak in Japanese on Duolingo, showcasing consistency, discipline, and strong commitment to continuous learning.",
    rotation: -3,
    color: "oklch(0.78 0.16 145)", // Dull Yellow
  },
  {
    id: 2,
    title: "AR Face Filter Certification",
    issuer: "Unity Learn",
    date: "2024",
    tag: "VR/AR",
    desc: "Earned Unity Learn certification by successfully completing an Augmented Reality face filter project, demonstrating practical skills in AR development and Unity tools.",
    rotation: 2,
    color: "oklch(0.78 0.14 250)", // Tech Blue
  },
  {
    id: 3,
    title: "First Prize - Mini Project Competition",
    issuer: "Department Level",
    date: "2024",
    tag: "Achievement",
    desc: "Secured first prize in the department-level mini-project competition for the project 'VR Black Hole', showcasing innovation and practical implementation in Virtual Reality.",
    rotation: -1.5,
    color: "oklch(0.7 0.18 12)", // Sakura Deep
  },
  {
    id: 4,
    title: "NPTEL Certifications",
    issuer: "NPTEL",
    date: "2024",
    tag: "Academics",
    desc: "Successfully completed multiple NPTEL (National Programme on Technology Enhanced Learning) courses with excellent scores, demonstrating strong understanding and mastery of core technical subjects.",
    rotation: 4,
    color: "oklch(0.76 0.12 200)", // Tech Blue
  },
  {
    id: 4,
    title: "Travel Planner",
    issuer: "Chennai Metro Rail Limited",
    date: "2024",
    tag: "Achievement",
    desc: "Developed a travel planner for CMRL that displays fare, distance, and platform details using API integration. Built an interactive Leaflet map to highlight routes, optimized the UI for both desktop and mobile, and implemented real-time data updates for accurate travel information.",
    rotation: 4,
    color: "oklch(0.78 0.18 35)", // Orange
  }
];

export function Achievements() {
  const ref = useScrollReveal<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating animation for the "Polaroids"
    anime({
      targets: ".achievement-polaroid",
      translateY: () => [0, anime.random(-10, 10)],
      rotate: (el: any, i: number) => [achievements[i].rotation, achievements[i].rotation + (i % 2 === 0 ? 1 : -1)],
      duration: () => anime.random(3000, 5000),
      delay: anime.stagger(200),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine"
    });
  }, []);

  return (
    <section id="achievements" className="relative pt-[25vw] pb-40 px-4 sm:px-8 overflow-hidden bg-surface-soft/20">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.08] pointer-events-none select-none hidden lg:block">
        <span className="font-display text-[22vw] leading-none tracking-tighter">SERENITY</span>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative">
        {/* Section Header with vertical line */}
        <div className="reveal flex flex-col items-center mb-24">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-primary/40 mb-8" />
          <p className="section-label mb-4">05 — Memory Box</p>
          <h2 className="font-display text-6xl sm:text-8xl text-center">
            Achievements <span className="italic text-primary">&</span> Awards
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-8 bg-border" />
            <Sparkles className="text-sakura w-4 h-4" />
            <span className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* The Scrapbook Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:px-12">
          {achievements.map((item, i) => (
            <div
              key={item.id}
              className={`reveal achievement-polaroid group relative bg-white dark:bg-card p-6 shadow-card transition-all duration-500 hover:z-10 hover:scale-105`}
              style={{
                transform: `rotate(${item.rotation}deg)`,
                marginTop: i % 2 === 0 ? "0" : "4rem"
              }}
            >
              {/* Decorative Washi Tape */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 opacity-40 mix-blend-multiply dark:mix-blend-overlay transition-all group-hover:scale-110"
                style={{
                  backgroundColor: item.color,
                  maskImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 100 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 5 Q 5 0, 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5 L 100 35 Q 95 40, 90 35 T 80 35 T 70 35 T 60 35 T 50 35 T 40 35 T 30 35 T 20 35 T 10 35 T 0 35 Z\"/%3E%3C/svg%3E')",
                  maskSize: "100% 100%"
                }}
              />

              {/* Photo Area */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-slate-50 dark:bg-slate-900 group-hover:shadow-inner transition-shadow">
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: item.color }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Milestone
                      className="w-16 h-16 opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700"
                      style={{ color: item.color }}
                    />
                    <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: item.color }} />
                  </div>
                </div>

                {/* Floating Tag */}
                <div className="absolute top-4 right-4">
                  <span className="chip bg-white/90 dark:bg-card/90 backdrop-blur-md border-none shadow-sm">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Text Area (Polaroid Bottom) */}
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-jp text-xl sm:text-2xl tracking-normal text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-display text-primary/40 italic text-lg">#{item.id}</span>
                </div>

                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-bold">
                  {item.issuer} • {item.date}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500 overflow-hidden">
                  {item.desc}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <div className="w-10 h-px bg-border group-hover:w-full transition-all duration-700" />
                  <ExternalLink
                    size={14}
                    className="ml-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary"
                  />
                </div>
              </div>

              {/* Decorative "Coffee Stain" or Subtle Glow */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
