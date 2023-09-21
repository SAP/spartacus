/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as childProcess from 'child_process';
import * as Log from './log.utils';

export async function startSsrServer(port = 4000) {
  childProcess.exec(
    `NODE_TLS_REJECT_UNAUTHORIZED=0 PORT=${port} npm run serve:ssr --prefix ../../> ssr.log`
  );
  await Log.waitUntilLogContainsText(`Node Express server listening on `);
}

export function killSsrServer(port = 4000) {
  return new Promise((resolve) => {
    childProcess.exec(`kill $(lsof -t -i:${port})`, () => {
      resolve(true);
    });
  });
}
