/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

/**
 * Migration that updates feature toggles in `provideFeatureToggles({...})`
 * in the customer's spartacus-features module during upgrades.
 *
 * When upgrading Spartacus:
 * - Some feature toggles from the old version may no longer exist in the
 *   new version's FeatureTogglesInterface → they are commented out with [REMOVED].
 * - New feature toggles may have been introduced in the new version
 *   but are missing from the customer's app → they are added with value `true` and marked with [NEW].
 *
 * How it works:
 * 1. Read FeatureTogglesInterface from the installed @spartacus/core .d.ts
 *    to get the list of VALID toggle names.
 * 2. Read provideFeatureToggles({...}) from the app's source code
 *    to get the list of USED toggle names (including commented-out ones).
 * 3. Any USED toggle NOT in the VALID list is outdated → comment it out with [REMOVED].
 * 4. Any VALID toggle NOT in the USED list is new → add it with value `true` and mark with [NEW].
 */

const INTERFACE_FILE =
  'node_modules/@spartacus/core/types/spartacus-core.d.ts';

/**
 * Collects all capture-group-1 matches for a global regex.
 * Replacement for [...str.matchAll(regex)].map(m => m[1])
 * that works with older TS targets.
 */
function collectMatches(str: string, regex: RegExp): string[] {
  const results: string[] = [];
  let m: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((m = regex.exec(str)) !== null) {
    results.push(m[1]);
  }
  return results;
}

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '\n⌛️ Updating feature toggles in provideFeatureToggles...'
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
    let moduleContent = tree.read(modulePath)?.toString('utf-8');
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

    if (unknownKeys.length > 0) {
      context.logger.info('  ↳ Unknown feature toggles to comment out:');
      unknownKeys.forEach((key) => context.logger.info(`      - ${key}`));

      moduleContent = commentOutUnknownToggles(
        moduleContent,
        new Set(unknownKeys)
      );

      context.logger.info(
        `  ↳ Commented out ${unknownKeys.length} unknown toggle(s).`
      );
      context.logger.info(
        '     Look for "// [REMOVED]" comments and remove them after review.'
      );
    } else {
      context.logger.info(
        '  ↳ No unknown feature toggles found. Nothing to remove.'
      );
    }

    // ── Step 5: Add missing (newly introduced) toggles ──
    // Collect all mentioned keys including commented-out ones to avoid re-adding them
    const allMentionedKeys = getAllMentionedKeys(moduleContent);
    const missingKeys = Array.from(validKeys).filter(
      (key) => !allMentionedKeys.has(key)
    );

    if (missingKeys.length > 0) {
      context.logger.info('  ↳ New feature toggles to add:');
      missingKeys.forEach((key) => context.logger.info(`      + ${key}`));

      moduleContent = addMissingToggles(moduleContent, missingKeys);

      context.logger.info(
        `  ↳ Added ${missingKeys.length} new toggle(s) with value \`true\`.`
      );
    } else {
      context.logger.info(
        '  ↳ No new feature toggles to add.'
      );
    }

    // ── Step 6: Write changes if any ──
    if (unknownKeys.length > 0 || missingKeys.length > 0) {
      tree.overwrite(modulePath, moduleContent);
      context.logger.info(
        `✅ Feature toggles updated in ${modulePath}`
      );
    }

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

  const match = content.match(
    /interface FeatureTogglesInterface \{([\s\S]*?)^\}/m
  );
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
  const match = content.match(/provideFeatureToggles\(\{([\s\S]*?)\}\)/);
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
  const blockMatch = content.match(/provideFeatureToggles\(\{([\s\S]*?)\}\)/);
  if (!blockMatch) {
    return content;
  }

  const originalBlock = blockMatch[1];
  const commentedBlock = originalBlock
    .split('\n')
    .map((line) => {
      const keyOnLine = line.match(/"(\w+)"\s*:/);
      if (keyOnLine && unknownKeys.has(keyOnLine[1])) {
        // Preserve indentation, comment out the line with [REMOVED] marker
        const indent = line.match(/^(\s*)/)?.[1] ?? '';
        const trimmed = line.trimStart();
        return `${indent}// [REMOVED] ${trimmed}`;
      }
      return line;
    })
    .join('\n');

  return content.replace(originalBlock, commentedBlock);
}

/**
 * Extracts ALL toggle key names mentioned inside the provideFeatureToggles({...})
 * block, including keys that have been commented out (e.g. `// [REMOVED] "oldToggle": true`).
 * This prevents re-adding toggles that were just commented out.
 */
function getAllMentionedKeys(content: string): Set<string> {
  const match = content.match(/provideFeatureToggles\(\{([\s\S]*?)\}\)/);
  if (!match) {
    return new Set();
  }

  const objectBody = match[1];
  // Match both active and commented-out toggle keys
  const keyRegex = /"(\w+)"\s*:/g;
  return new Set(collectMatches(objectBody, keyRegex));
}

/**
 * Adds missing feature toggle entries to the provideFeatureToggles({...}) block.
 * New toggles are inserted with value `true` before the closing `})`,
 * matching the indentation of existing entries, and marked with [NEW].
 *
 * Example: if `newToggle` is missing, the block becomes:
 *   provideFeatureToggles({
 *     "existingToggle": true,
 *     "newToggle": true, // [NEW]
 *   })
 */
function addMissingToggles(content: string, missingKeys: string[]): string {
  const blockMatch = content.match(/provideFeatureToggles\(\{([\s\S]*?)\}\)/);
  if (!blockMatch) {
    return content;
  }

  const originalBlock = blockMatch[1];

  // Detect indentation from existing entries
  const existingEntryMatch = originalBlock.match(/^(\s+)"\w+"\s*:/m);
  const indent = existingEntryMatch ? existingEntryMatch[1] : '      ';

  // Build new toggle lines with [NEW] marker
  const newLines = missingKeys
    .sort()
    .map((key) => `${indent}"${key}": true, // [NEW]`)
    .join('\n');

  // Insert before the closing of the block (last line before `}`)
  // Trim trailing whitespace/newlines from original block, append new entries
  const trimmedBlock = originalBlock.replace(/\s*$/, '');
  // Ensure there's a comma after the last existing entry if needed
  const lastEntryNeedsComma =
    trimmedBlock.length > 0 &&
    !trimmedBlock.trimEnd().endsWith(',') &&
    !trimmedBlock.trimEnd().endsWith('{');
  const comma = lastEntryNeedsComma ? ',' : '';

  const updatedBlock = `${trimmedBlock}${comma}\n${newLines}\n`;

  return content.replace(originalBlock, updatedBlock);
}
