import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';

// The turns, up close: the round-2 "Why it matters" and "Key people" lines
// from research section D, verbatim. They were tried inside the photo tiles
// and did not fit: the worst tile needs a 646px row, which would turn the
// photo tiles into text cards (measured by probe at 390/768/1440). So they
// live here, one row per turn, right after the bento. No other facts are used.
// The strip is static, with no animation, so it respects
// prefers-reduced-motion by doing nothing that moves.
const TURNS = [
  {
    num: '01',
    label: 'THE QUESTION',
    years: '1950',
    title: 'Can Machines Think?',
    img: 'https://images.pexels.com/photos/34570040/pexels-photo-34570040.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imgAlt: 'A vintage typewriter, its round keys lit in dramatic light',
    why: 'Turing turned a vague question into a test anyone could run, and that test set the goal for the whole field.',
    people: 'Alan Turing, who wrote the 1950 paper and broke German codes in the war, and who died in 1954, two years before the field even got its name.',
  },
  {
    num: '02',
    label: 'THE BIRTH',
    years: '1956',
    title: 'A Summer Workshop',
    img: 'https://images.pexels.com/photos/22690751/pexels-photo-22690751.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imgAlt: 'A blackboard covered in chalk equations',
    why: 'The Dartmouth workshop gave the field a name and a bold claim, that intelligence could be described precisely enough for a machine to copy it.',
    people: 'John McCarthy, who wrote the proposal and coined the term artificial intelligence; Arthur Samuel, whose checkers program learned from experience and whose 1959 paper coined the term machine learning.',
  },
  {
    num: '03',
    label: 'THE WINTERS',
    years: '1970s – 1980s',
    title: 'The Money Dries Up',
    img: 'https://images.pexels.com/photos/30079897/pexels-photo-30079897.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'A snowy pine forest with a path through the snow',
    why: 'The winters show that progress is not a straight line, and that ideas can survive decades of no funding and still come back.',
    people: 'James Lighthill, whose 1973 report cut British funding; Geoffrey Hinton, Yoshua Bengio and Yann LeCun, who kept working on neural networks through the lean years.',
  },
  {
    num: '04',
    label: 'THE COMEBACK',
    years: '1997 – 2011',
    title: 'Machines Win Games',
    img: 'https://images.pexels.com/photos/6114998/pexels-photo-6114998.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'Black and white chess pieces on a board',
    why: 'The game wins put AI back in the news, and the quiet work of the 2000s, more data and better training, set up the next leap.',
    people: 'Garry Kasparov, the world champion Deep Blue beat in 1997; Fei-Fei Li, who built the ImageNet dataset that gave neural networks the pictures they needed.',
  },
  {
    num: '05',
    label: 'THE DEEP LEARNERS',
    years: '2012 – 2016',
    title: 'Learning to See',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Go_--_2021_--_6757.jpg/1280px-Go_--_2021_--_6757.jpg',
    imgAlt: 'A Go board with black and white stones in play',
    why: 'AlexNet showed that a network could learn to see from examples, and AlphaGo showed it could beat the best human at the hardest board game.',
    people: 'Geoffrey Hinton, Alex Krizhevsky and Ilya Sutskever, the AlexNet team; Demis Hassabis and the DeepMind AlphaGo team; Ian Goodfellow, who introduced GANs in 2014.',
  },
  {
    num: '06',
    label: 'THE TRANSFORMER',
    years: '2017 – 2020',
    title: 'Attention Is All You Need',
    img: 'https://images.pexels.com/photos/17483867/pexels-photo-17483867.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imgAlt: "An artist's rendering of a neural network, a translucent form with pink and blue connections",
    why: 'One short paper gave AI a new design, and nearly every model since, from GPT to Claude to Gemini, is built on it.',
    people: 'Ashish Vaswani and the seven other Google researchers who wrote "Attention Is All You Need"; Jakob Uszkoreit, who suspected attention alone would be enough and picked the name Transformer.',
  },
  {
    num: '07',
    label: 'AI FOR EVERYONE',
    years: '2022 – TODAY',
    title: 'A Billion People',
    img: 'https://images.pexels.com/photos/8284724/pexels-photo-8284724.jpeg?auto=compress&cs=tinysrgb&w=800',
    imgAlt: 'A woman typing on a laptop with a messaging app open',
    why: 'ChatGPT took AI out of the lab and put it in front of more than a billion people a week, which is why the story now belongs to everyone.',
    people: 'Sam Altman, OpenAI chief executive, fired and rehired in five days in November 2023; Demis Hassabis and John Jumper, whose AlphaFold solved protein folding and won the 2024 Nobel Prize in Chemistry; Geoffrey Hinton, who won the 2024 Nobel Prize in Physics and left Google in 2023 to warn about AI risks.',
  },
];

export function TurnDetails() {
  return (
    <section id="turns-detail" className="w-full border-t border-slate-900/50 relative z-10" aria-label="Why each turn mattered and who made it">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">THE TURNS, UP CLOSE</Text></div>
            <Heading level={2}>
              THE PEOPLE AND <span className="text-sandstone italic">THE POINT.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              Each turn in two lines: why it mattered, and who made it happen.
            </Text>
          </div>
        </div>

        <div>
          {TURNS.map((turn) => (
            <div key={turn.num} className="border-t border-slate-800/50 py-6 md:py-8 grid gap-4 md:grid-cols-[240px_1fr] md:gap-8">
              <div>
                <p className="text-[0.65rem] tracking-[0.3em] text-sandstone">{turn.num} · {turn.label} · {turn.years}</p>
                <p className="font-serif text-xl md:text-2xl text-slate-100 mt-2">{turn.title}</p>
                <img src={turn.img} alt={turn.imgAlt} loading="lazy" decoding="async" className="mt-4 w-full max-w-[240px] h-28 object-cover border border-slate-800/50" />
              </div>
              <div>
                <p className="text-[0.95rem] leading-relaxed text-slate-300"><span className="text-[0.65rem] tracking-[0.2em] text-sandstone">WHY IT MATTERS · </span>{turn.why}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-300"><span className="text-[0.65rem] tracking-[0.2em] text-sandstone">KEY PEOPLE · </span>{turn.people}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
