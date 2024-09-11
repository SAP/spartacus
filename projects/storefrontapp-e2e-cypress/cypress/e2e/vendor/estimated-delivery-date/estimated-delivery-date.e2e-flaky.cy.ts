/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addCheapProductToCartAndBeginCheckoutForSignedInCustomer,
  goToCheapProductDetailsPage,
  loginUser,
  signOut,
} from '../../../helpers/checkout-flow';
import {
  addProductToCart,
  cheapProduct,
  checkoutDeliveryMode,
  checkoutPaymentDetails,
  checkoutShippingAddress,
  orderConfirmation,
  reviewAndPlaceOrder,
  my_user,
} from '../../../helpers/estimated-delivery-date';

describe('estimated delivery date', () => {
  it('should see estimated delivery date in cart and order pages', () => {
    cy.visit('/apparel-uk-spa/en/GBP/login');
    loginUser(my_user);
    cy.wait(3000);
    cy.visit('/apparel-uk-spa/en/GBP/product/M_CR_1015');
    cy.wait(4000);
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
