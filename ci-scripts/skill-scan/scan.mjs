#!/usr/bin/env node
//
// skill-scan — content scanner for customer-shipped skill markdown files.
//
// Checks each `.md` file for malicious content that source-code scanners
// (Checkmarx / Black Duck / SonarQube) do not cover:
//   • forbidden URLs        (default-deny against allowed-domains.txt)
//   • invisible/bidi Unicode (zero-width, BOM, bidirectional controls)
//   • homoglyphs             (non-Latin letters in English content)
//   • instruction-override   (prompt-injection language)
//
// Usage:
//   node ci-scripts/skill-scan/scan.mjs [path ...]
//
// With no path, scans the shipped skill corpus (core-libs/skills/skills).
// Exits non-zero if any blocking finding is present. Emits GitHub Actions
// error annotations when run in CI (GITHUB_ACTIONS=true) or with --github.

import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { scanContent } from './lib/checks.mjs';
import { loadAllowedDomains } from './lib/config.mjs';
import { DEFAULT_TARGET, findMarkdown } from './lib/files.mjs';

const args = process.argv.slice(2);
const emitAnnotations =
  process.env.GITHUB_ACTIONS === 'true' || args.includes('--github');
const targets = args.filter((a) => !a.startsWith('-'));
const roots = targets.length ? targets : [DEFAULT_TARGET];

const allowedDomains = loadAllowedDomains();
const cwd = process.cwd();

const files = [...new Set(roots.flatMap((root) => findMarkdown(root)))].sort();

if (files.length === 0) {
  console.error(
    `skill-scan: no markdown files found under: ${roots.join(', ')}`
  );
  process.exit(1);
}

let totalFindings = 0;

for (const file of files) {
  const findings = scanContent(readFileSync(file, 'utf8'), { allowedDomains });
  if (findings.length === 0) {
    continue;
  }

  const rel = relative(cwd, file) || file;
  for (const f of findings) {
    totalFindings++;
    console.log(`${rel}:${f.line}:${f.column}  [${f.category}]  ${f.message}`);
    console.log(`    ${f.snippet}`);
    if (emitAnnotations) {
      const message = `[skill-scan] ${f.category}: ${f.message}`.replaceAll(
        /\r?\n/g,
        ' '
      );
      console.log(`::error file=${rel},line=${f.line},col=${f.column}::${message}`);
    }
  }
}

console.log('');
if (totalFindings > 0) {
  console.log(
    `✖ skill-scan: ${totalFindings} blocking finding(s) across ${files.length} scanned file(s).`
  );
  process.exit(1);
}
console.log(`✓ skill-scan: no issues in ${files.length} skill markdown file(s).`);
