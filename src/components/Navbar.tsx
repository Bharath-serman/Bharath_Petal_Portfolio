import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Moon, Sun, Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${
      menuOpen
        ? "py-3 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
        : scrolled
          ? "py-3 bg-surface-soft/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "py-5 bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 relative z-50">
          <span className="logo-bubble">B</span>
          <span className="font-display text-lg tracking-[0.35em] hidden sm:inline cursor-pointer">BHARATH</span>
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
    </header>

    {/* Mobile full-screen menu — rendered outside header so fixed positioning covers the viewport */}
    <div
      className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!menuOpen}
    >
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-background/98 backdrop-blur-xl"
        onClick={() => setMenuOpen(false)}
      />
      <nav
        className={`relative z-10 flex h-full flex-col items-center justify-center gap-1 px-8 pt-20 pb-10 transition-all duration-300 ${
          menuOpen ? "translate-y-0" : "translate-y-4"
        }`}
      >
        {links.map((l, i) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className={`w-full max-w-xs py-3.5 text-center font-display text-3xl sm:text-4xl tracking-tight leading-tight transition-all duration-300 ${
              active === l.id ? "text-primary" : "text-foreground/80 hover:text-primary"
            }`}
            style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="btn-pill btn-primary mt-6 w-full max-w-xs"
        >
          Say Hi
        </button>
      </nav>
    </div>
    </>
  );
}
