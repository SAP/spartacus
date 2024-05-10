/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addCheapProductToCartAndBeginCheckoutForSignedInCustomer,
  goToCheapProductDetailsPage,
  signOut,
} from '../../../helpers/checkout-flow';
import {
  cheapProduct,
  checkoutDeliveryMode,
  checkoutPaymentDetails,
  checkoutShippingAddress,
  loginUsingUserWithOrder,
  orderConfirmation,
  reviewAndPlaceOrder,
  addProductToCart,
} from '../../../helpers/estimated-delivery-date';
import { viewportContext } from '../../../helpers/viewport-context';

describe('estimated delivery date', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('apparel-uk-spa/en/GBP/login');
      loginUsingUserWithOrder();
    });

    it('should see estimated delivery date in cart and order pages', () => {
      goToCheapProductDetailsPage(cheapProduct);
      addCheapProductToCartAndBeginCheckoutForSignedInCustomer(cheapProduct);
      checkoutShippingAddress();
      checkoutDeliveryMode();
      //going back to PDP and adding a product again to show Estimated delivery date in cart
      goToCheapProductDetailsPage(cheapProduct);
      addProductToCart(cheapProduct);
      checkoutShippingAddress();
      checkoutDeliveryMode();
      checkoutPaymentDetails();
      reviewAndPlaceOrder();
      orderConfirmation();
    });
    it('should see estimated delivery date in order history', () => {
      cy.visit('apparel-uk-spa/en/GBP/my-account/order/');
      cy.get('.cx-list').should('have.length', 1);
      cy.get('cx-order-history-code').click();
      cy.contains('Estimated delivery date');
      signOut();
    });
  });
});
