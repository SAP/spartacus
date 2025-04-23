/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from '../../helpers/cart';
/**
 * This test checks accessibility concerns on the cart page using Access Continuum
 */
describe('Cart Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  it('Empty Cart', () => {
    cy.visit('/cart');
    cart.validateEmptyCart();
    cy.get('main').a11yRunContinuumTest();
  });

  it('Cart with Products', () => {
    cart.addProducts();
    cy.visit('/cart');
    cy.get('.cx-item-list-row');
    cy.get('main').a11yRunContinuumTest();
  });
});
