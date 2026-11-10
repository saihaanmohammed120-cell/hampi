import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { ProgressBar } from '@astryxdesign/core/ProgressBar';

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline for the entire pinned section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: pinRef.current,
        scrub: 1, // Smooth scrub
        onUpdate: (self) => {
          // Update the progress indicator based on scroll percentage
          const progress = self.progress;
          const chapters = document.querySelectorAll('.nav-chapter');

          // Lift GSAP progress into React state for the Astryx ProgressBar
          setProgress(progress * 100);

          chapters.forEach((chapter, index) => {
            if (progress >= index * 0.33 && progress < (index + 1) * 0.33) {
              chapter.classList.add('text-slate-200');
              chapter.classList.remove('text-slate-500');
            } else {
              chapter.classList.remove('text-slate-200');
              chapter.classList.add('text-slate-500');
            }
          });
        }
      }
    });

    // 01 ARRIVAL (already visible at start, so we just animate it out)
    tl.to("#chapter-01 .fg-text", { opacity: 0, y: -50, duration: 1 }, 0);
    tl.to("#chapter-01 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 0);
    tl.to("#chapter-01", { opacity: 0, duration: 1 }, 0);

    // 02 FLOURISH (animate in, then out)
    tl.fromTo("#chapter-02", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
    tl.fromTo("#chapter-02 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 0.5);
    tl.fromTo("#chapter-02 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 0.5);
    
    tl.to("#chapter-02 .fg-text", { opacity: 0, y: -50, duration: 1 }, 2);
    tl.to("#chapter-02 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 2);
    tl.to("#chapter-02", { opacity: 0, duration: 1 }, 2);

    // 03 MEMORY (animate in)
    tl.fromTo("#chapter-03", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.5);
    tl.fromTo("#chapter-03 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 2.5);
    tl.fromTo("#chapter-03 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 2.5);
    
    // Background parallax movement
    tl.to(".bg-layer", { yPercent: 20, ease: "none", duration: 4 }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="story" className="relative w-full bg-obsidian border-t border-slate-900/50">
      
      {/* 
        ScrollTrigger Pinning Structure: 
        We create a tall container (300vh) to allow scrolling.
        The inner container uses position: sticky (or is pinned by GSAP) to stay in the viewport.
      */}
      <div className="relative h-[300vh] w-full">
        
        <div ref={pinRef} className="h-screen w-full overflow-hidden flex items-center relative">
          
          {/* Background Layer (Slow Movement) */}
          <div className="bg-layer absolute inset-[-10%] bg-[radial-gradient(ellipse_at_center,rgba(10,13,20,0)_0%,rgba(11,15,25,1)_100%)] z-10 pointer-events-none grid-lines opacity-20"></div>

          <div className="container mx-auto px-8 relative z-20 w-full h-full flex flex-col justify-center">
            
            <Heading level={2} className="absolute top-24 left-8 z-30 opacity-20 pointer-events-none">
              AN EMPIRE BUILT <br className="md:hidden" />
              <span className="text-sandstone italic">IN STONE.</span>
            </Heading>

            {/* Chapter 01: ARRIVAL */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2" id="chapter-01">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="fg-text w-full md:w-1/2" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">01 ARRIVAL</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">The Founding <br/> Vision</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      Emerging from the rocky terrain of the Deccan Plateau, a city was born that would rival the greatest capitals of the ancient world.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-slate-900/20 glassmorphism flex items-center justify-center relative overflow-hidden group" style={{ willChange: "transform, opacity" }}>
                   <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-transparent to-sandstone/10"></div>
                   
                   {/* ARRIVAL Visual: Low-contrast landscape / temple silhouette */}
                   <div className="absolute bottom-0 w-full h-[1px] bg-sandstone/20"></div>
                   <div className="absolute bottom-0 flex items-end opacity-40">
                     <div className="w-16 h-32 border-x border-t border-sandstone/20 bg-obsidian relative">
                       <div className="absolute top-2 left-2 w-12 h-12 border border-sandstone/10 rounded-full"></div>
                     </div>
                     <div className="w-24 h-48 border-x border-t border-sandstone/30 bg-[#0B0F19] relative mx-4">
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 border-b-0 border border-sandstone/20 rotate-45"></div>
                       <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-sandstone/10 to-transparent"></div>
                     </div>
                     <div className="w-12 h-24 border-x border-t border-sandstone/10 bg-obsidian"></div>
                   </div>
                   {/* Fine Grid */}
                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                   <span className="text-sandstone/30 tracking-[0.2em] text-xs absolute bottom-4 right-4">[ 1336 CE ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 02: FLOURISH */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-02">
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div className="fg-text w-full md:w-1/2 md:pl-12" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">02 FLOURISH</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">The Golden <br/> Era</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      Trade routes converging, markets overflowing with diamonds, and architecture reaching unprecedented heights of complexity and devotion.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#060910] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,196,48,0.05)_0%,transparent_60%)]"></div>
                   
                   {/* FLOURISH Visual: Repeating arches and perspective */}
                   <div className="absolute inset-0 flex justify-center items-center opacity-70" style={{ transform: 'perspective(400px) rotateX(10deg)' }}>
                     <div className="w-48 h-64 border-2 border-saffron/20 rounded-t-full absolute translate-z-[-100px] opacity-30"></div>
                     <div className="w-56 h-72 border-2 border-sandstone/30 rounded-t-full absolute translate-z-[-50px] opacity-50"></div>
                     <div className="w-64 h-80 border-2 border-sandstone/40 rounded-t-full absolute"></div>
                     
                     {/* Pillars */}
                     <div className="absolute left-[calc(50%-8rem)] w-4 h-full border-x border-sandstone/20 bg-gradient-to-b from-transparent to-[#0B0F19]"></div>
                     <div className="absolute right-[calc(50%-8rem)] w-4 h-full border-x border-sandstone/20 bg-gradient-to-b from-transparent to-[#0B0F19]"></div>
                   </div>

                   <span className="text-saffron/30 tracking-[0.2em] text-xs absolute bottom-4 left-4">[ 1509 CE ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 03: MEMORY */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-03">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="fg-text w-full md:w-1/2" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">03 MEMORY</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">Echoes in <br/> Granite</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      Though the empire fell, the stones remained. A testament to human endeavor, standing silent yet speaking volumes across centuries.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#04060a] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent z-10"></div>
                   
                   {/* MEMORY Visual: Fading geometry and dust */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-30 z-0">
                     <div className="w-40 h-40 border-b border-r border-slate-500/30 rotate-45 transform-gpu blur-[1px]"></div>
                     <div className="w-32 h-32 border-t border-l border-slate-600/20 rotate-12 absolute blur-[2px]"></div>
                     <div className="w-48 h-[1px] bg-sandstone/20 absolute -rotate-45"></div>
                   </div>
                   
                   {/* Subtle dust particles (CSS) */}
                   <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-sandstone/40 rounded-full blur-[1px]"></div>
                   <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-slate-500/20 rounded-full blur-[2px]"></div>
                   <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-saffron/20 rounded-full blur-[1px]"></div>

                   <span className="text-slate-600 tracking-[0.2em] text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">[ 1565 CE - PRESENT ]</span>
                </div>
              </div>
            </div>

          </div>

          {/* TIME-WEAVE Progress Indicator (Pinned to bottom of screen during scroll) */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col z-30">
            <div className="w-full mb-4">
              <ProgressBar label="Timeline progress" value={progress} max={100} variant="accent" isLabelHidden hasValueLabel={false} />
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.6rem] tracking-[0.3em] text-sandstone/70">TIME-WEAVE</p>
              <div className="flex items-center gap-4 text-[0.6rem] tracking-[0.3em] font-medium uppercase">
                <span className="nav-chapter text-slate-200 transition-colors duration-300">Arrival</span>
                <span className="text-slate-700">→</span>
                <span className="nav-chapter text-slate-500 transition-colors duration-300">Flourish</span>
                <span className="text-slate-700">→</span>
                <span className="nav-chapter text-slate-500 transition-colors duration-300">Memory</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
