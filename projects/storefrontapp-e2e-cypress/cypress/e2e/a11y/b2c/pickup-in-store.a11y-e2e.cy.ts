/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe(
  'Buy Online, Pick Up in Store - Access Continuum',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    it('PDP - Free Pickup in Store, tab', () => {
      cy.visit('/product/300938');
      cy.get('button').contains(' Free Pickup In Store ').click();
      cy.get('.cx-pickup-options-container cx-tab').a11yRunContinuumTest();
    });

    it('Pickup in Store - modal', () => {
      cy.get('button').contains(' Select Store ').click();
      cy.get('#txtFindAStore').type('Tokio', { delay: 0 });
      cy.get('button').contains(' Find Stores ').click();
      cy.get('.cx-store-name');
      cy.get('cx-pickup-option-dialog').a11yRunContinuumTest();
    });

    it('Add to cart, pickup info  - modal', () => {
      cy.get('button').contains(' Pick Up from here ').click();
      cy.get('button').contains(' Add to cart ').click();
      cy.get('.cx-dialog-pickup-store').a11yRunContinuumTest();
    });

    it('Checkout - Items to be Picked Up', () => {
      cy.requirePaymentMethodAdded();
      cy.visit('/checkout/review-order');
      cy.get('.cx-store-full-address');
      cy.get('cx-pick-up-in-store-items-details').a11yRunContinuumTest();
    });
  }
);
