/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as fs from 'fs';
import * as path from 'path';

export const RULE_NAME = 'no-self-public-api-import';

interface PackageInfo {
  /** The `@spartacus/*` package name from the nearest `package.json`. */
  name: string;
  /** Absolute directory containing that `package.json` (the library root). */
  packageDir: string;
}

const dirToPackageInfo = new Map<string, PackageInfo | null>();

function getPackageInfoForFile(filePath: string): PackageInfo | null {
  const dir = path.dirname(filePath);
  if (dirToPackageInfo.has(dir)) {
    return dirToPackageInfo.get(dir) ?? null;
  }

  let current = dir;
  const root = path.parse(dir).root;
  while (current !== root) {
    const pkgPath = path.join(current, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const info: PackageInfo | null =
          typeof pkg.name === 'string' && pkg.name.startsWith('@spartacus/')
            ? { name: pkg.name, packageDir: current }
            : null;
        dirToPackageInfo.set(dir, info);
        return info;
      } catch {
        break;
      }
    }
    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }

  dirToPackageInfo.set(dir, null);
  return null;
}

/**
 * Returns true when `filePath` physically lives inside the entry-point
 * directory named by `importSource` (relative to the library's package root).
 *
 * @example
 * // packageName "@spartacus/cart", packageDir ".../feature-libs/cart"
 * // importSource "@spartacus/cart/base/root" -> entry sub-path "base/root"
 * // file ".../feature-libs/cart/base/root/facade/x.ts" -> rel dir "base/root/facade"
 * // => true: importing its own barrel from inside the same entry point
 */
function isFileInsideImportedEntryPoint(
  filePath: string,
  packageName: string,
  packageDir: string,
  importSource: string
): boolean {
  // Sub-path of the import beyond the package name, e.g. "base/root" or "root".
  const entrySubPath = importSource
    .slice(packageName.length)
    .replace(/^\//, '');
  if (!entrySubPath) {
    return false;
  }
  // Directory of the importing file, relative to the library's package root,
  // normalized to forward slashes for comparison against the import path.
  const relDir = path
    .relative(packageDir, path.dirname(filePath))
    .split(path.sep)
    .join('/');
  return relDir === entrySubPath || relDir.startsWith(entrySubPath + '/');
}

/**
 * ESLint rule that disallows importing from a library's own public API entry point.
 * Inside a library, use relative imports instead.
 *
 * Prevents circular dependencies caused by re-importing through the barrel file.
 *
 * @example
 * // Inside feature-libs/cart/src/...
 *
 * // ✅ Valid — relative import
 * import { CartService } from '../services/cart.service';
 *
 * // ✅ Valid — import from a DIFFERENT @spartacus library
 * import { OccConfig } from '@spartacus/core';
 *
 * // ✅ Valid — `root` entry point of own library, consumed from a SIBLING
 * //            entry point (shared across entry points)
 * // e.g. inside feature-libs/cart/base/core/...
 * import { CartRootModule } from '@spartacus/cart/base/root';
 *
 * // ❌ Invalid — importing from own public API
 * import { CartService } from '@spartacus/cart';
 *
 * // ❌ Invalid — importing the `root` barrel from a file that lives INSIDE
 * //            that same `root` entry point (a self-barrel circular import)
 * // e.g. inside feature-libs/cart/base/root/...
 * import { CartRootModule } from '@spartacus/cart/base/root';
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        "Disallows importing from a library's own @spartacus public API entry point; use relative imports instead.",
    },
    schema: [],
    messages: {
      noSelfPublicApiImport:
        '[Spartacus] Inside library "{{packageName}}", use relative imports instead of importing from its own public API entry point.',
    },
  },
  defaultOptions: [],
  create(context) {
    const filePath = context.filename;

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const importSource = node.source.value as string;
        if (!importSource.startsWith('@spartacus/')) {
          return;
        }

        const packageInfo = getPackageInfoForFile(filePath);
        if (!packageInfo) {
          return;
        }
        const { name: packageName, packageDir } = packageInfo;

        // `root` entry points expose the eagerly-loaded public API (config,
        // events, models, tokens) that sibling secondary entry points in the
        // same library must consume through the barrel path — they cannot be
        // reached via relative imports across separate entry-point bundles.
        //
        // But do NOT exempt a `/root` import when the importing file itself
        // lives inside that same `root` entry point: that is a self-import of
        // its own barrel and reintroduces the very circular dependency this
        // rule exists to prevent.
        if (
          importSource.endsWith('/root') &&
          !isFileInsideImportedEntryPoint(
            filePath,
            packageName,
            packageDir,
            importSource
          )
        ) {
          return;
        }

        if (
          importSource === packageName ||
          importSource.startsWith(packageName + '/')
        ) {
          context.report({
            node,
            messageId: 'noSelfPublicApiImport',
            data: { packageName },
          });
        }
      },
    };
  },
});
