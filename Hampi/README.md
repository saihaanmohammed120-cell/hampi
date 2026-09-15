# HAMPI — STONE REMEMBERS

**TIME-WEAVE / Cultural Renaissance**

A cinematic, scroll-driven digital heritage experience that transforms Hampi's history into an interactive journey through time.

## 1. Problem
Traditional digital heritage experiences often separate history, architecture and culture into static pages and disconnected information. This creates a disjointed, encyclopedic experience rather than an emotional or spatial connection to the ruins.

## 2. Solution
**TIME-WEAVE** makes the scroll position the timeline. It uses architecture, typography, depth, and motion to progressively reveal Hampi. Scrolling naturally transports the user through the eras, unifying storytelling with interaction.

## 3. Creative Concept
The website is designed not as a generic tourism landing page, but as a living time machine and a premium digital museum.
- **Deep Obsidian & Sandstone**: A color palette reflecting granite, twilight, and ancient stone.
- **Cinzel & Inter**: A combination of luxury editorial typography and readable body text.
- **Architectural UI**: Thin grid lines, geometric forms, and subtle film grain to emulate the feeling of archaeological study.

## 4. Key Interactions
- **Cinematic Entrance**: A 2.5s GSAP-driven choreography introducing the narrative before allowing interaction.
- **TIME-WEAVE**: A pinned GSAP ScrollTrigger section mapping three chapters (*Arrival, Flourish, Memory*) directly to scroll progress with layered background, midground, and foreground parallax.
- **Kinetic Split-Text**: Hardware-accelerated typography animation for massive cinematic headings.
- **Staggered Bento Grid**: A non-uniform layout for cultural artifacts featuring subtle CSS/GSAP hover states and vertical scroll staggered parallax.

## 5. Technical Architecture
The application uses a strict unidirectional rendering flow managed by React and Vite. 
GSAP serves as the single source of truth for complex animations, synchronized flawlessly with Lenis smooth-scroll via the GSAP ticker.
The 3D environment (Spline) is lazily evaluated and conditionally rendered to prevent blocking the initial paint.

## 6. Accessibility
- **`prefers-reduced-motion`**: The application listens to user OS settings. If reduced motion is requested, GSAP animations, pinning, and Lenis smooth-scroll are gracefully bypassed without breaking the layout.
- **Semantic HTML & Contrast**: Optimized for high-contrast readability against the dark obsidian background.

## 7. Tech Stack
- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP + `@gsap/react` + ScrollTrigger
- **Scroll Engine**: Lenis
- **3D Render**: `@splinetool/react-spline`
- **Icons**: Lucide React

## 8. How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
```bash
git clone <repository>
cd project_main
npm install
```

### Configuration
Copy the environment template to enable the Spline 3D canvas (if you have the URL). If left empty, the premium CSS architectural fallback will automatically render.
```bash
cp .env.example .env
```
*(Open `.env` and add your `VITE_SPLINE_SCENE_URL`)*

### Start Development Server
```bash
npm run dev
```

## 9. Deployment
The project is configured for Vercel/Netlify.
1. Run `npm run build` to generate the production `/dist` folder.
2. Push to GitHub and connect to your hosting provider.
3. Ensure the `VITE_SPLINE_SCENE_URL` environment variable is added to your hosting platform settings.

## 10. Credits / Sources
- **Historical Context**: Based on the UNESCO World Heritage Site of the Vijayanagara Empire (Hampi, India).
- **Design Inspiration**: Luxury editorial, spatial digital museums, and premium cultural heritage exhibits.
- **Technologies**: GSAP, Lenis, Tailwind, React, Spline.
