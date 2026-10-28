import { useEffect, useRef, useState } from "react";

// Returns [ref, shown]: `shown` turns true the first time the element scrolls into view,
// and stays true. Without IntersectionObserver the content is shown straight away.
export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Start a little before the section's top reaches the bottom edge of the screen.
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, shown];
}
