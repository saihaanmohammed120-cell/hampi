import { Text } from '@astryxdesign/core/Text';

// By the numbers: every figure comes from the research file Part A.
// 12 pages in the 2017 transformer paper; Deep Blue checked about 200
// million chess positions a second in 1997; a million people tried
// ChatGPT in five days; by 2026 more than a billion people used ChatGPT
// every week. No other numbers are used.
const STATS = [
  { value: '12', label: "PAGES IN THE 2017 PAPER, 'ATTENTION IS ALL YOU NEED'" },
  { value: '200M', label: 'CHESS POSITIONS A SECOND, DEEP BLUE 1997' },
  { value: '1M', label: 'PEOPLE TRIED CHATGPT IN FIVE DAYS' },
  { value: '1B+', label: 'WEEKLY CHATGPT USERS BY 2026' },
];

export function NumbersStrip() {
  return (
    <section className="w-full border-t border-slate-900/50 relative z-10" aria-label="The story by the numbers">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10">
          <Text type="label" color="accent">BY THE NUMBERS</Text>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col gap-3">
              <span className="w-6 h-px bg-sandstone/60" aria-hidden="true"></span>
              <span className="font-serif text-5xl md:text-6xl text-slate-100 leading-none">{s.value}</span>
              <span className="text-[0.65rem] tracking-[0.3em] text-slate-400 leading-relaxed">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
