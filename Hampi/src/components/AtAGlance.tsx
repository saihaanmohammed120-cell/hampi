import { useState } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Button } from '@astryxdesign/core/Button';

// The story at a glance: 21 dated milestones, one line each, in order.
// Every date and number comes from the research files:
// round 1 Part A, and round 2 sections A and C. Nothing from section E
// of either file is used. No em dashes in this file.
const MILESTONES = [
  {
    year: '1950',
    text: 'Alan Turing publishes "Computing Machinery and Intelligence" in Mind, and asks if machines can think.',
  },
  {
    year: '1952',
    text: 'Arthur Samuel builds a checkers program that learns by playing against itself, on the IBM 701.',
  },
  {
    year: '1956',
    text: 'A summer workshop at Dartmouth College names the field artificial intelligence.',
  },
  {
    year: '1957–1958',
    text: 'Frank Rosenblatt describes the perceptron in a 1957 report. His paper appears in 1958.',
  },
  {
    year: '1968–1970',
    text: 'Terry Winograd builds SHRDLU at MIT, a program that talks about coloured blocks and moves them with a robot arm.',
  },
  {
    year: '1973',
    text: 'James Lighthill\'s report cuts British AI funding. On 9 May he debates it on BBC television.',
  },
  {
    year: '1982–1992',
    text: 'Japan\'s Fifth Generation project runs for eleven years and about 54 billion yen, and ends without delivering what it promised.',
  },
  {
    year: '1986',
    text: 'Rumelhart, Hinton and Williams publish the backpropagation paper in Nature on 9 October.',
  },
  {
    year: '1997',
    text: 'IBM\'s Deep Blue beats world chess champion Garry Kasparov, 3.5 to 2.5.',
  },
  {
    year: '2006',
    text: 'Hinton, Osindero and Teh publish the deep belief nets paper, and deep learning restarts.',
  },
  {
    year: '2009',
    text: 'Fei-Fei Li\'s team presents ImageNet at CVPR, about 14 million labelled pictures.',
  },
  {
    year: '2011',
    text: 'IBM\'s Watson beats the two greatest Jeopardy champions on television.',
  },
  {
    year: '2012',
    text: 'AlexNet wins the ImageNet picture contest by an eleven point margin.',
  },
  {
    year: '2014',
    text: 'Ian Goodfellow and colleagues introduce Generative Adversarial Networks.',
  },
  {
    year: '2016',
    text: 'DeepMind\'s AlphaGo beats Go master Lee Sedol 4 to 1 in Seoul.',
  },
  {
    year: '2017',
    text: 'Eight researchers at Google publish "Attention Is All You Need" on 12 June.',
  },
  {
    year: '2018',
    text: 'DeepMind\'s AlphaFold 1 wins the CASP13 protein folding contest.',
  },
  {
    year: '2020',
    text: 'DeepMind announces AlphaFold 2 on 30 November, solving protein folding.',
  },
  {
    year: '2022',
    text: 'OpenAI releases ChatGPT on 30 November. A million people try it in five days.',
  },
  {
    year: '2023',
    text: 'GPT-4, DALL-E 3, Gemini and Claude arrive in a single year.',
  },
  {
    year: '2024',
    text: 'AI wins two Nobel Prizes in one week, Physics on 8 October and Chemistry on 9 October.',
  },
];

export function AtAGlance() {
  // Live search: match the year or any word in the line, as you type.
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const shown = q
    ? MILESTONES.filter((m) => m.year.toLowerCase().includes(q) || m.text.toLowerCase().includes(q))
    : MILESTONES;

  return (
    <section id="at-a-glance" className="w-full border-t border-slate-900/50 relative z-10" aria-label="The whole story at a glance">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">THE STORY AT A GLANCE</Text></div>
            <Heading level={2}>
              THE WHOLE STORY, <span className="text-sandstone italic">AT A GLANCE.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              Every big moment, in order, one line each.
            </Text>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="glance-search" className="block text-[0.65rem] tracking-[0.3em] text-sandstone mb-3">SEARCH THE MOMENTS</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="glance-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try a year, a name, or a word. 1956, chess, Nobel."
              aria-label="Search the milestones"
              className="w-full max-w-xl bg-[#0B0F19] border border-slate-700 rounded px-4 py-3 text-[0.95rem] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sandstone min-h-[44px]"
            />
            {query && (
              <Button label="CLEAR" variant="secondary" size="lg" onClick={() => setQuery('')} />
            )}
          </div>
          <p className="text-[0.65rem] tracking-[0.3em] text-slate-400 mt-3" aria-live="polite">
            SHOWING {shown.length} OF {MILESTONES.length} MOMENTS
          </p>
        </div>

        {shown.length === 0 ? (
          <div className="border-t border-slate-800/50 py-10 text-center">
            <p className="text-[0.95rem] text-slate-300 mb-6">No moments match that search.</p>
            <Button label="CLEAR SEARCH" variant="secondary" size="lg" onClick={() => setQuery('')} />
          </div>
        ) : (
          <div>
            {shown.map((m) => (
              <div key={m.year + m.text.slice(0, 12)} className="border-t border-slate-800/50 py-4 md:py-5 grid gap-1 md:grid-cols-[160px_1fr] md:gap-8">
                <p className="text-[0.65rem] tracking-[0.3em] text-sandstone md:pt-1">{m.year}</p>
                <p className="text-[0.95rem] leading-relaxed text-slate-300">{m.text}</p>
              </div>
            ))}
            <div className="border-t border-slate-800/50" aria-hidden="true"></div>
          </div>
        )}
      </div>
    </section>
  );
}
