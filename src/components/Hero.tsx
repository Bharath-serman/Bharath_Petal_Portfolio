import { useEffect, useRef } from "react";
import anime from "animejs";
import { ArrowRight, Sparkles } from "lucide-react";
import yuki from "@/assets/yuki.jpg";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          targets: portraitRef.current,
          opacity: [0, 1],
          scale: [0.92, 1],
          duration: 1200,
        },
        "-=1200"
      );

    // idle breathing
    anime({
      targets: portraitRef.current,
      translateY: [0, -8, 0],
      duration: 5000,
      easing: "easeInOutSine",
      loop: true,
    });
  }, []);

  // parallax on mouse
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current || !portraitRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      anime({
        targets: portraitRef.current,
        translateX: x * 18,
        rotateZ: x * 2,
        duration: 600,
        easing: "easeOutQuad",
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const onPortraitClick = () => {
    anime({
      targets: portraitRef.current,
      rotate: [0, -4, 4, -3, 0],
      scale: [1, 1.04, 1],
      duration: 900,
      easing: "easeInOutSine",
    });
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
            <span className="font-jp text-foreground/80">星野　雪</span>
            <span className="mx-2">·</span> Game Developer
            <span className="mx-2">·</span> Web Developer
            <span className="mx-2">·</span> AI Explorer
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
            <span>hello@yuki-hoshino.dev</span>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
          <div className="hero-fade opacity-0 absolute -top-4 right-0 lg:right-4">
            <span className="chip">Tap to wave →</span>
          </div>
          <div
            ref={portraitRef}
            onClick={onPortraitClick}
            className="portrait-frame opacity-0 cursor-pointer w-[80%] max-w-[480px] aspect-square"
          >
            <img
              src={yuki}
              alt="Yuki Hoshino — anime portrait surrounded by cherry blossoms"
              width={1024}
              height={1024}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
