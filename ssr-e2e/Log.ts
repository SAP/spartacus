/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');

const SSR_LOG_PATH = './ssr-e2e/ssr.log';

function clearSsrLogFile() {
  fs.writeFileSync(SSR_LOG_PATH, '');
}

function getLogMessages() {
  const data = fs.readFileSync(SSR_LOG_PATH);
  console.log(data, data.toString()); // TODO: Temp read log in ci
  const messages = data
    .toString()
    .split('\n')
    .filter((text) => text.indexOf('"message":') > -1)
    //.map((text) => text.split('":"')[1].split('",')[0]);
    .map((text) => text.split('":"')[1].split('",')[0]);
  // const messages = JSON.parse(data.toString()).map((item) => item.message);
  return messages;
}

function assertMessages(expected) {
  const messages = getLogMessages();
  expect(messages).toEqual(expected);
}

// Check log every interval if log contains text.
async function waitUntilLogContainsText(text, checkInterval = 500) {
  return new Promise((resolve) => {
    if (doesLogContainText(text)) {
      return resolve();
    }
    return setTimeout(
      () => resolve(waitUntilLogContainsText(text)),
      checkInterval
    );
  });
}

function doesLogContainText(text) {
  const data = fs.readFileSync(SSR_LOG_PATH).toString();
  return data.includes(text);
}

module.exports = {
  waitUntilLogContainsText,
  clearSsrLogFile,
  getLogMessages,
  assertMessages,
  doesLogContainText,
};
