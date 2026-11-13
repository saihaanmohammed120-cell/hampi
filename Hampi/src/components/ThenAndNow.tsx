import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';

// Then and now: 1950 against 2026, side by side. Every line comes from
// the research files (round 1 Part A and Part B, round 2 sections A and
// C). No predictions, no unverified numbers. No em dashes in this file.
export function ThenAndNow() {
  return (
    <section id="then-and-now" className="w-full border-t border-slate-900/50 relative z-10" aria-label="Then and now">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">THEN AND NOW</Text></div>
            <Heading level={2}>
              THE SAME QUESTION, <span className="text-sandstone italic">76 YEARS APART.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              What changed between the question and today.
            </Text>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-slate-800/60 bg-slate-900/20 p-8 md:p-10">
            <p className="font-serif text-5xl md:text-6xl text-slate-200 mb-2">1950</p>
            <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-8">THE QUESTION</p>
            <ul className="space-y-4 list-disc pl-5 marker:text-sandstone">
              <li className="text-[0.95rem] leading-relaxed text-slate-300">Alan Turing asks: can machines think?</li>
              <li className="text-[0.95rem] leading-relaxed text-slate-300">There is no field yet. The name artificial intelligence does not exist.</li>
              <li className="text-[0.95rem] leading-relaxed text-slate-300">No machine has learned from examples at scale.</li>
              <li className="text-[0.95rem] leading-relaxed text-slate-300">One paper, one question, and a test to tell the answer.</li>
            </ul>
          </div>
          <div className="border border-sandstone/30 bg-sandstone/5 p-8 md:p-10">
            <p className="font-serif text-5xl md:text-6xl text-sandstone mb-2">2026</p>
            <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-8">THE ANSWER, SO FAR</p>
            <ul className="space-y-4 list-disc pl-5 marker:text-sandstone">
              <li className="text-[0.95rem] leading-relaxed text-slate-300">More than a billion people use ChatGPT every week.</li>
              <li className="text-[0.95rem] leading-relaxed text-slate-300">Models write, answer questions, translate, and code.</li>
              <li className="text-[0.95rem] leading-relaxed text-slate-300">AlphaFold solved protein folding, and won a Nobel Prize.</li>
              <li className="text-[0.95rem] leading-relaxed text-slate-300">In 2024, AI won two Nobel Prizes in a single week.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
