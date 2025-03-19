/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeaturesConfig } from '@spartacus/core';
import {
  loginUser,
  goToCheapProductDetailsPage,
  addCheapProductToCartAndBeginCheckoutForSignedInCustomer,
  signOut,
  ELECTRONICS_CURRENCY,
  ELECTRONICS_BASESITE,
  clickAddNewPayment,
} from '../../../helpers/checkout-flow';
import {
  my_user,
  checkoutShippingAddress,
  checkoutDeliveryMode,
  interceptDigitalPaymentsRequest,
  interceptDigitalPaymentsResponse,
  placeOrder,
  reviewOrder,
  reviewPlacedOrder,
} from '../../../helpers/vendor/digital-payments/user';
import { fillBillingAddress } from '../../../helpers/checkout-forms';

describe('checkout using digital-payments with billing address', () => {
  beforeEach(() => {
    cy.cxConfig({
      features: {
        showBillingAddressInDigitalPayments: true,
      },
    } as FeaturesConfig);
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
    Cypress.env('BASE_CURRENCY', ELECTRONICS_CURRENCY);
  });
  it('checkout using digital-payments with billing address', () => {
    interceptDigitalPaymentsRequest();
    interceptDigitalPaymentsResponse();
    cy.visit('/electronics-spa/en/USD/login');
    loginUser(my_user);
    cy.wait(3000);
    goToCheapProductDetailsPage();
    addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
    checkoutShippingAddress();
    checkoutDeliveryMode();
    clickAddNewPayment();
    cy.wait('@getDigitalPaymentsRequest');
    fillBillingAddress(my_user.billingAddress);
    cy.get('button.btn.btn-block.btn-primary')
      .should('be.enabled')
      .contains('Continue')
      .click();
    cy.wait('@getDigitalPaymentsResponse');
    reviewOrder();
    placeOrder();
    reviewPlacedOrder();
    signOut();
  });
  it('cancel adding a new card after filling out billing address', () => {
    interceptDigitalPaymentsRequest();
    cy.visit('/electronics-spa/en/USD/login');
    loginUser(my_user);
    cy.wait(3000);
    goToCheapProductDetailsPage();
    addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
    checkoutShippingAddress();
    checkoutDeliveryMode();
    cy.get('cx-card')
      .its('length')
      .then((expectedCount) => {
        clickAddNewPayment();
        cy.wait('@getDigitalPaymentsRequest');
        fillBillingAddress(my_user.billingAddress);
        cy.get('button.btn.btn-block.btn-secondary')
          .should('be.enabled')
          .contains('Back')
          .click();
        cy.get('cx-dp-confirmation-dialog')
          .find('button.btn.btn-primary')
          .should('be.visible')
          .contains('Continue')
          .click();

        cy.get('cx-card').its('length').should('eq', expectedCount);
        signOut();
      });
  });
});
