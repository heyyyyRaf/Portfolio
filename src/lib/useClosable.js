import { useState } from "react";

// Open/close state for a panel that animates out before it hides.
// `open` flips immediately (for aria-expanded and icons); `visible` stays true until the
// panel's "panel-out" animation ends, so the content can fade out first.
export function useClosable(initial = false) {
  const [open, setOpen] = useState(initial);
  const [closing, setClosing] = useState(false);

  function show() {
    setClosing(false);
    setOpen(true);
  }
  function close() {
    if (!open) return;
    setOpen(false);
    setClosing(true);
  }
  // Hide straight away, e.g. when the layout changes and there is nothing to animate.
  function closeNow() {
    setOpen(false);
    setClosing(false);
  }
  function onAnimationEnd(e) {
    if (e.animationName === "panel-out") setClosing(false);
  }

  return {
    open,
    closing,
    visible: open || closing,
    show,
    close,
    closeNow,
    toggle: () => (open ? close() : show()),
    onAnimationEnd,
  };
}
