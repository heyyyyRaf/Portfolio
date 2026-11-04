import { useEffect, useRef, useState } from "react";

// Returns [ref, position]: "visible" while the element is on screen, otherwise "below" or
// "above" depending on which side it left from, so the reveal replays in the scroll
// direction every time it comes back. Without IntersectionObserver it is always "visible".
export function useReveal() {
  const ref = useRef(null);
  const [position, setPosition] = useState("below");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setPosition("visible");
      return undefined;
    }
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame);
        const side = entry.boundingClientRect.top < 0 ? "above" : "below";
        if (!entry.isIntersecting) {
          setPosition(side);
          return;
        }
        // A jump (anchor link, fast scroll) can skip the "leave" callback, so first park the
        // content on the side it is entering from, then let it transition in.
        setPosition(side);
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => setPosition("visible"));
        });
      },
      // Start a little before the section's top reaches the bottom edge of the screen.
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return [ref, position];
}
