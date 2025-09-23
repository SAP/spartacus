/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { placeOrder } from '../../../helpers/b2b/b2b-checkout';
import {
  loginUser,
  // signOutUser,
  // waitForProductPage,
} from '../../../helpers/checkout-flow';
import { addToCartButton } from '../../../helpers/product-details';
import * as helper from '../../../helpers/vendor/subscription-billing/subscription-billing';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Service Order Checkout Flow ', () => {
  /* beforeEach(() => {
    // cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.subscriptionUser);
    cy.get('button').contains('Allow All').click();
  }); */

  it('with only service products in cart', () => {
    console.log('Starting test: with only service products in cart');
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.subscriptionUser);
    // cy.get('button').contains('Allow All').click();
    /*  const productPage = waitForProductPage(
      helper.subscriptionProduct.code,
      'getProductPage'
    );
    cy.visit(
      `${POWERTOOLS_BASESITE}/en/USD/product/${helper.subscriptionProduct.code}`
    );
    cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
    cy.get('cx-product-intro').within(() => {
      cy.get('.code').should('contain', helper.subscriptionProduct.code);
    }); */
    helper.addProductToCart(helper.subscriptionProduct);
    cy.get(`cx-subscription-cart-price-body`).should('exist');
    helper.proceedToCheckout();
    // helper.selectAccountPayment();
    // helper.selectShippingAddress(false);
    // helper.selectServiceDetails();
    // helper.verifyOrderReviewPage(true, false);
    // placeOrder('/order-confirmation');
    // helper.verifyOrderConfirmationPage(true, false);
  });
  /* it('with both service and physical products in cart', () => {
    helper.addProductToCart(helper.serviceProduct);
    helper.addProductToCart(helper.nonServiceProduct);
    helper.proceedToCheckout();
    helper.selectAccountPayment();
    helper.selectShippingAddress(true);
    helper.selectDeliveryMode(true);
    helper.selectServiceDetails();
    helper.verifyOrderReviewPage(true, true);
    placeOrder('/order-confirmation');
    helper.verifyOrderConfirmationPage(true, true);
  });
  it('without any service products in cart', () => {
    helper.addProductToCart(helper.nonServiceProduct);
    helper.proceedToCheckout();
    helper.selectAccountPayment();
    helper.selectShippingAddress(true);
    helper.selectDeliveryMode(false);
    helper.verifyOrderReviewPage(false, true);
    placeOrder('/order-confirmation');
    helper.verifyOrderConfirmationPage(false, true);
  }); */
  /* afterEach(() => {
    signOutUser();
  }) */
});
