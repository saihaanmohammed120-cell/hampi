
export function Navigation() {
  const navItems = ["STORY", "ARCHITECTURE", "CULTURE", "LEGACY"];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center glassmorphism">
      <div className="text-xl font-serif tracking-widest font-semibold text-sandstone">
        HAMPI
      </div>
      
      <div className="hidden md:flex space-x-12">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => handleScroll(e, item.toLowerCase())}
            className="text-sm tracking-[0.2em] text-slate-300 hover:text-saffron transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </div>

      <div>
        <button 
          onClick={(e) => handleScroll(e as any, 'story')}
          className="px-6 py-2 border border-sandstone/30 text-sandstone text-sm tracking-[0.2em] hover:bg-sandstone hover:text-obsidian transition-all duration-300"
        >
          ENTER
        </button>
      </div>
    </nav>
  );
}
