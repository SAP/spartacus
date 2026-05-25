/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { isSsrUsed } from '../../../../shared/utils/package-utils';

/**
 * Adds `build:ssr` script to `package.json` as it's required for CCv2 build - process fails when script is missing.
 *
 * This migration adds the script back if it was removed during Angular 20 migration
 * (by the `use-application-builder` schematic).
 *
 * TODO: CXSPA-6466 Can be removed if Model T adjust their build process to not require this script.
 */
function addBuildSsrScript(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('\n⌛️ Adding "build:ssr" script to package.json...');

    const pkgPath = '/package.json';
    const pkg = tree.readJson(pkgPath) as {
      scripts?: Record<string, string>;
    } | null;

    if (pkg === null) {
      throw new SchematicsException('Could not find package.json');
    }

    if (pkg.scripts?.['build:ssr']) {
      context.logger.info(
        '  ↳ "build:ssr" script already exists - skipping addition'
      );
      return tree;
    }

    pkg.scripts = {
      ...pkg.scripts,
      'build:ssr': 'ng build',
    };

    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    context.logger.info('✅ Added "build:ssr" script to package.json');

    return tree;
  };
}

/**
 * Migration to add `build:ssr` script to package.json.
 *
 * This migration only runs for apps that use SSR (Server-Side Rendering).
 * The script is required for CCv2 build process.
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!isSsrUsed(tree)) {
      context.logger.info(
        '\n  ↳ SSR is not configured - skipping build:ssr script migration'
      );
      return noop();
    }

    return addBuildSsrScript()(tree, context);
  };
}
