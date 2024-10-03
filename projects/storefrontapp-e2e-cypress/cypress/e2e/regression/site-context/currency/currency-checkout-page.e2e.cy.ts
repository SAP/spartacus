/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForCartPageData } from '../../../../helpers/b2b/b2b-saved-cart';
import * as siteContextSelector from '../../../../helpers/site-context-selector';
import { product } from '../../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

describe('Currency switch - checkout page', () => {
  const checkoutShippingPath =
    siteContextSelector.CHECKOUT_DELIVERY_ADDRESS_PATH;
  const checkoutDeliveryPath = siteContextSelector.CHECKOUT_DELIVERY_MODE_PATH;
  const checkoutPaymentPath = siteContextSelector.CHECKOUT_PAYMENT_DETAILS_PATH;
  const checkoutReviewPath = siteContextSelector.CHECKOUT_REVIEW_ORDER_PATH;

  before(() => {
    clearAllStorage();
    cy.requireLoggedIn();
    siteContextSelector.doPlaceOrder();
    waitForCartPageData(product);
  });

  siteContextSelector.stub(
    siteContextSelector.CURRENCY_REQUEST,
    siteContextSelector.CURRENCIES
  );

  describe('checkout page steps', () => {
    it('should change currency in the respective checkout steps', () => {
      // CHECKOUT DELIVERY ADDRESS STEP
      cy.intercept({
        method: 'PUT',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/*/addresses/delivery`,
      }).as('setAddress');
      cy.visit(checkoutShippingPath);
      cy.wait('@setAddress');
      siteContextSelector.verifySiteContextChangeUrl(
        null,
        siteContextSelector.CURRENCIES,
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL,
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutShippingPath
      );

      siteContextSelector.addressBookNextStep();

      // CHECKOUT DELIVERY MODE STEP
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutDeliveryPath
      );
      cy.get('cx-delivery-mode .cx-delivery-price:first').should(
        'contain',
        '¥'
      );
      siteContextSelector.deliveryModeNextStep();

      // CHECKOUT PAYMENT METHOD STEP
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutPaymentPath
      );

      siteContextSelector.paymentDetailsNextStep();

      // CHECKOUT REVIEW STEP
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_EN_JPY + checkoutReviewPath
      );
      cy.get('cx-checkout-review-shipping .cx-price .cx-value').should(
        'contain',
        '¥'
      );
    });
  });
});
