import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Cinematic Entrance Choreography
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial state setup to avoid FOUC
    gsap.set(".hero-metadata", { opacity: 0 });
    gsap.set(".hero-spline", { opacity: 0, scale: 0.95 });
    gsap.set(".hero-stone .split-char", { yPercent: 120, opacity: 0 });
    gsap.set(".hero-remembers .split-char", { yPercent: 120, opacity: 0 });
    gsap.set(".hero-copy, .hero-cta", { opacity: 0, y: 20 });
    
    // 0.2s - 0.8s: TIME-WEAVE metadata fades/reveals.
    tl.to(".hero-metadata", { opacity: 1, duration: 0.6 }, 0.2);

    // 0.4s - 1.2s: 3D monument begins appearing.
    tl.to(".hero-spline", { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0.4);

    // 0.7s - 1.5s: STONE reveals.
    tl.to(".hero-stone .split-char", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 0.7);

    // 1.0s - 1.8s: REMEMBERS reveals.
    tl.to(".hero-remembers .split-char", { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 1.0);

    // 1.5s - 2.5s: Supporting copy and CTA enter.
    tl.to(".hero-copy", { opacity: 1, y: 0, duration: 1 }, 1.5);
    tl.to(".hero-cta", { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1.6);
    
  }, { scope: containerRef });

  const splineUrl = import.meta.env.VITE_SPLINE_SCENE_URL;

  // Manual split text for "STONE" and "REMEMBERS." to allow character animation
  const renderSplitChars = (word: string, className: string) => {
    return (
      <span className={`inline-block overflow-hidden ${className}`}>
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
            <Text type="label" color="accent">TIME-WEAVE / VIJAYANAGARA / 1500 CE</Text>
          </div>
          
          <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] text-slate-100 mb-6 drop-shadow-2xl mix-blend-lighten relative flex flex-col tracking-tight">
            {renderSplitChars("STONE", "hero-stone")}
            <span className="text-sandstone opacity-90 -mt-2 md:-mt-6 block break-keep whitespace-nowrap">
              {renderSplitChars("REMEMBERS.", "hero-remembers")}
            </span>
          </h1>
          
          <div className="hero-copy mb-12 max-w-md">
            <Text type="large" as="p">Walk through the ruins of an empire whose architecture still speaks.</Text>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="hero-cta">
              <Button label="ENTER THE TIMELINE" variant="primary" icon={<ArrowRight size={18} />} />
            </div>
            <div className="hero-cta">
              <Button label="EXPLORE ARCHITECTURE" variant="ghost" />
            </div>
          </div>
        </div>

        {/* Right Content - Spline Placeholder & Floating Metadata */}
        <div className="w-full md:w-[55%] h-[60vh] md:h-screen absolute right-0 top-0 md:relative md:h-full z-0 flex items-center justify-center">
          
          {/* Spline Container */}
          <div id="spline-hero" className="hero-spline absolute right-0 top-0 w-full md:w-[55vw] h-full pointer-events-auto">
            {splineUrl ? (
              <Spline scene={splineUrl} className="w-full h-full" />
            ) : (
              <div className="w-full h-full border-l border-sandstone/10 bg-gradient-to-l from-obsidian/40 to-transparent flex items-center justify-center relative overflow-hidden group">
                {/* Premium Architectural Fallback: Archaeological Study */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,163,130,0.05)_0%,transparent_60%)] animate-pulse" style={{ animationDuration: '6s' }}></div>
                
                {/* Orbital Rings */}
                <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-sandstone/5 rounded-full opacity-30 perspective-1000 group-hover:rotate-45 transition-transform duration-[10s] ease-linear" style={{ transform: 'rotateX(70deg) rotateY(10deg)' }}></div>
                <div className="absolute w-[200px] md:w-[350px] h-[200px] md:h-[350px] border border-sandstone/10 rounded-full opacity-40 perspective-1000 group-hover:-rotate-45 transition-transform duration-[10s] ease-linear" style={{ transform: 'rotateX(70deg) rotateY(10deg)' }}></div>
                
                {/* Central Geometric Stone Form (Chariot abstraction) */}
                <div className="relative z-10 flex flex-col items-center justify-center animate-pulse" style={{ animationDuration: '8s' }}>
                  <div className="w-8 h-2 border-t border-sandstone/40 mb-1"></div>
                  <div className="w-16 h-4 border border-sandstone/30 bg-sandstone/5"></div>
                  <div className="w-24 h-24 border border-sandstone/20 bg-sandstone/5 relative flex items-center justify-center">
                    <div className="w-12 h-12 border border-saffron/20 rounded-full opacity-50 absolute"></div>
                    <div className="w-4 h-4 bg-saffron/20 rounded-full absolute blur-[2px]"></div>
                  </div>
                  <div className="w-32 h-6 border-b border-x border-sandstone/20 relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-saffron/30"></div>
                  </div>
                  <div className="w-48 h-2 border-b border-sandstone/10 mt-1"></div>
                </div>

                {/* Perspective Grid Lines */}
                <div className="absolute bottom-0 w-[200%] h-[30%] opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(194,163,130,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(194,163,130,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(50px)' }}></div>

                {/* Refined Metadata instead of PENDING */}
                <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 text-right">
                  <span className="text-sandstone/40 tracking-[0.4em] text-[0.6rem] font-medium">VITTHALA</span>
                  <span className="text-slate-500/40 tracking-[0.3em] text-[0.55rem]">ARCHITECTURAL STUDY</span>
                  <span className="text-saffron/30 tracking-[0.5em] text-[0.5rem] mt-2">TIME-WEAVE</span>
                </div>
              </div>
            )}
          </div>

          {/* Floating Metadata */}
          <div className="hero-metadata absolute right-[20%] top-[20%] text-right opacity-30 text-xs tracking-[0.4em] font-light text-sandstone pointer-events-none" style={{ willChange: "transform", transform: "translateZ(30px)" }}>
            VITTHALA TEMPLE
          </div>
          <div className="hero-metadata absolute right-[40%] bottom-[30%] text-right opacity-40 text-xs tracking-[0.4em] font-light text-saffron pointer-events-none" style={{ willChange: "transform", transform: "translateZ(50px)" }}>
            STONE CHARIOT
          </div>
          <div className="hero-metadata absolute right-[10%] bottom-[15%] text-right opacity-20 text-[0.6rem] tracking-[0.5em] font-light text-slate-300 pointer-events-none" style={{ willChange: "transform", transform: "translateZ(10px)" }}>
            VIJAYANAGARA
          </div>

        </div>
      </div>
    </section>
  );
}
