/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from '../../../helpers/cart';
import { signOutUser, visitHomePage } from '../../../helpers/checkout-flow';
import * as alerts from '../../../helpers/global-message';

describe('Clear Cart', () => {
  before(() => {
    cart.registerCartUser();
  });

  context('Clear cart of anonymous user', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should add products to the cart', () => {
      cart.addProducts();
      cart.verifyCartNotEmpty();
    });

    it('should be able to cancel before clearing the cart', () => {
      cart.goToCart();
      cart.cancelClearCart();
      cart.verifyCartNotEmpty();
    });

    it('should clear cart for anynonymous user', () => {
      cart.goToCart();
      cart.clearActiveCart();
      cart.validateEmptyCart();
    });
  });

  context('Clear Cart for registered user', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should add products to the cart', () => {
      cart.loginCartUser();
      cart.addProducts();
      cart.verifyCartNotEmpty();
    });

    it('should clear cart for registered user and have new cart Id', () => {
      cart.goToCart();
      cart.saveCartId();
      cart.clearActiveCart();
      alerts
        .getSuccessAlert()
        .should('contain', `Active cart cleared successfully.`);
      cart.validateEmptyCart();
      cart.verifyCartIdAfterClearCart();
      signOutUser();
    });
  });
});
