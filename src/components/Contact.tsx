import { useRef, useState, useEffect } from "react";
import anime from "animejs";
import { Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-reveal";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const chimeRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const startIdleAnimation = () => {
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
  };

  useEffect(() => {
    startIdleAnimation();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sent) return;

    setSent(true);

    // Stop idle animation
    anime.remove(chimeRef.current);

    // Play the bell sound
    const bellSound = new Audio("/bell.mp3");
    bellSound.volume = 0.4;
    bellSound.play().catch(err => console.log("Audio play failed:", err));

    // Animate the chime reacting to the pull and release
    anime({
      targets: chimeRef.current,
      rotate: [
        { value: 0, duration: 0 },
        { value: -15, duration: 800, easing: 'easeOutQuad' }, // Pull down slower
        { value: 20, duration: 1500, easing: 'easeOutElastic(1, .5)' }, // Release bounce
        { value: 0, duration: 1200, easing: 'easeInOutSine' }
      ],
    });

    // Animate the paper tearing off and flying away slowly
    anime({
      targets: paperRef.current,
      translateY: [
        { value: 0, duration: 0 },
        { value: 20, duration: 800, easing: 'easeOutQuad' }, // Gentle dip
        { value: -1200, duration: 5000, easing: 'easeInOutSine' } // Slow, graceful ascent
      ],
      translateX: [
        { value: 0, duration: 0 },
        { value: 60, duration: 1500, easing: 'easeInOutSine' }, // Drifting
        { value: 900, duration: 4300, easing: 'easeInOutSine' } // Floating away
      ],
      rotate: [
        { value: 0, duration: 0 },
        { value: -10, duration: 800, easing: 'easeInOutSine' },
        { value: 160, duration: 5000, easing: 'easeInOutSine' }
      ],
      scale: [
        { value: 1, duration: 0 },
        { value: 1.02, duration: 800, easing: 'easeOutQuad' },
        { value: 0.05, duration: 5000, easing: 'easeInOutSine' } // Shrink to a speck
      ],
      opacity: [
        { value: 1, duration: 0 },
        { value: 1, duration: 4000 },
        { value: 0, duration: 1800, easing: 'linear' }
      ],
      easing: 'linear',
      complete: () => {
        // Prepare for the next paper after a short delay to enjoy the success message
        setTimeout(() => {
          setSent(false);
          if (paperRef.current) {
            paperRef.current.reset();
            // Reset position instantly while hidden
            anime.set(paperRef.current, {
              translateY: 100,
              translateX: 0,
              rotate: 0,
              scale: 0.8,
              opacity: 0
            });
            // Fade in new paper gently
            anime({
              targets: paperRef.current,
              translateY: 0,
              scale: 1,
              opacity: 1,
              duration: 2000,
              easing: 'easeOutQuart',
              complete: startIdleAnimation
            });
          }
        }, 1500);
      }
    });
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-8 overflow-hidden min-h-[800px] flex items-start justify-center">
      <div ref={ref} className="w-full flex flex-col items-center">

        <div className="text-center mb-10 sm:mb-16 z-20 max-w-2xl mx-auto">
          <p className="reveal section-label">05 — Contact</p>
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
            <p className="font-display text-4xl italic text-primary">Your message found its way.</p>
            <p className="text-muted-foreground mt-4 text-sm tracking-widest uppercase">I'll catch it soon!</p>
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
