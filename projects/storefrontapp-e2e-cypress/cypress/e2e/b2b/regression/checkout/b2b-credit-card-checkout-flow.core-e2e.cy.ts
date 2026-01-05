/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../../helpers/b2b/b2b-checkout';
import * as checkout from '../../../../helpers/checkout-flow';
import {
  cartWithB2bProduct,
  order_type,
  POWERTOOLS_BASESITE,
  products,
} from '../../../../sample-data/b2b-checkout';
import { user } from '../../../../sample-data/checkout-flow';

context('B2B - Credit Card Checkout flow', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  it('should checkout using a credit card', () => {
    b2bCheckout.loginB2bUser();

    cy.log('🛒 Adding product to cart');
    b2bCheckout.addB2bProductToCartAndCheckout();

    cy.log('💳 Selecting credit card payment type');
    b2bCheckout.enterPONumber();
    b2bCheckout.selectCreditCardPayment();

    cy.log('💳 Checking total in order summary');
    checkout.checkSummaryAmount(cartWithB2bProduct);

    cy.log(
      '💳 Preventing navigation to payment method if shipping address form is empty'
    );
    checkout.proceedWithEmptyShippingAdressForm();

    cy.log(
      '💳 Preventing navigation to payment method if shipping address for has errors'
    );
    checkout.proceedWithIncorrectShippingAddressForm({
      ...user,
      firstName: '',
    });

    cy.log('💳 Entering shipping address');
    checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });

    cy.log('💳 Selecting delivery mode');
    checkout.verifyDeliveryOptions();

    cy.log('💳 Preventing navigation to review order if payment form is empty');
    checkout.proceedWithEmptyPaymentForm();

    cy.log(
      '💳 Preventing navigation to review order if payment form has errors'
    );
    checkout.proceedWithIncorrectPaymentForm({
      ...user,
      payment: { ...user.payment, number: '' },
    });

    cy.log('💳 Entering payment method');
    checkout.fillPaymentFormWithCheapProduct(
      { payment: { number: user.payment.number } },
      undefined
    );

    cy.log('💳 Reviewing and placing order');
    b2bCheckout.reviewB2bReviewOrderPage(
      user,
      cartWithB2bProduct,
      false,
      order_type.PLACE_ORDER
    );

    b2bCheckout.placeOrder('/order-confirmation');

    cy.log('💳 Displaying order confirmation');
    b2bCheckout.reviewB2bOrderConfirmation(
      user,
      products[0],
      cartWithB2bProduct,
      false
    );
  });
});
