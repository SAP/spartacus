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

export interface SsrServerOptions {
  /**
   * The port the server should run on.
   */
  port?: number;
  /**
   * Whether to enable caching on the server.
   */
  cache?: boolean;
  /**
   * The timeout for the server to start.
   */
  timeout?: number;
}

/**
 * Used to track the spawned child process running the server.
 */
let child: childProcess.ChildProcess | any;

/**
 * Start an ssr server instance at the given port (default 4000).
 * The server will output a log file at the test project root named ".ssr.log".
 * Function finishes once the server is initialized.
 */
export async function startSsrServer({
  port = 4000,
  cache = false,
  timeout = 20000,
}: SsrServerOptions = {}) {
  child = childProcess.spawn(
    `NODE_TLS_REJECT_UNAUTHORIZED=0 SSR_CACHE=${cache} SSR_TIMEOUT=${timeout} PORT=${port} npm run serve:ssr --prefix ../../> .ssr.log`,
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
