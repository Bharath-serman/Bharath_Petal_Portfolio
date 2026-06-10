import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const heroPetals = [
    { id: "github", name: "GitHub", url: "https://github.com/Bharath-serman", x: 450, y: 188 },
    { id: "twitter", name: "Itch IO", url: "https://bharath-serman.itch.io/", x: 580, y: 310 },
    { id: "resume", name: "Resume", url: "/resume.pdf", x: 420, y: 280, isDownload: true },
    { id: "mail", name: "Email", url: "mailto:bharathserman@gmail.com", x: 250, y: 360 },
  ];

  useEffect(() => {
    console.log("Hero useEffect running");
    if (!titleRef.current) return;
    // Color the "I" in YUKI and the "N" in HOSHINO (matches reference)
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

    // Animate tree branches drawing
    anime({
      targets: ".tree-branch",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      delay: anime.stagger(200, { start: 1000 }),
    });

    // Animate petals popping in
    anime({
      targets: ".petal-wrap",
      scale: [0, 1],
      opacity: [0, 1],
      rotate: () => anime.random(-20, 20),
      delay: anime.stagger(150, { start: 1500 }),
      duration: 1000,
      easing: "easeOutElastic(1, 0.6)",
    });

    // Animate labels fading in
    anime({
      targets: ".petal-label",
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(150, { start: 1800 }),
      duration: 800,
      easing: "easeOutExpo",
    });

    // Removed idle breathing for tree to keep it static
  }, []);

  // Removed parallax on mouse to keep it static

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handlePetalClick = (e: React.MouseEvent, petal: typeof heroPetals[0]) => {
    e.preventDefault();
    const groupEl = e.currentTarget.parentElement;
    if (!groupEl || groupEl.dataset.falling === "true") return;

    groupEl.dataset.falling = "true";

    // Animate the petal and label falling gracefully
    anime({
      targets: groupEl,
      translateY: [0, 800], // Fall further
      translateX: [0, anime.random(-250, 250)], // Drift more
      rotate: anime.random(360, 1440), // Spin more
      opacity: [1, 0],
      duration: 3200, // Slower fall to appreciate the animation
      easing: "easeInQuart",
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
            duration: 1500,
            easing: "easeOutElastic(1, 0.5)",
            complete: () => {
              groupEl.dataset.falling = "false";
            }
          });
        }, 1000);
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
            <span className="mx-2">·</span> Product Tester
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
            className="w-full max-w-[600px] aspect-[4/3] relative opacity-0 glass rounded-[3rem] border border-border/40 shadow-card overflow-hidden bg-surface-soft/10 backdrop-blur-sm p-4"
          >
            {/* SVG Tree / Branch - Increased opacity for sharpness */}
            <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full opacity-80" preserveAspectRatio="none">
              <path className="tree-branch" d="M -50 450 Q 150 450, 300 300 T 600 150 T 850 50" stroke="var(--primary)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
              <path className="tree-branch" d="M 300 300 Q 350 250, 420 280" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
              <path className="tree-branch" d="M 600 150 Q 630 100, 650 100" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
              <path className="tree-branch" d="M 205 376 Q 230 360, 250 360" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
              <path className="tree-branch" d="M 420 280 Q 500 310, 580 310" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
              <path className="tree-branch" d="M 580 310 Q 640 320, 700 360" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
            </svg>

            {/* Petals as Links */}
            <div className="absolute inset-0">
              {heroPetals.map((petal) => (
                <div
                  key={petal.id}
                  className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10 group"
                  style={{ left: `${(petal.x / 800) * 100}%`, top: `${(petal.y / 450) * 100}%` }}
                >
                  <a
                    href={petal.url}
                    onClick={(e) => handlePetalClick(e, petal)}
                    className="petal-wrap outline-none p-4 -m-4 cursor-pointer drop-shadow-md flex items-center justify-center text-[#ff9eaa] hover:text-[#ffb7c5] transition-transform duration-300 group-hover:scale-110"
                  >
                    <div className="relative">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 origin-center drop-shadow-sm" style={{ rotate: "15deg" }}>
                        <defs>
                          <radialGradient id={`heroPetalGrad-${petal.id}`} cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
                            <stop offset="0%" stopColor="#ffe4e1" />
                            <stop offset="100%" stopColor="currentColor" />
                          </radialGradient>
                        </defs>
                        <path d="M 12 23 C 2 12, 5 2, 11 2 Q 12 4, 13 2 C 19 2, 22 12, 12 23 Z" fill={`url(#heroPetalGrad-${petal.id})`} />
                      </svg>
                    </div>
                  </a>

                  <div className="petal-label absolute top-full mt-2 w-max text-center opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-1">
                    <span className="bg-surface-strong/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide text-foreground shadow-sm border border-border/50">
                      {petal.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
