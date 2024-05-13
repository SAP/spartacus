/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage, addCheapProductToCart } from './checkout-flow';
import { SampleProduct } from '../sample-data/checkout-flow';

export const cheapProduct: SampleProduct = {
  name: 'Coney Flare',
  code: 'M_CR_1015',
};

export const my_user = {
  fullName: 'Magnus Carlsen',
  email: 'magnus.carlsen@hybris.com',
  password: 'Welcome@1',
};

export function checkoutShippingAddress() {
  const deliveryModePage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryModePage'
  );
  cy.get('cx-delivery-address').within(() => {
    cy.findByText('Selected');
    cy.findByText('Continue').click();
  });
  cy.wait(`@${deliveryModePage}`).its('response.statusCode').should('eq', 200);
}

export function checkoutDeliveryMode() {
  const PaymentDetailsPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentDetailsPage'
  );
  cy.get('[formcontrolname="deliveryModeId"]').eq(0).click();
  cy.get('cx-delivery-mode').within(() => {
    cy.wait(3000);
    cy.findByText('Continue').click();
  });
  cy.wait(`@${PaymentDetailsPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function checkoutPaymentDetails() {
  const ReviewOrderPage = waitForPage(
    '/checkout/review-order',
    'getReviewOrderPage'
  );
  cy.get('cx-payment-method').within(() => {
    cy.get('cx-card')
      .eq(0)
      .within(() => {
        cy.findByText('Use this payment').click();
        cy.wait(3000);
      });
    cy.findByText('Continue').click();
  });
  cy.wait(`@${ReviewOrderPage}`).its('response.statusCode').should('eq', 200);
}

export function reviewAndPlaceOrder() {
  const ConfirmOrderPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.contains('Estimated delivery date');
  cy.get('cx-place-order').within(() => {
    cy.get('[formcontrolname="termsAndConditions"]').check();
    cy.findByText('Place Order').click();
  });
  cy.wait(`@${ConfirmOrderPage}`).its('response.statusCode').should('eq', 200);
}

export function orderConfirmation() {
  cy.get('cx-breadcrumb').within(() => {
    cy.findByText('Order Confirmation');
  });
  cy.get('cx-order-confirmation-thank-you-message');
  cy.contains('Estimated delivery date');
}

export function addProductToCart(sampleProduct: SampleProduct = cheapProduct) {
  addCheapProductToCart(sampleProduct);

  const deliveryAddressPage = waitForPage(
    '/checkout/delivery-address',
    'getDeliveryAddressPage'
  );
  cy.contains('Estimated delivery date');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${deliveryAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}
