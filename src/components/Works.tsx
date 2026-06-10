import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-reveal";
import kira from "@/assets/work-kira.jpg";
import Archangel from "@/assets/Archangel.jpg";
import Portfolio from "@/assets/Work-Portfolio.jpg";
import Cassiora from "@/assets/Cassiora.jpg";
import Balloon from "@/assets/Balloon.jpg";
import TGV from "@/assets/TGV.jpg";
import VR_Builder from "@/assets/VR_Builder.jpg";
import Aesthetic from "@/assets/Aesthetic.jpg";
import Black_Hole from "@/assets/Black_Hole.jpg";
import AR from "@/assets/AR.jpg";

const works = [
  {
    img: TGV,
    tag: "Game Development · Unity Engine",
    title: "The Green Void",
    desc: "A 3D Game made using unity engine as part of my Game Development journey. This game focuses on narrative storytelling and interactive gameplay.",
    chips: ["Unity Engine", "C-Sharp", "3D", "Game"],
    link: "https://github.com/Bharath-serman/The_Green_Void",
  },
  {
    img: Aesthetic,
    tag: "E-Commerce · Website",
    title: "Aesthetic",
    desc: "An E-Commerce site with an admin panel that was built using Next.JS, Supabase and Resend. Consist of many multiple features such as Cart, Discount and sales, Payment and more",
    chips: ["E-Commerce", "Aesthetic", "Next.JS", "Supabase", "Resend"],
    link: "https://github.com/Bharath-serman/E_Commerce_Site",
  },
  {
    img: Cassiora,
    tag: "Web Development · Placement Preparation",
    title: "Cassiora",
    desc: "A placement preparation site which is done completely using AI. Here you can take coding practices, MCQ Questions, Mock Interview with AI and more.",
    chips: ["React JS", "Preparation site", "Open Source"],
    link: "https://github.com/Bharath-serman/Cassiora",
  },
  {
    img: Balloon,
    tag: "Game Development · Unity Engine",
    title: "2D Balloon Popper Game",
    desc: "A small 2D Balloon Popper Game made with Unity Engine. This project is built as a part of my learning purposes for 2D Journey. Uploaded in Itch.io!",
    chips: ["Unity Engine", "2D", "Itch IO"],
    link: "https://github.com/Bharath-serman/2D-Balloon_Popper-Game",
  },
  {
    img: AR,
    tag: "Augmented Reality · Snap Filter",
    title: "AR Face Filter",
    desc: "This project is an Augmented Reality face filter built using Unity, AR Foundation, and Visual Scripting. It tracks a user’s face in real-time and overlays a 3D sunglasses model using AR face tracking.",
    chips: ["Unity Engine", "Face Filter", "Augmented Reality"],
    link: "https://github.com/Bharath-serman/AR_Face-Filter",
  },
  {
    img: Black_Hole,
    tag: "Virtual Reality · Unity Engine",
    title: "VR_Black Hole",
    desc: "This Project is a Unity-based VR experience designed to give users an immersive exploration of a black hole environment using virtual reality technology.",
    chips: ["Unity Engine", "Virtual Reality", "Space"],
    link: "https://github.com/Bharath-serman/VR_BLACK_HOLE",
  },
  {
    img: VR_Builder,
    tag: "VR Game · Unity Engine",
    title: "VR_Builder Sample Game",
    desc: "This is a simple VR project built with Unity and VR Builder. The project demonstrates how to create a basic VR experience without custom coding, using VR Builder’s no-code workflow.",
    chips: ["Unity Engine", "Virtual Reality", "No Code VR"],
    link: "https://github.com/Bharath-serman/VR_Builder_Sample_Game",
  },
  {
    img: Portfolio,
    tag: "Game Development · Unity Engine",
    title: "Unity Portfolio",
    desc: "A Game type portfolio website completely made using Unity Engine. Built this as a part of my learning journey!",
    chips: ["Unity Engine", "Portfolio", "Itch IO", "3D"],
    link: "https://github.com/Bharath-serman/Unity_Portfolio",
  },
  {
    img: Archangel,
    tag: "User Interface · Framer",
    title: "Archangel",
    desc: "This UI prototype demonstrates a sophisticated, data-driven approach to AI model management, emphasizing technical transparency and ease of use. It utilizes a centralized dashboard layout to display critical performance metrics—such as token capacity and response speeds—across a variety of LLMs in a single, cohesive view.",
    chips: ["Framer", "Prototype", "UI"],
    link: "https://heavy-platform-592488.framer.app/",
  },
];

export function Works() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="works" className="relative py-32 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="reveal">
            <p className="section-label">02 — Selected Works</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 max-w-2xl">
              Where stories take form.
            </h2>
          </div>
          <a href="#contact" className="reveal under-link whitespace-nowrap mb-2">Commission a piece →</a>
        </div>

        <div className="flex flex-col gap-32 sm:gap-40">
          {works.map((w, i) => {
            const isEven = i % 2 === 0;
            return (
              <article key={w.title} className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 group">

                {/* Image Section */}
                <div className={`w-full relative overflow-hidden shadow-card aspect-[4/3] rounded-lg z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Text Content Block */}
                <div className={`w-full flex flex-col z-20 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <p className="text-[0.65rem] tracking-[0.25em] uppercase text-primary mb-4">{w.tag}</p>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight text-foreground">{w.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8 max-w-lg">
                    {w.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {w.chips.map((c) => (
                      <span key={c} className="text-[0.65rem] tracking-[0.2em] uppercase px-4 py-2 bg-accent/30 text-muted-foreground border border-border/50 rounded-full shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>

                  <a href={w.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-primary transition-colors group/link w-fit">
                    Explore Project
                    <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
