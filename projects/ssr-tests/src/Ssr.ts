/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as childProcess from 'child_process';
import * as Log from './Log';

async function startSsrServer() {
  childProcess.exec(
    'NODE_TLS_REJECT_UNAUTHORIZED=0 npm run serve:ssr --prefix ../../> src/ssr.log'
  );
  await Log.waitUntilLogContainsText('Node Express server listening on ');
}

function killSsrServer() {
  return new Promise((resolve) => {
    childProcess.exec('kill $(lsof -t -i:4000)', () => {
      resolve(true);
    });
  });
}

module.exports = { startSsrServer, killSsrServer };
