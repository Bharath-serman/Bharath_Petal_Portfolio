import { useRef, useState, useEffect } from "react";
import anime from "animejs";
import { Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-reveal";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const chimeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Gentle idle sway for the wind chime
    if (chimeRef.current) {
      anime({
        targets: chimeRef.current,
        rotate: ['-3deg', '3deg'],
        duration: 4000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        origin: 'top center'
      });
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sent) return;

    setSent(true);

    // Animate the chime reacting to the wind
    anime({
      targets: chimeRef.current,
      rotate: ['-3deg', '-20deg', '15deg', '-10deg', '5deg', '0deg'],
      duration: 3000,
      easing: 'easeOutElastic(1, 0.5)'
    });

    // Animate the paper tearing off and flying away into the sky
    anime({
      targets: paperRef.current,
      translateY: [0, 50, -800],
      translateX: [0, 150, 500],
      rotate: [0, -25, 120],
      opacity: [1, 1, 0],
      duration: 3500,
      easing: 'easeInSine',
    });
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-8 overflow-hidden min-h-[800px] flex items-start justify-center">
      <div ref={ref} className="w-full flex flex-col items-center">

        <div className="text-center mb-10 sm:mb-16 z-20 max-w-2xl mx-auto">
          <p className="reveal section-label">04 — Contact</p>
          <h2 className="reveal font-display text-3xl sm:text-4xl lg:text-5xl mt-4 italic">
            If a thought drifts by like a petal, you can leave it here
          </h2>
          <p className="reveal mt-5 text-muted-foreground">
            Drop a note—I’ll read it… if I’m not somewhere out in the countryside, sitting on a quiet bench, watching petals drift by in the air.
          </p>
        </div>

        {/* The Wind Chime Scene */}
        <div className="relative flex flex-col items-center w-full max-w-[500px]">

          {/* Success Message revealed when paper flies away */}
          <div className={`absolute top-64 flex flex-col items-center transition-all duration-1000 ${sent ? 'opacity-100 scale-100 delay-[1500ms]' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <p className="font-display text-4xl italic text-primary">Carried by the breeze.</p>
            <p className="text-muted-foreground mt-4 text-sm tracking-widest uppercase">I'll catch it soon ♡</p>
          </div>

          {/* The Wind Chime (Furin) */}
          <div
            ref={chimeRef}
            className="relative flex flex-col items-center z-10"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Top String */}
            <div className="w-[2px] h-20 bg-border/80"></div>

            {/* Glass Bell */}
            <div className="relative w-28 h-24 rounded-t-full border border-border/80 bg-surface-soft/20 backdrop-blur-md shadow-sm overflow-hidden flex justify-center">
              {/* Inner Bell Reflection */}
              <div className="absolute top-2 right-4 w-5 h-12 rounded-full bg-white/20 rotate-12 blur-[1px]"></div>
              {/* Clapper */}
              <div className="absolute bottom-2 w-5 h-5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]"></div>
            </div>

            {/* String connecting bell to paper */}
            <div className={`w-[1px] h-10 bg-border/60 transition-opacity duration-500 ${sent ? 'opacity-0' : 'opacity-100'}`}></div>

            {/* The Paper Slip (Tanzaku) -> The Form */}
            <form
              ref={paperRef}
              onSubmit={onSubmit}
              className="relative w-[280px] sm:w-[320px] bg-[#fcf8f2] dark:bg-[#1a1715] shadow-card border border-border/30 px-8 py-12 origin-top flex flex-col items-center gap-8"
            >
              {/* Paper Hole for String */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background shadow-inner"></div>

              <div className="w-full relative mt-2 group">
                <input
                  className="w-full bg-transparent border-b border-foreground/30 py-2 text-foreground focus:outline-none focus:border-primary transition-colors text-center font-display text-xl sm:text-2xl placeholder:text-foreground/70"
                  placeholder="Who is writing?"
                  required
                  disabled={sent}
                />
              </div>
              <div className="w-full relative group">
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-foreground/30 py-2 text-foreground focus:outline-none focus:border-primary transition-colors text-center font-display text-xl sm:text-2xl placeholder:text-foreground/70"
                  placeholder="Where to reply?"
                  required
                  disabled={sent}
                />
              </div>
              <div className="w-full relative group">
                <textarea
                  className="w-full bg-transparent border-b border-foreground/30 py-2 text-foreground focus:outline-none focus:border-primary transition-colors text-center font-display text-xl sm:text-2xl placeholder:text-foreground/70 min-h-[140px] resize-none"
                  placeholder="Your thought..."
                  required
                  disabled={sent}
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="mt-6 text-xs tracking-[0.3em] font-medium uppercase text-primary hover:text-foreground transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                Let it fly
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
