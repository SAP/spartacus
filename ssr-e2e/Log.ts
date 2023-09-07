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
  const data = fs.readFileSync(SSR_LOG_PATH).toString();
  // const jsonData = data
  //   .slice(data.indexOf('{'))
  //   .replaceAll('\n', ',')
  //   .slice(0, -1);
  // console.log(jsonData);
  // const messages = JSON.parse(jsonData).map((item) => item.message);
  const messages = data
    .toString()
    .split('\n')
    .filter((text) => text.indexOf('"message":') > -1)
    .map((text) => text.split('":"')[1].split('",')[0]);
  return messages;
}

function assertMessages(expected) {
  const messages = getLogMessages();
  for (const message of expected) {
    expect(messages).toContain(message);
  }
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
