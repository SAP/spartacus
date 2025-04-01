/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Product Search Page', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/');
  });
  it('Searchbar', () => {
    cy.get('.searchbox input').as('searchbox').type('cam');
    cy.get('@searchbox').a11yRunContinuumTest();
  });
});
