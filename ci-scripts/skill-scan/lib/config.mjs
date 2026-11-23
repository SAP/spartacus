import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const moduleDir = dirname(fileURLToPath(import.meta.url));

/**
 * Load the trusted-domain allowlist from `allowed-domains.txt`.
 * Returns lowercased registrable domains; comments and blank lines are dropped.
 */
export function loadAllowedDomains() {
  const file = join(moduleDir, '..', 'allowed-domains.txt');
  return readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.toLowerCase());
}

// Up to three filler words (e.g. "all", "the", "your") between a verb and its
// object. Kept as a simple repetition to avoid deep regex alternation.
const FILLER = String.raw`(?:\w+\s+){0,3}?`;

/**
 * Conservative, high-signal patterns for instruction-override / prompt-injection
 * language directed at an AI agent. Tuned for near-zero false positives on
 * legitimate developer documentation — deliberately NOT a broad imperative-verb
 * sweep. Each entry is a BLOCKING check.
 *
 * `re` must not carry the global flag; the scanner adds it when iterating.
 * Target nouns use singular stems (they also match their plurals).
 */
export const INJECTION_PATTERNS = [
  {
    id: 'ignore-previous-instructions',
    re: new RegExp(
      String.raw`\bignore\s+${FILLER}(?:previous|prior|above|preceding|earlier)\s+(?:instruction|direction|prompt|guidance|context|rule)`,
      'i'
    ),
    desc: '"ignore previous instructions"-style override',
  },
  {
    id: 'disregard-instructions',
    re: new RegExp(
      String.raw`\bdisregard\s+${FILLER}(?:instruction|guideline|rule|direction|system\s+prompt)`,
      'i'
    ),
    desc: '"disregard your instructions"-style override',
  },
  {
    id: 'role-reassignment',
    re: /\byou\s+are\s+now\b/i,
    desc: 'agent role-reassignment language',
  },
  {
    id: 'role-reassignment-from-now-on',
    re: /\bfrom\s+now\s+on\s+you\b/i,
    desc: 'agent role-reassignment language',
  },
  {
    id: 'memory-reset',
    re: /\bforget\s+(?:everything|all\s+previous)\b/i,
    desc: 'agent memory-reset language',
  },
  {
    id: 'reveal-system-prompt',
    re: new RegExp(
      String.raw`\b(?:reveal|print|show|repeat|output|disclose|dump|leak)\s+${FILLER}(?:system\s+prompt|initial\s+prompt|instruction|guideline)`,
      'i'
    ),
    desc: 'system-prompt / instruction exfiltration request',
  },
  {
    id: 'fetch-and-execute',
    re: /\b(?:fetch|download|retrieve|curl|wget)\b[^\n]{0,80}?\b(?:run|execute|eval|exec)\b/i,
    desc: 'fetch-then-execute network-redirect instruction',
  },
  {
    id: 'pipe-to-shell',
    re: /\b(?:curl|wget|fetch)\b[^\n]{0,100}?\|\s*(?:sh|bash|zsh|python|node)\b/i,
    desc: 'download piped directly into a shell/interpreter',
  },
  {
    id: 'exfiltrate-to-url',
    re: /\b(?:send|post|upload|exfiltrate|transmit|forward|leak|beacon)\b[^\n]{0,80}?\bhttps?:\/\//i,
    desc: 'instruction to send/exfiltrate data to a URL',
  },
  {
    id: 'long-base64-blob',
    re: /(?<![A-Za-z0-9+/])[A-Za-z0-9+/]{220,}={0,2}(?![A-Za-z0-9+/])/,
    desc: 'long base64-like blob (possible encoded payload)',
  },
];
