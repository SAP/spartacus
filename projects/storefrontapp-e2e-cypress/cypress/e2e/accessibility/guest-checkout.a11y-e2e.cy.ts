/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { products } from '../../helpers/cart';
import { getSampleUser } from '../../sample-data/checkout-flow';
import { CheckoutConfig } from '@spartacus/storefront';
import {
  fillPaymentDetails,
  fillShippingAddress,
} from '../../helpers/checkout-forms';
import { viewportContext } from '../../helpers/viewport-context';

describe('Guest Checkout accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    const user = getSampleUser();

    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.cxConfig({ checkout: { guest: true } } as CheckoutConfig);
      cy.a11yContinuumSetup();
      cy.visit(`product/${products[0].code}`);
      cy.get('cx-add-to-cart button').contains(' Add to cart ').click();
      cy.get('.cx-dialog-buttons button').contains(' view cart ').click();
      cy.get('cx-cart-proceed-to-checkout button')
        .contains(' Proceed to Checkout ')
        .click();
      cy.get('cx-login-register button').contains(' Guest Checkout ').click();
    });

    it('Checkout login page', () => {
      cy.get('cx-checkout-login');
      cy.get('main').a11yRunContinuumTest();

      cy.get('cx-checkout-login').within(() => {
        cy.get('[formcontrolname="email"]').clear().type(user.email);
        cy.get('[formcontrolname="emailConfirmation"]')
          .clear()
          .type(user.email);
        cy.get('button[type=submit]').click();
      });
    });

    it('Shipping Address', () => {
      // untouched form
      cy.get('cx-delivery-address cx-address-form');
      cy.get('main').a11yRunContinuumTest();

      // form with errors
      cy.get('.cx-address-form-btns button').contains(' Continue ').click();
      cy.get('main').a11yRunContinuumTest();

      fillShippingAddress(user);
    });

    it('Delivery Mode', () => {
      cy.get('cx-delivery-mode .cx-delivery-mode-wrapper');
      cy.get('main').a11yRunContinuumTest();

      cy.get('.cx-checkout-btns button').contains(' Continue ').click();
    });

    it('Payment Details', () => {
      cy.get('cx-payment-form');
      cy.get('main').a11yRunContinuumTest();

      fillPaymentDetails(null);
      cy.get('cx-payment-form').a11yRunContinuumTest();

      fillPaymentDetails(user, undefined, false);
      cy.get('cx-payment-form').a11yRunContinuumTest();

      cy.get('.cx-checkout-btns button').contains(' Continue ').click();
    });

    it('Checkout Review', () => {
      cy.get('cx-checkout-review-payment');
      cy.get('main').a11yRunContinuumTest();

      cy.get('input[formcontrolname="termsAndConditions"]').check();
      cy.get('cx-place-order button.btn-primary').click();
    });

    it('Order Confirmation', () => {
      cy.get('cx-order-confirmation-thank-you-message');
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
