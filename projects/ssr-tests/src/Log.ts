/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';

const SSR_LOG_PATH = './src/ssr.log';

export function clearSsrLogFile() {
  fs.writeFileSync(SSR_LOG_PATH, '');
}

export function getLogMessages() {
  const data = fs.readFileSync(SSR_LOG_PATH).toString();
  return data
    .toString()
    .split('\n')
    .filter((text: string) => text.charAt(0) === '{')
    .map((text: any) => JSON.parse(text).message);
}

export function assertMessages(expected: string[]) {
  const messages = getLogMessages();
  for (const message of expected) {
    expect(messages).toContain(message);
  }
}

// Check log every interval if log contains text.
export async function waitUntilLogContainsText(
  text: string,
  checkInterval = 500
): Promise<true> {
  return new Promise((resolve) => {
    if (doesLogContainText(text)) {
      return resolve(true);
    }
    return setTimeout(
      () => resolve(waitUntilLogContainsText(text)),
      checkInterval
    );
  });
}

export function doesLogContainText(text: string) {
  const data = fs.readFileSync(SSR_LOG_PATH).toString();
  return data.includes(text);
}
