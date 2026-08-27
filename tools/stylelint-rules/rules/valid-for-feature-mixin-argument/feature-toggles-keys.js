/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { Project } = require('ts-morph');

/**
 * Path (relative to the repository root) to the TypeScript source file
 * that contains the `FeatureTogglesInterface` — the single source of truth
 * for valid feature toggle keys used by the SCSS `forFeature` mixin.
 */
const FEATURE_TOGGLES_FILE = path.join(
  'core-libs',
  'core',
  'src',
  'features-config',
  'feature-toggles',
  'config',
  'feature-toggles.ts'
);

const INTERFACE_NAME = 'FeatureTogglesInterface';

/**
 * In-memory cache for the parsed feature toggle keys.
 * Keyed by absolute file path + last-modified time, so the cache is
 * automatically invalidated when the source TS file is edited.
 */
let cache = null;

/**
 * Walks up from `startDir` looking for the repo root, identified by `package.json`.
 */
function findRepoRoot(startDir) {
  let dir = startDir;
  // Safety limit to avoid infinite loop in pathological setups.
  for (let i = 0; i < 50; i++) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return null;
}

/**
 * Returns the absolute path to the `feature-toggles.ts` file.
 * The plugin file itself lives at `tools/stylelint-rules/rules/...`,
 * so we walk up to the repo root from `__dirname`.
 */
function resolveFeatureTogglesPath() {
  const repoRoot = findRepoRoot(__dirname);
  if (!repoRoot) {
    throw new Error(
      '[spartacus/valid-for-feature-mixin-argument] Could not locate repository root (no package.json found while walking up).'
    );
  }
  return path.join(repoRoot, FEATURE_TOGGLES_FILE);
}

/**
 * Reads the `FeatureTogglesInterface` from the TypeScript source file
 * and returns a Set of all its property keys.
 *
 * Uses `ts-morph` to properly parse the TS AST, so we are resilient to
 * comments, multi-line declarations, optional `?` markers, etc.
 *
 * The result is cached per file mtime to avoid repeated parsing on each lint run.
 *
 * @returns {Set<string>} set of valid feature toggle keys
 */
function getFeatureToggleKeys() {
  const filePath = resolveFeatureTogglesPath();

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch (err) {
    throw new Error(
      `[spartacus/valid-for-feature-mixin-argument] Could not read FeatureTogglesInterface source file: ${filePath}\n${err.message}`
    );
  }

  const cacheKey = `${filePath}::${stat.mtimeMs}`;
  if (cache && cache.key === cacheKey) {
    return cache.keys;
  }

  // Lazy-load a minimal ts-morph project — we don't need the whole tsconfig,
  // we only need to parse one file and read its interface declaration.
  const project = new Project({
    useInMemoryFileSystem: false,
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    compilerOptions: {
      allowJs: false,
      noResolve: true,
    },
  });

  const sourceFile = project.addSourceFileAtPath(filePath);
  const iface = sourceFile.getInterface(INTERFACE_NAME);
  if (!iface) {
    throw new Error(
      `[spartacus/valid-for-feature-mixin-argument] Interface "${INTERFACE_NAME}" not found in ${filePath}. ` +
        `If it was renamed, please update FEATURE_TOGGLES_FILE / INTERFACE_NAME in the stylelint plugin.`
    );
  }

  const keys = new Set(iface.getProperties().map((prop) => prop.getName()));

  cache = { key: cacheKey, keys };
  return keys;
}

module.exports = {
  getFeatureToggleKeys,
  // Exposed for testing / debugging.
  _resolveFeatureTogglesPath: resolveFeatureTogglesPath,
};
