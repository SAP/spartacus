/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plugin } from 'esbuild';
import { resolve } from 'node:path';

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
    console.log('env=', env);
  },
};

// Sitemap CLI Entry Point Plugin
// Adds generate-sitemaps.ts as an additional server entry point
// so that `nx build storefrontapp` produces generate-sitemaps.mjs in dist/server/.
const sitemapCliEntryPlugin: Plugin = {
  name: 'sitemap-cli-entry',
  setup(build) {
    const entryPoints = build.initialOptions.entryPoints;

    // entryPoints is an object like { "main.server": "...", "server": "..." }
    if (entryPoints && !Array.isArray(entryPoints) && typeof entryPoints === 'object') {
      // Only add to server builds (those that have a "server" or "main.server" key)
      const keys = Object.keys(entryPoints);
      const isServerBuild = keys.some((k) => k.includes('server'));
      if (isServerBuild) {
        (entryPoints as Record<string, string>)['generate-sitemaps'] =
          resolve('projects/storefrontapp/src/generate-sitemaps.ts');
        console.log('[sitemap-cli-entry] ✅ Added generate-sitemaps entry point');
      }
    }
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
export default [resolveEnvPlugin, sitemapCliEntryPlugin, filterWarningsPlugin()];
