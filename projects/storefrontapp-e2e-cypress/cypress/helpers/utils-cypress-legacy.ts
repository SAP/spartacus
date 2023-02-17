/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Used by tests not suporting TestIsolation introduced in Cypress12
export function clearCacheTestIsolation() {
  // before(() => {
  //   cy.log('testIsolate1');
  //   cy.clearLocalStorage();
  //   cy.clearCookies();
  // });
  beforeEach(() => {
    cy.log('testIsolate2');
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}

export function clearCacheTestIsolationBeforeOnly() {
  cy.log('testIsolate3');
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}

export function clearCacheTestIsolationAll() {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}

export function clearCacheTestIsolationForEach() {
  before(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
}

export function clearCacheTestIsolationForEachAll() {
  before(() => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
  });
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
  });
}
