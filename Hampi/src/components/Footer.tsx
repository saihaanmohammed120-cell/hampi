import { ArrowUp } from "lucide-react";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Button } from '@astryxdesign/core/Button';

export function Footer() {
  const scrollToId = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="today" className="w-full bg-obsidian border-t border-slate-900/50 relative overflow-hidden">
      
      {/* Subtle Architectural Background Treatment */}
      <div className="absolute inset-0 z-0 flex justify-center opacity-[0.03] pointer-events-none">
        <div className="w-[1200px] h-[1200px] border border-white rounded-full absolute -top-1/2"></div>
        <div className="w-[1000px] h-[1000px] border border-white rounded-full absolute -top-[40%]"></div>
        <div className="w-px h-full bg-white absolute"></div>
        <div className="w-full h-px bg-white absolute top-1/2"></div>
      </div>
      
      {/* Fine Grid and Grain */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay film-grain"></div>

      <div className="container mx-auto px-8 pt-32 pb-16 flex flex-col items-center justify-center relative z-10 text-center">
        
        <div className="mb-8">
          <Text type="label" color="accent">THE STORY IS STILL BEING WRITTEN</Text>
        </div>
        
        <Heading level={2} type="display-2" className="mb-12 max-w-3xl">
          THE STORY IS <br className="hidden md:block"/>
          <span className="text-sandstone italic">STILL BEING WRITTEN.</span>
        </Heading>
        
        <div className="mb-24">
          <Button label="BACK TO THE TOP" variant="secondary" size="lg" icon={<ArrowUp size={18} />} onClick={() => scrollToId('hero')} />
        </div>

        {/* Sources: every fact on this page comes from the research file,
            which names Turing (1950), the Dartmouth proposal (1955),
            Nature (1986, 2016), Vaswani et al. (2017), IBM and OpenAI. */}
        <p className="text-[0.65rem] tracking-[0.25em] text-slate-400 text-center mb-16 max-w-2xl leading-relaxed">
          SOURCES: TURING (1950) · DARTMOUTH PROPOSAL (1955) · NATURE (1986, 2016) · VASWANI ET AL. (2017) · IBM · OPENAI
        </p>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 mt-16 text-[0.65rem] tracking-[0.3em] text-slate-400">
          <div className="flex flex-col items-center gap-2 mb-6 md:mb-0 md:flex-row md:gap-8">
            <Text type="label">AI HISTORY</Text>
            <Text type="label">CAN MACHINES THINK? THE QUESTION REMAINS OPEN</Text>
          </div>
          <div className="flex gap-8">
            <Text type="label">1950 - TODAY</Text>
            <Text type="label">© 2026</Text>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
