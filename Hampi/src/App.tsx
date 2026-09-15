import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { Timeline } from "./components/Timeline";
import { WhyTimeWeave } from "./components/WhyTimeWeave";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-obsidian text-slate-200">
        {/* Global Film Grain */}
        <div className="film-grain"></div>

        <Navigation />
        
        <main>
          <Hero />
          <WhyTimeWeave />
          <BentoGrid />
          <Timeline />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
