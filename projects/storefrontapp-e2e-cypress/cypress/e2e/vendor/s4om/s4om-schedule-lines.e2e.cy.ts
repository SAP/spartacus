/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../helpers/b2b/b2b-checkout';
import {
  interceptOrdersEndpoint,
  waitForResponse,
} from '../../../helpers/order-history';
import * as s4omHelper from '../../../helpers/vendor/s4om/s4om';
import {
  b2bAccountShipToUser,
  ORDER_REQUEST_ENDPOINT,
  order_type,
  poNumber,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../sample-data/b2b-checkout';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('S4HANA Order management', { testIsolation: false }, () => {
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

  describe('Schedule Lines in Checkout Flow', () => {
    it('should be able to login as a b2b user', () => {
      s4omHelper.loginS4OMB2bUser();
    });

    it('should add a S4 HANA product (TG-11) to cart', () => {
      s4omHelper.resetCart(); //clear the cart
      s4omHelper.addB2bS4ProductToCart(); //Ensure that the cart has only 1 S4OM product
    });

    it('should show S4 HANA schedule lines in the add to cart popup', () => {
      s4omHelper.verifyScheduleLineInfo();
    });

    it('should show S4 HANA schedule lines in the Cart page', () => {
      s4omHelper.goToCart();
      s4omHelper.verifyScheduleLineInfo();
    });

    it('should proceed to checkout and select Account payment type', () => {
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

    it('should display order confirmation summary page with delivery schedule lines', () => {
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
      s4omHelper.verifyScheduleLineInfo();
      s4omHelper.setOrderConfirmationIdInSessionStorage('s4omOrderId');
    });
  });
  describe('Schedule lines in Order History', () => {
    it('should be able to view order in order history with PO# and Cost center', () => {
      cy.visit('/my-account/orders');
      const ordersAlias = interceptOrdersEndpoint();
      waitForResponse(ordersAlias);

      const s4omPastOrderId =
        window.sessionStorage.getItem('s4omOrderId') || '103439';
      cy.wrap(s4omPastOrderId).should('not.be.null');
      s4omHelper.findRowInOrderHistoryTable(
        ordersAlias,
        s4omPastOrderId,
        poNumber
      );
    });

    it('should be able to view a past order detail in order detail page with schedule line delivery information', () => {
      cy.intercept({
        method: 'GET',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/orders/*`,
      }).as('getOrderDetail');

      const s4omPastOrderId =
        window.sessionStorage.getItem('s4omOrderId') ||
        s4omHelper.s4omPastOrderId;
      cy.wrap(s4omPastOrderId).should('not.be.null');
      cy.visit('/my-account/order/' + s4omPastOrderId);
      cy.wait('@getOrderDetail');

      s4omHelper.reviewB2bOrderDetail(
        s4omHelper.s4omB2bAccountShipToUser,
        s4omHelper.s4omProduct,
        s4omHelper.cartWithS4OMB2bProductAndPremiumShipping,
        true,
        null,
        s4omHelper.s4omPONumber,
        s4omHelper.s4omCostCenter,
        s4omHelper.s4omB2BUnit,
        false
      );
      s4omHelper.verifyScheduleLineInfo();
    });
  });
});
