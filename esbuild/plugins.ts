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
    config.define = {
      ...config.define,
      'buildProcess.env': JSON.stringify(env),
    };
  },
};

export default [resolveEnvPlugin];
