
interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export function SplitText({ text, className = "", wordClassName = "", charClassName = "" }: SplitTextProps) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className={`inline-block whitespace-nowrap overflow-hidden ${wordClassName}`}>
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`inline-block translate-y-[120%] opacity-0 split-char ${charClassName}`}
              style={{ willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
          {/* Add space after each word except the last one */}
          {wordIndex !== text.split(' ').length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
