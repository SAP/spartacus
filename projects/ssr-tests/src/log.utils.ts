/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Contains methods pertaining to reading, writing and asserting of the ssr log
 * generated by a running ssr server for the sake of testing ssr.
 */

import * as fs from 'fs';

/**
 * Path where SSR log file from server will be generated and read from.
 */
const SSR_LOG_PATH = './ssr.log';

/**
 * Writes no characters to log to clear log file.
 */
export function clearSsrLogFile(): void {
  fs.writeFileSync(SSR_LOG_PATH, '');
}

/**
 * Reads log and returns messages as string array.
 */
export function getLogMessages(): string[] {
  const data = fs.readFileSync(SSR_LOG_PATH).toString();
  return data
    .toString()
    .split('\n')
    .filter((text: string) => text.charAt(0) === '{')
    .map((text: any) => JSON.parse(text).message);
}

/**
 * Check that log contains expected messages in string array.
 * Fail test if log does not contain expected messages.
 */
export function assertMessages(expected: string[]): void {
  const messages = getLogMessages();
  for (const message of expected) {
    expect(messages).toContain(message);
  }
}

/**
 * Check log every interval to see if log contains text.
 * Keeps waiting until log contains test or test times out.
 */
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

/**
 * Returns true if log contains string.
 */
export function doesLogContainText(text: string): boolean {
  const data = fs.readFileSync(SSR_LOG_PATH).toString();
  return data.includes(text);
}
