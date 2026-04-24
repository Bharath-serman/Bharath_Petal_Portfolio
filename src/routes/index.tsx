import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Works } from "@/components/Works";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Petals } from "@/components/Petals";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bharath's Petal" },
      { name: "description", content: "Anime-inspired portfolio of Yuki Hoshino, a Kyoto-based designer & developer crafting soft, expressive interfaces." },
      { property: "og:title", content: "Bharath serman — Bharath's Petal" },
      { property: "og:description", content: "Crafting soft worlds where code blooms like cherry blossoms." },
    ],
  }),
});

function Index() {
  return (
    <>
      <Loader />
      <div className="ambient-bg" />
      <Petals />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Works />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
