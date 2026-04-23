import { Github, Twitter, Instagram, Dribbble, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-14 px-4 sm:px-8 border-t border-border/60">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="logo-bubble">花</span>
            <span className="font-display tracking-[0.35em]">HOSHINO</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            A tiny studio of one, building calm interfaces with a touch of anime warmth.
          </p>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            {["About", "Works", "Craft", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-primary transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.7rem] tracking-[0.25em] uppercase text-muted-foreground mb-4">Elsewhere</p>
          <div className="flex gap-3">
            {[Github, Dribbble, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border/60 flex flex-wrap justify-between gap-3 text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
        <p>© 2026 Bharath serman R · All petals reserved</p>
        <p className="flex items-center gap-2">
          Made with React and anime.js
        </p>
      </div>
    </footer>
  );
}
