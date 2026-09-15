import { ArrowRight } from "lucide-react";

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
        
        <div className="text-sandstone tracking-[0.4em] text-xs font-semibold mb-8">
          LEGACY
        </div>
        
        <h2 className="font-serif text-5xl md:text-7xl text-slate-100 mb-12 max-w-3xl leading-tight">
          THE STONES ARE <br className="hidden md:block"/>
          <span className="text-sandstone italic">STILL SPEAKING.</span>
        </h2>
        
        <button className="group flex items-center gap-4 bg-transparent border border-sandstone/30 text-sandstone px-10 py-5 font-semibold tracking-widest text-sm hover:bg-sandstone hover:text-obsidian transition-all duration-500 mb-32">
          ENTER HAMPI
          <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
        </button>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 mt-16 text-[0.65rem] tracking-[0.3em] text-slate-500">
          <div className="flex gap-8 mb-6 md:mb-0">
            <span className="hover:text-sandstone transition-colors cursor-pointer">TIME-WEAVE</span>
            <span className="hover:text-sandstone transition-colors cursor-pointer">CULTURAL RENAISSANCE</span>
          </div>
          <div className="flex gap-8">
            <span>HAMPI, INDIA</span>
            <span>© 2026</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
