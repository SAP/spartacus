/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function getAuthStorageKey(): string {
  const baseSite = Cypress.env('BASE_SITE') || 'electronics-spa';
  return `spartacus⚿${baseSite}⚿auth`;
}

//TODO: use this function in each place that storage key is used as string
export const AUTH_STORAGE_KEY = 'spartacus⚿⚿auth';

export function getStateAuth() {
  return JSON.parse(localStorage.getItem(getAuthStorageKey()));
}
