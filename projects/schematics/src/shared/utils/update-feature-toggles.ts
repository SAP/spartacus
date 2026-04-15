/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * Migration that comments out outdated feature toggles in `provideFeatureToggles({...})`
 * in the customer's spartacus-features module during upgrades.
 *
 * When upgrading Spartacus, some feature toggles from the old version may no longer
 * exist in the new version's FeatureTogglesInterface. TypeScript would fail with
 * "does not exist in type" errors. This migration comments out those outdated toggles
 * automatically, prefixed with a [REMOVED] marker so customers can review and clean up.
 *
 * How it works:
 * 1. Read FeatureTogglesInterface from the installed @spartacus/core .d.ts
 *    to get the list of VALID toggle names.
 * 2. Read provideFeatureToggles({...}) from the app's source code
 *    to get the list of USED toggle names.
 * 3. Any USED toggle NOT in the VALID list is outdated → comment it out with [REMOVED].
 */

const INTERFACE_FILE = 'node_modules/@spartacus/core/types/spartacus-core.d.ts';

const EXTRACT_FEATURE_TOGGLES_REGEX = /provideFeatureToggles\(\{([\s\S]*?)\}\)/;

/**
 * Collects all capture-group-1 matches for a global regex.
 * Replacement for [...str.matchAll(regex)].map(m => m[1])
 * that works with older TS targets.
 */
function collectMatches(str: string, regex: RegExp): string[] {
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(str)) !== null) {
    results.push(m[1]);
  }
  return results;
}

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '\n⌛️ Commenting out outdated feature toggles in provideFeatureToggles...'
    );

    // ── Step 1: Get VALID toggle names from the interface ──
    const validKeys = getValidKeys(tree, context);
    if (!validKeys) {
      return tree;
    }

    // ── Step 2: Find the spartacus-features module file ──
    const modulePath = findModuleFile(tree);
    if (!modulePath) {
      context.logger.info(
        '  ↳ Could not find spartacus-features.module.ts — skipping'
      );
      return tree;
    }

    // ── Step 3: Get USED toggle names ──
    const moduleContent = tree.read(modulePath)?.toString('utf-8');
    if (!moduleContent) {
      context.logger.info(`  ↳ Could not read ${modulePath} — skipping`);
      return tree;
    }

    const usedKeys = getUsedKeys(moduleContent);
    if (!usedKeys) {
      context.logger.info(
        '  ↳ No provideFeatureToggles({...}) found — skipping'
      );
      return tree;
    }

    // ── Step 4: Comment out unknown (removed) toggles ──
    const unknownKeys = Array.from(usedKeys).filter(
      (key) => !validKeys.has(key)
    );

    if (unknownKeys.length === 0) {
      context.logger.info(
        '  ↳ No unknown feature toggles found. Nothing to remove.'
      );
      return tree;
    }

    context.logger.info('  ↳ Unknown feature toggles to comment out:');
    unknownKeys.forEach((key) => context.logger.info(`      - ${key}`));

    const updatedContent = commentOutUnknownToggles(
      moduleContent,
      new Set(unknownKeys)
    );
    tree.overwrite(modulePath, updatedContent);

    context.logger.info(
      `✅ Commented out ${unknownKeys.length} unknown toggle(s) in ${modulePath}`
    );
    context.logger.info(
      '   Look for "// [REMOVED]" comments and remove them after review.'
    );

    return tree;
  };
}

/**
 * Reads the FeatureTogglesInterface from the installed @spartacus/core
 * type declarations and returns a Set of valid toggle property names.
 */
function getValidKeys(
  tree: Tree,
  context: SchematicContext
): Set<string> | null {
  const content = tree.read(INTERFACE_FILE)?.toString('utf-8');
  if (!content) {
    context.logger.info(
      `  ↳ Could not read ${INTERFACE_FILE} — skipping feature toggle cleanup`
    );
    return null;
  }

  const featureTogglesInterfaceRegex =
    /interface FeatureTogglesInterface \{([\s\S]*?)^\}/m;
  const match = featureTogglesInterfaceRegex.exec(content);
  if (!match) {
    context.logger.info(
      `  ↳ Could not find FeatureTogglesInterface in ${INTERFACE_FILE} — skipping`
    );
    return null;
  }

  const interfaceBody = match[1];
  const propertyRegex = /^\s+(\w+)\??\s*:\s*boolean\s*;/gm;
  return new Set(collectMatches(interfaceBody, propertyRegex));
}

/**
 * Finds the spartacus-features.module.ts file in the tree.
 */
function findModuleFile(tree: Tree): string | null {
  // Common locations
  const candidates = [
    'src/app/spartacus/spartacus-features.module.ts',
    'src/app/spartacus-features.module.ts',
  ];

  for (const candidate of candidates) {
    if (tree.exists(candidate)) {
      return candidate;
    }
  }

  // Fallback: walk the tree looking for the file
  let found: string | null = null;
  tree.getDir('src').visit((filePath) => {
    if (!found && filePath.endsWith('spartacus-features.module.ts')) {
      found = filePath;
    }
  });

  return found;
}

/**
 * Extracts quoted property names from inside the provideFeatureToggles({...}) call.
 * Only matches active (uncommented) toggle keys.
 */
function getUsedKeys(content: string): Set<string> | null {
  const match = EXTRACT_FEATURE_TOGGLES_REGEX.exec(content);
  if (!match) {
    return null;
  }

  const objectBody = match[1];
  const keyRegex = /^\s+"(\w+)"\s*:/gm;
  return new Set(collectMatches(objectBody, keyRegex));
}

/**
 * Comments out lines containing unknown toggle keys inside the
 * provideFeatureToggles({...}) block, prefixing them with "// [REMOVED]".
 *
 * Example result:
 *   // [REMOVED] "oldToggleName": true,
 */
function commentOutUnknownToggles(
  content: string,
  unknownKeys: Set<string>
): string {
  const blockMatch = EXTRACT_FEATURE_TOGGLES_REGEX.exec(content);
  if (!blockMatch) {
    return content;
  }

  const originalBlock = blockMatch[1];
  const keyMatchRegex = /"(\w+)"\s*:/;
  const commentedBlock = originalBlock
    .split('\n')
    .map((line) => {
      const keyOnLine = keyMatchRegex.exec(line);
      if (keyOnLine && unknownKeys.has(keyOnLine[1])) {
        // Preserve indentation, comment out the line with [REMOVED] marker
        const indentRegex = /^(\s*)/;
        const indent = indentRegex.exec(line)?.[1] ?? '';
        const trimmed = line.trimStart();
        return `${indent}// [REMOVED] ${trimmed}`;
      }
      return line;
    })
    .join('\n');

  return content.replace(originalBlock, commentedBlock);
}
