/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Used by tests not suporting TestIsolation introduced in Cypress12
export function clearCacheTestIsolation() {
  before(() => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
  });
}

export function clearCacheTestIsolationBeforeEach() {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}
