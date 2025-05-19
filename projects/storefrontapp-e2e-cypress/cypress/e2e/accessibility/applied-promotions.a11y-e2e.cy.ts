/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Applied Promotions Accessibility', { testIsolation: false }, () => {
  const ProductCode = '1382080';
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('should show promotions in Add to Cart modal', () => {
    cy.visit(`/product/${ProductCode}`);
    cy.get('cx-add-to-cart')
      .findByText(/Add To Cart/i)
      .click();

    cy.get('.cx-promotions')
      .filter(':visible')
      .each(($el) => {
        if ($el.text().trim().length > 0) {
          cy.wrap($el).a11yRunContinuumTest();
        }
      });

    cy.get('cx-added-to-cart-dialog button.close').click({ force: true });
  });

  it('should show all applied promotions on Cart page', () => {
    cy.get('cx-mini-cart').click();
    cy.get('.cart-details-wrapper').should('exist');

    cy.get('.cx-promotions')
      .filter(':visible')
      .each(($el) => {
        if ($el.text().trim().length > 0) {
          cy.wrap($el).a11yRunContinuumTest();
        }
      });
  });
});
