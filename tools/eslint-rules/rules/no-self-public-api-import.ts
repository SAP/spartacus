/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import * as fs from 'fs';
import * as path from 'path';

export const RULE_NAME = 'no-self-public-api-import';

const dirToPackageName = new Map<string, string | null>();

function getPackageNameForFile(filePath: string): string | null {
  const dir = path.dirname(filePath);
  if (dirToPackageName.has(dir)) {
    return dirToPackageName.get(dir) ?? null;
  }

  let current = dir;
  const root = path.parse(dir).root;
  while (current !== root) {
    const pkgPath = path.join(current, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const name: string | null =
          typeof pkg.name === 'string' && pkg.name.startsWith('@spartacus/')
            ? pkg.name
            : null;
        dirToPackageName.set(dir, name);
        return name;
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

  dirToPackageName.set(dir, null);
  return null;
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
 * // ✅ Valid — `root` entry point of own library (shared across entry points)
 * import { CartRootModule } from '@spartacus/cart/base/root';
 *
 * // ❌ Invalid — importing from own public API
 * import { CartService } from '@spartacus/cart';
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

        const packageName = getPackageNameForFile(filePath);
        if (!packageName) {
          return;
        }

        // `root` entry points expose the eagerly-loaded public API (config,
        // events, models, tokens) that sibling secondary entry points in the
        // same library must consume through the barrel path — they cannot be
        // reached via relative imports across separate entry-point bundles.
        if (importSource.endsWith('/root')) {
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
