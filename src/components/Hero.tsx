import { useEffect, useRef } from "react";
import anime from "animejs";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const heroPetals = [
    { id: "github", name: "GitHub", url: "https://github.com/Bharath-serman" },
    { id: "twitter", name: "Itch IO", url: "https://bharath-serman.itch.io/" },
    { id: "resume", name: "Resume", url: "/resume.pdf", isDownload: true },
    { id: "mail", name: "Email", url: "mailto:bharathserman@gmail.com" },
  ];

  useEffect(() => {
    console.log("Hero useEffect running");
    if (!titleRef.current) return;
    titleRef.current.innerHTML = `
      <span class="whitespace-nowrap inline-block">
        <span class="title-char inline-block opacity-0">B</span>
        <span class="title-char inline-block opacity-0">H</span>
        <span class="title-char inline-block opacity-0">A</span>
        <span class="title-char inline-block opacity-0 text-primary">R</span>
        <span class="title-char inline-block opacity-0">A</span>
        <span class="title-char inline-block opacity-0">T</span>
        <span class="title-char inline-block opacity-0">H</span>
      </span>
      <span class="inline-block">&nbsp;</span>
      <span class="whitespace-nowrap inline-block">
        <span class="title-char inline-block opacity-0">S</span>
        <span class="title-char inline-block opacity-0 text-primary">E</span>
        <span class="title-char inline-block opacity-0">R</span>
        <span class="title-char inline-block opacity-0">M</span>
        <span class="title-char inline-block opacity-0">A</span>
        <span class="title-char inline-block opacity-0 text-primary">N</span>
      </span>`;

    anime
      .timeline({ easing: "easeOutExpo" })
      .add({
        targets: titleRef.current.querySelectorAll(".title-char"),
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 900,
        delay: anime.stagger(40),
      })
      .add(
        {
          targets: ".hero-fade",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 700,
          delay: anime.stagger(120),
        },
        "-=600"
      )
      .add(
        {
          targets: treeRef.current,
          opacity: [0, 1],
          scale: [0.92, 1],
          duration: 1200,
        },
        "-=1200"
      );

    // Animate petals popping in
    anime({
      targets: ".petal-wrap",
      scale: [0, 1],
      opacity: [0, 1],
      rotate: () => anime.random(-15, 15),
      delay: anime.stagger(150, { start: 1200 }),
      duration: 1000,
      easing: "easeOutElastic(1, 0.6)",
    });

  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handlePetalClick = (e: React.MouseEvent, petal: typeof heroPetals[0]) => {
    e.preventDefault();
    const groupEl = e.currentTarget.parentElement;
    if (!groupEl || groupEl.dataset.falling === "true") return;

    groupEl.dataset.falling = "true";

    // Animate the petal and label falling gracefully
    anime({
      targets: groupEl,
      translateY: [0, 400],
      translateX: [0, anime.random(-100, 100)],
      rotate: anime.random(180, 720),
      opacity: [1, 0],
      duration: 600,
      easing: "easeInQuad",
      complete: () => {
        // The specific required operation occurs now
        if (petal.isDownload) {
          const link = document.createElement("a");
          link.href = petal.url;
          link.setAttribute("download", "Resume.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (petal.url.startsWith("mailto:")) {
          window.location.href = petal.url;
        } else {
          window.open(petal.url, "_blank", "noopener,noreferrer");
        }

        // Reset petal group after a delay so it "re-blooms"
        setTimeout(() => {
          anime({
            targets: groupEl,
            translateY: 0,
            translateX: 0,
            rotate: 0,
            opacity: [0, 1],
            scale: [0, 1],
            duration: 800,
            easing: "easeOutElastic(1, 0.5)",
            complete: () => {
              groupEl.dataset.falling = "false";
            }
          });
        }, 400);
      }
    });
  };

  return (
    <section id="home" ref={wrapRef} className="relative min-h-screen pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <span className="hero-fade chip mb-6 opacity-0">
            <Sparkles size={12} className="text-primary" /> Open to new stories
          </span>

          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold tracking-tight leading-[0.95]"
          >
            BHARTH SERMAN R
          </h1>

          <p className="hero-fade opacity-0 mt-5 text-lg text-muted-foreground">
            <span className="font-jp text-foreground/80">B·S</span>
            <span className="mx-2">·</span> Game Developer
            <span className="mx-2">·</span> Web Developer
            <span className="mx-2">·</span> XR Game Tester
          </p>

          <p className="hero-fade opacity-0 mt-8 max-w-md text-foreground/80 leading-relaxed text-lg">
            Crafting soft worlds where code blooms like cherry blossoms.
          </p>

          <div className="hero-fade opacity-0 mt-10 flex flex-wrap gap-4">
            <button onClick={() => scrollTo("works")} className="btn-pill btn-primary">
              View Works <ArrowRight size={14} />
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-pill btn-ghost">
              Say Hello
            </button>
          </div>

          <div className="hero-fade opacity-0 mt-12 flex flex-wrap items-center gap-8 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            <span>— Chennai, India</span>
            <span>bharathserman@gmail.com</span>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
          <div
            ref={treeRef}
            className="w-full max-w-[500px] aspect-square relative opacity-0 glass rounded-[3rem] border border-border/40 shadow-card bg-surface-soft/10 backdrop-blur-sm p-8 sm:p-12 flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-8 sm:gap-12 w-full max-w-[340px]">
              {heroPetals.map((petal, i) => (
                <div
                  key={petal.id}
                  className="hero-petal-float flex flex-col items-center gap-3"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <a
                    href={petal.url}
                    onClick={(e) => handlePetalClick(e, petal)}
                    className="hero-petal-card petal-wrap outline-none cursor-pointer flex items-center justify-center"
                  >
                    <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm">
                      <defs>
                        <radialGradient id={`petalGrad-${petal.id}`} cx="50%" cy="35%" r="55%" fx="50%" fy="35%">
                          <stop offset="0%" stopColor="#fff0ed" />
                          <stop offset="50%" stopColor="#ffccd5" />
                          <stop offset="100%" stopColor="var(--primary)" />
                        </radialGradient>
                      </defs>
                      <g transform="translate(40,40)">
                        {[0, 72, 144, 216, 288].map((angle) => (
                          <ellipse
                            key={angle}
                            cx="0"
                            cy="-16"
                            rx="10"
                            ry="18"
                            fill={`url(#petalGrad-${petal.id})`}
                            transform={`rotate(${angle})`}
                            opacity="0.85"
                          />
                        ))}
                        <circle cx="0" cy="0" r="5" fill="var(--primary)" opacity="0.5" />
                      </g>
                    </svg>
                  </a>
                  <span className="bg-surface-strong/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide text-foreground shadow-sm border border-border/40">
                    {petal.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
