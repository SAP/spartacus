import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Load the trusted-domain allowlist from `allowed-domains.txt`.
 * Returns lowercased registrable domains; comments and blank lines are dropped.
 */
export function loadAllowedDomains() {
  const file = join(__dirname, '..', 'allowed-domains.txt');
  return readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.toLowerCase());
}

/**
 * Conservative, high-signal patterns for instruction-override / prompt-injection
 * language directed at an AI agent. Tuned for near-zero false positives on
 * legitimate developer documentation — deliberately NOT a broad imperative-verb
 * sweep. Each entry is a BLOCKING check.
 *
 * `re` must not carry the global flag; the scanner adds it when iterating.
 */
export const INJECTION_PATTERNS = [
  {
    id: 'ignore-previous-instructions',
    re: /\bignore\s+(?:all\s+|any\s+|the\s+)*(?:previous|prior|above|preceding|earlier)\s+(?:instructions?|directions?|prompts?|guidance|context|rules?)\b/i,
    desc: '"ignore previous instructions"-style override',
  },
  {
    id: 'disregard-instructions',
    re: /\bdisregard\s+(?:all\s+|any\s+|the\s+|your\s+|previous\s+|prior\s+)*(?:instructions?|guidelines?|rules?|directions?|system\s+prompt)\b/i,
    desc: '"disregard your instructions"-style override',
  },
  {
    id: 'role-reassignment',
    re: /\b(?:you\s+are\s+now|from\s+now\s+on\s+you\s+(?:are|will|must)|forget\s+(?:everything|all\s+(?:previous|prior)))\b/i,
    desc: 'agent role-reassignment / memory-reset language',
  },
  {
    id: 'reveal-system-prompt',
    re: /\b(?:reveal|print|show|repeat|output|disclose|dump|leak)\s+(?:me\s+)?(?:your|the)\s+(?:full\s+)?(?:system\s+prompt|initial\s+prompt|instructions?|guidelines?)\b/i,
    desc: 'system-prompt / instruction exfiltration request',
  },
  {
    id: 'fetch-and-execute',
    re: /\b(?:fetch|download|retrieve|curl|wget)\b[^\n]{0,80}?\b(?:and\s+)?(?:run|execute|eval|evaluate|exec)\b/i,
    desc: 'fetch-then-execute network-redirect instruction',
  },
  {
    id: 'pipe-to-shell',
    re: /\b(?:curl|wget|fetch)\b[^\n]{0,100}?\|\s*(?:sh|bash|zsh|python[0-9.]*|node)\b/i,
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
