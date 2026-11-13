import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { ProgressBar } from '@astryxdesign/core/ProgressBar';

gsap.registerPlugin(ScrollTrigger);

// Small neural network layers for the chapter 05 visual.
const NET_X = [40, 150, 260];
const NET_Y = [
  [40, 80, 120, 160],
  [25, 60, 95, 130, 165],
  [55, 100, 145],
];

const CHAPTERS = [
  { id: "chapter-01", label: "01 THE QUESTION", title: "The Imitation Game", body: "Turing asks if machines can think, and proposes the imitation game.", year: "[ 1950 ]" },
  { id: "chapter-02", label: "02 THE NAME", title: "A Field Is Named", body: "A summer workshop at Dartmouth names the field artificial intelligence.", year: "[ 1956 ]" },
  { id: "chapter-03", label: "03 THE WINTERS", title: "Two Long Winters", body: "Promises outrun results, funding is cut, and the field freezes twice.", year: "[ 1973 – 1987 ]" },
  { id: "chapter-04", label: "04 THE COMEBACK", title: "Machines Win", body: "Machines beat the chess champion, win Jeopardy, and learn to see.", year: "[ 1997 – 2012 ]" },
  { id: "chapter-05", label: "05 THE TRANSFORMER", title: "A New Design", body: "One paper gives AI a new design, and language models take off.", year: "[ 2017 ]" },
  { id: "chapter-06", label: "06 AI FOR EVERYONE", title: "A Billion Users", body: "ChatGPT puts AI in front of a billion people.", year: "[ 2022 – TODAY ]" },
];

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [progress, setProgress] = useState(0);

  // Chapter jump targets: the middle of each chapter's fully visible
  // window. Six chapters over +=600% (12 half-units): ch1 is only fully
  // visible at progress 0 (its fade-out starts at once), ch2 [1.5/12,
  // 2.5/12], ch3 [4/12, 5/12], ch4 [6.5/12, 7.5/12], ch5 [9/12, 10/12],
  // ch6 [11.5/12, 1].
  const CHAPTER_PROGRESS = [0, 2 / 12, 4.5 / 12, 7 / 12, 9.5 / 12, 0.979];

  const jumpToChapter = (index: number) => {
    const st = triggerRef.current;
    if (st) {
      const y = st.start + CHAPTER_PROGRESS[index] * (st.end - st.start);
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(y, { duration: 1.4 });
      else window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    // Reduced motion: no pin exists, chapters are stacked in flow.
    document.querySelector(`#chapter-0${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline for the entire pinned section.
    // Six chapters, one viewport of scroll each: end "+=600%".
    // Each chapter gets 2.5 units of timeline time: fade in, hold, fade out.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",
        pin: pinRef.current,
        scrub: 1, // Smooth scrub
        onUpdate: (self) => {
          // Update the progress indicator based on scroll percentage
          const progress = self.progress;
          const chapters = document.querySelectorAll('.nav-chapter');

          // Lift GSAP progress into React state for the Astryx ProgressBar
          setProgress(progress * 100);

          chapters.forEach((chapter, index) => {
            const active = index === CHAPTERS.length - 1
              ? progress >= index / CHAPTERS.length
              : progress >= index / CHAPTERS.length && progress < (index + 1) / CHAPTERS.length;
            chapter.classList.toggle('is-active', active);
            if (active) {
              chapter.classList.add('text-slate-200');
              chapter.classList.remove('text-slate-400');
            } else {
              chapter.classList.remove('text-slate-200');
              chapter.classList.add('text-slate-400');
            }
          });
        }
      }
    });

    // Keep the ScrollTrigger so the chapter jump buttons can work out
    // each chapter's scroll position from its progress.
    triggerRef.current = tl.scrollTrigger ?? null;

    // 01 THE QUESTION (already visible at start, so we just animate it out)
    tl.to("#chapter-01 .fg-text", { opacity: 0, y: -50, duration: 1 }, 0);
    tl.to("#chapter-01 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 0);
    tl.to("#chapter-01", { opacity: 0, duration: 1 }, 0);

    // 02 THE NAME (animate in, then out)
    tl.fromTo("#chapter-02", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5);
    tl.fromTo("#chapter-02 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 0.5);
    tl.fromTo("#chapter-02 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 0.5);
    
    tl.to("#chapter-02 .fg-text", { opacity: 0, y: -50, duration: 1 }, 2.5);
    tl.to("#chapter-02 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 2.5);
    tl.to("#chapter-02", { opacity: 0, duration: 1 }, 2.5);

    // 03 THE WINTERS (animate in, then out)
    tl.fromTo("#chapter-03", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 3);
    tl.fromTo("#chapter-03 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 3);
    tl.fromTo("#chapter-03 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 3);
    
    tl.to("#chapter-03 .fg-text", { opacity: 0, y: -50, duration: 1 }, 5);
    tl.to("#chapter-03 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 5);
    tl.to("#chapter-03", { opacity: 0, duration: 1 }, 5);

    // 04 THE COMEBACK (animate in, then out)
    tl.fromTo("#chapter-04", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 5.5);
    tl.fromTo("#chapter-04 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 5.5);
    tl.fromTo("#chapter-04 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 5.5);
    
    tl.to("#chapter-04 .fg-text", { opacity: 0, y: -50, duration: 1 }, 7.5);
    tl.to("#chapter-04 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 7.5);
    tl.to("#chapter-04", { opacity: 0, duration: 1 }, 7.5);

    // 05 THE TRANSFORMER (animate in, then out)
    tl.fromTo("#chapter-05", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 8);
    tl.fromTo("#chapter-05 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 8);
    tl.fromTo("#chapter-05 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 8);
    
    tl.to("#chapter-05 .fg-text", { opacity: 0, y: -50, duration: 1 }, 10);
    tl.to("#chapter-05 .mg-visual", { opacity: 0, y: -100, duration: 1 }, 10);
    tl.to("#chapter-05", { opacity: 0, duration: 1 }, 10);

    // 06 AI FOR EVERYONE (animate in, stays)
    tl.fromTo("#chapter-06", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 10.5);
    tl.fromTo("#chapter-06 .fg-text", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 10.5);
    tl.fromTo("#chapter-06 .mg-visual", { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1 }, 10.5);
    
    // Background parallax movement
    tl.to(".bg-layer", { yPercent: 20, ease: "none", duration: 12 }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="story" className="relative w-full bg-obsidian border-t border-slate-900/50">
      
      {/* 
        ScrollTrigger Pinning Structure:
        The GSAP pin creates its own spacer (pin height + scroll distance)
        which IS the scroll room, so this wrapper must not set its own
        fixed height. It used to be h-[300vh], which double-counted the
        scroll room: the spacer (3600px) overflowed the wrapper (2700px)
        by 900px, extending the page 238px past the footer and leaving
        the pinned Timeline content visible below the footer.
      */}
      <div className="relative w-full">
        
        <div ref={pinRef} className="timeline-pin h-screen w-full overflow-hidden flex items-center relative">
          
          {/* Background Layer (Slow Movement) */}
          <div className="bg-layer absolute inset-[-10%] bg-[radial-gradient(ellipse_at_center,rgba(10,13,20,0)_0%,rgba(11,15,25,1)_100%)] z-10 pointer-events-none grid-lines opacity-20"></div>

          <div className="container mx-auto px-8 relative z-20 w-full h-full flex flex-col justify-center">
            
            <Heading level={2} className="timeline-watermark absolute top-24 left-8 z-30 opacity-20 pointer-events-none">
              FROM ONE QUESTION <br className="md:hidden" />
              TO A BILLION <span className="text-sandstone italic">USERS.</span>
            </Heading>

            {/* Chapter 01: THE QUESTION */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2" id="chapter-01">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="fg-text w-full md:w-1/2" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">01 THE QUESTION</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">The Imitation <br/> Game</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      Turing asks if machines can think, and proposes the imitation game.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-slate-900/20 glassmorphism flex items-center justify-center relative overflow-hidden group" style={{ willChange: "transform, opacity" }}>
                   {/* Photo: Glen Beck and Betty Snyder programming the ENIAC in the 1940s (Wikimedia Commons) */}
                   <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Glen_Beck_and_Betty_Snyder_program_the_ENIAC_in_building_328_at_the_Ballistic_Research_Laboratory.jpg/1280px-Glen_Beck_and_Betty_Snyder_program_the_ENIAC_in_building_328_at_the_Ballistic_Research_Laboratory.jpg" alt="Glen Beck and Betty Snyder programming the ENIAC computer in the 1940s" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#0B0F19]/70"></div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-transparent to-sandstone/10"></div>
                   
                   {/* THE QUESTION Visual: the imitation game, two voices and a question mark */}
                   <div className="relative z-10 flex flex-col gap-4 w-3/4">
                     <div className="flex items-center gap-3">
                       <span className="text-[0.6rem] tracking-[0.3em] text-sandstone/70 w-16">HUMAN</span>
                       <div className="border border-sandstone/30 bg-obsidian/60 rounded-full px-4 py-2 flex gap-1.5">
                         <span className="w-1.5 h-1.5 bg-sandstone/60 rounded-full"></span>
                         <span className="w-1.5 h-1.5 bg-sandstone/60 rounded-full"></span>
                         <span className="w-1.5 h-1.5 bg-sandstone/60 rounded-full"></span>
                       </div>
                     </div>
                     <div className="flex items-center gap-3 justify-end">
                       <div className="border border-saffron/30 bg-saffron/10 rounded-full px-4 py-2">
                         <span className="font-serif text-saffron text-lg leading-none">?</span>
                       </div>
                       <span className="text-[0.6rem] tracking-[0.3em] text-saffron/70 w-16 text-right">MACHINE</span>
                     </div>
                     <p className="text-center text-[0.65rem] tracking-[0.3em] text-slate-400 mt-2">CAN YOU TELL WHICH IS WHICH?</p>
                   </div>

                   <span className="text-sandstone/60 tracking-[0.2em] text-xs absolute bottom-4 right-4">[ 1950 ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 02: THE NAME */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-02">
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div className="fg-text w-full md:w-1/2 md:pl-12" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">02 THE NAME</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">A Field <br/> Is Named</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      A summer workshop at Dartmouth names the field artificial intelligence.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#060910] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   {/* Photo: the Dartmouth College green in autumn (Wikimedia Commons) */}
                   <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Dartmouth_College_campus_2007-10-20_34%2C_crop_1.jpg/1280px-Dartmouth_College_campus_2007-10-20_34%2C_crop_1.jpg" alt="The Dartmouth College green in autumn" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#0B0F19]/65"></div>
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,196,48,0.05)_0%,transparent_60%)]"></div>
                   
                   {/* THE NAME Visual: a blackboard naming the field */}
                   <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                     <p className="font-serif text-sandstone text-2xl md:text-3xl tracking-wide">ARTIFICIAL</p>
                     <p className="font-serif text-slate-200 text-2xl md:text-3xl tracking-wide">INTELLIGENCE</p>
                     <div className="w-24 h-px bg-sandstone/40 my-2"></div>
                     <p className="text-[0.65rem] tracking-[0.4em] text-slate-400">DARTMOUTH · SUMMER 1956</p>
                   </div>

                   <span className="text-saffron/60 tracking-[0.2em] text-xs absolute bottom-4 left-4">[ 1956 ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 03: THE WINTERS */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-03">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="fg-text w-full md:w-1/2" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">03 THE WINTERS</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">Two Long <br/> Winters</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      Promises outrun results, funding is cut, and the field freezes twice.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#04060a] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   {/* Photo: a snow-covered sidewalk in Dallas during a snowstorm (Wikimedia Commons) */}
                   <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Deep_Ellum_sidewalk_covered_with_snow_in_Dallas_snow_storm_2021.jpg/1280px-Deep_Ellum_sidewalk_covered_with_snow_in_Dallas_snow_storm_2021.jpg" alt="A snow-covered sidewalk in Dallas during a snowstorm" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#0B0F19]/70"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent z-10"></div>
                   
                   {/* THE WINTERS Visual: funding falls twice, once in the
                       1970s and once in 1987, with the expert-systems boom
                       of the 1980s in between. Four bars, two dips. */}
                   <div className="relative z-20 flex items-end gap-5 h-40">
                     <div className="flex flex-col items-center gap-2">
                       <div className="w-9 h-32 bg-sandstone/40 border border-sandstone/30"></div>
                       <span className="text-[0.65rem] tracking-[0.2em] text-slate-400">1960s</span>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                       <div className="w-9 h-8 bg-sandstone/20 border border-sandstone/10"></div>
                       <span className="text-[0.65rem] tracking-[0.2em] text-slate-400">1970s</span>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                       <div className="w-9 h-20 bg-sandstone/30 border border-sandstone/20"></div>
                       <span className="text-[0.65rem] tracking-[0.2em] text-slate-400">1980s</span>
                     </div>
                     <div className="flex flex-col items-center gap-2">
                       <div className="w-9 h-8 bg-sandstone/20 border border-sandstone/10"></div>
                       <span className="text-[0.65rem] tracking-[0.2em] text-slate-400">1987</span>
                     </div>
                   </div>
                   <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.4em] text-slate-400 z-20">FUNDING</p>

                   <span className="text-slate-400 tracking-[0.2em] text-xs absolute bottom-4 right-4 z-20">[ 1973 – 1987 ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 04: THE COMEBACK */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-04">
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div className="fg-text w-full md:w-1/2 md:pl-12" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">04 THE COMEBACK</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">Machines <br/> Win</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      Machines beat the chess champion, win Jeopardy, and learn to see.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#060910] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   {/* Photo: young people playing chess outdoors in Kilifi, Kenya (Wikimedia Commons) */}
                   <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Chess_game_in_Kilifi_Kenya.jpg/1280px-Chess_game_in_Kilifi_Kenya.jpg" alt="Young people playing chess outdoors in Kilifi, Kenya" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#0B0F19]/65"></div>
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(244,196,48,0.05)_0%,transparent_60%)]"></div>
                   
                   {/* THE COMEBACK Visual: a chess board with a knight */}
                   <div className="relative z-10 grid grid-cols-8 w-44 h-44 md:w-56 md:h-56 border border-sandstone/30">
                     {Array.from({ length: 64 }, (_, i) => {
                       const row = Math.floor(i / 8);
                       const col = i % 8;
                       const dark = (row + col) % 2 === 0;
                       const knight = i === 27;
                       return (
                         <div key={i} className={`flex items-center justify-center ${dark ? 'bg-sandstone/15' : 'bg-transparent'}`}>
                           {knight && <span className="text-saffron text-2xl md:text-3xl leading-none">♞</span>}
                         </div>
                       );
                     })}
                   </div>

                   <span className="text-saffron/60 tracking-[0.2em] text-xs absolute bottom-4 left-4">[ 1997 – 2012 ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 05: THE TRANSFORMER */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-05">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="fg-text w-full md:w-1/2" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">05 THE TRANSFORMER</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">A New <br/> Design</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      One paper gives AI a new design, and language models take off.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#04060a] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   {/* Photo: a close-up of electronic parts on a circuit board (Wikimedia Commons) */}
                   <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Macro_circuit_board.JPG/1280px-Macro_circuit_board.JPG" alt="A close-up of electronic parts on a circuit board" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#0B0F19]/70"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent z-10"></div>
                   
                   {/* THE TRANSFORMER Visual: a small neural network */}
                   <svg viewBox="0 0 300 190" className="relative z-20 w-64 md:w-80 h-auto" role="img" aria-label="A neural network: three layers of nodes wired together">
                     {NET_Y[0].map((y1, i) =>
                       NET_Y[1].map((y2, j) => (
                         <line key={`a-${i}-${j}`} x1={NET_X[0]} y1={y1} x2={NET_X[1]} y2={y2} stroke="rgba(194,163,130,0.2)" strokeWidth="1" />
                       ))
                     )}
                     {NET_Y[1].map((y1, i) =>
                       NET_Y[2].map((y2, j) => (
                         <line key={`b-${i}-${j}`} x1={NET_X[1]} y1={y1} x2={NET_X[2]} y2={y2} stroke="rgba(194,163,130,0.2)" strokeWidth="1" />
                       ))
                     )}
                     <line x1={NET_X[0]} y1={NET_Y[0][1]} x2={NET_X[1]} y2={NET_Y[1][2]} stroke="rgba(244,196,48,0.7)" strokeWidth="1.5" />
                     <line x1={NET_X[1]} y1={NET_Y[1][2]} x2={NET_X[2]} y2={NET_Y[2][1]} stroke="rgba(244,196,48,0.7)" strokeWidth="1.5" />
                     {NET_Y.map((layer, li) =>
                       layer.map((y, ni) => (
                         <circle key={`${li}-${ni}`} cx={NET_X[li]} cy={y} r={li === 1 && ni === 2 ? 7 : 4.5} fill={li === 1 && ni === 2 ? "rgba(244,196,48,0.25)" : "#0B0F19"} stroke={li === 1 && ni === 2 ? "#f4c430" : "rgba(194,163,130,0.5)"} strokeWidth="1.5" />
                       ))
                     )}
                   </svg>

                   <span className="text-slate-400 tracking-[0.2em] text-xs absolute bottom-4 right-4 z-20">[ 2017 ]</span>
                </div>
              </div>
            </div>

            {/* Chapter 06: AI FOR EVERYONE */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 opacity-0" id="chapter-06">
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div className="fg-text w-full md:w-1/2 md:pl-12" style={{ willChange: "transform, opacity" }}>
                  <div className="mb-4"><Text type="label" color="accent">06 AI FOR EVERYONE</Text></div>
                  <Heading level={3} className="mb-6 drop-shadow-lg">A Billion <br/> Users</Heading>
                  <div className="max-w-md">
                    <Text type="body">
                      ChatGPT puts AI in front of a billion people.
                    </Text>
                  </div>
                </div>
                <div className="mg-visual w-full md:w-1/2 h-64 md:h-[28rem] border border-slate-800/50 bg-[#060910] glassmorphism flex items-center justify-center relative overflow-hidden" style={{ willChange: "transform, opacity" }}>
                   {/* Photo: people on a train, each looking at a phone (Wikimedia Commons) */}
                   <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Diverse_people_using_phones.jpeg/1280px-Diverse_people_using_phones.jpeg" alt="People on a train, each looking at a phone" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-[#0B0F19]/65"></div>
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(244,196,48,0.05)_0%,transparent_60%)]"></div>
                   
                   {/* AI FOR EVERYONE Visual: a chat window anyone can use */}
                   <div className="relative z-10 flex flex-col gap-3 w-3/4 border border-slate-800/60 bg-obsidian/70 rounded-lg p-4">
                     <div className="flex gap-1.5">
                       <span className="w-2 h-2 bg-sandstone/30 rounded-full"></span>
                       <span className="w-2 h-2 bg-sandstone/30 rounded-full"></span>
                       <span className="w-2 h-2 bg-sandstone/30 rounded-full"></span>
                     </div>
                     <div className="flex justify-end">
                       <div className="bg-sandstone/15 border border-sandstone/20 rounded-lg rounded-br-none px-3 py-2 text-xs text-slate-200">Can you help me write?</div>
                     </div>
                     <div className="flex justify-start">
                       <div className="bg-saffron/10 border border-saffron/20 rounded-lg rounded-bl-none px-3 py-2 text-xs text-slate-200">Of course. Let us start.</div>
                     </div>
                     <p className="text-center text-[0.6rem] tracking-[0.3em] text-saffron/70 mt-1">MORE THAN A BILLION USERS A WEEK</p>
                   </div>

                   <span className="text-saffron/60 tracking-[0.2em] text-xs absolute bottom-4 left-4">[ 2022 – TODAY ]</span>
                </div>
              </div>
            </div>

          </div>

          {/* Progress Indicator (Pinned to bottom of screen during scroll) */}
          <div className="timeline-progress absolute bottom-8 left-8 right-8 flex flex-col z-30">
            <div className="timeline-progress-bar w-full mb-4">
              <ProgressBar label="Timeline progress" value={progress} max={100} variant="accent" isLabelHidden hasValueLabel={false} />
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.6rem] tracking-[0.3em] text-sandstone/70">AI HISTORY</p>
              <div className="nav-chapters flex items-center gap-4 text-[0.6rem] tracking-[0.3em] font-medium uppercase">
                <button type="button" onClick={() => jumpToChapter(0)} aria-label="Jump to chapter: The Question" className="nav-chapter text-slate-200 transition-colors duration-300 min-h-[44px] px-1 py-3 inline-flex items-center cursor-pointer">The Question</button>
                <span className="nav-arrow text-slate-500">→</span>
                <button type="button" onClick={() => jumpToChapter(1)} aria-label="Jump to chapter: The Name" className="nav-chapter text-slate-400 transition-colors duration-300 min-h-[44px] px-1 py-3 inline-flex items-center cursor-pointer">The Name</button>
                <span className="nav-arrow text-slate-500">→</span>
                <button type="button" onClick={() => jumpToChapter(2)} aria-label="Jump to chapter: The Winters" className="nav-chapter text-slate-400 transition-colors duration-300 min-h-[44px] px-1 py-3 inline-flex items-center cursor-pointer">The Winters</button>
                <span className="nav-arrow text-slate-500">→</span>
                <button type="button" onClick={() => jumpToChapter(3)} aria-label="Jump to chapter: The Comeback" className="nav-chapter text-slate-400 transition-colors duration-300 min-h-[44px] px-1 py-3 inline-flex items-center cursor-pointer">The Comeback</button>
                <span className="nav-arrow text-slate-500">→</span>
                <button type="button" onClick={() => jumpToChapter(4)} aria-label="Jump to chapter: The Transformer" className="nav-chapter text-slate-400 transition-colors duration-300 min-h-[44px] px-1 py-3 inline-flex items-center cursor-pointer">The Transformer</button>
                <span className="nav-arrow text-slate-500">→</span>
                <button type="button" onClick={() => jumpToChapter(5)} aria-label="Jump to chapter: AI for Everyone" className="nav-chapter text-slate-400 transition-colors duration-300 min-h-[44px] px-1 py-3 inline-flex items-center cursor-pointer">AI for Everyone</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
