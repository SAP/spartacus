/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
Cypress 12 has introduced Test isolation: https://docs.cypress.io/guides/references/migration-guide#Test-Isolation
 By default, before each test this mechanism takes place:
  - Clearing the dom state by visiting about:blank
  - Clearing cookies in all domains
  - Clearing localStorage in all domains
  - Clearing sessionStorage in all domains
For existing Spartacus e2e tests not supporting TestIsolation, utils functions can simulates pre-Cy12 behavior:
https://docs.cypress.io/guides/references/migration-guide#Simulating-Pre-Test-Isolation-Behavior
*/

function clearLocalStorageAndCookies() {
  cy.clearLocalStorage();
  cy.clearCookies();
}

export function isolateTests(): void {
  before(() => {
    clearLocalStorageAndCookies();
  });
  beforeEach(() => {
    clearLocalStorageAndCookies();
  });
}

export function isolateTestsBefore(): void {
  before(() => {
    clearLocalStorageAndCookies();
  });
}
