import { useState, useRef, useEffect } from "react";
import anime from "animejs";

// Enhanced Petal shape component with gradient
// Petal shape component matching the Skills section design
const Petal = ({ className, style, gradId }: { className?: string, style?: any, gradId: string }) => (
  <svg viewBox="0 0 24 24" className={className} style={style}>
    <path
      d="M 12 23 C 2 12, 5 2, 11 2 Q 12 4, 13 2 C 19 2, 22 12, 12 23 Z"
      fill={`url(#${gradId})`}
    />
  </svg>
);

// Generate petal positions along the branch paths
const generatePetals = () => {
  const petals = [];
  const count = 180;

  // Refined points along the tree path M -50 1000 Q 150 950, 300 700 T 600 400 T 950 100
  const branchPoints = [
    { x: 5, y: 95 }, { x: 10, y: 92 }, { x: 15, y: 88 }, { x: 20, y: 82 },
    { x: 25, y: 76 }, { x: 30, y: 70 }, { x: 35, y: 64 }, { x: 40, y: 58 },
    { x: 45, y: 52 }, { x: 50, y: 48 }, { x: 55, y: 44 }, { x: 60, y: 40 },
    { x: 65, y: 34 }, { x: 70, y: 28 }, { x: 75, y: 24 }, { x: 80, y: 20 },
    { x: 85, y: 16 }, { x: 90, y: 12 }, { x: 95, y: 8 },
    // Side branches from path Q 350 650, 500 750
    { x: 35, y: 65 }, { x: 40, y: 68 }, { x: 45, y: 72 }, { x: 50, y: 75 },
    // Side branches from Q 700 350, 800 450
    { x: 70, y: 35 }, { x: 75, y: 38 }, { x: 80, y: 42 }, { x: 85, y: 45 },
    // More random clusters for fullness
    { x: 28, y: 72 }, { x: 58, y: 42 }, { x: 15, y: 90 }, { x: 82, y: 22 }
  ];

  for (let i = 0; i < count; i++) {
    const point = branchPoints[Math.floor(Math.random() * branchPoints.length)];
    const scatter = 10;
    petals.push({
      left: `${point.x + (Math.random() - 0.5) * scatter}%`,
      top: `${point.y + (Math.random() - 0.5) * scatter}%`,
      rot: Math.random() * 360,
      scale: 0.8 + Math.random() * 1.2,
      delay: Math.random() * 2000,
      isFalling: Math.random() > 0.7 // 30% are naturally falling
    });
  }
  return petals;
};

const petalData = generatePetals();

export function LandingSplash({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isGusting, setIsGusting] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (isGusting) return;
    setIsGusting(true);

    const bell = new Audio("/bell.mp3");
    bell.volume = 0.4;
    bell.play().catch(() => { });

    // Stop all current animations on petals
    anime.remove('.gust-petal-item');

    // Gust: Every petal flies across the screen in a natural, random sequence
    anime({
      targets: '.gust-petal-item',
      translateX: () => [0, window.innerWidth * 1.5],
      translateY: () => [0, (Math.random() - 0.5) * window.innerHeight * 1.5],
      rotate: () => anime.random(-90, 90), // Subtle tumble instead of spinning
      scale: (el: any, i: number) => [petalData[i].scale, petalData[i].scale * 1.1],
      opacity: [1, 0],
      duration: () => anime.random(5000, 7000),
      easing: 'easeOutSine',
      delay: () => anime.random(0, 1500),
    });

    // Fade out the text content immediately
    anime({
      targets: textRef.current,
      opacity: 0,
      translateY: -30,
      duration: 1300,
      easing: 'easeInQuad'
    });

    // Fade out the entire splash (including the tree) only AFTER petals have mostly flown away
    anime({
      targets: splashRef.current,
      opacity: [1, 0],
      duration: 1500,
      delay: 3500, // Reduced delay for faster transition
      easing: 'easeInOutSine',
      complete: () => {
        setIsVisible(false);
        onEnter();
      }
    });
  };

  useEffect(() => {
    // Initial state: hide petals before animation
    anime.set('.gust-petal-item', { opacity: 0, scale: 0 });

    const timeline = anime.timeline({
      easing: 'easeOutQuart'
    });

    // 1. Reveal petals on the tree
    timeline.add({
      targets: '.gust-petal-item',
      scale: (el: any, i: number) => [0, petalData[i].scale],
      opacity: [0, 1],
      delay: anime.stagger(10, { start: 500 }),
      duration: 800,
    });

    // 2. Start Sway for stationary petals
    timeline.add({
      targets: '.gust-petal-item:not(.petal-falling)',
      translateY: () => [0, anime.random(-15, 15)],
      translateX: () => [0, anime.random(-15, 15)],
      rotate: '+=20',
      duration: () => anime.random(3000, 5000),
      delay: anime.stagger(50),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    }, '-=400'); // Start slightly before reveal ends

    // 3. Start Gradual falling for falling petals
    timeline.add({
      targets: '.petal-falling',
      translateY: [0, window.innerHeight + 100],
      translateX: () => [0, (Math.random() - 0.5) * 500],
      rotate: () => anime.random(720, 1440),
      duration: () => anime.random(10000, 15000),
      delay: anime.stagger(300),
      loop: true,
      easing: 'linear'
    }, '-=800');
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fdf8f8] overflow-hidden"
    >
      {/* Shared Petal Gradient Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <radialGradient id="splashPetalGrad" cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
            <stop offset="0%" stopColor="#ffe4e1" />
            <stop offset="100%" stopColor="#ff9eaa" />
          </radialGradient>
        </defs>
      </svg>

      {/* Background Tree SVG - More complex structure */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg viewBox="0 0 1000 1000" className="w-full h-full" preserveAspectRatio="none">
          <path
            className="stroke-[#4a3a3a] fill-none"
            d="M -50 1000 Q 150 950, 300 700 T 600 400 T 950 100"
            strokeWidth="5" strokeLinecap="round"
          />
          {/* Major Branches */}
          <path className="stroke-[#4a3a3a] fill-none" d="M 300 700 Q 350 650, 500 750" strokeWidth="3" strokeLinecap="round" />
          <path className="stroke-[#4a3a3a] fill-none" d="M 450 550 Q 550 500, 600 550" strokeWidth="2.5" strokeLinecap="round" />
          <path className="stroke-[#4a3a3a] fill-none" d="M 600 400 Q 700 350, 800 450" strokeWidth="2" strokeLinecap="round" />
          <path className="stroke-[#4a3a3a] fill-none" d="M 750 250 Q 850 200, 900 250" strokeWidth="1.5" strokeLinecap="round" />

          {/* Minor Twigs */}
          <path className="stroke-[#4a3a3a] fill-none" d="M 320 720 Q 340 730, 360 710" strokeWidth="1" />
          <path className="stroke-[#4a3a3a] fill-none" d="M 580 420 Q 600 410, 620 430" strokeWidth="1" />
          <path className="stroke-[#4a3a3a] fill-none" d="M 150 950 Q 180 930, 200 960" strokeWidth="1" />
        </svg>
      </div>

      {/* Petals positioned with absolute percentages for reliability */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {petalData.map((p, i) => (
          <div
            key={i}
            className={`gust-petal-item absolute w-6 h-6 sm:w-8 sm:h-8 ${p.isFalling ? 'petal-falling' : ''}`}
            style={{
              left: p.left,
              top: p.top,
              transform: `rotate(${p.rot}deg) scale(${p.scale})`,
              opacity: 0 // Set initial opacity to 0 to prevent flash before anime.set
            }}
          >
            <Petal
              gradId="splashPetalGrad"
              className="w-full h-full drop-shadow-[0_0_8px_rgba(255,158,170,0.6)]"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-30 text-center space-y-12 max-w-2xl px-8">
        <div className="space-y-6">
          <p className="text-[10px] tracking-[1em] uppercase text-primary font-bold opacity-80">
            Petals of Possibility
          </p>
          <h1 className="font-display text-7xl sm:text-9xl lg:text-[12rem] tracking-tighter text-[#2d2a2a] font-light leading-[0.75] mix-blend-multiply">
            Bharath's<br /><span className="text-primary italic">Petal</span>
          </h1>
          <div className="h-px w-24 bg-primary/20 mx-auto mt-12" />
          <p className="text-xs sm:text-sm tracking-[0.5em] uppercase text-muted-foreground font-medium opacity-60">
            Tap to start the breeze
          </p>
        </div>

        <button
          onClick={handleEnter}
          disabled={isGusting}
          className="group relative px-16 py-6 cursor-pointer overflow-hidden rounded-full bg-primary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <span className="relative z-10 text-[14px] tracking-[0.5em] uppercase text-white font-bold">
            {isGusting ? 'The wind blows...' : 'Venture Forth'}
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      {/* Decorative details */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-15 hidden lg:block">
        <span className="font-jp text-[3rem] [writing-mode:vertical-rl]">WELCOME</span>
      </div>
    </div>
  );
}
