import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { useScrollReveal } from "@/hooks/use-reveal";

const skills = [
  { id: "ui", name: "Game Dev / Unity Engine", x: 250, y: 360, desc: "Building immersive game experiences using Unity Engine with a focus on interactivity and real-time environments.", labelPos: "bottom" },
  { id: "react", name: "Version Control / Github", x: 420, y: 280, desc: "Managing projects efficiently using GitHub with version control, collaboration workflows, and structured repositories.", labelPos: "bottom" },
  { id: "motion", name: "Web / Full Stack Web Development", x: 450, y: 188, desc: "Developing full stack web applications with modern technologies, scalable architecture, and responsive design.", labelPos: "top" },
  { id: "illust", name: "Programming Language / C-Sharp", x: 650, y: 100, desc: "Writing efficient C# code for Game logic, scripting, and building interactive VR/AR Experiences", labelPos: "top" },
  { id: "swift", name: "Database / Supabase, MongoDB", x: 725, y: 130, desc: "Handling databases using Supabase and MongoDB for scalable storage, queries, and real-time data management.", labelPos: "bottom" },
  { id: "aitools", name: "AI Tools / Code Editors", x: 580, y: 310, desc: "Using AI tools and modern code editors to enhance productivity, automate workflows, and streamline development.", labelPos: "bottom" },
  { id: "uiux", name: "UI / Figma, Framer", x: 700, y: 360, desc: "Designing user interfaces in Figma and Framer with a focus on usability, aesthetics, and interactive prototyping.", labelPos: "bottom" },
];

export function Skills() {
  const ref = useScrollReveal<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial states
    anime.set(el.querySelectorAll(".petal-wrap"), { scale: 0, opacity: 0 });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !el.dataset.animated) {
          el.dataset.animated = "true";

          // Animate tree branches drawing
          anime({
            targets: el.querySelectorAll(".tree-branch"),
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 2000,
            delay: anime.stagger(200),
          });

          // Animate petals popping in
          anime({
            targets: el.querySelectorAll(".petal-wrap"),
            scale: [0, 1],
            opacity: [0, 1],
            rotate: () => anime.random(-20, 20),
            delay: anime.stagger(150, { start: 1000 }),
            duration: 1000,
            easing: "easeOutElastic(1, 0.6)",
          });

          // Animate labels fading in
          anime({
            targets: el.querySelectorAll(".petal-label"),
            opacity: [0, 1],
            translateY: function (el: HTMLElement) {
              return el.classList.contains('bottom-full') ? [5, 0] : [-5, 0];
            },
            delay: anime.stagger(150, { start: 1200 }),
            duration: 800,
            easing: "easeOutExpo",
          });
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  const handlePetalClick = (skill: typeof skills[0]) => {
    // Animate falling
    anime({
      targets: `#petal-${skill.id}`,
      translateY: ['0px', '200px'],
      translateX: ['0px', anime.random(-60, 60) + 'px'],
      rotate: anime.random(45, 180),
      opacity: [1, 0],
      duration: 1500,
      easing: "easeInQuad"
    });

    // Show popup
    setTimeout(() => {
      setSelectedSkill(skill);
    }, 700);
  };

  const closePopup = () => {
    if (selectedSkill) {
      // Reset the petal back to its branch
      anime.set(`#petal-${selectedSkill.id}`, {
        translateY: 0,
        translateX: 0,
        rotate: 0,
        opacity: 1
      });
    }
    setSelectedSkill(null);
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="reveal max-w-2xl">
          <p className="section-label">03 — Craft</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
            Tools shaped by years of play.
          </h2>
          <p className="mt-6 text-foreground/80 leading-relaxed">
            A deliberate toolkit chosen to keep interfaces calm, expressive and fast.
            Click the petals to explore my skills.
          </p>
        </div>

        <div
          ref={containerRef}
          className="reveal mt-8 relative w-full aspect-[4/3] sm:aspect-video rounded-[2.5rem] bg-surface-soft/30 backdrop-blur-sm border border-border/50 shadow-soft overflow-hidden"
        >
          {/* SVG Tree / Branch */}
          <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
            <path className="tree-branch" d="M -50 450 Q 150 450, 300 300 T 600 150 T 850 50" stroke="var(--muted-foreground)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path className="tree-branch" d="M 300 300 Q 350 250, 420 280" stroke="var(--muted-foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path className="tree-branch" d="M 600 150 Q 630 100, 650 100" stroke="var(--muted-foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path className="tree-branch" d="M 205 376 Q 230 360, 250 360" stroke="var(--muted-foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* New curved branch for AI Tools & UI/Figma */}
            <path className="tree-branch" d="M 420 280 Q 500 310, 580 310" stroke="var(--muted-foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path className="tree-branch" d="M 580 310 Q 640 320, 700 360" stroke="var(--muted-foreground)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>

          {/* Petals and Labels Overlay */}
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10 group"
              style={{ left: `${(skill.x / 800) * 100}%`, top: `${(skill.y / 450) * 100}%` }}
            >
              <button
                id={`petal-${skill.id}`}
                onClick={() => handlePetalClick(skill)}
                className="petal-wrap outline-none p-4 -m-4 cursor-pointer drop-shadow-md flex items-center justify-center text-[#ff9eaa] hover:text-[#ffb7c5]"
                aria-label={`View ${skill.name} details`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 origin-center drop-shadow-sm" style={{ rotate: "15deg" }}>
                    <defs>
                      <radialGradient id={`petalGrad-${skill.id}`} cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
                        <stop offset="0%" stopColor="#ffe4e1" />
                        <stop offset="100%" stopColor="currentColor" />
                      </radialGradient>
                    </defs>
                    <path d="M 12 23 C 2 12, 5 2, 11 2 Q 12 4, 13 2 C 19 2, 22 12, 12 23 Z" fill={`url(#petalGrad-${skill.id})`} />
                  </svg>
                </div>
              </button>

              <div
                className={`petal-label absolute w-max text-center pointer-events-none opacity-0 ${skill.labelPos === "top" ? "bottom-full mb-2 sm:mb-3" : "top-full mt-2 sm:mt-3"
                  }`}
              >
                <span className="bg-surface-strong/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide text-foreground shadow-sm border border-border/50">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Popup */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${selectedSkill ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-background/50 backdrop-blur-md transition-opacity"
          onClick={closePopup}
        />
        <div
          className={`relative w-full max-w-sm glass p-8 rounded-[2rem] shadow-card transform transition-all duration-500 ${selectedSkill ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
            }`}
        >
          <button
            onClick={closePopup}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-surface-hover text-foreground hover:bg-muted transition-colors"
          >
            ✕
          </button>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-[#ff9eaa]">
            <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-sm" style={{ rotate: "15deg" }}>
              <defs>
                <radialGradient id="modalPetalGrad" cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
                  <stop offset="0%" stopColor="#ffe4e1" />
                  <stop offset="100%" stopColor="currentColor" />
                </radialGradient>
              </defs>
              <path d="M 12 23 C 2 12, 5 2, 11 2 Q 12 4, 13 2 C 19 2, 22 12, 12 23 Z" fill="url(#modalPetalGrad)" />
            </svg>
          </div>
          <p className="text-sm tracking-widest text-primary uppercase font-medium mb-2">Skill Overview</p>
          <h3 className="font-display text-2xl sm:text-3xl mb-4 leading-tight">{selectedSkill?.name}</h3>
          <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
            {selectedSkill?.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
