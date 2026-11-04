import { useEffect, useState } from "react";

const START_DELAY = 500;
const CHAR_DELAY = 22;
const LINE_DELAY = 140;

// Returns how many characters of `text` have been "typed" so far. A new line's indentation
// appears at once, with a short pause, like an editor's auto-indent. Reduced-motion users
// get the whole text straight away.
export function useTyping(text) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return undefined;
    }
    let typed = 0;
    let timer;
    const step = () => {
      const newLine = text[typed] === "\n";
      typed += 1;
      if (newLine) {
        while (text[typed] === " " || text[typed] === "\n") typed += 1;
      }
      setCount(typed);
      if (typed < text.length) timer = setTimeout(step, newLine ? LINE_DELAY : CHAR_DELAY);
    };
    setCount(0);
    timer = setTimeout(step, START_DELAY);
    return () => clearTimeout(timer);
  }, [text]);

  return count;
}
