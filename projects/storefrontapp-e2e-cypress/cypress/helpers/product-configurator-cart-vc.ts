/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { user } from '../sample-data/checkout-flow';
import * as checkoutForms from './checkout-forms';
import * as checkout from './checkout-flow';
import * as configurationCart from './product-configurator-cart';

const shippingAddressData: checkoutForms.AddressData = user;
const billingAddress: checkoutForms.AddressData = user;
const paymentDetailsData: checkoutForms.PaymentDetails = user;

/**
 * Verifies whether the issues banner is displayed.
 *
 * @param element - HTML element
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function checkNotificationBanner(
  element,
  cartItemIndex: number,
  numberOfIssues?: number
): void {
  const resolveIssuesText = 'must be resolved before checkout.  Resolve Issues';
  element
    .get(`#cx-error-msg-${cartItemIndex}`)
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).contains(resolveIssuesText);
      if (numberOfIssues > 1) {
        const issues = text.replace(resolveIssuesText, '').trim();
        expect(issues).match(/^[0-9]/);
        expect(issues).eq(numberOfIssues.toString());
      }
    });
}

/**
 * Verifies whether the issues banner is displayed in the cart for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function verifyNotificationBannerInCart(
  cartItemIndex: number,
  numberOfIssues?: number
): void {
  cy.log('cartItemIndex: ' + cartItemIndex);
  cy.log('numberOfIssues: ' + numberOfIssues);
  const element = cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-issues-notification');

  if (numberOfIssues) {
    checkNotificationBanner(element, cartItemIndex, numberOfIssues);
  } else {
    element.should('not.be.visible');
  }
}

/**
 * Checks Terms & Conditions.
 */
export function checkTermsAndConditions(currency: string = 'USD'): void {
  cy.log("Check 'Terms & Conditions'");
  cy.findByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      `/${Cypress.env('BASE_SITE')}/en/${currency}/terms-and-conditions`
    );
  cy.get('input[formcontrolname="termsAndConditions"]').check();
}

/**
 * Place the order.
 */
export function placeOrder(): void {
  cy.log('Place order');
  const orderConfirmationPage = checkout.waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order button.btn-primary').should('be.enabled').click();
  cy.wait(`@${orderConfirmationPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

/**
 * Conducts the checkout.
 */
export function completeCheckout(): void {
  cy.log('Fulfill shipping address form and submit');
  checkoutForms.fillShippingAddress(shippingAddressData, true);
  checkout.verifyDeliveryMethod();
  cy.log('Fulfill payment details form');
  checkoutForms.fillPaymentDetails(paymentDetailsData, billingAddress);
  this.checkTermsAndConditions();
  this.placeOrder();
  cy.log('Define order number alias');
  configurationCart.defineOrderNumberAlias();
}
