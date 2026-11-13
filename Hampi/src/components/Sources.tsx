import { useEffect, useRef, useState } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Button } from '@astryxdesign/core/Button';

// Sources: the papers, announcements and prizes behind every fact on
// this page, grouped simply. All entries come from the research files
// (round 1 sources list and Part A, round 2 sections A and C). No URL
// is listed unless the research files give it. No em dashes in this file.
const PAPERS = [
  'Turing, Alan (1950), "Computing Machinery and Intelligence", Mind, vol. 59, no. 236, pp. 433-460.',
  'McCulloch and Pitts (1943), Bulletin of Mathematical Biophysics.',
  'McCarthy, Minsky, Rochester and Shannon (1955), "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence".',
  'Samuel, Arthur (1959), "Some Studies in Machine Learning Using the Game of Checkers", IBM Journal of Research and Development.',
  'Rosenblatt, Frank (1957), "The Perceptron: A Perceiving and Recognizing Automaton", Cornell Aeronautical Laboratory technical report.',
  'Rosenblatt, Frank (1958), Psychological Review, vol. 65, no. 6.',
  'Winograd, Terry (1971), MIT AI Technical Report 235; "Understanding Natural Language" (1972).',
  'Lighthill, James (1973), "Artificial Intelligence: A General Survey", report to the UK Science Research Council.',
  'Rumelhart, Hinton and Williams (1986), "Learning representations by back-propagating errors", Nature, vol. 323, pp. 533-536.',
  'Hinton, Osindero and Teh (2006), "A fast learning algorithm for deep belief nets", Neural Computation, vol. 18, no. 7, pp. 1527-1554.',
  'Deng et al. (2009), "ImageNet: A Large-Scale Hierarchical Image Database", CVPR 2009.',
  'Silver et al. (2016), "Mastering the game of Go with deep neural networks and tree search", Nature, vol. 529, pp. 484-489.',
  'Vaswani et al. (2017), "Attention Is All You Need", arXiv:1706.03762, NeurIPS 2017.',
  'Devlin et al. (2018), "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", arXiv:1810.04805.',
  'Brown et al. (2020), "Language Models are Few-Shot Learners" (GPT-3), arXiv:2005.14165.',
  'Jumper et al. (2021), Nature, vol. 596, pp. 583-589.',
];

const ANNOUNCEMENTS = [
  'IBM: Deep Blue beats Garry Kasparov (1997); Watson wins Jeopardy (2011).',
  'OpenAI: ChatGPT (30 November 2022); GPT-4 (14 March 2023); DALL-E (5 January 2021); DALL-E 2 (6 April 2022); DALL-E 3 (20 September 2023); GPT-4 Turbo (6 November 2023); GPT-4o (May 2024); Sora (15 February 2024); o1 (12 September 2024); GPT-5 (7 August 2025).',
  'DeepMind: AlphaGo beats Lee Sedol (2016); AlphaGo Zero (2017); AlphaFold 2 (30 November 2020); AlphaFold 3 (8 May 2024); Gemini (6 December 2023).',
  'Anthropic: Claude 1 (14 March 2023); Claude 2 (11 July 2023); Claude 3 (4 March 2024).',
  'Meta AI: LLaMA (24 February 2023); Llama 2 (18 July 2023).',
  'Computer History Museum: SHRDLU, Deep Blue, and the early programs.',
  'Bank of England: Alan Turing and the fifty pound note (2019).',
  'BBC "Controversy": the Lighthill debate, 9 May 1973.',
];

const PRIZES = [
  'Nobel Prize in Physics 2024 (8 October 2024): John Hopfield and Geoffrey Hinton, for the Hopfield network of 1982 and the Boltzmann machine of 1985.',
  'Nobel Prize in Chemistry 2024 (9 October 2024): David Baker for protein design, and Demis Hassabis and John Jumper for AlphaFold.',
  'ACM Turing Award 2018: Yoshua Bengio, Geoffrey Hinton and Yann LeCun, for deep learning.',
];

function SourceGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-10 md:mb-12">
      <p className="text-[0.65rem] tracking-[0.3em] text-sandstone mb-4">{label}</p>
      <div>
        {items.map((item) => (
          <p key={item.slice(0, 40)} className="border-t border-slate-800/50 py-3 text-[0.95rem] leading-relaxed text-slate-300">
            {item}
          </p>
        ))}
        <div className="border-t border-slate-800/50" aria-hidden="true"></div>
      </div>
    </div>
  );
}

export function Sources() {
  // Share this story: the native share sheet where it exists, otherwise
  // copy the page link. Every step is guarded, so the button never
  // crashes where share or the clipboard is unavailable.
  const [shareState, setShareState] = useState<'idle' | 'shared' | 'copied' | 'failed'>('idle');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const showForAWhile = (next: 'shared' | 'copied' | 'failed') => {
    setShareState(next);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setShareState('idle'), 3000);
  };

  const copyLink = async (url: string): Promise<boolean> => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch {
        // Fall through to the textarea fallback.
      }
    }
    try {
      const area = document.createElement('textarea');
      area.value = url;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  };

  const shareStory = async () => {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: 'AI History: Can Machines Think?', url });
        showForAWhile('shared');
        return;
      } catch (err) {
        // The user closed the share sheet: say nothing, do nothing.
        if (err instanceof DOMException && err.name === 'AbortError') return;
        // Any other share failure falls back to copying the link.
      }
    }
    const copied = await copyLink(url);
    showForAWhile(copied ? 'copied' : 'failed');
  };

  const shareLabel =
    shareState === 'shared' ? 'SHARED'
    : shareState === 'copied' ? 'LINK COPIED'
    : shareState === 'failed' ? 'COULD NOT COPY THE LINK'
    : 'SHARE THIS STORY';

  return (
    <section id="sources" className="w-full border-t border-slate-900/50 relative z-10" aria-label="Sources">
      <div className="container mx-auto px-8 py-20 md:py-24">
        <div className="mb-10 md:mb-14 flex flex-col items-start md:flex-row md:items-end justify-between">
          <div>
            <div className="mb-4"><Text type="label" color="accent">SOURCES</Text></div>
            <Heading level={2}>
              WHERE EVERY FACT <span className="text-sandstone italic">COMES FROM.</span>
            </Heading>
          </div>
          <div className="max-w-sm mt-6 md:mt-0">
            <Text type="body">
              These are the papers, announcements and prizes behind every fact on this page.
            </Text>
          </div>
        </div>

        <div className="max-w-4xl">
          <SourceGroup label="PAPERS" items={PAPERS} />
          <SourceGroup label="ANNOUNCEMENTS" items={ANNOUNCEMENTS} />
          <SourceGroup label="PRIZES" items={PRIZES} />
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 border-t border-slate-800/50 pt-10">
          <Button label={shareLabel} variant="primary" size="lg" onClick={shareStory} />
          <p className="text-[0.85rem] leading-relaxed text-slate-400" aria-live="polite">
            {shareState === 'copied'
              ? 'Link copied. Paste it anywhere to share this story.'
              : shareState === 'failed'
                ? 'Copy did not work here. Copy the address from your browser instead.'
                : 'Send this story to someone, or copy the link.'}
          </p>
        </div>
      </div>
    </section>
  );
}
