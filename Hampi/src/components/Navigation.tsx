import { TopNav } from '@astryxdesign/core/TopNav';
import { Link } from '@astryxdesign/core/Link';
import { Button } from '@astryxdesign/core/Button';

export function Navigation() {
  // Label and the section id it scrolls to. The two round-4 sections sit
  // right after the bento, so PEOPLE and HOW follow TURNS in the nav.
  const navItems = [
    { label: "STORY", id: "story" },
    { label: "TURNS", id: "turns" },
    { label: "PEOPLE", id: "turns-detail" },
    { label: "HOW", id: "how-it-works" },
    { label: "WHY", id: "why" },
    { label: "GLANCE", id: "at-a-glance" },
    { label: "TODAY", id: "today" },
  ];

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
            AI HISTORY
          </div>
        }
        centerContent={
          // Links show from lg up. At 768 (md) seven links squeeze the
          // brand against STORY with no gap, so they stay hidden there,
          // the same as on phones. Verified by screenshot at 768/1024/1440.
          <div className="hidden lg:flex space-x-6 xl:space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                isStandalone
                className="py-3"
              >
                {item.label}
              </Link>
            ))}
          </div>
        }
        endContent={
          <Button
            label="ENTER"
            variant="secondary"
            size="lg"
            onClick={() => scrollToId('story')}
          />
        }
      />
    </div>
  );
}
