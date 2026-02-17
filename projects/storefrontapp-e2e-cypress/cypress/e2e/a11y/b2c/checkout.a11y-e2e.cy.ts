/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  fillPaymentDetails,
  fillShippingAddress,
} from '../../../helpers/checkout-forms';
import { setupUserAccountForCheckout } from '../../../helpers/checkout-user-setup';
import { CART_PATH } from '../../../helpers/site-context-selector';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';

const user = getSampleUser();

describe('Checkout Accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
  });
  viewportContext([/*'mobile',*/ 'desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      setupUserAccountForCheckout();
    });

    it('proceed to checkout button', () => {
      cy.visit(CART_PATH);
      cy.get('cx-cart-proceed-to-checkout').as('proceedToCheckoutButton');
      cy.get('@proceedToCheckoutButton').a11yRunContinuumTest();
      cy.get('@proceedToCheckoutButton').click();
    });

    it('checkout summary', () => {
      cy.get('cx-checkout-order-summary').a11yRunContinuumTest();
    });

    it('checkout progress bar', () => {
      cy.get('cx-checkout-progress').a11yRunContinuumTest();
    });

    it('available addresses overview', () => {
      cy.contains(
        'cx-delivery-address',
        'Selected Address'
      ).a11yRunContinuumTest();
    });

    it('empty shipping address form', () => {
      cy.onDesktop(() => {
        cy.contains('button', 'Add New Address').click();
      });
      cy.onMobile(() => {
        cy.get('.cx-checkout-btns-bottom > .btn').click();
      });
      cy.get('cx-delivery-address').a11yRunContinuumTest();
    });

    it('shipping address form with errors', () => {
      cy.get('button.btn-primary').click();
      cy.get('cx-delivery-address').a11yRunContinuumTest();
    });

    it('delivery methods', () => {
      fillShippingAddress(user, false);
      cy.get('button.btn-primary').click();
      cy.contains(
        'cx-delivery-mode',
        'Standard Delivery'
      ).a11yRunContinuumTest();
      cy.get('button.btn-primary').click();
    });

    it('available payment methods overview', () => {
      cy.contains(
        'cx-payment-method',
        'Selected Payment'
      ).a11yRunContinuumTest();
    });

    it('payment form', () => {
      cy.onDesktop(() => {
        cy.contains('Add New Payment').click();
      });
      cy.onMobile(() => {
        cy.get('.cx-checkout-btns-bottom > .btn').click();
      });
      cy.get('cx-payment-form').a11yRunContinuumTest();
    });

    it('payment form with errors', () => {
      cy.get('button.btn-primary').click();
      cy.get('cx-payment-form').a11yRunContinuumTest();
    });

    it('review order', () => {
      fillPaymentDetails(user, undefined, true);
      cy.get('section[aria-label="Review Order"]').a11yRunContinuumTest();
      cy.get('cx-place-order').a11yRunContinuumTest();
    });

    it('order confirmation', () => {
      cy.get('input[formcontrolname="termsAndConditions"]').check();
      cy.get('cx-place-order button.btn-primary').should('be.enabled').click();
      cy.contains('main', 'Thank you').a11yRunContinuumTest();
    });
  });
});
