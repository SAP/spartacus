/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Verify that the SSR app under tests meets the following criteria:
 *
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
 * 3. No other process is already listening on the HTTP port used by the SSR server.
 *
 *    Why it's needed:
 *      In tests we start a new SSR server process listening on a specific port.
 *      If anything is listening on that port, the tests will fail.
 *
 * In this file we'll validate the build of the app before running the tests.
 */

import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';

/**
 * The port the SSR server will listen on.
 */
const SSR_PORT = 4000;

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
  colorToYellow('Please build the SSR app with the following command\n') +
  colorToYellow('> npm run build && npm run build:ssr:local-http-backend\n');

/**
 * Advice to the user on how to kill the process listening on the port.
 */
export const KILL_PORT_ADVICE =
  colorToYellow(
    `Please kill the process listening on port ${SSR_PORT} to free the port for the SSR server.\n`
  ) +
  // include 2 commands that will work both on Mac and Linux for port 4000
  colorToYellow('a) on Mac/Linux run:\n') +
  colorToYellow(`   > kill -9 $(lsof -t -i :${SSR_PORT})\n`) +
  colorToYellow(
    'b) on Windows run 2 commands (to find PID and then to kill it): \n'
  ) +
  colorToYellow(`   > netstat -ano | findstr :${SSR_PORT}\n`) +
  colorToYellow(`   > taskkill /f /pid <THE_PID__ABOVE> \n`);

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

  if (!(await isHttpPortFree(SSR_PORT))) {
    throw new Error(
      `
Port ${SSR_PORT} is already in use.
${KILL_PORT_ADVICE}`
    );
  }
}

function colorToYellow(text: string) {
  return `\x1b[33m${text}\x1b[0m`;
}

async function isHttpPortFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = http.createServer();

    server.listen(port, () => {
      server.close(() => {
        resolve(true);
      });
    });

    server.once('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
