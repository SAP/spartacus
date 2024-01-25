/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import { loginB2bUser } from '../../../../helpers/b2b/b2b-checkout';
import * as cart from '../../../../helpers/cart';
import {
  goToOrderDetails,
  interceptCartFromOrderEndpoint,
  interceptOrdersEndpoint,
  saveOrderDetails,
  waitForResponse,
} from '../../../../helpers/order-history';
import {
  b2bAccountShipToUser,
  b2bProduct,
  cartWithB2bProductAndPremiumShipping,
  costCenter,
  ORDER_REQUEST_ENDPOINT,
  order_type,
  poNumber,
  POWERTOOLS_BASESITE,
  USER_REQUEST_ENDPOINT,
} from '../../../../sample-data/b2b-checkout';
import { isolateTests } from '../../../../support/utils/test-isolation';

describe('Order History with orders', { testIsolation: false }, () => {
  isolateTests();
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

  it('should be able to login as a b2b user', () => {
    loginB2bUser();
  });

  it('should add a product to cart', () => {
    b2bCheckout.addB2bProductToCartAndCheckout();
  });

  it('should select Account payment type', () => {
    b2bCheckout.enterPONumber();
    b2bCheckout.selectAccountPayment();
  });

  it('should enter shipping address', () => {
    b2bCheckout.selectAccountShippingAddress();
  });

  it('should select delivery mode', () => {
    b2bCheckout.selectAccountDeliveryMode();
  });

  it('should review and place order', () => {
    b2bCheckout.reviewB2bReviewOrderPage(
      b2bAccountShipToUser,
      cartWithB2bProductAndPremiumShipping,
      true,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');
  });

  it('should display summary page', () => {
    b2bCheckout.reviewB2bOrderConfirmation(
      b2bAccountShipToUser,
      b2bProduct,
      cartWithB2bProductAndPremiumShipping
    );
  });

  it('should be able to view order in order history with PO# and Cost center', () => {
    cy.visit('/my-account/orders');
    const ordersAlias = interceptOrdersEndpoint();
    waitForResponse(ordersAlias);

    cy.get('cx-order-history h2').should('contain', 'Order history');
    cy.get('.cx-order-history-po a').should('contain', poNumber);
    cy.get('.cx-order-history-cost-center a').should('contain', costCenter);
  });

  describe('Order details - reorder', () => {
    it('should display order details page with the reorder button (CXSPA-1775)', () => {
      cy.get('.cx-order-history-value').first().click();
      cy.get('cx-order-details-reorder button').should('contain', 'Reorder');
    });

    it('items in the cart should match previous order when proceeding with reorder (CXSPA-1775)', () => {
      /*
       * Saving cartId before starting the reorder flow
       * It is compared with the updated cartId once reorder is executed
       */
      b2bCheckout.addB2bProductToCart();
      cart.goToCart();
      cart.saveCartId();

      goToOrderDetails();
      saveOrderDetails();

      // Check if the reorder button exists
      cy.get('cx-order-details-reorder div div button').first().click();
      cy.get('.cx-reorder-dialog-areyousure-section').should('exist');

      // Click on continue and wait for the response from backend
      const cartFromOrderAlias = interceptCartFromOrderEndpoint();
      cy.get('.cx-reorder-dialog-footer div button.btn-primary')
        .first()
        .click();
      waitForResponse(cartFromOrderAlias);

      // Go to cart and verify if the cartId is different
      cart.goToCart();
      cart.verifyCartIdIsDifferent();

      // Count <li> and see if they match with order details
      cy.get('@totalOrderHistoryListItems').then(
        (totalOrderHistoryListItems: any) => {
          cy.get('cx-cart-item-list .cx-item-list-row').should(
            'have.length',
            totalOrderHistoryListItems
          );
        }
      );

      // Go through each <li> and compare product & quantity
      cy.get('tr.cx-item-list-row').each(($row, index) => {
        cy.get(`@itemCode${index}`).then((itemCode) => {
          cy.wrap($row).find('.cx-code').should('contain', itemCode);
        });
        cy.get(`@quantityItem${index}`).then((quantity) => {
          cy.wrap($row)
            .find('cx-item-counter input')
            .should('have.value', quantity);
        });
      });
    });
  });
});
