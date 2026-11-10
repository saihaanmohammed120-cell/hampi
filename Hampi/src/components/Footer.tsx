import { ArrowRight } from "lucide-react";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Button } from '@astryxdesign/core/Button';

export function Footer() {
  return (
    <footer id="legacy" className="w-full bg-obsidian border-t border-slate-900/50 relative overflow-hidden">
      
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
          <Text type="label" color="accent">LEGACY</Text>
        </div>
        
        <Heading level={2} type="display-2" className="mb-12 max-w-3xl">
          THE STONES ARE <br className="hidden md:block"/>
          <span className="text-sandstone italic">STILL SPEAKING.</span>
        </Heading>
        
        <div className="mb-32">
          <Button label="ENTER HAMPI" variant="secondary" icon={<ArrowRight size={18} />} />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 mt-16 text-[0.65rem] tracking-[0.3em] text-slate-500">
          <div className="flex gap-8 mb-6 md:mb-0">
            <Text type="label">TIME-WEAVE</Text>
            <Text type="label">CULTURAL RENAISSANCE</Text>
          </div>
          <div className="flex gap-8">
            <Text type="label">HAMPI, INDIA</Text>
            <Text type="label">© 2026</Text>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
