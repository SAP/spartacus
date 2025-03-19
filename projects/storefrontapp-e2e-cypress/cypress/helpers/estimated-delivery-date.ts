/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SampleProduct } from '../sample-data/checkout-flow';

export const cheapProduct: SampleProduct = {
  name: 'Frozen Peas',
  code: 'M_CR_1016',
};

export const my_user = {
  fullName: 'Magnus Carlsen',
  email: 'magnus.carlsen@hybris.com',
  password: 'Welcome@1',
};

export function checkoutShippingAddress() {
  cy.get('cx-delivery-address').within(() => {
    cy.findByText('Continue').click();
  });
}

export function checkoutDeliveryMode() {
  cy.get('[formcontrolname="deliveryModeId"]').eq(0).click();
  cy.get('cx-delivery-mode').within(() => {
    cy.wait(3000);
    cy.findByText('Continue').click();
  });
}

export function checkoutPaymentDetails() {
  cy.get('cx-payment-method').within(() => {
    cy.get('cx-card')
      .eq(0)
      .within(() => {
        cy.findByText('OMSA Customer');
        cy.findByText('5105105105105100');
        cy.findByText('Expires: 08/2030');
        cy.findByText('Use this payment', { timeout: 10000 })
          .should(Cypress._.noop) // No-op to avoid failures if not found
          .then(($button) => {
            if ($button.length > 0) {
              cy.wrap($button).click();
            }
          });
      });
    cy.findByText('Continue').click();
  });
}

export function reviewAndPlaceOrder() {
  cy.contains('Estimated delivery date').should('exist');
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
