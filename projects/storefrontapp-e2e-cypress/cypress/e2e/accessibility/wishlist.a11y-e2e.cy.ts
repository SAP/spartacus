/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Wishlist page accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('Page with items', () => {
    cy.visit('/');
    cy.get('cx-product-carousel-item').first().click();
    cy.get('cx-add-to-wishlist button').click();
    cy.visit('my-account/wishlist');
    cy.get('cx-wish-list table');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Add to card', () => {
    cy.get('cx-add-to-cart button').click();
    cy.get('cx-added-to-cart-dialog .cx-info-container');
    cy.get('cx-added-to-cart-dialog').a11yRunContinuumTest();
  });
});
