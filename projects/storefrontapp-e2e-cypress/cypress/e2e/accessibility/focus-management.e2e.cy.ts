/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
      cy.get('cx-pickup-options button[role=tab]').eq(1).click();
      cy.contains('Select Store').click();
      cy.get('[aria-label="Close"]').click();
      cy.contains('Select Store').should('have.focus');
    });

    it('Should re-focus the element triggering the modal in Cart after it closes', () => {
      cy.visit(`/product/266685`);
      cart.addProductAsAnonymous();
      cy.visit('/cart');
      cy.get('cx-pickup-options button[role=tab]').eq(1).click();
      cy.contains('Select Store').click();
      cy.get('[aria-label="Close"]').click();
      cy.contains('Select Store').should('have.focus');
    });
  });

  context('Dropdown tigger, refocus after esc key press', () => {
    it('Should refocus Sorting ng-select', () => {
      cy.visit(`Brands/all/c/brands`);
      cy.get('cx-sorting ng-select').first().as('sorting');
      cy.get('@sorting').click().type('{esc}');
      cy.get('@sorting').get('input').should('have.focus');
    });

    it('Should refocus MyAccount navigation-ui', () => {
      cy.login('test-user-with-orders@sap.cx.com', 'pw4all');
      cy.visit(`/`);
      cy.get('button').contains('My Account').as('myAccount');
      cy.get('@myAccount').click().type('{esc}');
      cy.get('@myAccount').should('have.focus');
    });
  });
});
