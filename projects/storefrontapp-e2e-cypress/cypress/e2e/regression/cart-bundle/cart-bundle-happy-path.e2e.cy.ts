/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cartBundle from '../../../helpers/cart-bundle-e2e';
import * as cart from '../../../helpers/cart-bundle-b2c';
import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/b2b-account-summary';

describe('Anonymous user', () => {
  viewportContext(['desktop'], () => {
    context('should cart Phase', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        Cypress.env('BASE_SITE', sampleData.POWERTOOLS_BASESITE);
      });
      it('should add test data for bundle one', () => {
        cartBundle.getCartBundleData();
      });
      it('should check bundle dispaly', () => {
        cartBundle.loginReloadPage();
        cartBundle.checkBundleDisplay();
        cartBundle.creatProduct();
      });
      it('should creat product 3755207 and check bundle dispaly', () => {
        cartBundle.loginReloadPage();
        cartBundle.checkProDetail();
        cartBundle.creatProductInScredriver();
      });
      it('should check product in scredriver component', () => {
        cartBundle.loginReloadPage();
        cartBundle.checkBundleProduct(0);
        cartBundle.getBundleTwoData();
      });
      it('should check bundle 1 and bundle 2 display', () => {
        cartBundle.loginReloadPage();
        cartBundle.checkBundleProduct(0);
        cartBundle.checkBundleProduct(1);
        cartBundle.checkBundleProduct(2);
      });
      it('shoud be go to checkout page and operate dlivery mode Phase', () => {
        cartBundle.loginReloadPage();
        cartBundle.goToCheckPage();
        cartBundle.doesElementAddressExist('cx-delivery-address');
        cy.wait(1000);
        cart.doesElementPaymentExist('cx-payment-method');
        cartBundle.checkReviewPageDetail();
        cartBundle.chechReviewSummaryDetail();
        cartBundle.clickProNameDetail(0);
        cartBundle.submitPlaceOrder();
      });
    });
  });
});
