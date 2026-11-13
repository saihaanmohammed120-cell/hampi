import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';

// Neural network layers for the hero visual: three columns of nodes.
const LAYER_X = [50, 180, 310];
const LAYER_Y = [
  [50, 100, 150, 200],
  [30, 80, 130, 180, 230],
  [70, 130, 190],
];

// The network SVG, shared by the desktop panel and the compact mobile
// strip below the CTAs (the desktop panel is hidden on phones).
function NetworkSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 260" className={className} role="img" aria-label="A neural network: three layers of nodes wired together">
      {LAYER_Y[0].map((y1, i) =>
        LAYER_Y[1].map((y2, j) => (
          <line key={`a-${i}-${j}`} x1={LAYER_X[0]} y1={y1} x2={LAYER_X[1]} y2={y2} stroke="rgba(194,163,130,0.18)" strokeWidth="1" />
        ))
      )}
      {LAYER_Y[1].map((y1, i) =>
        LAYER_Y[2].map((y2, j) => (
          <line key={`b-${i}-${j}`} x1={LAYER_X[1]} y1={y1} x2={LAYER_X[2]} y2={y2} stroke="rgba(194,163,130,0.18)" strokeWidth="1" />
        ))
      )}
      {/* One highlighted path through the network */}
      <line x1={LAYER_X[0]} y1={LAYER_Y[0][1]} x2={LAYER_X[1]} y2={LAYER_Y[1][2]} stroke="rgba(244,196,48,0.7)" strokeWidth="1.5" />
      <line x1={LAYER_X[1]} y1={LAYER_Y[1][2]} x2={LAYER_X[2]} y2={LAYER_Y[2][1]} stroke="rgba(244,196,48,0.7)" strokeWidth="1.5" />
      {LAYER_Y.map((layer, li) =>
        layer.map((y, ni) => (
          <circle key={`${li}-${ni}`} cx={LAYER_X[li]} cy={y} r={li === 1 && ni === 2 ? 8 : 5} fill={li === 1 && ni === 2 ? "rgba(244,196,48,0.25)" : "#0B0F19"} stroke={li === 1 && ni === 2 ? "#f4c430" : "rgba(194,163,130,0.5)"} strokeWidth="1.5" />
        ))
      )}
    </svg>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToId = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useGSAP(() => {
    // Reduced motion: skip the entrance choreography entirely. Nothing
    // starts hidden in the markup, so every element is already in its
    // final state. (Bento, Timeline and Why already do this check.)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Cinematic Entrance Choreography
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state setup to avoid FOUC
    gsap.set(".hero-metadata", { opacity: 0 });
    gsap.set(".hero-visual", { opacity: 0, scale: 0.95 });
    gsap.set(".hero-can .split-char", { yPercent: 120, opacity: 0 });
    gsap.set(".hero-machines .split-char", { yPercent: 120, opacity: 0 });
    gsap.set(".hero-think .split-char", { yPercent: 120, opacity: 0 });
    gsap.set(".hero-copy, .hero-cta", { opacity: 0, y: 20 });
    
    // 0.2s - 0.8s: metadata fades/reveals.
    tl.to(".hero-metadata", { opacity: 1, duration: 0.6 }, 0.2);

    // 0.4s - 1.2s: neural network begins appearing.
    tl.to(".hero-visual", { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0.4);

    // 0.7s - 1.5s: CAN reveals.
    tl.to(".hero-can .split-char", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 0.7);

    // 1.0s - 1.8s: MACHINES reveals.
    tl.to(".hero-machines .split-char", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 1.0);

    // 1.3s - 2.1s: THINK? reveals.
    tl.to(".hero-think .split-char", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 1.3);

    // 1.5s - 2.5s: Supporting copy and CTA enter.
    tl.to(".hero-copy", { opacity: 1, y: 0, duration: 1 }, 1.5);
    tl.to(".hero-cta", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1.6);
    
  }, { scope: containerRef });

  // Manual split text to allow character animation.
  // whitespace-nowrap: a word must never break mid-word (MACHINES wrapped
  // as MACHINE + S at 1440 when the fallback serif ran wider than Cinzel).
  const renderSplitChars = (word: string, className: string) => {
    return (
      <span className={`inline-block overflow-hidden whitespace-nowrap ${className}`}>
        {word.split('').map((char, i) => (
          <span key={i} className="inline-block split-char" style={{ willChange: "transform, opacity" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen w-full flex items-center overflow-hidden pt-20">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-8 w-full flex flex-col md:flex-row items-center relative z-10">
        
        {/* Left Content */}
        <div className="w-full md:w-[45%] flex flex-col items-start justify-center mt-16 md:mt-0 relative z-20">
          <div className="hero-metadata mb-6">
            <Text type="label" color="accent">ALAN TURING / 1950 / THE QUESTION</Text>
          </div>
          
          {/* MACHINES is the widest word: at the old 8vw/8rem clamp it
              measured wider than the 45% column and wrapped mid-word at
              1440. 6.5vw/6.5rem fits the column even in the wider fallback
              serif (Cinzel loads from Google Fonts in a real browser). */}
          <h1 className="font-serif text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.9] text-slate-100 mb-6 drop-shadow-2xl mix-blend-lighten relative flex flex-col tracking-tight">
            {renderSplitChars("CAN", "hero-can")}
            {renderSplitChars("MACHINES", "hero-machines")}
            {/* THINK? sits tight under MACHINES. The negative margin is in em
                so the pull scales with the type: a fixed -12px pulled twice
                as hard, relative to the font, at tablet sizes, and the
                cap-tops of THINK? cut into MACHINES in the fallback font. */}
            <span className="text-sandstone opacity-90 -mt-[0.08em] md:-mt-[0.12em] block break-keep whitespace-nowrap">
              {renderSplitChars("THINK?", "hero-think")}
            </span>
          </h1>
          
          <div className="hero-copy mb-12 max-w-md">
            <Text type="large" as="p">In 1950 Alan Turing asked the question. This is what happened next, from a summer workshop to a billion people.</Text>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="hero-cta">
              <Button label="ENTER THE TIMELINE" variant="primary" size="lg" icon={<ArrowRight size={18} />} onClick={() => scrollToId('story')} />
            </div>
            <div className="hero-cta">
              <Button label="EXPLORE THE TURNS" variant="secondary" size="lg" onClick={() => scrollToId('turns')} />
            </div>
          </div>

          {/* Mobile only: a compact static neural network under the CTAs.
              The desktop panel is hidden on phones, so without this the
              phone hero is text on empty dark space. Static on purpose:
              it is not part of the GSAP entrance timeline. */}
          <div className="md:hidden w-full mt-14 pt-8 border-t border-sandstone/10">
            <NetworkSvg className="w-full max-w-[300px] h-auto mx-auto opacity-80" />
          </div>
        </div>

        {/* Right Content - Neural Network Visual & Floating Metadata.
            Hidden on phones: on mobile this panel is absolutely positioned
            over the hero, so its lines and floating labels crossed the
            headline, the tagline and the CTA buttons. Desktop only. */}
        <div className="w-full md:w-[55%] h-[60vh] md:h-screen absolute right-0 top-0 md:relative md:h-full z-0 hidden md:flex items-center justify-center">
          
          {/* Neural Network Container */}
          <div className="hero-visual absolute right-0 top-0 w-full md:w-[55vw] h-full pointer-events-auto">
            <div className="w-full h-full border-l border-sandstone/10 bg-gradient-to-l from-obsidian/40 to-transparent flex items-center justify-center relative overflow-hidden group">
              {/* Soft glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,163,130,0.05)_0%,transparent_60%)] animate-pulse" style={{ animationDuration: '6s' }}></div>
              
              {/* Orbital Rings */}
              <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-sandstone/5 rounded-full opacity-30 perspective-1000 group-hover:rotate-45 transition-transform duration-[10s] ease-linear" style={{ transform: 'rotateX(70deg) rotateY(10deg)' }}></div>
              <div className="absolute w-[200px] md:w-[350px] h-[200px] md:h-[350px] border border-sandstone/10 rounded-full opacity-40 perspective-1000 group-hover:-rotate-45 transition-transform duration-[10s] ease-linear" style={{ transform: 'rotateX(70deg) rotateY(10deg)' }}></div>
              
              {/* Neural network: three layers of nodes, every node wired to the next layer */}
              <NetworkSvg className="relative z-10 w-[320px] md:w-[480px] h-auto" />

              {/* Perspective Grid Lines */}
              <div className="absolute bottom-0 w-[200%] h-[30%] opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(194,163,130,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(194,163,130,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(50px)' }}></div>

              {/* Refined Metadata instead of PENDING, hidden on phones, where
                  it sits behind the CTA buttons and collides with them.
                  Opacities raised so the lines are actually readable:
                  at 30-40% they were near-invisible decoration. */}
              <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end gap-1 text-right">
                <span className="text-sandstone/70 tracking-[0.4em] text-[0.65rem] font-medium">THE IMITATION GAME</span>
                <span className="text-slate-400/80 tracking-[0.3em] text-[0.65rem]">MIND, OCTOBER 1950</span>
                <span className="text-saffron/70 tracking-[0.5em] text-[0.6rem] mt-2">CAN MACHINES THINK?</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
