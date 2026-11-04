import { useEffect, useRef } from "react";

// The point on screen (as a share of its height) that the timeline line is drawn down to.
const READ_LINE = 0.6;
// Matches the line's top and bottom inset in Experience.css.
const LINE_INSET = 8;

// Draws a timeline's line as the page scrolls: sets --progress (0 to 1) on the list and marks
// each .timeline-marker the line has reached with "is-reached". Updates the DOM directly, once
// per frame, so scrolling never re-renders React. Reduced-motion users get the finished line.
export function useTimelineProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return undefined;
    const markers = [...list.querySelectorAll(".timeline-marker")];

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      list.style.setProperty("--progress", "1");
      markers.forEach((marker) => marker.classList.add("is-reached"));
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = list.getBoundingClientRect();
      const readLine = window.innerHeight * READ_LINE;
      const span = box.height - LINE_INSET * 2;
      const progress = Math.min(Math.max((readLine - box.top - LINE_INSET) / span, 0), 1);
      list.style.setProperty("--progress", progress.toFixed(4));
      markers.forEach((marker) => {
        const dot = marker.getBoundingClientRect();
        marker.classList.toggle("is-reached", dot.top + dot.height / 2 <= readLine);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return ref;
}
