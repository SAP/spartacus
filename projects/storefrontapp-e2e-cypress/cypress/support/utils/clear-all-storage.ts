/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function clearAllStorage(): void {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.window().then((win) => win.localStorage.clear());
  cy.clearLocalStorageMemory();
}
