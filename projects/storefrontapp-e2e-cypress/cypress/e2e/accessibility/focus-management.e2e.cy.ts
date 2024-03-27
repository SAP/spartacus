/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
});
