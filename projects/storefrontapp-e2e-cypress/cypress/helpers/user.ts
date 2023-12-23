/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function generateMail(alias: string, newTimestamp: boolean) {
  const timestamp = newTimestamp
    ? Date.now() - 1535535333333
    : Cypress.env('TIMESTAMP');
  return `cypress_user_${alias}_${timestamp}@sapcx.com`;
}

export function randomString() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0].toString(36);
}
