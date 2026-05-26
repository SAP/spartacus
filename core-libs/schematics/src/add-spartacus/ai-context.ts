/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import * as path from 'path';
import { AiTool, Schema as SpartacusOptions } from './schema';

const SUPPORTED_TOOLS: readonly AiTool[] = ['agents', 'claude', 'cursor'];

const PATH_REWRITES: ReadonlyArray<{ from: RegExp; to: string }> = [
  { from: /(^|\/)dot-claude(\/|$)/g, to: '$1.claude$2' },
  { from: /(^|\/)dot-cursor(\/|$)/g, to: '$1.cursor$2' },
  { from: /(^|\/)dot-spartacus(\/|$)/g, to: '$1.spartacus$2' },
];

const SENTINEL_BEGIN = '<!-- spartacus-ai-context:begin -->';
const SENTINEL_END = '<!-- spartacus-ai-context:end -->';

const ROOT_CLAUDE_MD = '/CLAUDE.md';
const DOT_CLAUDE_MD = '/.claude/CLAUDE.md';
const ROOT_AGENTS_MD = '/AGENTS.md';
const ROOT_CLAUDE_BLOCK = `${SENTINEL_BEGIN}
@.spartacus/CLAUDE.md
${SENTINEL_END}`;
const DOT_CLAUDE_BLOCK = `${SENTINEL_BEGIN}
@../.spartacus/CLAUDE.md
${SENTINEL_END}`;
const ROOT_AGENTS_BLOCK = `${SENTINEL_BEGIN}
See [.spartacus/AGENTS.md](.spartacus/AGENTS.md) for SAP Spartacus storefront guidance.
${SENTINEL_END}`;

export function addAiContext(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    const targets = normalize(options.aiTools);
    if (targets.length === 0) {
      if (options.debug) {
        context.logger.info(`ℹ️  Skipping AI context — no aiTools selected.`);
      }
      return;
    }

    if (options.debug) {
      context.logger.info(`⌛️ Writing AI context for: ${targets.join(', ')}`);
    }

    for (const target of targets) {
      writeTarget(tree, context, target);
    }

    if (targets.includes('claude')) {
      const { path: claudePath, block: claudeBlock } = selectClaudeTarget(tree);
      mergeRootBlock(tree, claudePath, claudeBlock);
    }
    if (targets.includes('agents')) {
      mergeRootBlock(tree, ROOT_AGENTS_MD, ROOT_AGENTS_BLOCK);
    }

    if (options.debug) {
      context.logger.info(`✅ AI context written.`);
    }
  };
}

function writeTarget(
  tree: Tree,
  context: SchematicContext,
  target: AiTool
): void {
  const sourceRoot = path.join(__dirname, 'files', 'ai-context', target);
  if (!fs.existsSync(sourceRoot)) {
    context.logger.warn(
      `Skipping aiTools=${target}: bundled tree not found at ${sourceRoot}. Run 'npm run build:ai-context' from core-libs/schematics.`
    );
    return;
  }

  const files: { absolutePath: string; relativePath: string }[] = [];
  collectFiles(sourceRoot, '', files);

  for (const entry of files) {
    const dest = rewritePath(entry.relativePath);
    const content = fs.readFileSync(entry.absolutePath);
    if (tree.exists(dest)) {
      tree.overwrite(dest, content);
    } else {
      tree.create(dest, content);
    }
  }
}

function collectFiles(
  root: string,
  rel: string,
  out: { absolutePath: string; relativePath: string }[]
): void {
  const dir = path.join(root, rel);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const next = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      collectFiles(root, next, out);
    } else if (entry.isFile()) {
      out.push({
        absolutePath: path.join(root, next),
        relativePath: next,
      });
    }
  }
}

function rewritePath(relativePath: string): string {
  return PATH_REWRITES.reduce(
    (acc, rule) => acc.replace(rule.from, rule.to),
    relativePath
  );
}

function normalize(input: SpartacusOptions['aiTools']): AiTool[] {
  if (!input || input.length === 0) return [];
  const seen = new Set<AiTool>();
  for (const value of input) {
    if (SUPPORTED_TOOLS.includes(value)) {
      seen.add(value);
    }
  }
  return SUPPORTED_TOOLS.filter((tool) => seen.has(tool));
}

/**
 * Pick where to inject the Spartacus sentinel block when `claude` is selected.
 *
 * Priority:
 *   1. `/CLAUDE.md` if the customer already has one (canonical project memory).
 *   2. `/.claude/CLAUDE.md` if Angular CLI's `ng generate ai-config --tool=claude`
 *      already created it there (Angular 20.2+ convention).
 *   3. Fall back to creating `/.claude/CLAUDE.md` (matches Angular convention so
 *      we don't introduce a competing root file).
 *
 * The `@`-import path inside the block is relative to the file containing it
 * (Claude Code resolves `@path` from the importing file's directory), so the
 * `.claude/CLAUDE.md` variant uses `@../.spartacus/CLAUDE.md`.
 */
function selectClaudeTarget(tree: Tree): { path: string; block: string } {
  if (tree.exists(ROOT_CLAUDE_MD)) {
    return { path: ROOT_CLAUDE_MD, block: ROOT_CLAUDE_BLOCK };
  }
  return { path: DOT_CLAUDE_MD, block: DOT_CLAUDE_BLOCK };
}

function mergeRootBlock(tree: Tree, rootPath: string, block: string): void {
  const existing = tree.exists(rootPath)
    ? (tree.read(rootPath)?.toString('utf8') ?? '')
    : '';

  if (!existing) {
    tree.create(rootPath, block + '\n');
    return;
  }

  const sentinelPattern = new RegExp(
    `${escapeRegExp(SENTINEL_BEGIN)}[\\s\\S]*?${escapeRegExp(SENTINEL_END)}`
  );
  const merged = sentinelPattern.test(existing)
    ? existing.replace(sentinelPattern, block)
    : ensureTrailingBlankLine(existing) + block + '\n';

  if (merged !== existing) {
    tree.overwrite(rootPath, merged);
  }
}

function ensureTrailingBlankLine(content: string): string {
  if (content.endsWith('\n\n')) return content;
  if (content.endsWith('\n')) return content + '\n';
  return content + '\n\n';
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
