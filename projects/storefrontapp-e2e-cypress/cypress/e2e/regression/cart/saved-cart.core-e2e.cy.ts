/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as savedCart from '../../../helpers/saved-cart';
import * as cart from '../../../helpers/cart';
import * as sampleData from '../../../sample-data/saved-cart';
import { viewportContext } from '../../../helpers/viewport-context';
import { visitHomePage } from '../../../helpers/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('Saved Cart', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Cart page', () => {
      describe('Anonymous user', () => {
        beforeEach(() => {
          savedCart.addProductToCart(sampleData.products[0], 2);
        });

        afterEach(() => {
          cy.location('pathname').should('contain', '/login');
        });

        it('should redirect to login page when clicking "Saved Cart"', () => {
          savedCart.clickSavedCartButtonsFromCartPage(0);
        });

        it('should redirect to login page when clicking "Save Cart For Later"', () => {
          savedCart.clickSavedCartButtonsFromCartPage(1);
        });
      });

      describe('Logged in user', () => {
        before(() => {
          visitHomePage();
        });

        beforeEach(() => {
          clearAllStorage();
          cart.loginRegisteredUser();
          savedCart.addProductToCart(sampleData.products[0], 2);
        });

        it('should be able to visit the saved cart listing page', () => {
          savedCart.clickSavedCartButtonsFromCartPage(0);
          cy.location('pathname').should('contain', '/my-account/saved-carts');
        });
      });
    });
  });
});
