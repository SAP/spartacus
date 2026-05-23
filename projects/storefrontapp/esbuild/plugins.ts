/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as path from 'path';
import { Plugin } from 'esbuild';

// ---------------------------------------------------------------------------
// Spartacus Paths Plugin
//
// In the development monorepo, @spartacus/* packages are symlinked from
// node_modules to their source directories (e.g. feature-libs/asm).
// Those source package.json files only declare a "sass" export condition,
// so esbuild cannot resolve their JS entry points via the exports map.
//
// This plugin reads the tsconfig.json `paths` mappings and intercepts every
// @spartacus/* import, resolving it directly to the corresponding local
// public_api.ts source file — the same way the TypeScript compiler does.
// ---------------------------------------------------------------------------
function spartacusPathsPlugin(): Plugin {
  const workspaceRoot = path.resolve(__dirname, '../../..');
  const tsconfigPath = path.join(workspaceRoot, 'tsconfig.json');
  const tsconfigRaw = fs.readFileSync(tsconfigPath, 'utf-8');

  // Strip single-line comments so JSON.parse can handle the tsconfig.
  const tsconfigJson = tsconfigRaw.replace(/\/\/[^\n]*/g, '');
  const tsconfig = JSON.parse(tsconfigJson);
  const tsPaths: Record<string, string[]> =
    tsconfig?.compilerOptions?.paths ?? {};

  // Build a lookup: package-specifier → absolute resolved path.
  // tsconfig paths values are relative to the workspace root and point to
  // TypeScript source files (e.g. "feature-libs/asm/public_api").
  // esbuild needs absolute paths with a .ts extension to resolve correctly.
  const pathMap = new Map<string, string>();
  for (const [key, values] of Object.entries(tsPaths)) {
    if (values.length > 0) {
      const resolved = path.join(workspaceRoot, values[0]);
      // Add .ts extension if not already present and file exists with it
      const withTs = resolved.endsWith('.ts') ? resolved : `${resolved}.ts`;
      pathMap.set(key, fs.existsSync(withTs) ? withTs : resolved);
    }
  }

  return {
    name: 'spartacus-paths',
    setup(build) {
      // Intercept all @spartacus/* imports
      build.onResolve({ filter: /^@spartacus\// }, (args) => {
        const mapped = pathMap.get(args.path);
        if (mapped) {
          return { path: mapped };
        }
        // No exact match found — let esbuild try its default resolution
        return undefined;
      });
    },
  };
}

// Environment Variables Plugin
const resolveEnvPlugin: Plugin = {
  name: 'resolve-env-plugin',
  setup(build) {
    const env: Record<string, string | boolean | undefined> = {};
    Object.keys(process.env).forEach((key) => {
      if (key.startsWith('CX_')) {
        if (process.env[key] === 'true') {
          env[key] = true;
        } else if (process.env[key] === 'false') {
          env[key] = false;
        } else env[key] = process.env[key];
      }
    });
    build.initialOptions.define = {
      ...build.initialOptions.define,
      'buildProcess.env': JSON.stringify(env),
    };
    console.log('env=', env); // eslint-disable-line no-console
  },
};

// Filter Warnings Plugin
const filterWarningsPlugin = (): Plugin => ({
  name: 'filter-warnings',
  setup(build) {
    build.onEnd((result) => {
      result.warnings = result.warnings.filter(
        (warning) =>
          !warning.text.includes('no side effects') &&
          !warning.text.includes('[ignored-bare-import]') &&
          !warning.text.includes('is not ESM')
      );
    });
  },
});

// Export Plugins
export default [
  resolveEnvPlugin,
  spartacusPathsPlugin(),
  filterWarningsPlugin(),
];
