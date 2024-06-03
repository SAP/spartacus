/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutConfig } from '@spartacus/storefront';
import { getSampleUser } from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';

export function testExpressCheckout() {
  it('should go to first step of checkout when there is no default address/payment', () => {
    let user = getSampleUser();
    Cypress.log({
      name: 'expressCheckoutLog',
      displayName: 'expressCheckoutLog',
      message: [`Creating/setting test user: ${user.email}`],
    });

    checkout.clickHamburger();

    checkout.registerUser(false, user);
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndLogin(user);

    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  });

  it('should skip address and payment checkout steps once address and payment are set', () => {
    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct(undefined, undefined, true);
    checkout.verifyReviewOrderPage();

    cy.get('cx-mini-cart').click();

    cy.findByText(/proceed to checkout/i).click();

    checkout.verifyReviewOrderPage();
    cy.get('.cx-review-card-address').should('contain', 'Standard Delivery');
  });

  it('should setup express checkout with another preferred delivery mode', () => {
    cy.cxConfig({
      checkout: {
        express: true,
        defaultDeliveryMode: ['MOST_EXPENSIVE'],
      },
    } as CheckoutConfig);
    cy.visit('/');

    cy.get('cx-mini-cart').click();

    cy.findByText(/proceed to checkout/i).click();

    checkout.verifyReviewOrderPage();
    cy.get('.cx-review-card-address').should('contain', 'Premium Delivery');
  });
}
