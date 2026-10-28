// A small tokenizer for the Python and shell snippets on this site. It only needs to
// colour code that we wrote ourselves, so it favours simplicity over full grammar support.

const PY_KEYWORDS = new Set(
  "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(
    " ",
  ),
);
const PY_BUILTINS = new Set("print len range str int dict list set tuple isinstance self".split(" "));

const PY_RULES = [
  ["com", /#[^\n]*/y],
  ["str", /[rbfu]{0,2}("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/iy],
  ["dec", /@[\w.]+/y],
  ["num", /\b\d+(?:\.\d+)?\b/y],
  ["word", /[A-Za-z_]\w*/y],
];

const SH_RULES = [
  ["com", /#[^\n]*/y],
  ["str", /"(?:\\.|[^"\\\n])*"|'[^'\n]*'/y],
  ["word", /[A-Za-z_][\w.-]*/y],
];

function tokenize(code, rules, classifyWord) {
  const tokens = [];
  let plain = "";
  let i = 0;
  let prevWord = "";

  const flush = () => {
    if (plain) tokens.push({ type: null, text: plain });
    plain = "";
  };

  while (i < code.length) {
    let matched = false;
    for (const [type, re] of rules) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (!m) continue;
      flush();
      const text = m[0];
      if (type === "word") {
        tokens.push({ type: classifyWord(text, prevWord, code, i + text.length), text });
        prevWord = text;
      } else {
        tokens.push({ type, text });
      }
      i += text.length;
      matched = true;
      break;
    }
    if (!matched) {
      plain += code[i];
      i += 1;
    }
  }
  flush();
  return tokens;
}

function classifyPython(word, prevWord, code, end) {
  if (PY_KEYWORDS.has(word)) return "key";
  if (prevWord === "def" || prevWord === "class") return "fn";
  if (PY_BUILTINS.has(word)) return "builtin";
  if (code[end] === "(") return "fn";
  return null;
}

// In shell snippets, the first word on each line is the command.
function classifyShell(word, _prevWord, code, end) {
  const lineStart = code.lastIndexOf("\n", end - word.length - 1) + 1;
  const before = code.slice(lineStart, end - word.length);
  if (/^\s*$/.test(before) || /(&&|\|)\s*$/.test(before)) return "fn";
  return null;
}

export function highlight(code, language) {
  if (language === "python") return tokenize(code, PY_RULES, classifyPython);
  if (language === "shell") return tokenize(code, SH_RULES, classifyShell);
  return [{ type: null, text: code }];
}
