/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Verify that the SSR app under tests meets the following criteria:
 * 1. The app us built in prod mode.
 *
 *    Why it's needed:
 *      Some tests require parsing single-line JSON log entries appearing in the SSR logs.
 *      In an app built in prod mode, the JSON objects are printed single-line that can be easily parsed in tests.
 *      In an app built in dev mode, the JSON objects are printed multi-line (to be more human-readable),
 *      but cannot be parsed in tests so it makes some tests to fail.
 *
 * 2. The app has configured a base OCC url being a local backend proxy, instead of a real backend.
 *
 *    Why it's needed:
 *      Some tests require mocking the behavior of the backend using a local backend http proxy.
 *      If the app is not calling a local backend proxy as a base OCC url, some tests will fail.
 *
 *
 * In this file we'll validate the build of the app before running the tests.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * String that always appears in the `main.js` file of the SSR app when built with a local backend proxy.
 */
const USING_PROXY_BACKEND_MARKER = `CX_BASE_URL:"http://localhost:9002"`;

/**
 * String that always appears in the `main.js` file of the SSR app when built in dev mode.
 */
const USING_DEV_MODE_MARKER = `ngDevMode`;

/**
 * Path to the `main.js` file of the built SSR app.
 */
const SSR_APP_PATH = path.join(
  __dirname,
  '../../dist/storefrontapp-server/main.js'
);

/**
 * Advice to the user on how to build the SSR app in prod mode to use a local backend proxy.
 */
const BUILD_COMMAND_ADVICE =
  colorToYellow(`Please build the SSR app with the following command:

> npm run build && npm run build:ssr:local-http-backend`);

export default async function validateSsrBuild() {
  if (!fs.existsSync(SSR_APP_PATH)) {
    throw new Error(
      `
SSR app not found at the expected path '${SSR_APP_PATH}'. 
${BUILD_COMMAND_ADVICE}`
    );
  }

  const fileContents = fs.readFileSync(SSR_APP_PATH, 'utf8');
  if (!fileContents.includes(USING_PROXY_BACKEND_MARKER)) {
    throw new Error(
      `
SSR app is not using a local backend proxy as a base OCC url.
${BUILD_COMMAND_ADVICE}`
    );
  }

  if (fileContents.includes(USING_DEV_MODE_MARKER)) {
    throw new Error(
      `
SSR app is not using prod mode.
${BUILD_COMMAND_ADVICE}`
    );
  }
}

function colorToYellow(text: string) {
  return `\x1b[33m${text}\x1b[0m`;
}
