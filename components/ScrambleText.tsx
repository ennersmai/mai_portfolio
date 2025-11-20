import React, { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&[]{}<>";

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className = '', as: Component = 'h2' }) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startScramble();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [text]);

  const startScramble = () => {
    let iteration = 0;
    const maxIterations = 15; // speed
    
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      // Reveal speed
      iteration += 1 / 2; 
    }, 30);
  };

  return (
    <Component ref={ref as any} className={`${className} font-mono`}>
      {display}
    </Component>
  );
};

export default ScrambleText;