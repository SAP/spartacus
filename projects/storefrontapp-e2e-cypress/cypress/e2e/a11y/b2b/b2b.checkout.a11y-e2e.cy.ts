/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../helpers/b2b/b2b-checkout';
import * as checkout from '../../../helpers/checkout-flow';
import {
  b2bAccountShipToUser,
  b2bProduct,
  cartWithB2bProduct,
  cartWithB2bProductAndPremiumShipping,
  order_type,
  POWERTOOLS_BASESITE,
} from '../../../sample-data/b2b-checkout';
import { user } from '../../../sample-data/checkout-flow';

describe('B2B Accessibility Checkout', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.a11yContinuumSetup();
  });

  it('should checkout using an account payment type', () => {
    b2bCheckout.loginB2bUser();

    b2bCheckout.addB2bProductToCartAndCheckout();
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.enterPONumber();
    cy.get('cx-payment-type').a11yRunContinuumTest();

    b2bCheckout.selectAccountPayment();
    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.selectAccountShippingAddress();
    cy.get('.cx-checkout-title').should('contain', 'Delivery Options');
    cy.get('cx-delivery-mode').a11yRunContinuumTest();

    b2bCheckout.selectAccountDeliveryMode();

    b2bCheckout.reviewB2bReviewOrderPage(
      b2bAccountShipToUser,
      cartWithB2bProductAndPremiumShipping,
      true,
      order_type.PLACE_ORDER
    );
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.placeOrder('/order-confirmation');
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.reviewB2bOrderConfirmation(
      b2bAccountShipToUser,
      b2bProduct,
      cartWithB2bProductAndPremiumShipping
    );
    cy.get('cx-order-confirmation-thank-you-message').a11yRunContinuumTest();
  });

  it('should checkout using a credit card', () => {
    b2bCheckout.loginB2bUser();

    b2bCheckout.addB2bProductToCartAndCheckout();
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.enterPONumber();
    cy.get('cx-payment-type').a11yRunContinuumTest();

    b2bCheckout.selectCreditCardPayment();
    cy.get('main').a11yRunContinuumTest();

    checkout.checkSummaryAmount(cartWithB2bProduct);
    cy.get('cx-order-summary').a11yRunContinuumTest();

    checkout.proceedWithEmptyShippingAdressForm();
    cy.get('cx-delivery-address').a11yRunContinuumTest();

    checkout.proceedWithIncorrectShippingAddressForm({
      ...user,
      firstName: '',
    });
    cy.get('cx-delivery-address').a11yRunContinuumTest();

    checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });
    cy.get('.cx-checkout-title').should('contain', 'Delivery Options');

    checkout.verifyDeliveryOptions();
    cy.get('cx-delivery-mode').a11yRunContinuumTest();

    checkout.proceedWithEmptyPaymentForm();
    cy.get('cx-payment-method').a11yRunContinuumTest();

    checkout.proceedWithIncorrectPaymentForm({
      ...user,
      payment: { ...user.payment, number: '' },
    });
    cy.get('cx-payment-method').a11yRunContinuumTest();

    checkout.fillPaymentFormWithCheapProduct(
      { payment: { number: user.payment.number } },
      undefined
    );
    b2bCheckout.reviewB2bReviewOrderPage(
      user,
      cartWithB2bProduct,
      false,
      order_type.PLACE_ORDER
    );
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.placeOrder('/order-confirmation');
    cy.get('main').a11yRunContinuumTest();

    b2bCheckout.reviewB2bOrderConfirmation(
      user,
      b2bProduct,
      cartWithB2bProduct,
      false
    );
    cy.get('cx-order-confirmation-thank-you-message').a11yRunContinuumTest();
  });
});
