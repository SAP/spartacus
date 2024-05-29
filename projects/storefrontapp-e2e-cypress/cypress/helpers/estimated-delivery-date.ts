/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const my_user = {
  fullName: 'Magnus Carlsen',
  email: 'magnus.carlsen@hybris.com',
  password: 'Welcome@1',
};

export function reviewAndPlaceOrder() {
  cy.wait(3000);
  cy.contains('Estimated delivery date');
  cy.get('cx-place-order').within(() => {
    cy.get('[formcontrolname="termsAndConditions"]').check();
    cy.findByText('Place Order').click();
  });
}

export function orderConfirmation() {
  cy.get('cx-breadcrumb').within(() => {
    cy.findByText('Order Confirmation');
  });
  cy.get('cx-order-confirmation-thank-you-message');
  cy.contains('Estimated delivery date');
}

export function addProductToCart() {
  cy.visit('/apparel-uk-spa/en/GBP/product/M_CR_1015');
  cy.wait(4000);
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
}

export function deliveryAddress() {
  cy.wait(3000);
  cy.findByText(/proceed to checkout/i).click();
  cy.get('cx-delivery-address').within(() => {
    cy.findByText('Selected');
    cy.findByText('Continue').click();
  });
}

export function deliveryMode() {
  cy.get('cx-delivery-mode').within(() => {
    cy.wait(3000);
    cy.findByText('Continue').click();
  });
}

export function payment() {
  cy.get('cx-payment-method').within(() => {
    cy.get('cx-card')
      .eq(0)
      .within(() => {
        cy.findByText('OMSA Customer');
      });
    cy.findByText('Continue').click();
  });
}
