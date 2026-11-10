import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Grid } from '@astryxdesign/core/Grid';

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
            <div className="mb-6">
              <Text type="label" color="accent">WHY TIME-WEAVE</Text>
            </div>
            <Heading level={3}>
              HISTORY WAS NEVER MEANT <br /> TO BE READ IN A LIST.
            </Heading>
          </div>
          <div className="md:w-1/3">
            <Text type="large">
              TIME-WEAVE turns Hampi into a spatial narrative, where every scroll reveals another layer of architecture, culture and memory.
            </Text>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5">
          <Grid columns={{ minWidth: 280, max: 3 }} gap={8}>
            <div className="why-column flex flex-col gap-4">
              <Text type="label" color="accent">01 — SEE</Text>
              <Heading level={3}>Architecture becomes the interface.</Heading>
            </div>

            <div className="why-column flex flex-col gap-4">
              <Text type="label" color="accent">02 — TRAVEL</Text>
              <Heading level={3}>Scroll becomes the timeline.</Heading>
            </div>

            <div className="why-column flex flex-col gap-4">
              <Text type="label" color="accent">03 — REMEMBER</Text>
              <Heading level={3}>The ruins become the story.</Heading>
            </div>
          </Grid>
        </div>
        
      </div>
    </section>
  );
}
