#!/usr/bin/env node
// @ts-check
/**
 * Fix claude-code binary resolution for web-codegen-scorer.
 *
 * web-codegen-scorer's `resolveBinaryPath` walks up from its own file to the
 * FIRST directory containing a `node_modules/`, then looks for
 * `node_modules/.bin/claude` there. Because web-codegen-scorer ships its own
 * nested `node_modules/`, resolution stops at
 * `node_modules/web-codegen-scorer/node_modules/` — where the hoisted
 * `@anthropic-ai/claude-code` binary is NOT present. Result:
 * "Claude Code is not installed inside the current project".
 *
 * Fix: symlink the hoisted claude binary into that nested `.bin/`. Runs on
 * postinstall so it survives `npm install`. Idempotent.
 *
 * (The published binary is named `claude.exe` even on macOS, but it's a
 * native executable that runs fine here — we just point `claude` at it.)
 */
import { existsSync, mkdirSync, symlinkSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

const hoistedBin = join(
  ROOT,
  'node_modules/@anthropic-ai/claude-code/bin/claude.exe',
);
const nestedBinDir = join(
  ROOT,
  'node_modules/web-codegen-scorer/node_modules/.bin',
);
const linkPath = join(nestedBinDir, 'claude');
// Relative target so the link stays valid regardless of where ROOT lives.
const relTarget = '../../../@anthropic-ai/claude-code/bin/claude.exe';

if (!existsSync(hoistedBin)) {
  console.warn(
    '⚠ link-claude: hoisted claude binary not found at\n  ' +
      hoistedBin +
      '\n  Skipping. Run after `npm install`.',
  );
  process.exit(0);
}

mkdirSync(nestedBinDir, { recursive: true });
if (existsSync(linkPath)) rmSync(linkPath, { force: true });
symlinkSync(relTarget, linkPath);
console.log('✓ link-claude: symlinked claude into web-codegen-scorer/node_modules/.bin/');
