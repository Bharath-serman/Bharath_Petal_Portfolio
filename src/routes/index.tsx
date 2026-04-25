import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Works } from "@/components/Works";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Petals } from "@/components/Petals";
import { LandingSplash } from "@/components/LandingSplash";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    console.log("Route head rendering");
    return {
      meta: [
        { title: "Bharath's Petal" },
        { name: "description", content: "Anime-inspired portfolio of Yuki Hoshino, a Kyoto-based designer & developer crafting soft, expressive interfaces." },
        { property: "og:title", content: "Bharath serman — Bharath's Petal" },
        { property: "og:description", content: "Crafting soft worlds where code blooms like cherry blossoms." },
      ],
    };
  },
});

function Index() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    console.log("Index mounted");
  }, []);

  return (
    <>
      <LandingSplash onEnter={() => setHasEntered(true)} />
      
      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="ambient-bg" />
        <Petals />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Works />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
