/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Applied Promotions Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('should display applied promotions on cart page', () => {
    cy.visit('/product/1382080');

    cy.get('cx-add-to-cart')
      .findByText(/Add To Cart/i)
      .click();

    cy.get('cx-added-to-cart-dialog').should('be.visible');
    cy.get('cx-added-to-cart-dialog button.close').click({ force: true });

    cy.get('cx-mini-cart').click();

    cy.get('.cx-promotions').a11yRunContinuumTest();
  });
});
