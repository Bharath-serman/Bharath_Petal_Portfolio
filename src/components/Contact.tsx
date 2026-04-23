import { useRef, useState } from "react";
import anime from "animejs";
import { Mail, MapPin, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-reveal";

export function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    anime({
      targets: btnRef.current,
      scale: [1, 0.95, 1.05, 1],
      duration: 600,
      easing: "easeOutElastic(1, .6)",
    });
    setSent(true);
    setTimeout(() => setSent(false), 2800);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8">
      <div ref={ref} className="max-w-5xl mx-auto text-center">
        <p className="reveal section-label">04 — Contact</p>
        <h2 className="reveal font-display text-3xl sm:text-4xl lg:text-5xl mt-4 italic">
          If a thought drifts by like a petal, you can leave it here
        </h2>
        <p className="reveal mt-5 text-muted-foreground">
          Drop a note—I’ll read it… if I’m not somewhere out in the countryside, sitting on a quiet bench, watching petals drift by in the air.
        </p>

        <div className="reveal mt-14 glass rounded-3xl p-6 sm:p-10 grid md:grid-cols-2 gap-8 text-left">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="icon-circle"><Mail size={18} /></span>
              <div>
                <p className="text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground">Email</p>
                <p className="mt-1">bharathserman@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="icon-circle"><MapPin size={18} /></span>
              <div>
                <p className="text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground">Location</p>
                <p className="mt-1">Chennai, India</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pt-2">
              Currently booking briefs for late-summer: brand systems, portfolio launches and animated storytelling.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input className="field" placeholder="Your name" required />
              <input type="email" className="field" placeholder="Email" required />
            </div>
            <textarea className="field min-h-[140px] resize-none" placeholder="Tell me about your project..." required />
            <button ref={btnRef} type="submit" className="btn-pill btn-primary w-full">
              {sent ? "Sent — talk soon ♡" : <>Send Message <Send size={14} /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
