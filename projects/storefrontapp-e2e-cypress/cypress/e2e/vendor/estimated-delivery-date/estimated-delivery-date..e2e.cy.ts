/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../helpers/b2b/b2b-checkout';
import * as s4omHelper from '../../../helpers/vendor/s4om/s4om';
import {
  ORDER_REQUEST_ENDPOINT,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
  b2bAccountShipToUser,
  order_type,
} from '../../../sample-data/b2b-checkout';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Estimated-Delivery-Date', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', USER_REQUEST_ENDPOINT);
    Cypress.env('OCC_PREFIX_ORDER_ENDPOINT', ORDER_REQUEST_ENDPOINT);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('Arrival Slots in Checkout Flow', () => {
    it('should be able to login as a b2b user', () => {
      s4omHelper.loginS4OMB2bUser();
    });

    it('should add a S4 HANA product (TG-11) to cart', () => {
      s4omHelper.resetCart(); //clear the cart
      s4omHelper.addB2bS4ProductToCart(); //Ensure that the cart has only 1 S4OM product
    });

    it('should proceed to checkout and select Account payment type ', () => {
      s4omHelper.proceedtoCheckOutS4Product();
      b2bCheckout.enterPONumber();
      b2bCheckout.selectAccountPayment();
    });

    it('should select shipping address', () => {
      s4omHelper.selectS4OMAccountShippingAddress();
    });

    it('should select delivery mode', () => {
      s4omHelper.selectAccountDeliveryMode();
    });

    it('should review and place order', () => {
      b2bCheckout.reviewB2bReviewOrderPage(
        b2bAccountShipToUser,
        s4omHelper.cartWithS4OMB2bProductAndPremiumShipping,
        true,
        order_type.PLACE_ORDER,
        s4omHelper.s4omTabbingOrderConfig
      );

      b2bCheckout.placeOrder('/order-confirmation');
    });

    it('should display order confirmation summary page with delivery Arrival Slots ', () => {
      s4omHelper.reviewB2bOrderDetail(
        s4omHelper.s4omB2bAccountShipToUser,
        s4omHelper.s4omProduct,
        s4omHelper.cartWithS4OMB2bProductAndPremiumShipping,
        true,
        null,
        s4omHelper.s4omPONumber,
        s4omHelper.s4omCostCenter,
        s4omHelper.s4omB2BUnit
      );
      s4omHelper.verifyArrivalSlotsInfo();
      s4omHelper.setOrderConfirmationIdInSessionStorage('s4omOrderId');
    });
  });
});
