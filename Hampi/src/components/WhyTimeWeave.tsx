import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WhyTimeWeave() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(".why-column", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="culture" className="w-full bg-[#080b14] py-32 border-t border-slate-900/50 relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay film-grain pointer-events-none"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="md:w-1/2">
            <h2 className="text-saffron text-xs tracking-[0.4em] mb-6 font-medium">WHY TIME-WEAVE</h2>
            <h3 className="font-serif text-3xl md:text-5xl text-slate-100 leading-tight tracking-tight">
              HISTORY WAS NEVER MEANT <br /> TO BE READ IN A LIST.
            </h3>
          </div>
          <div className="md:w-1/3">
            <p className="text-slate-400 font-light text-lg leading-relaxed">
              TIME-WEAVE turns Hampi into a spatial narrative, where every scroll reveals another layer of architecture, culture and memory.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t border-white/5">
          
          <div className="why-column flex flex-col gap-4">
            <div className="text-sandstone text-sm tracking-[0.3em]">01 — SEE</div>
            <p className="text-slate-300 font-serif text-2xl">Architecture becomes the interface.</p>
          </div>

          <div className="why-column flex flex-col gap-4">
            <div className="text-sandstone text-sm tracking-[0.3em]">02 — TRAVEL</div>
            <p className="text-slate-300 font-serif text-2xl">Scroll becomes the timeline.</p>
          </div>

          <div className="why-column flex flex-col gap-4">
            <div className="text-sandstone text-sm tracking-[0.3em]">03 — REMEMBER</div>
            <p className="text-slate-300 font-serif text-2xl">The ruins become the story.</p>
          </div>

        </div>
        
      </div>
    </section>
  );
}
