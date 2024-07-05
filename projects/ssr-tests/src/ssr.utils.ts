/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Contains methods pertaining to managing the ssr server process for testing purposes.
 */

import * as childProcess from 'child_process';
import * as Log from './log.utils';

/**
 * Used to track the spawned child process running the server.
 */
let child: childProcess.ChildProcess | any;

/**
 * Start an ssr server instance at the given port (default 4000).
 * The server will output a log file at the test project root named ".ssr.log".
 * Funtion finishes once the server is initialized.
 */
export async function startSsrServer(port = 4000) {
  child = childProcess.spawn(
    `NODE_TLS_REJECT_UNAUTHORIZED=0 PORT=${port} npm run serve:ssr --prefix ../../> .ssr.log`,
    { detached: true, shell: true }
  );

  await Log.waitUntilLogContainsText(`Node Express server listening on `);
}

/**
 * Kills the ssr server process that was started.
 * Promise resolves once the kill command is executed.
 */
export function killSsrServer() {
  return new Promise((resolve) => {
    process.kill(-child.pid);
    child.on('exit', () => {
      resolve(true);
    });
  });
}
