import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Subtle parallax staggered scrolling effect for cards
    const cards = gsap.utils.toArray('.bento-card');
    
    cards.forEach((card: any, i) => {
      // Create a staggered speed based on grid position / index
      const speed = 1 - (i % 3) * 0.15; 
      
      gsap.fromTo(card,
        { y: 50 * speed },
        {
          y: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="architecture" className="py-32 px-8 w-full max-w-7xl mx-auto relative z-10">
      
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-end justify-between">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl text-slate-100 tracking-tight">
            THE CITY <span className="text-sandstone italic">IN STONE.</span>
          </h2>
        </div>
        <div className="text-slate-400 font-light max-w-sm mt-6 md:mt-0 tracking-wide text-sm">
          Discover the facets of an empire that commanded the world's wealth while rooted in profound spiritual artistry.
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[300px]">
        
        {/* 01 ARCHITECTURE - spans 2 cols, 2 rows */}
        <div className="bento-card md:col-span-2 md:row-span-2 relative group overflow-hidden border border-slate-800 bg-[#0f1522] cursor-pointer hover:border-sandstone/30 transition-colors duration-500">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_49%,rgba(194,163,130,1)_50%,transparent_51%)] bg-[length:20px_20px] group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 ease-out" style={{ willChange: "transform, opacity" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent z-10"></div>
          
          <div className="absolute top-6 left-6 text-saffron text-xs tracking-[0.3em] z-20 group-hover:translate-x-2 transition-transform duration-500">01 ARCHITECTURE</div>
          
          <div className="absolute bottom-8 left-8 right-8 z-20 transition-transform duration-500 group-hover:-translate-y-2" style={{ willChange: "transform" }}>
            <h3 className="font-serif text-3xl md:text-4xl text-slate-200 mb-3 group-hover:text-white transition-colors">Sacred Geometry</h3>
            <p className="text-slate-400 text-sm font-light">Granite temples carved with impossible precision, defying time.</p>
          </div>
        </div>

        {/* 02 WATER - spans 1 col, 1 row */}
        <div className="bento-card md:col-span-1 md:row-span-1 relative group overflow-hidden border border-slate-800 bg-[#060910] cursor-pointer hover:border-sky-900/50 transition-colors duration-500">
          <div className="absolute bottom-0 left-0 right-0 h-[150%] bg-gradient-to-t from-sky-900/30 to-transparent group-hover:translate-y-8 transition-transform duration-700 ease-out" style={{ willChange: "transform" }}></div>
          
          <div className="absolute top-6 left-6 text-sandstone text-xs tracking-[0.3em] z-20 group-hover:translate-x-1 transition-transform duration-500">02 WATER</div>
          
          <div className="absolute bottom-6 left-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
            <h3 className="font-serif text-2xl text-slate-200">The Stepwells</h3>
          </div>
        </div>

        {/* 03 MARKET - spans 1 col, 2 rows */}
        <div className="bento-card md:col-span-1 md:row-span-2 relative group overflow-hidden border border-slate-800 bg-[#121620] cursor-pointer hover:border-saffron/30 transition-colors duration-500">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(244,196,48,0.15)_0%,transparent_70%)] group-hover:scale-150 group-hover:opacity-30 transition-all duration-700 ease-out" style={{ willChange: "transform, opacity" }}></div>
          
          <div className="absolute top-6 left-6 text-saffron text-xs tracking-[0.3em] z-20 group-hover:translate-x-1 transition-transform duration-500">03 MARKET</div>
          
          <div className="absolute bottom-8 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-2" style={{ willChange: "transform" }}>
            <h3 className="font-serif text-3xl text-slate-200 mb-3">Global Bazaar</h3>
            <p className="text-slate-400 text-sm font-light">Where diamonds were sold on the streets.</p>
          </div>
        </div>

        {/* 04 MUSIC - spans 1 col, 1 row */}
        <div className="bento-card md:col-span-1 md:row-span-1 relative group overflow-hidden border border-slate-800 bg-[#0B0F19] cursor-pointer hover:border-sandstone/30 transition-colors duration-500 flex items-center justify-center">
          {/* Waveform graphic representation */}
          <div className="flex items-end gap-1 h-12 opacity-30 group-hover:opacity-80 transition-opacity duration-500">
            <div className="w-1 bg-sandstone h-full animate-pulse group-hover:h-[120%] transition-all duration-300" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 bg-sandstone h-3/4 animate-pulse group-hover:h-[90%] transition-all duration-300" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 bg-sandstone h-1/2 animate-pulse group-hover:h-[100%] transition-all duration-300" style={{animationDelay: '0.3s'}}></div>
            <div className="w-1 bg-sandstone h-full animate-pulse group-hover:h-[80%] transition-all duration-300" style={{animationDelay: '0.4s'}}></div>
            <div className="w-1 bg-sandstone h-1/4 animate-pulse group-hover:h-[60%] transition-all duration-300" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <div className="absolute top-6 left-6 text-sandstone text-xs tracking-[0.3em] z-20 group-hover:translate-x-1 transition-transform duration-500">04 MUSIC</div>
          
          <div className="absolute bottom-6 left-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
            <h3 className="font-serif text-2xl text-slate-200">Musical Pillars</h3>
          </div>
        </div>

        {/* 05 CRAFT - spans 2 cols, 1 row */}
        <div className="bento-card md:col-span-2 md:row-span-1 relative group overflow-hidden border border-slate-800 bg-[#0a0d14] cursor-pointer hover:border-sandstone/20 transition-colors duration-500">
          <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] group-hover:opacity-[0.05] transition-opacity duration-700"></div>
          
          <div className="absolute top-6 left-6 text-sandstone text-xs tracking-[0.3em] z-20 group-hover:translate-x-1 transition-transform duration-500">05 CRAFT</div>
          
          <div className="absolute bottom-6 left-6 right-8 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
            <h3 className="font-serif text-2xl text-slate-200">Living Stone</h3>
            <p className="text-slate-500 text-sm mt-1">Intricate carvings that breathe life into granite.</p>
          </div>
        </div>

        {/* 06 LEGACY - spans 1 col, 1 row */}
        <div className="bento-card md:col-span-1 md:row-span-1 relative group overflow-hidden bg-sandstone cursor-pointer flex flex-col justify-between p-6">
          <div className="absolute inset-0 bg-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
          <div className="text-obsidian font-semibold text-xs tracking-[0.3em] z-10 group-hover:translate-x-1 transition-transform duration-500">06 LEGACY</div>
          <h3 className="font-serif text-3xl text-obsidian font-bold leading-tight group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 origin-bottom-left z-10" style={{ willChange: "transform" }}>
            A STORY <br />YET TO BE <br />TOLD.
          </h3>
        </div>

        {/* 07 STORY - spans 1 col, 1 row */}
        <div className="bento-card md:col-span-1 md:row-span-1 relative group overflow-hidden border border-slate-800 bg-[#0B0F19] cursor-pointer hover:border-sandstone/30 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-obsidian/90 to-sandstone/10 z-0"></div>
          
          <div className="absolute top-6 left-6 text-sandstone text-xs tracking-[0.3em] z-20 group-hover:translate-x-1 transition-transform duration-500">07 STORY</div>
          
          <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
            <h3 className="font-serif text-2xl text-slate-200 mb-2">The Stones Remember</h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">Every ruin carries a fragment of a city, a culture, and a story that still survives.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
