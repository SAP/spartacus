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
import * as rddHelper from '../../../helpers/vendor/requested-delivery-date/requested-delivery-date';
import * as s4Helper from '../../../helpers/vendor/s4om/s4om';
import {
  ORDER_REQUEST_ENDPOINT,
  order_type,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../sample-data/b2b-checkout';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

//Set the date in mmm dd, yyyy format
const formattedDate = new Date().toLocaleDateString('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
const today = new Date();

//Set the date in yyyy-mm-dd format
const inputDate = `${today.getFullYear()}-${today.toLocaleString('default', {
  month: '2-digit',
})}-${today.toLocaleString('default', { day: '2-digit' })}`;

describe('Requested Delivery Date', { testIsolation: false }, () => {
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

  describe('Requested Delivery Date in Checkout Flow', () => {
    it('should be able to login as a b2b user', () => {
      s4Helper.loginS4OMB2bUser();
    });

    it('should add a S4 HANA product (TG-11) to cart', () => {
      s4Helper.resetCart(); //clear the cart
      s4Helper.addB2bS4ProductToCart(); //Ensure that the cart has only 1 S4 product
    });

    it('should proceed to checkout and select Account payment type', () => {
      s4Helper.proceedtoCheckOutS4Product();
      b2bCheckout.enterPONumber(rddHelper.poNumber);
      b2bCheckout.selectAccountPayment();
    });

    it('should select shipping address', () => {
      s4Helper.selectS4OMAccountShippingAddress();
    });

    it('should select delivery mode and display Request Delivery Date form', () => {
      rddHelper.selectAccountDeliveryMode();
    });

    it('should show an error when an invalid delivery date is provided', () => {
      rddHelper.updateRequestedDeliveryDate('10000-01-01');
      rddHelper.verifyDeliveryDateErrorMessage();
    });

    it('should show an info message when the delivery date is updated', () => {
      rddHelper.updateRequestedDeliveryDate(inputDate);
      rddHelper.verifyDeliveryDateInfoMessage();
    });

    it('should review and display the Requested Delivery Date', () => {
      rddHelper.proceedToOrderReviewPage();
      rddHelper.verifyRDDOrderReviewPage(formattedDate);
    });

    it('should route back to the select delivery mode step when the edit button is clicked', () => {
      rddHelper.editDeliveryMethodOrderReviewPage();
      rddHelper.proceedToOrderReviewPage();
    });

    it('should place order', () => {
      rddHelper.verifyRDDOrderReviewPage(formattedDate);
      b2bCheckout.reviewB2bReviewOrderPage(
        s4Helper.s4omB2bAccountShipToUser,
        s4Helper.cartWithS4OMB2bProductAndPremiumShipping,
        true,
        order_type.PLACE_ORDER,
        s4Helper.s4omTabbingOrderConfig,
        rddHelper.poNumber,
        s4Helper.s4omCostCenter,
        s4Helper.s4omB2BUnit
      );
      b2bCheckout.placeOrder('/order-confirmation');
    });

    it('should display order confirmation summary page with Requested delivery date', () => {
      s4Helper.reviewB2bOrderDetail(
        s4Helper.s4omB2bAccountShipToUser,
        s4Helper.s4omProduct,
        s4Helper.cartWithS4OMB2bProductAndPremiumShipping,
        true,
        null,
        rddHelper.poNumber,
        s4Helper.s4omCostCenter,
        s4Helper.s4omB2BUnit
      );
      rddHelper.verifyRDDOrderDetailPage(formattedDate);
      s4Helper.setOrderConfirmationIdInSessionStorage('rddOrderId');
    });
  });

  describe('Requested Delivery Date in Order History', () => {
    it('should be able to view order in order history with PO# and Cost center', () => {
      cy.visit('/my-account/orders');
      const ordersAlias = interceptOrdersEndpoint();
      waitForResponse(ordersAlias);

      const rddOrderId = window.sessionStorage.getItem('rddOrderId');
      cy.wrap(rddOrderId).should('not.be.null');
      s4Helper.findRowInOrderHistoryTable(
        ordersAlias,
        rddOrderId,
        rddHelper.poNumber
      );
    });

    it('should be able to view a past order detail in order detail page with requested delivery date information', () => {
      cy.intercept({
        method: 'GET',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/orders/*`,
      }).as('getOrderDetail');

      const rddOrderId = window.sessionStorage.getItem('rddOrderId');
      cy.visit('/my-account/order/' + rddOrderId);
      cy.wait('@getOrderDetail');

      s4Helper.reviewB2bOrderDetail(
        s4Helper.s4omB2bAccountShipToUser,
        s4Helper.s4omProduct,
        s4Helper.cartWithS4OMB2bProductAndPremiumShipping,
        true,
        null,
        rddHelper.poNumber,
        s4Helper.s4omCostCenter,
        s4Helper.s4omB2BUnit,
        false
      );
      rddHelper.verifyRDDOrderDetailPage(formattedDate);
    });
  });
});
