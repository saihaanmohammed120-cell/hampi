import { TopNav } from '@astryxdesign/core/TopNav';
import { Link } from '@astryxdesign/core/Link';
import { Button } from '@astryxdesign/core/Button';

export function Navigation() {
  const navItems = ["STORY", "ARCHITECTURE", "CULTURE", "LEGACY"];

  const scrollToId = (id: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <TopNav
        heading={
          <div className="text-xl font-serif tracking-widest font-semibold text-sandstone">
            HAMPI
          </div>
        }
        centerContent={
          <div className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleScroll(e, item.toLowerCase())}
                isStandalone
              >
                {item}
              </Link>
            ))}
          </div>
        }
        endContent={
          <Button
            label="ENTER"
            variant="secondary"
            onClick={() => scrollToId('story')}
          />
        }
      />
    </div>
  );
}
