/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Contains methods pertaining to managing the ssr server process for testing purposes.
 */

import * as childProcess from 'child_process';
import * as LogUtils from './log.utils';

/**
 * Default timeout for SSR rendering to happen.
 */
export const DEFAULT_SSR_TIMEOUT = 20000;

export interface SsrServerOptions {
  /**
   * The port the server should run on.
   * Default is 4000.
   */
  port?: number;
  /**
   * Whether to enable caching on the server.
   * Default is false.
   */
  cache?: boolean;
  /**
   * Time in milliseconds to wait for SSR rendering to happen.
   * Default is 20000.
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
  timeout = DEFAULT_SSR_TIMEOUT,
}: SsrServerOptions = {}) {
  LogUtils.clearSsrLogFile();

  child = childProcess.spawn(
    // `2>&1` - redirect stderr to stdout, so also `console.error` and `console.warn` messages are captured in the log file
    `NODE_TLS_REJECT_UNAUTHORIZED=0 SSR_CACHE=${cache} SSR_TIMEOUT=${timeout} PORT=${port} npm run serve:ssr --prefix ../../> .ssr.log 2>&1`,
    { detached: true, shell: true }
  );

  await LogUtils.waitUntilLogContainsText(`Node Express server listening on `);
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
