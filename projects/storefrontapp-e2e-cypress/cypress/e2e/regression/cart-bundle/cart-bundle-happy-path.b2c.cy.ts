/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cartBundle from '../../../helpers/cart-bundle-b2c';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Anonymous user', () => {
  viewportContext(['desktop'], () => {
    context('should cart Phase', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
      });
      it('should add test data for bundle one', () => {
        cartBundle.getCartBundleOneData();
      });
      it('should cart phase', () => {
        cartBundle.loginReloadPage();
        //operate bundle 1
        cartBundle.operateBundleOne();
      });
      it('should add test data for bundle two', () => {
        cartBundle.getCartBundleTwoData();
      });
      it('should cart phase2', () => {
        cartBundle.loginReloadPage();
        //operate bundle 2
        cartBundle.operateBundleTwo();
      });

      it('should add test data for bundle three', () => {
        cartBundle.getCartBundleThreeData();
      });
      it('should cart phase3', () => {
        cartBundle.loginReloadPage();
        cartBundle.operateBundleThree();
        cartBundle.getRegularData();
        cy.wait(5000);
      });
      it('should add regular product and check cart', () => {
        cartBundle.loginReloadPage();

        //operate regular
        cartBundle.operateRegularDetail();
        cartBundle.checkSummaryDetail();
      });
    });
  });
});
context('Anonymous user', () => {
  viewportContext(['desktop'], () => {
    it('should delivery Mode Phase', () => {
      cartBundle.loginReloadPage();
      cartBundle.operateDliveryModePhase();
      cartBundle.clickConfigurationBtn();

      cartBundle.checkProOperationMode('deliveryMode');
      cy.get('.btn-primary').should('contain', 'Continue').click();

      cy.wait(1000);
      cartBundle.doesElementPaymentExist('cx-payment-method');

      cartBundle.checkProductDetail();

      //product 1934793 special display
      cy.get('.cx-cart-addons')
        .eq(4)
        .within(() => {
          cy.get('.cx-value').should('not.be.empty');
        });

      cartBundle.clickConfigurationBtn();

      cartBundle.clickProDetail(cartBundle.PRODUCK_INDEX);

      cartBundle.checkProOperationMode('reviewShippingMode');

      cartBundle.chechReviewSummaryDetail();

      cartBundle.submitPlaceOrder();
    });
  });
});
