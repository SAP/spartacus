/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plugin } from 'esbuild';

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
        } else {
          env[key] = process.env[key];
        }
      }
    });
    // Developer-owned, local-only key (not `CX_`-prefixed and not committed to
    // `.env-cmdrc`) used to display Google Maps in the store finder.
    env['GOOGLE_MAPS_API_KEY'] = process.env['GOOGLE_MAPS_API_KEY'];
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
export default [resolveEnvPlugin, filterWarningsPlugin()];
