import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';

// How it works: six concept explanations from research round 2, section B.
// Every title and every sentence is verbatim from the research file.
// No other facts are used. The strip is static, with no animation, so it
// respects prefers-reduced-motion by doing nothing that moves.
const IDEAS = [
  {
    num: '01',
    title: 'What a neural network is',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Artificial_Neural_Network_with_Chip.png',
    imgAlt: 'A computer chip with a network of connected nodes drawn over it',
    body: `A neural network is a system of simple units connected by links, and each link has a strength called a weight. It learns by adjusting those weights so its answers get closer to the right ones. The idea goes back to 1943, when McCulloch and Pitts showed that networks of simple on-off units could in principle do logic, and to Rosenblatt's perceptron, which adjusted its weights after each mistake.`,
  },
  {
    num: '02',
    title: 'What backpropagation does',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Code_on_computer_monitor_%28Unsplash%29.jpg/1280px-Code_on_computer_monitor_%28Unsplash%29.jpg',
    imgAlt: 'Lines of programming code on a computer monitor',
    body: `Backpropagation is the method that trains a neural network. It makes a guess, measures how wrong the guess was, then traces the error backward through the network and adjusts each connection a little. The 1986 paper by Rumelhart, Hinton and Williams showed this lets hidden layers learn useful features that no one programmed in.`,
  },
  {
    num: '03',
    title: 'What attention means',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Magnifying_glass2.jpg/1280px-Magnifying_glass2.jpg',
    imgAlt: 'A hand holding a magnifying glass over old printed stamps',
    body: `Attention is a way for a model to decide which parts of a passage matter most for each word it reads. When it reads one word, it looks back at the other words and gives more weight to the ones that are relevant. The idea was proposed by Bahdanau and colleagues in 2014, and it became the core of the transformer in 2017.`,
  },
  {
    num: '04',
    title: 'What a transformer does',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Abstract_spiral_pattern_%28Unsplash%29.jpg/1280px-Abstract_spiral_pattern_%28Unsplash%29.jpg',
    imgAlt: 'A black and white spiral pattern in stone',
    body: `A transformer is a neural network design that reads a whole passage at once instead of word by word, using attention to connect each word to the others. Because it has no step by step reading, it can be trained on many examples at the same time. It was introduced by eight Google researchers in the 2017 paper "Attention Is All You Need", and it is the design behind GPT, BERT, Claude, Gemini and Llama.`,
  },
  {
    num: '05',
    title: 'What a large language model does',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Books_on_shelves_%28120%29.jpg/1280px-Books_on_shelves_%28120%29.jpg',
    imgAlt: 'Rows of colourful books on library shelves',
    body: `A large language model is a transformer trained on huge amounts of text to predict the next word, one word at a time. After training it can write, answer questions, translate and write code, because it has learned patterns from all that text. GPT-3, for example, had 175 billion settings and was trained on 570 gigabytes of text.`,
  },
  {
    num: '06',
    title: 'What an agent does',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Halodi_Robotics%27_Perception_Engineer_With_a_Humanoid_Collaborative_Robot.jpg/1280px-Halodi_Robotics%27_Perception_Engineer_With_a_Humanoid_Collaborative_Robot.jpg',
    imgAlt: 'A smiling humanoid robot standing next to an engineer',
    body: `An AI agent is a system that does multi step tasks on its own, using tools like a web browser or a code editor, instead of only answering one question at a time. It plans the steps, tries them, checks the result and adjusts. In 2025 OpenAI released Operator, a browser controlling agent, deep research, an agent that compiles cited reports, and the ChatGPT agent.`,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full border-t border-slate-900/50 relative z-10" aria-label="How the ideas work">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">HOW IT WORKS</Text></div>
            <Heading level={2}>
              SIX IDEAS, IN <span className="text-sandstone italic">PLAIN WORDS.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              The story runs on a few ideas. Here is what each one means, in words anyone can follow.
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IDEAS.map((idea) => (
            <div key={idea.num} className="border border-slate-800/50 bg-slate-900/20 overflow-hidden">
              <img src={idea.img} alt={idea.imgAlt} loading="lazy" decoding="async" className="w-full h-40 object-cover" />
              <div className="p-6 md:p-8">
                <span className="w-6 h-px bg-sandstone/60 block mb-4" aria-hidden="true"></span>
                <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-3">{idea.num}</p>
                <p className="font-serif text-xl md:text-2xl text-slate-100 mb-3">{idea.title}</p>
                <Text type="body">{idea.body}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
