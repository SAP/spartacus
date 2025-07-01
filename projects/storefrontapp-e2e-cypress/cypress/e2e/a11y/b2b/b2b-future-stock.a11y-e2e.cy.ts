/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe(
  'Future stock - Access Continuum test',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.requireLoggedIn();
    });
    it('Closed dropdown', () => {
      cy.visit(`/product/3318057`);
      cy.get('cx-future-stock-accordion *');
      cy.get('cx-future-stock-accordion').a11yRunContinuumTest();
    });

    it('Opened dropdown', () => {
      cy.get('cx-future-stock-accordion button').click();
      cy.get('.cx-future-stock-accordion-content');
      cy.get('cx-future-stock-accordion').a11yRunContinuumTest();
    });
  }
);
