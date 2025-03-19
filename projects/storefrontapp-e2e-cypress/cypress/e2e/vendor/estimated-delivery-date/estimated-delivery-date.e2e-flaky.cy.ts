/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOut } from '../../../helpers/checkout-flow';
import {
  checkoutDeliveryMode,
  checkoutPaymentDetails,
  checkoutShippingAddress,
  my_user,
  orderConfirmation,
  reviewAndPlaceOrder,
} from '../../../helpers/estimated-delivery-date';

describe('estimated delivery date', () => {
  it('should see estimated delivery date in cart and order pages', () => {
    cy.visit('/apparel-uk-spa/en/GBP/login');
    loginUser(my_user);
    cy.wait(3000);
    cy.visit('/apparel-uk-spa/en/GBP/product/M_CR_1016');
    cy.wait(4000);
    cy.get('cx-add-to-cart')
      .findByText(/Add To Cart/i)
      .click();
    cy.wait(4000);
    cy.findByText(/proceed to checkout/i).click();
    cy.wait(8000);
    checkoutShippingAddress();
    checkoutDeliveryMode();
    //going back to cart to show Estimated delivery date in cart
    cy.visit('/apparel-uk-spa/en/GBP/cart');
    cy.wait(4000);
    cy.get('cx-estimated-delivery-date').should('exist');
    cy.findByText(/proceed to checkout/i).click();
    cy.wait(8000);
    checkoutShippingAddress();
    checkoutDeliveryMode();
    checkoutPaymentDetails();
    reviewAndPlaceOrder();
    orderConfirmation();
  });
  it('should see estimated delivery date in order history', () => {
    //For this test to run successfully ensure a order is already present.
    cy.visit('/apparel-uk-spa/en/GBP/login');
    loginUser(my_user);
    cy.visit('apparel-uk-spa/en/GBP/my-account/orders/');
    cy.wait(6000);
    cy.get('.cx-order-history-code').click({ multiple: true });
    cy.contains('Estimated delivery date');
    signOut();
  });
});
