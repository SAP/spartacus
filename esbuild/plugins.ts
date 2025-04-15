/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plugin } from 'esbuild';

const keyPrefix = 'CX_';
const env: Record<string, unknown> = {};

const keys = Object.keys(process.env).filter((key) =>
  key.startsWith(keyPrefix)
);

keys.forEach((key) => {
  const value = process.env[key];
  env[key] = value === 'true' ? true : value === 'false' ? false : value;
});

const resolveEnvPlugin: Plugin = {
  name: 'resolve-env-plugin',
  setup(build) {
    const config = build.initialOptions;
    config.logLevel = 'error';
    config.define = {
      ...config.define,
      'buildProcess.env': JSON.stringify(env),
    };
  },
};

export const filterWarningsPlugin = (): Plugin => ({
  name: 'filter-warnings',
  setup(build) {
    build.onEnd((result) => {
      if (result.warnings.length > 0) {
        const filteredWarnings = result.warnings.filter(
          (warning) =>
            !(
              warning.text.includes('no side effects') ||
              warning.text.includes('[ignored-bare-import]') ||
              warning.text.includes('is not ESM')
            )
        );

        if(build.initialOptions.logLevel === 'warning') {
          for (const w of filteredWarnings) {
            console.warn(`[esbuild] ${w.text}`);
          }
        }

        // Replace the original warnings (optional)
        result.warnings = filteredWarnings;
      }
    });
  },
});

export default [resolveEnvPlugin, filterWarningsPlugin()];

