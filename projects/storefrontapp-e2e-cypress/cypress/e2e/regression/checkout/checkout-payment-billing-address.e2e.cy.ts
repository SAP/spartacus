/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkout from '../../../helpers/checkout-flow';
import { Address } from '../../../helpers/checkout-forms';
import { user } from '../../../sample-data/checkout-flow';

const canadaAddress: Address = {
  city: 'Montreal',
  line1: '111 Boulevard Robert-Bourassa',
  line2: '',
  country: 'Canada',
  postal: '9000',
  state: 'Quebec',
};

context('Checkout - Payment billing address', () => {
  it('should add new payment forms in checkout', () => {
    cy.requireLoggedIn();
    cy.visit('/');

    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCart();

    cy.log('🛒 Going through checkout steps');
    checkout.clickCheckoutButton();
    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
    checkout.verifyReviewOrderPage();

    cy.log('🛒 Adding new payment form');

    checkout.goToPaymentDetails();
    checkout.clickAddNewPayment();
    checkout.fillPaymentFormWithCheapProduct(user, {
      ...user,
      address: canadaAddress,
    });
    checkout.verifyReviewOrderPage();
  });
});
