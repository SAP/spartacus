/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cartBundle from '../../../helpers/cart-bundle-special-scenarios';
import * as cart from '../../../helpers/cart-bundle-b2c';
import { viewportContext } from '../../../helpers/viewport-context';

const newSavePageUrl: string = '/en/USD/my-account/saved-carts';
const cartPageUrl: string = '/en/USD/cart';
const isSaveCart: boolean = true;

describe('Save Cart and Clear Cart', () => {
  viewportContext(['desktop'], () => {
    context('should cart Phase', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
      });
      it('should add test data for bundle one', () => {
        cartBundle.getCartBundleData();
      });
      it('should check bundle dispaly', () => {
        cartBundle.loginReloadPage();
        cartBundle.checkBundleDisplay();
        cartBundle.selectPickUpInStore();
        cartBundle.goToSaveCartPage(newSavePageUrl, 0);
        cartBundle.goToSaveCartPage(cartPageUrl, 1, isSaveCart);
        cy.wait(3000);
        cartBundle.goToSaveListPage();
        cartBundle.goToSaveCartPageDetail();
      });
    });
  });
});
describe('Incomplete Bundle', () => {
  viewportContext(['desktop'], () => {
    it('should add test data for bundle one', () => {
      cartBundle.getCartIncompleteBundleData();
    });
    it('should add test data for bundle', () => {
      cartBundle.loginReloadPage();
      cartBundle.operateIncompleteBundle();
      cy.wait(1000);
      cy.get('.btn-primary').should('contain', 'Continue').click();
      cart.doesElementPaymentExist('cx-payment-method');
      cart.submitPlaceOrder();
    });
  });
});
