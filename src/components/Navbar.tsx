import { useEffect, useState } from "react";
import { Volume2, VolumeX, Moon, Sun } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [muted, setMuted] = useState(true);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(l.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
          <span className="logo-bubble">B</span>
          <span className="font-display text-lg tracking-[0.35em] hidden sm:inline">BHARATH</span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-[0.72rem] tracking-[0.25em] uppercase transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Toggle sound"
            onClick={() => setMuted((m) => !m)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/30 transition"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/30 transition"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => scrollTo("contact")} className="btn-pill btn-primary">
            Say Hi
          </button>
        </div>
      </div>
    </header>
  );
}
