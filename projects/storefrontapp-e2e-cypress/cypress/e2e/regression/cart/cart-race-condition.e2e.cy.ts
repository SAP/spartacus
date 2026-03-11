/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';

/**
 * Test suite for cart race condition scenarios.
 *
 * Issue: When a user quickly triggers multiple add-to-cart operations
 * before the first cart creation completes, concurrent createCart() actions
 * could result in multiple carts being created on the backend.
 *
 * Fix: Uses exhaustMap in cart.effect.ts and shareReplay caching in
 * active-cart.service.ts to prevent parallel cart creation.
 *
 * @see active-cart.service.ts - requireLoadedCart() with shareReplay caching
 * @see cart.effect.ts - createCart$ effect using exhaustMap
 */
describe('Cart Race Condition - Slow Network', () => {
  const products = [
    { code: '1934793', name: 'PowerShot A480' },
    { code: '300938', name: 'Photosmart E317 Digital Camera' },
    { code: '3470545', name: 'EASYSHARE M381' },
  ];

  const SLOW_NETWORK_DELAY_MS = 2000;

  function getOccUrlPrefix() {
    return `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}`;
  }

  function getBaseUrlPrefix() {
    return `/${Cypress.env('BASE_SITE')}/${Cypress.env(
      'BASE_LANG'
    )}/${Cypress.env('BASE_CURRENCY')}`;
  }

  /**
   * Intercepts add-to-cart entry POST requests
   */
  function interceptAddEntry() {
    cy.intercept('POST', `${getOccUrlPrefix()}/users/*/carts/*/entries?*`).as(
      'addEntry'
    );
  }

  /**
   * Intercepts cart GET requests
   */
  function interceptGetCart() {
    cy.intercept('GET', `${getOccUrlPrefix()}/users/*/carts/*?*`).as('getCart');
  }

  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    /**
     * Test verifying the fix: rapid add-to-cart clicks on the same product
     * should only create one cart, not multiple.
     *
     * This tests the scenario where a user rapidly clicks the add-to-cart
     * button multiple times before the cart is created.
     */
    it('should create only one cart when rapidly clicking add-to-cart multiple times', () => {
      let createCartCallCount = 0;

      // Intercept and delay cart creation to simulate slow network
      cy.intercept('POST', `${getOccUrlPrefix()}/users/*/carts?*`, (req) => {
        createCartCallCount++;
        req.on('response', (res) => {
          res.setDelay(SLOW_NETWORK_DELAY_MS);
        });
        req.continue();
      }).as('createCartSlow');

      interceptAddEntry();

      // Visit product page
      cy.visit(`${getBaseUrlPrefix()}/product/${products[0].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).should('be.visible');

      // Set quantity to test multiple rapid add-to-cart triggers
      cy.get('cx-add-to-cart cx-item-counter input').clear().type('1');

      // Rapidly click add-to-cart button 3 times without waiting
      // Use force:true because the dialog may open and cover the button
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });
      cy.get('cx-add-to-cart button[type=submit]').click({ force: true });

      // Wait for the slow cart creation to complete
      cy.wait('@createCartSlow', { timeout: SLOW_NETWORK_DELAY_MS + 5000 });

      // Wait a bit more for all add entry calls to process
      cy.wait(1000);

      // Verify only ONE cart was created (exhaustMap ignores parallel requests)
      cy.wrap(null).then(() => {
        expect(
          createCartCallCount,
          'Only one cart should be created despite multiple rapid clicks'
        ).to.equal(1);
      });

      // Verify items were added (quantity should be 3 from the 3 clicks)
      cy.get('cx-mini-cart .count').should('contain', '3');
    });

    /**
     * Control test: Sequential add-to-cart with proper waits works correctly.
     * This demonstrates that the cart functionality works when operations
     * are properly serialized.
     */
    it('should correctly add multiple products when waiting between add-to-cart calls', () => {
      interceptAddEntry();
      interceptGetCart();

      // Visit and add first product, wait for dialog
      cy.visit(`${getBaseUrlPrefix()}/product/${products[0].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).click();
      cy.get('cx-added-to-cart-dialog', { timeout: 10000 }).should('be.visible');
      cy.get('.cx-dialog-total').should('contain', '1 item');
      cy.get('cx-added-to-cart-dialog [aria-label="Close Modal"]').click();
      cy.get('cx-added-to-cart-dialog').should('not.exist');

      // Visit second product page and add
      cy.visit(`${getBaseUrlPrefix()}/product/${products[1].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).click();
      cy.get('cx-added-to-cart-dialog', { timeout: 10000 }).should('be.visible');
      cy.get('.cx-dialog-total').should('contain', '2 items');
      cy.get('cx-added-to-cart-dialog [aria-label="Close Modal"]').click();
      cy.get('cx-added-to-cart-dialog').should('not.exist');

      // Visit third product page and add
      cy.visit(`${getBaseUrlPrefix()}/product/${products[2].code}`);
      cy.get('cx-add-to-cart button[type=submit]', { timeout: 10000 }).click();
      cy.get('cx-added-to-cart-dialog', { timeout: 10000 }).should('be.visible');
      cy.get('.cx-dialog-total').should('contain', '3 items');

      // Go to cart and verify all products
      cy.get('cx-added-to-cart-dialog button.btn-primary').click();

      cy.get('cx-cart-item-list .cx-item-list-row', { timeout: 15000 }).should(
        'have.length',
        3
      );

      // Verify all products are present
      products.forEach((product) => {
        cy.get('cx-cart-item-list').should('contain', product.name);
      });
    });
  });
});
