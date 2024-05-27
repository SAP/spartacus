/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as checkoutForms from './checkout-forms';
import * as checkout from './checkout-flow';
import * as configurationCart from './product-configurator-cart';
import { SampleUser } from '../sample-data/checkout-flow';

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
export function checkTermsAndConditions(): void {
  cy.log("Check 'Terms & Conditions'");
  cy.get('input[formcontrolname="termsAndConditions"]')
    .check()
    .then(() => {
      cy.get('cx-place-order form').should('have.class', 'ng-valid');
    });
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
  cy.wait(`@${orderConfirmationPage}`);
}

/**
 * Conducts the checkout.
 */
export function completeCheckout(user: SampleUser): void {
  cy.log('Fulfill shipping address form and submit');
  checkoutForms.fillShippingAddress(<any>user, true);
  checkout.verifyDeliveryMethod();
  cy.log('Fulfill payment details form');
  checkoutForms.fillPaymentDetails(user, <any>user, true);
  checkTermsAndConditions();
  placeOrder();
  cy.log('Define order number alias');
  configurationCart.defineOrderNumberAlias();
}
