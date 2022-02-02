import { user } from '../sample-data/checkout-flow';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';
import * as configurationCart from './product-configurator-cart';

const shippingAddressData: AddressData = user;
const billingAddress: AddressData = user;
const paymentDetailsData: PaymentDetails = user;

/**
 * Verifies whether the issues banner is displayed.
 *
 * @param element - HTML element
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function checkNotificationBanner(
  element,
  numberOfIssues?: number
): void {
  const resolveIssuesText = 'must be resolved before checkout.  Resolve Issues';
  element
    .get('#cx-error-msg')
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
  const element = cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-issues-notification');

  if (numberOfIssues) {
    checkNotificationBanner(element, numberOfIssues);
  } else {
    element.should('not.be.visible');
  }
}

/**
 * Conducts the checkout.
 */
export function checkout(): void {
  cy.log('Complete checkout process');
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.log('Fulfill shipping address form');
  fillShippingAddress(shippingAddressData, false);

  cy.log("Navigate to the next step 'Delivery mode' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/delivery-mode');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
      cy.get('cx-delivery-mode').should('be.visible');
    });

  cy.log("Navigate to the next step 'Payment details' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/payment-details');
      cy.get('.cx-checkout-title').should('contain', 'Payment');
      cy.get('cx-payment-method').should('be.visible');
    });

  cy.log('Fulfill payment details form');
  fillPaymentDetails(paymentDetailsData, billingAddress);

  cy.log("Check 'Terms & Conditions'");
  cy.get('input[formcontrolname="termsAndConditions"]')
    .check()
    .then(() => {
      cy.get('cx-place-order form').should('have.class', 'ng-valid');
    });

  cy.log('Place order');
  cy.get('cx-place-order button.btn-primary')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/order-confirmation');
      cy.get('cx-breadcrumb').should('contain', 'Order Confirmation');
    });

  cy.log('Define order number alias');
  configurationCart.defineOrderNumberAlias();
}
