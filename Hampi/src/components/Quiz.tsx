import { useState } from "react";
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';

// Test yourself: 5 questions, all from verified facts in the research files
// (round 1 Part A, round 2 sections A and C). Clicking an option shows
// right or wrong at once, with one short line explaining the answer.
// Client-side React state only, no backend, no tracking. No em dashes.
const QUESTIONS = [
  {
    question: 'In which year did the Dartmouth workshop name the field artificial intelligence?',
    options: ['1950', '1956', '1969', '1973'],
    correct: 1,
    explain: 'The Dartmouth Summer Research Project ran in the summer of 1956, and its proposal was the first document to use the term artificial intelligence.',
  },
  {
    question: 'Which program beat world chess champion Garry Kasparov in 1997?',
    options: ['Watson', 'Deep Blue', 'AlphaGo', 'ELIZA'],
    correct: 1,
    explain: 'Deep Blue beat Kasparov 3.5 to 2.5 in the rematch of 3 to 11 May 1997, checking about 200 million positions a second.',
  },
  {
    question: 'In which year was ChatGPT released?',
    options: ['2020', '2021', '2022', '2023'],
    correct: 2,
    explain: 'OpenAI released ChatGPT as a free research preview on 30 November 2022, and a million people tried it in five days.',
  },
  {
    question: 'Who wrote the 1986 backpropagation paper, with Hinton and Williams?',
    options: ['David Rumelhart', 'Frank Rosenblatt', 'John McCarthy', 'Ian Goodfellow'],
    correct: 0,
    explain: 'Rumelhart, Hinton and Williams published "Learning representations by back-propagating errors" in Nature on 9 October 1986.',
  },
  {
    question: 'In which year were the AlphaFold 2 results announced?',
    options: ['2018', '2019', '2020', '2021'],
    correct: 2,
    explain: 'AlphaFold 2 results were announced on 30 November 2020 at CASP14. The paper followed in Nature in July 2021.',
  },
];

export function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);

  const answered = answers.filter((a) => a !== null).length;
  const score = answers.filter((a, i) => a !== null && a === QUESTIONS[i].correct).length;

  const choose = (qi: number, oi: number) => {
    if (answers[qi] !== null) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  const reset = () => setAnswers([null, null, null, null, null]);

  return (
    <section id="quiz" className="w-full border-t border-slate-900/50 relative z-10" aria-label="Test yourself">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">TEST YOURSELF</Text></div>
            <Heading level={2}>
              FIVE QUESTIONS, <span className="text-sandstone italic">NO CHEATING.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              Everything here is on this page already. Pick an answer and see at once if you are right.
            </Text>
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-8" aria-live="polite">
            {answered === 0
              ? 'SCORE · 0 OF 5 ANSWERED'
              : answered < 5
                ? `SCORE · ${score} RIGHT, ${answered} OF 5 ANSWERED`
                : `SCORE · ${score} OUT OF 5 RIGHT`}
          </p>

          {QUESTIONS.map((q, qi) => {
            const picked = answers[qi];
            const isAnswered = picked !== null;
            return (
              <div key={qi} className="border border-slate-800/50 bg-slate-900/20 p-6 md:p-8 mb-6">
                <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-3">QUESTION {qi + 1} OF 5</p>
                <p className="font-serif text-xl md:text-2xl text-slate-100 mb-5">{q.question}</p>
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, oi) => {
                    const isCorrect = oi === q.correct;
                    const isPicked = picked === oi;
                    let cls = 'border-slate-800/60 bg-obsidian/60 text-slate-200 hover:border-sandstone/60';
                    if (isAnswered && isCorrect) cls = 'border-sandstone bg-sandstone/15 text-slate-100';
                    if (isAnswered && isPicked && !isCorrect) cls = 'border-slate-500 bg-slate-800/40 text-slate-400';
                    if (isAnswered && !isPicked && !isCorrect) cls = 'border-slate-800/40 bg-obsidian/40 text-slate-500';
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => choose(qi, oi)}
                        className={`min-h-[44px] w-full text-left px-4 py-3 border text-[0.95rem] leading-relaxed transition-colors ${cls}`}
                        aria-pressed={isPicked}
                      >
                        <span className="text-[0.65rem] tracking-[0.2em] text-sandstone mr-3" aria-hidden="true">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                        {isAnswered && isCorrect && (
                          <span className="float-right text-[0.65rem] tracking-[0.2em] text-sandstone">CORRECT</span>
                        )}
                        {isAnswered && isPicked && !isCorrect && (
                          <span className="float-right text-[0.65rem] tracking-[0.2em] text-slate-400">NOT QUITE</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {isAnswered && (
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-300">
                    <span className="text-[0.65rem] tracking-[0.2em] text-sandstone">WHY · </span>
                    {q.explain}
                  </p>
                )}
              </div>
            );
          })}

          {answered === 5 && (
            <div className="flex flex-col items-start gap-4">
              <p className="font-serif text-xl md:text-2xl text-slate-100">
                {score === 5
                  ? 'Five out of five. You know the story.'
                  : score >= 3
                    ? 'Not bad. Read the story once more and try again.'
                    : 'The story is just above. Read it once more and try again.'}
              </p>
              <button
                type="button"
                onClick={reset}
                className="min-h-[44px] px-6 border border-sandstone/60 text-sandstone text-[0.95rem] tracking-wide hover:bg-sandstone/10 transition-colors"
              >
                START AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
