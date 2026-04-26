import { useState, useRef, useEffect } from "react";
import anime from "animejs";
import { useScrollReveal } from "@/hooks/use-reveal";
import { MapPin, Calendar, Building2, ChevronRight, ChevronLeft } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "R.M.K Engineering College",
    role: "Computer science and design",
    period: "2022 — 2026",
    desc: "Completed my B.E degree in Computer science and design from R.M.K Engineering College, Kavaraipettai, Ponneri with a overall score of 8.2 CGPA",
    location: "Kavaraipettai, Ponneri",
    color: "#6b9080",
    theme: "bg-emerald-500/5",
    stationName: "R.M.K"
  },
  {
    id: 2,
    company: "Chennai Metro Rail Limited",
    role: "Software Engineer - (Internship)",
    period: "2024 June — 2024 July",
    desc: "Worked as an Software Engineer Intern at CMRL, where I have collabarated with a team of 4 developers and created an Travel Planner as an additional feature for their website. It still present in the actual website.",
    location: "Nandanam, Chennai",
    color: "#e8809a",
    theme: "bg-rose-500/5",
    stationName: "CMRL"
  },
  {
    id: 3,
    company: "VRARRI",
    role: "Game/product Tester",
    period: "2025 December — Present",
    desc: "Currently working as an Game / Product Tester at VRARRI. I have to test their latest AR/VR games and give my feedback to the developers.",
    location: "Chennai",
    color: "#a4c3b2",
    theme: "bg-teal-500/5",
    stationName: "VRARRI"
  }
];

export function Experience() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  const changeStation = (index: number) => {
    if (index === active) return;

    // Transition out
    anime({
      targets: contentRef.current,
      opacity: [1, 0],
      translateX: [0, index > active ? -20 : 20],
      duration: 400,
      easing: 'easeInQuart',
      complete: () => {
        setActive(index);
        // Transition in
        anime({
          targets: contentRef.current,
          opacity: [0, 1],
          translateX: [index > active ? 20 : -20, 0],
          duration: 600,
          easing: 'easeOutQuart'
        });
      }
    });

    // Tilt the sign slightly on change
    anime({
      targets: signRef.current,
      rotateY: index > active ? [0, 5, 0] : [0, -5, 0],
      duration: 800,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  useEffect(() => {
    // Initial entrance animation
    if (ref.current) {
      anime({
        targets: '.ticket-slot',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 500 }),
        duration: 800,
        easing: 'easeOutQuart'
      });
    }
  }, [ref]);

  const current = experiences[active];

  return (
    <section id="experience" className="relative py-32 px-4 sm:px-8 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">

        <div className="reveal mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="section-label">04 — Journey</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4">
              Next station is...
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm sm:text-base italic">
            "A journey is best measured in friends, rather than miles."
          </p>
        </div>

        {/* Interactive Station Scene */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-12 min-h-[500px]">

          {/* Left: The Tickets (Selection) */}
          <div className="w-full lg:w-1/3 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible no-scrollbar">
            {experiences.map((exp, i) => (
              <button
                key={exp.id}
                onClick={() => changeStation(i)}
                className={`ticket-slot cursor-pointer relative flex-shrink-0 w-48 lg:w-full p-5 text-left rounded-2xl border transition-all duration-500 group ${active === i
                  ? 'bg-surface-strong border-primary shadow-soft'
                  : 'bg-surface-soft/40 border-border/50 hover:bg-surface-soft/80 hover:border-border'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] tracking-[0.2em] uppercase font-bold ${active === i ? 'text-primary' : 'text-muted-foreground'}`}>
                    Ticket #{exp.id}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${active === i ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
                </div>
                <h4 className={`font-display text-lg lg:text-xl truncate ${active === i ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {exp.company}
                </h4>
                <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mt-1">
                  {exp.period}
                </p>

                {/* Visual "Punch" hole */}
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-6 rounded-full bg-background border-r border-border/50" />
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-6 rounded-full bg-background border-l border-border/50" />
              </button>
            ))}
          </div>

          {/* Right: The Station Signboard */}
          <div className="flex-1 w-full relative perspective-[1000px]">
            <div
              ref={signRef}
              className="relative w-full h-full glass rounded-[2.5rem] border-border/40 shadow-card overflow-hidden flex flex-col"
            >
              {/* Top Bar (Eki-meihyo style) */}
              <div className="w-full bg-surface-strong/80 border-b border-border/40 px-8 py-10 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <div className="flex items-center gap-6 mb-4">
                  <div className="h-px w-8 sm:w-16 bg-muted-foreground/30" />
                  <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-muted-foreground font-medium">Station</span>
                  <div className="h-px w-8 sm:w-16 bg-muted-foreground/30" />
                </div>

                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight transition-all">
                  {current.stationName}
                </h3>

                <div className="mt-4 flex items-center gap-4 text-muted-foreground/60">
                  <span className="text-[10px] uppercase tracking-[0.3em]">Platform 4</span>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-[10px] uppercase tracking-[0.3em]">Localized Content</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div ref={contentRef} className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                  <div className="space-y-6">
                    <div>
                      <p className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold mb-2 flex items-center gap-2">
                        <Building2 size={12} />
                        Organization
                      </p>
                      <h4 className="text-2xl sm:text-3xl font-display">{current.company}</h4>
                    </div>

                    <div>
                      <p className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold mb-2 flex items-center gap-2">
                        <Calendar size={12} />
                        Timeline
                      </p>
                      <p className="text-lg text-foreground/80">{current.period}</p>
                    </div>

                    <div>
                      <p className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold mb-2 flex items-center gap-2">
                        <MapPin size={12} />
                        Location
                      </p>
                      <p className="text-lg text-foreground/80">{current.location}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/20" />
                    <p className="text-foreground/70 leading-relaxed text-base sm:text-lg italic font-light relative z-10">
                      "{current.desc}"
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-primary font-medium tracking-widest text-[10px] uppercase">
                      Next Stop
                      <ChevronRight size={14} />
                      {experiences[(active + 1) % experiences.length].company}
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Decorative Footer */}
              <div className="px-8 py-6 bg-surface-soft/20 border-t border-border/20 flex items-center justify-between mt-auto">
                <div className="flex gap-4">
                  <div className="w-12 h-1.5 rounded-full bg-primary/20" />
                  <div className="w-6 h-1.5 rounded-full bg-primary/40" />
                  <div className="w-3 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40 font-bold">
                  Standard Fare Applied
                </div>
              </div>
            </div>

            {/* Background Mood Glow */}
            <div className={`absolute inset-0 -z-10 blur-[120px] opacity-20 transition-colors duration-1000 ${current.theme}`} />
          </div>

        </div>

      </div>

      {/* Atmospheric Background Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none -z-10" />
    </section>
  );
}
