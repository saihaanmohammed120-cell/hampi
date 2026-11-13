import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Grid, GridSpan } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';

gsap.registerPlugin(ScrollTrigger);

export function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Subtle parallax staggered scrolling effect for cards
    const cards = gsap.utils.toArray('.bento-card');
    
    cards.forEach((card: any, i) => {
      // Create a staggered speed based on grid position / index
      const speed = 1 - (i % 3) * 0.15; 
      
      gsap.fromTo(card,
        { y: 50 * speed },
        {
          y: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="turns" className="py-32 px-8 w-full max-w-7xl mx-auto relative z-10">
      
      <div className="mb-16 md:mb-24 flex flex-col items-start md:flex-row md:items-end justify-between">
        <div>
          <Heading level={2}>
            THE STORY IN <span className="text-sandstone italic">SEVEN TURNS.</span>
          </Heading>
        </div>
        <div className="max-w-sm mt-6 md:mt-0">
          <Text type="body">
            Seven turns in one story, from a question asked in 1950 to a billion people today.
          </Text>
        </div>
      </div>

      {/* Bento Grid, rowHeight 400: the full 2–3 sentence Part B copy on the
          1×1 tiles needs ~260px of text block, which overflows a 300px row
          and collides with the top label (verified by probe: -44 to -68px).
          400px rows give every tile room for its full copy. The round-2
          "Why it matters" and "Key people" lines were tried inside the tiles
          and did NOT fit: the worst tile needs a 646px row, which would turn
          the photo tiles into text cards, so those lines live in the
          TurnDetails strip below the bento instead. */}
      <Grid columns={{ minWidth: 280, max: 4, repeat: 'fit' }} rowHeight={400} gap={6}>
        
        {/* 01 THE QUESTION - spans 2 cols, 2 rows */}
        <GridSpan columns={2} rows={2} className="bento-wide">
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Photo: a vintage typewriter in dramatic light (Pexels) */}
              <img src="https://images.pexels.com/photos/34570040/pexels-photo-34570040.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="A vintage typewriter, its round keys lit in dramatic light" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent z-10"></div>
              
              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-2 transition-transform duration-500">
                <Text type="label" color="accent">01 THE QUESTION</Text>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 z-20 transition-transform duration-500 group-hover:-translate-y-2" style={{ willChange: "transform" }}>
                <Heading level={3} className="mb-3">Can Machines Think?</Heading>
                <Text type="body">In 1950 Alan Turing asked a simple question: can machines think? He said the question was too vague to answer directly, so he proposed a test instead. A person chats in writing with a hidden human and a hidden machine, and if the person cannot tell which is which, the machine has passed.</Text>
              </div>
            </Card>
          </div>
        </GridSpan>

        {/* 02 THE BIRTH - spans 1 col, 1 row */}
        <GridSpan>
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Photo: a blackboard covered in chalk equations (Pexels, Vitaly Gariev) */}
              <img src="https://images.pexels.com/photos/22690751/pexels-photo-22690751.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="A blackboard covered in chalk equations" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              {/* Stronger middle gradient: white chalk shows through a light
                  scrim and competes with the white text mid-tile. The 60%
                  middle did not hold for this photo's bright mid-zone,
                  so the scrim goes to 75% with a near-solid 95% base.
                  Round 5: even that only made a marginal difference, the
                  chalk still showed behind the text as texture. So the
                  text gets its own solid obsidian scrim. First try was
                  bg + p-4 on the text box itself, but the padding narrowed
                  the text (more wrapped lines) and pushed the panel up
                  over the "02 THE BIRTH" label at 1440. So the scrim is
                  now a child that paints 8px past the text box on every
                  side without changing the text layout at all. */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/75 to-transparent z-10"></div>
              
              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-1 transition-transform duration-500">
                <Text type="label" color="accent">02 THE BIRTH</Text>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
                <div className="absolute -inset-2 bg-[#0B0F19] rounded-sm" aria-hidden="true"></div>
                <Heading level={3} className="mb-2 relative">A Summer Workshop</Heading>
                <Text type="body"><span className="relative">In the summer of 1956 a small group of scientists met at Dartmouth College in New Hampshire and gave the field its name: artificial intelligence. They believed every part of intelligence could be described so precisely that a machine could copy it. The first programs followed fast: one that proved maths theorems, one that learned from its mistakes, and one that chatted like a therapist.</span></Text>
              </div>
            </Card>
          </div>
        </GridSpan>

        {/* 03 THE WINTERS - spans 1 col, 2 rows */}
        <GridSpan rows={2}>
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Photo: a snowy pine forest with a path through the snow (Pexels, Elina Volkova) */}
              <img src="https://images.pexels.com/photos/30079897/pexels-photo-30079897.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A snowy pine forest with a path through the snow" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              {/* Top scrim: the label sits over a bright sky in this photo */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B0F19]/60 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/30 to-transparent z-10"></div>
              
              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-1 transition-transform duration-500">
                <Text type="label" color="accent">03 THE WINTERS</Text>
              </div>
              
              <div className="absolute bottom-8 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-2" style={{ willChange: "transform" }}>
                <Heading level={3} className="mb-3">The Money Dries Up</Heading>
                <Text type="body">Early AI promised more than it could deliver, and the money dried up. A 1973 report in Britain said no part of the field had produced the impact once promised, and funding was cut. AI came back in the 1980s as expert systems that wrote down human knowledge as rules, and one system saved a computer company about 25 million dollars a year, but the systems were brittle and costly to keep, and by 1987 the money dried up again.</Text>
              </div>
            </Card>
          </div>
        </GridSpan>

        {/* 04 THE COMEBACK - spans 1 col, 1 row */}
        <GridSpan>
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Photo: black and white chess pieces on a board (Pexels, Vlada Karpovich) */}
              <img src="https://images.pexels.com/photos/6114998/pexels-photo-6114998.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Black and white chess pieces on a board" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/25 to-transparent z-10"></div>

              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-1 transition-transform duration-500">
                <Text type="label" color="accent">04 THE COMEBACK</Text>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
                <Heading level={3} className="mb-2">Machines Win Games</Heading>
                <Text type="body">AI returned by winning games people thought only humans could win. In 1997 IBM's Deep Blue beat world chess champion Garry Kasparov, checking 200 million positions a second. In 2011 IBM's Watson beat the two greatest Jeopardy champions on television. The wins were narrow and task specific, but they put AI back in the news.</Text>
              </div>
            </Card>
          </div>
        </GridSpan>

        {/* 05 THE DEEP LEARNERS - spans 1 col, 1 row */}
        <GridSpan>
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Photo: a Go board with black and white stones in play (Wikimedia Commons, Dietmar Rabich, CC BY-SA 4.0) */}
              <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Go_--_2021_--_6757.jpg/1280px-Go_--_2021_--_6757.jpg" alt="A Go board with black and white stones in play" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              {/* Top scrim: the label sits over light wood in this photo */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B0F19]/60 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/30 to-transparent z-10"></div>

              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-1 transition-transform duration-500">
                <Text type="label" color="accent">05 THE DEEP LEARNERS</Text>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
                <Heading level={3} className="mb-2">Learning to See</Heading>
                <Text type="body">In 2012 a neural network called AlexNet won a picture contest by a huge margin, trained on two gaming graphics cards. It showed that networks could learn to see by looking at millions of examples. In 2016 DeepMind's AlphaGo beat Go master Lee Sedol 4 to 1, playing a move in game two that its own makers rated a one in ten thousand human choice.</Text>
              </div>
            </Card>
          </div>
        </GridSpan>

        {/* 06 THE TRANSFORMER - spans 1 col, 1 row */}
        <GridSpan>
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Illustration: a neural network, an artist's rendering by Google DeepMind (Pexels) */}
              <img src="https://images.pexels.com/photos/17483867/pexels-photo-17483867.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="An artist's rendering of a neural network, a translucent form with pink and blue connections" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              {/* Strong gradient: this image is pale, so the text needs a heavier scrim */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B0F19]/70 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-[#0B0F19]/20 z-10"></div>

              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-1 transition-transform duration-500">
                <Text type="label" color="accent">06 THE TRANSFORMER</Text>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
                <Heading level={3} className="mb-2">Attention Is All You Need</Heading>
                <Text type="body">In 2017 eight researchers at Google published a twelve page paper called Attention Is All You Need. It described a design called the transformer, which reads whole passages at once instead of word by word. Within three years it powered BERT and GPT-3, a model with 175 billion settings that could write, answer and translate after seeing only a few examples.</Text>
              </div>
            </Card>
          </div>
        </GridSpan>

        {/* 07 AI FOR EVERYONE - spans 2 cols, 1 row */}
        <GridSpan columns={2} className="bento-wide">
          <div className="bento-card group relative h-full overflow-hidden">
            <Card height="100%">
              {/* Photo: a woman typing on a laptop with a messaging app open (Pexels, Mikhail Nilov) */}
              <img src="https://images.pexels.com/photos/8284724/pexels-photo-8284724.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A woman typing on a laptop with a messaging app open" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/35 to-transparent z-10"></div>

              <div className="absolute top-6 left-6 z-20 group-hover:translate-x-1 transition-transform duration-500">
                <Text type="label" color="accent">07 AI FOR EVERYONE</Text>
              </div>
              
              <div className="absolute bottom-6 left-6 right-8 z-20 transition-transform duration-500 group-hover:-translate-y-1" style={{ willChange: "transform" }}>
                <Heading level={3} className="mb-2">A Billion People</Heading>
                <Text type="body">On 30 November 2022 OpenAI released ChatGPT as a free chat window, and a million people tried it in five days. In 2023 GPT-4 could also look at pictures, and by 2024 models could make video and think step by step before answering. By 2026 more than a billion people used ChatGPT every week, to write, study, code and work, and models still make mistakes, so what they say is worth checking.</Text>
              </div>
            </Card>
          </div>
        </GridSpan>

      </Grid>
    </section>
  );
}
