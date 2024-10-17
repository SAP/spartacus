/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from '../../helpers/cart';
import * as checkout from '../../helpers/checkout-flow';

describe('Focus managment for a11y', () => {
  context('Checkout - Delivery modes', () => {
    it('preserves focus when selecting a delivery mode with a keyboard', () => {
      cy.requireLoggedIn().then(() => {
        checkout.goToProductDetailsPage();
        checkout.addProductToCart();
        cy.contains(/proceed to checkout/i).click();
        checkout.fillAddressForm();
        cy.intercept('GET', '*deliveryMode*').as('getDeliveryMethods');
        cy.get('#deliveryMode-premium-gross').trigger('change', {
          screenX: 0,
        });
        cy.wait('@getDeliveryMethods');
        cy.get('#deliveryMode-premium-gross').should('have.focus');
      });
    });
  });

  context('Add to cart modal', () => {
    it('Should re-focus the element triggering the modal after it closes', () => {
      cy.visit(`/product/266685`);
      cy.contains('Add to cart').click();
      cy.get('[aria-label="Close Modal"]').click();
      cy.contains('Add to cart').should('have.focus');
    });
  });

  context('Pick up in store modal', () => {
    it('Should re-focus the element triggering the modal on PDP after it closes', () => {
      cy.visit(`/product/266685`);
      cy.contains('Select Store').click();
      cy.get('[aria-label="Close"]').click();
      cy.contains('Select Store').should('have.focus');
    });

    it('Should re-focus the element triggering the modal in Cart after it closes', () => {
      cy.visit(`/product/266685`);
      cart.addProductAsAnonymous();
      cy.visit('/cart');
      cy.contains('Select Store').click();
      cy.get('[aria-label="Close"]').click();
      cy.contains('Select Store').should('have.focus');
    });
  });
});
