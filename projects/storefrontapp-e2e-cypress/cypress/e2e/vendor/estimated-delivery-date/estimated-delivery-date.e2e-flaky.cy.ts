/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOut } from '../../../helpers/checkout-flow';
import {
  addProductToCart,
  deliveryAddress,
  deliveryMode,
  payment,
  my_user,
  orderConfirmation,
  reviewAndPlaceOrder,
} from '../../../helpers/estimated-delivery-date';

describe('estimated delivery date', () => {
  it('should see estimated delivery date in cart and order pages', () => {
    cy.visit('/apparel-uk-spa/en/GBP/login');
    loginUser(my_user);
    cy.wait(3000);
    addProductToCart();
    deliveryAddress();
    //going back to PDP and adding a product again to show Estimated delivery date in cart
    addProductToCart();
    cy.contains('Estimated delivery date');
    deliveryAddress();
    deliveryMode();
    payment();
    reviewAndPlaceOrder();
    orderConfirmation();
  });
  it('should see estimated delivery date in order history', () => {
    cy.visit('/apparel-uk-spa/en/GBP/login');
    loginUser(my_user);

    cy.visit('apparel-uk-spa/en/GBP/my-account/orders');
    cy.wait(3000);
    cy.visit('apparel-uk-spa/en/GBP/my-account/order/0005000571');
    cy.wait(5000);
    cy.contains('Estimated delivery date');
    signOut();
  });
});
