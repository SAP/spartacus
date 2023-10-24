/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Contains methods pertaining to managing the ssr server process for testing purposes.
 */

import * as childProcess from 'child_process';
import * as Log from './log.utils';

/**
 * Start an ssr server instance at the given port (default 4000).
 * The server will output a log file at the test project root named "ssr.log".
 * Funtion finishes once the server is initialized.
 */
export async function startSsrServer(port = 4000, args: string = '') {
  childProcess.exec(
    `NODE_TLS_REJECT_UNAUTHORIZED=0 PORT=${port} ${args} npm run serve:ssr:dev --prefix ../../> ssr.log`
  );
  await Log.waitUntilLogContainsText(`Node Express server listening on `);
}

/**
 * Kills the ssr server process at the given port (default 4000).
 * Promise resolves once the kill command is executed.
 */
export function killSsrServer(port = 4000) {
  return new Promise((resolve) => {
    childProcess.exec(`kill $(lsof -t -i:${port})`, () => {
      resolve(true);
    });
  });
}
