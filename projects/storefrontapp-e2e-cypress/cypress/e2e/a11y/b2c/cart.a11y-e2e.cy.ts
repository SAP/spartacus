/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';
/**
 * This test checks accessibility concerns on the cart page using Access Continuum
 */
describe('Cart Page Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
  });
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    it('Empty Cart', () => {
      cy.visit('/cart');
      cy.findByText('Your shopping cart is empty');
      cy.get('main').a11yRunContinuumTest();
    });

    it('Cart with Products', () => {
      const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cy.addToCart('300938', 1, auth.token.access_token);
      cy.visit('/cart');
      cy.get('.cx-item-list-row');
      cy.get('main').a11yRunContinuumTest();
    });

    it('Import Products Dialog', () => {
      cy.contains('Import Products').click();
      cy.get('cx-import-entries-dialog').a11yRunContinuumTest();
      cy.get('cx-import-entries-dialog .close').click();
    });

    it('Save for Later Dialog', () => {
      cy.contains('button', 'Save cart for later').click();
      cy.get('cx-saved-cart-form-dialog').a11yRunContinuumTest();
    });

    it('Save cart for later with errors', () => {
      cy.get('.cx-saved-cart-form-footer > .btn-primary').click();
      cy.get('cx-saved-cart-form-dialog').a11yRunContinuumTest();
      cy.get('cx-saved-cart-form-dialog .close').click();
    });

    it('Saved for later table', () => {
      cy.get('.cx-sfl-btn').click();
      cy.findByText('Your shopping cart is empty');
      cy.get('cx-save-for-later').a11yRunContinuumTest();
    });
  });
});
