import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlight } from "../lib/highlight.js";
import "./CodeBlock.css";

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for plain-http hosts where the Clipboard API isn't available.
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy failed");
}

export default function CodeBlock({ code, language = "python", label }) {
  const [status, setStatus] = useState("idle"); // idle | copied | failed
  const timer = useRef(null);
  const tokens = useMemo(() => highlight(code.trimEnd(), language), [code, language]);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onCopy() {
    try {
      await copyText(code.trimEnd());
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="code-block">
      <div className="code-bar">
        <span className="mono code-label" title={label}>
          {label}
        </span>
        <button type="button" className="btn btn-ghost btn-sm code-copy" onClick={onCopy}>
          {status === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {status === "copied" ? "Copied" : status === "failed" ? "Couldn't copy" : "Copy"}
          <span className="visually-hidden"> code from {label}</span>
        </button>
      </div>
      <pre className="code-pre" tabIndex={0} aria-label={`Code: ${label}`}>
        <code>
          {tokens.map((t, i) =>
            t.type ? (
              <span key={i} className={`tk-${t.type}`}>
                {t.text}
              </span>
            ) : (
              t.text
            ),
          )}
        </code>
      </pre>
      <p className="visually-hidden" aria-live="polite">
        {status === "copied" ? "Code copied" : status === "failed" ? "Couldn't copy the code" : ""}
      </p>
    </div>
  );
}
