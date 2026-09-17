import { loadAllowedDomains, INJECTION_PATTERNS } from './config.mjs';

// --- Unicode detectors (Node 22 native property escapes, zero-dep) ---

// Bidirectional formatting controls (can visually reorder text to hide payloads).
const BIDI_RE = /[\u202A-\u202E\u2066-\u2069]/gu;
const BIDI_CODEPOINTS = new Set([
  0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x2066, 0x2067, 0x2068, 0x2069,
]);

// Invisible format chars (\p{Cf}: zero-width space/joiner, BOM, soft hyphen…)
// and control chars (\p{Cc}), excluding the benign whitespace controls.
const INVISIBLE_RE = /[\p{Cf}\p{Cc}]/gu;
const ALLOWED_CONTROL = new Set([0x09, 0x0a, 0x0d]); // tab, LF, CR

// Any letter; homoglyph check flags letters outside the Latin script.
const LETTER_RE = /\p{L}/gu;
const LATIN_LETTER_RE = /\p{Script=Latin}/u;

// URL-ish tokens: any `scheme://…` or bare `www.…`. Stops at whitespace and
// common markdown/HTML delimiters so link syntax doesn't leak into the match.
const URL_RE = /\b(?:[a-z][a-z0-9+.-]*:\/\/|www\.)[^\s<>()[\]"'`]+/giu;

const SEVERITY = 'error';

/** Build a fast (line, column) locator for character offsets in `text`. */
function makeLocator(text) {
  const lineStarts = [0];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      lineStarts.push(i + 1);
    }
  }
  return (index) => {
    let lo = 0;
    let hi = lineStarts.length - 1;
    let line = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (lineStarts[mid] <= index) {
        line = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return { line: line + 1, column: index - lineStarts[line] + 1 };
  };
}

const hex = (ch) =>
  'U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');

const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

/** The source line containing `index`, trimmed and length-capped. */
function contextSnippet(text, index) {
  const start = text.lastIndexOf('\n', index) + 1;
  let end = text.indexOf('\n', index);
  if (end === -1) {
    end = text.length;
  }
  return truncate(text.slice(start, end).trim(), 100);
}

/** Build a finding object anchored at a character offset. */
function makeFinding(category, text, locate, index, message, snippet) {
  const { line, column } = locate(index);
  return {
    category,
    severity: SEVERITY,
    line,
    column,
    message,
    snippet: snippet ?? contextSnippet(text, index),
  };
}

/** Ensure a pattern iterates globally without mutating the shared instance. */
function withGlobalFlag(re) {
  return re.flags.includes('g') ? re : new RegExp(re.source, re.flags + 'g');
}

/** Classify a single extracted URL token against the allowlist policy. */
function checkUrl(raw, allowedDomains) {
  // Drop trailing punctuation captured from surrounding prose.
  const url = raw.replace(/[.,;:!?)\]}>'"`]+$/, '');

  if (/^www\./i.test(url)) {
    return { bad: true, reason: `URL without explicit https scheme: ${url}` };
  }

  let host;
  let scheme;
  try {
    const parsed = new URL(url);
    scheme = parsed.protocol.replace(':', '').toLowerCase();
    host = parsed.hostname.toLowerCase();
  } catch {
    return { bad: true, reason: `Unparseable URL: ${truncate(url, 80)}` };
  }

  if (scheme !== 'https') {
    return { bad: true, reason: `Non-https URL scheme "${scheme}": ${url}` };
  }

  const allowed = allowedDomains.some(
    (domain) => host === domain || host.endsWith('.' + domain)
  );
  if (!allowed) {
    return { bad: true, reason: `URL host not in allowlist: ${host}` };
  }
  return { bad: false };
}

function detectBidi(text, locate) {
  const findings = [];
  for (const m of text.matchAll(BIDI_RE)) {
    findings.push(
      makeFinding(
        'bidi-control',
        text,
        locate,
        m.index,
        `Bidirectional control character ${hex(m[0])}`
      )
    );
  }
  return findings;
}

function detectInvisible(text, locate) {
  const findings = [];
  for (const m of text.matchAll(INVISIBLE_RE)) {
    const code = m[0].codePointAt(0);
    if (ALLOWED_CONTROL.has(code) || BIDI_CODEPOINTS.has(code)) {
      continue;
    }
    findings.push(
      makeFinding(
        'invisible-char',
        text,
        locate,
        m.index,
        `Invisible/format character ${hex(m[0])}`
      )
    );
  }
  return findings;
}

function detectHomoglyphs(text, locate) {
  const findings = [];
  for (const m of text.matchAll(LETTER_RE)) {
    if (LATIN_LETTER_RE.test(m[0])) {
      continue;
    }
    findings.push(
      makeFinding(
        'homoglyph',
        text,
        locate,
        m.index,
        `Non-Latin letter "${m[0]}" (${hex(m[0])}) — possible homoglyph`
      )
    );
  }
  return findings;
}

function detectForbiddenUrls(text, locate, allowedDomains) {
  const findings = [];
  for (const m of text.matchAll(URL_RE)) {
    const result = checkUrl(m[0], allowedDomains);
    if (result.bad) {
      findings.push(
        makeFinding('forbidden-url', text, locate, m.index, result.reason)
      );
    }
  }
  return findings;
}

function detectInjectionLanguage(text, locate) {
  const findings = [];
  for (const pattern of INJECTION_PATTERNS) {
    for (const m of text.matchAll(withGlobalFlag(pattern.re))) {
      findings.push(
        makeFinding(
          'injection-language',
          text,
          locate,
          m.index,
          pattern.desc,
          truncate(m[0].trim(), 80)
        )
      );
    }
  }
  return findings;
}

/**
 * Scan markdown text for malicious content. Returns an array of findings, each
 * `{ category, severity, line, column, message, snippet }`, sorted by position.
 * All findings are blocking (severity `error`).
 */
export function scanContent(text, opts = {}) {
  const allowedDomains = opts.allowedDomains ?? loadAllowedDomains();
  const locate = makeLocator(text);
  return [
    ...detectBidi(text, locate),
    ...detectInvisible(text, locate),
    ...detectHomoglyphs(text, locate),
    ...detectForbiddenUrls(text, locate, allowedDomains),
    ...detectInjectionLanguage(text, locate),
  ].sort((a, b) => a.line - b.line || a.column - b.column);
}
