import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Moon, Sun, Menu, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      //Current audio - (Refrain) from after the rain anime.
      audioRef.current = new Audio("/After_The_Rain_Theme.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (muted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  }, [muted]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
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
    // Initial check
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${scrolled ? 'py-3 bg-surface-soft/80 backdrop-blur-md border-b border-border/50 shadow-sm' : 'py-5 bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 relative z-50">
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

        <div className="flex items-center gap-2 sm:gap-3 relative z-50">
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
          <button onClick={() => scrollTo("contact")} className="btn-pill btn-primary hidden sm:inline-flex">
            Say Hi
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/30 transition"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full glass border-b border-border/50 shadow-soft transition-all duration-300 origin-top overflow-hidden flex flex-col ${menuOpen ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col p-6 gap-6 items-center">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-[0.75rem] tracking-[0.25em] uppercase transition-colors ${active === l.id ? "text-primary font-medium" : "text-muted-foreground"
                }`}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} className="btn-pill btn-primary w-full max-w-[200px] mt-2">
            Say Hi
          </button>
        </div>
      </div>
    </header>
  );
}
