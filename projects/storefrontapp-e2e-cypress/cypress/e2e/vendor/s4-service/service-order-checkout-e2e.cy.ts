/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { placeOrder } from '../../../helpers/b2b/b2b-checkout';
import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import * as helper from '../../../helpers/vendor/s4-service/s4-service';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Service Order Checkout Flow ', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.serviceUser);
    cy.get('button').contains('Allow All').click();
  });
  it('with only service products in cart', () => {
    helper.addProductToCart(helper.serviceProduct);
    helper.proceedToCheckout();
    helper.selectAccountPayment();
    helper.selectShippingAddress(false);
    helper.selectServiceDetails();
    helper.verifyOrderReviewPage(true, false);
    placeOrder('/order-confirmation');
    helper.verifyOrderConfirmationPage(true, false);
  });
  it('with both service and physical products in cart', () => {
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
  });
  afterEach(() => {
    signOutUser();
  });
});
