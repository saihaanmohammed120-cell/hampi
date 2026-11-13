import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { TurnDetails } from "./components/TurnDetails";
import { HowItWorks } from "./components/HowItWorks";
import { NumbersStrip } from "./components/NumbersStrip";
import { Timeline } from "./components/Timeline";
import { ThenAndNow } from "./components/ThenAndNow";
import { AtAGlance } from "./components/AtAGlance";
import { KeyPeople } from "./components/KeyPeople";
import { Quiz } from "./components/Quiz";
import { Sources } from "./components/Sources";
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
          <TurnDetails />
          <HowItWorks />
          <NumbersStrip />
          <Timeline />
          <ThenAndNow />
          <AtAGlance />
          <KeyPeople />
          <Quiz />
          <Sources />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
