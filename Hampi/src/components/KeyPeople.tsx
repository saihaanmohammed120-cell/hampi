import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';

// Key people: 8 short profiles, names and words only, no portraits.
// Every fact comes from the research files: round 1 Part A, and round 2
// sections A, C and D. Where the research gives no fact, none is used.
// No em dashes in this file.
const PEOPLE = [
  {
    name: 'Alan Turing',
    dates: '1950 PAPER · DIED 1954, AGED 41',
    body: 'Wrote the 1950 paper that asked if machines can think, and proposed the imitation game. During the war he worked at Bletchley Park, cracking German Enigma messages. He died on 7 June 1954, two years before the field got its name. In 2013 he received a royal pardon, and in 2021 his face went on the fifty pound note.',
  },
  {
    name: 'John McCarthy',
    dates: '1955 PROPOSAL · 1958 LISP',
    body: 'Wrote the 1955 proposal for the Dartmouth workshop with Minsky, Rochester and Shannon, and coined the term artificial intelligence. In 1958 he created LISP, the language most early AI was written in. In 1973 he defended the field against Lighthill in the BBC debate.',
  },
  {
    name: 'Arthur Samuel',
    dates: 'BORN 1901 · 1952 CHECKERS · 1959 PAPER',
    body: 'Built a checkers program in 1952 that learned by playing against itself, one of the first programs that learned from experience. His 1959 paper coined the term machine learning. By 1962 the program beat a former state champion.',
  },
  {
    name: 'Frank Rosenblatt',
    dates: '1928–1971 · THE PERCEPTRON',
    body: 'Built the perceptron, an early neural network that learned by adjusting weights after each mistake. He described it in a 1957 report, and his paper appeared in 1958. He died on 11 July 1971, on his forty third birthday, long before neural networks came back.',
  },
  {
    name: 'Geoffrey Hinton',
    dates: '2006 · 2012 · NOBEL 2024',
    body: 'Kept working on neural networks through the lean years, with Bengio and LeCun, on a Canadian CIFAR grant when almost nobody would fund the work. His 2006 papers restarted deep learning, and his team built AlexNet in 2012. In 2024 he shared the Nobel Prize in Physics with John Hopfield. In 2023 he left Google to warn about the risks of AI.',
  },
  {
    name: 'Fei-Fei Li',
    dates: 'IMAGENET · 2009',
    body: 'Led the team that built ImageNet, presented in 2009, about 14 million labelled pictures that gave neural networks the data they needed. She arrived in the United States from China at sixteen, with no English and little money, and worked in a dry cleaning shop to help her family pay their mortgage.',
  },
  {
    name: 'Demis Hassabis',
    dates: 'ALPHAGO 2016 · NOBEL 2024',
    body: 'Led the DeepMind team behind AlphaGo, which beat Go master Lee Sedol in 2016. His AlphaFold solved protein folding, a problem scientists had worked on for 50 years. In 2024 he shared the Nobel Prize in Chemistry for AlphaFold, with John Jumper.',
  },
  {
    name: 'Sam Altman',
    dates: 'OPENAI 2015 · 2023',
    body: 'Helped found OpenAI in 2015. As chief executive he launched ChatGPT in 2022, and a million people tried it in five days. In November 2023 the board fired him, and five days later, after about 700 of 770 employees threatened to quit, he was back.',
  },
];

export function KeyPeople() {
  return (
    <section id="key-people" className="w-full border-t border-slate-900/50 relative z-10" aria-label="The key people">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">KEY PEOPLE</Text></div>
            <Heading level={2}>
              THE PEOPLE WHO <span className="text-sandstone italic">MADE IT HAPPEN.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              Eight people, in the order they enter the story. Names and words only, no portraits.
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PEOPLE.map((p) => (
            <div key={p.name} className="border border-slate-800/50 bg-slate-900/20 p-6 md:p-8">
              <span className="w-6 h-px bg-sandstone/60 block mb-4" aria-hidden="true"></span>
              <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-3">{p.dates}</p>
              <p className="font-serif text-xl md:text-2xl text-slate-100 mb-3">{p.name}</p>
              <Text type="body">{p.body}</Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
