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
    <section ref={containerRef} id="why" className="w-full bg-[#080b14] py-32 border-t border-slate-900/50 relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay film-grain pointer-events-none"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="md:w-1/2">
            <div className="mb-6">
              <Text type="label" color="accent">WHY IT MATTERS</Text>
            </div>
            <Heading level={3}>
              THE FIELD WAS BUILT BY <br /> PEOPLE WHO KEPT GOING.
            </Heading>
          </div>
          <div className="md:w-1/3">
            <Text type="large">
              AI did not arrive all at once. It grew idea by idea, from a question in 1950 to the tools of 2026, and the people who kept going through two winters are the reason those tools exist.
            </Text>
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/San_Francisco_Hackathon_2012-1-11.jpg/1280px-San_Francisco_Hackathon_2012-1-11.jpg" alt="A builder working on a laptop at a San Francisco hackathon in 2012" loading="lazy" decoding="async" className="w-full h-64 md:h-80 object-cover object-[20%_80%] border border-slate-800/50" />
        </div>

        <div className="pt-12 border-t border-white/5">
          <Grid columns={{ minWidth: 280, max: 3 }} gap={8}>
            <div className="why-column relative flex flex-col gap-4">
              <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 select-none font-serif text-[7rem] leading-none text-slate-100/[0.05]">01</span>
              <Text type="label" color="accent">01 - ASK</Text>
              <Heading level={3} className="relative z-10">Every era starts with a question.</Heading>
            </div>

            <div className="why-column relative flex flex-col gap-4">
              <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 select-none font-serif text-[7rem] leading-none text-slate-100/[0.05]">02</span>
              <Text type="label" color="accent">02 - LEARN</Text>
              <Heading level={3} className="relative z-10">Machines learn from examples, not rules.</Heading>
            </div>

            <div className="why-column relative flex flex-col gap-4">
              <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 select-none font-serif text-[7rem] leading-none text-slate-100/[0.05]">03</span>
              <Text type="label" color="accent">03 - KEEP GOING</Text>
              <Heading level={3} className="relative z-10">Two winters could not stop the field.</Heading>
            </div>
          </Grid>
        </div>
        
      </div>
    </section>
  );
}
