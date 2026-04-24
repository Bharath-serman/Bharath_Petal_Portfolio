import { useScrollReveal } from "@/hooks/use-reveal";

export function About() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8">
      <div ref={ref} className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="reveal">
          <p className="section-label">01 — About</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05]">
            A quiet developer<br />with a loud<br />imagination.
          </h2>
        </div>
        <div className="reveal space-y-5 text-lg text-foreground/80 leading-relaxed lg:pt-4">
          <p>
            I write in quiet lines of code—the kind that hum softly in the background like an evening train. I build games and interfaces that sit somewhere between gentle, Ghibli-like warmth and the calm glow of soft-futurist design.
            <br /> I don’t like rushing things. I let ideas settle, take shape, and breathe.
          </p>
          <p>
            When I’m not building, I drift into other worlds—reading web novels, flipping through manga, or just sitting with the feeling of a scene. Sometimes it’s like chasing petals carried by the wind, trying to hold onto a moment just a little longer.
            <br></br>
            <br></br>
            Lately, I’ve been holding onto that feeling ever since I watched Violet Evergarden.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
            {[
              ["20", "Years Old"],
              ["23-09-2004", "Date of Birth"],
              ["70+", "Anime watched"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-primary">{n}</div>
                <div className="text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
