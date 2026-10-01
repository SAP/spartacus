/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import * as common from './common';
import { navigation, waitForPage } from './navigation';
import * as configurationCart from './product-configurator-cart';
import * as configurationCpqCartBundle from './product-configurator-cart-bundle-cpq';
import Chainable = Cypress.Chainable;

export * from './product-configurator-cart-bundle-cpq';

const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

const REMOVE_CART_ENTRY_ALIAS = 'removeCartEntry';

/**
 * Clicks on 'Resolve Issues' link in the cart.
 *
 * @param cartItemIndex - Index of cart item
 */
export function clickOnResolveIssuesLinkInCart(cartItemIndex: number): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-issues-notification')
    .within(() => {
      cy.get(resolveIssuesLinkSelector)
        .click()
        .then(() => {
          cy.location('pathname').should('contain', ' /cartEntry/entityKey/');
        });
    });
  cy.wait('@readConfig');
}

/**
 * Clicks on 'Proceed to Checkout' in the cart
 */
export function clickOnProceedToCheckoutBtnInCart(): void {
  const paymentTypeAlias = waitForPage('/checkout/payment-type', 'paymentType');
  cy.findByText(/proceed to checkout/i)
    .click()
    .then(() => {
      cy.wait(`@${paymentTypeAlias}`);
      cy.get('.cx-payment-type-container').should('contain', 'Payment method');
      cy.get('cx-payment-type').should('be.visible');
    });
}

/**
 * Selects the order by the order number alias.
 *
 * @param shopName - shop name
 *
 */
export function selectOrderByOrderNumberAlias(shopName: string): void {
  cy.get('@orderNumber').then((orderNumber) => {
    cy.log('Searched order number: ' + orderNumber);
    // To refresh the order history content, navigate to the home page and back to the order history
    cy.log('Navigate to home page');
    navigation.visitHomePage({});
    goToOrderHistory(shopName);

    // Verify whether the searched order exists
    searchForOrder(orderNumber.toString());
    cy.get('@isFound').then((isFound) => {
      let found = isFound ? ' ' : ' not ';
      cy.log("Order with number '" + orderNumber + "' is" + found + 'found');
      if (!isFound) {
        cy.waitForOrderToBePlacedRequest(
          shopName,
          'USD',
          orderNumber.toString()
        );

        searchForOrder(orderNumber.toString());
        cy.get('@isFound').then((isOFound) => {
          found = isOFound ? ' ' : ' not ';
          cy.log(
            "Order with number '" + orderNumber + "' is" + found + 'found'
          );
          if (!isFound) {
            // To refresh the order history content, navigate to the home page and back to the order history
            cy.log('Navigate to home page');
            navigation.visitHomePage({});
            goToOrderHistory(shopName);
          }
        });
      }
      // Navigate to the order details page of the searched order
      cy.get(
        'cx-order-history a.cx-order-history-value:contains(' +
          `${orderNumber}` +
          ')'
      )
        .click()
        .then(() => {
          configurationCart.navigateToOrderDetails();
        });
    });
  });
}

/**
 * Verifies whether the searched order exists in the order history and
 * sets the '@isFound' alias accordingly.
 *
 * @param orderNumber - Order number
 */
function searchForOrder(orderNumber: string): void {
  cy.get('cx-order-history')
    .get('td.cx-order-history-code a.cx-order-history-value')
    .each((elem) => {
      const order = elem.text().trim();
      cy.log('order number: ' + order);
      cy.log('searched order number: ' + orderNumber);
      if (order === orderNumber) {
        cy.wrap(true).as('isFound');
        return false;
      } else {
        cy.wrap(false).as('isFound');
      }
    });
}

/**
 * Navigates to the order history page.
 *
 * @param shopName - shop name
 * @return - New order history window
 */
export function goToOrderHistory(shopName: string): Chainable<Window> {
  cy.log('Navigate to order history');
  return cy.visit(`/${shopName}/en/USD/my-account/orders`).then(() => {
    cy.get('cx-breadcrumb h1').should('contain', 'Order History');
  });
}

/**
 * Verifies whether the loading spinner is not display anymore.
 */
function checkLoadingSpinnerNotDisplayed(): void {
  cy.get('.cx-spinner').should('not.exist');
}

/**
 * Verifies whether 'Continue' button is not disabled.
 */
function checkContinueBtnNotDisabled(): void {
  cy.get('button.btn-primary').contains('Continue').should('not.be.disabled');
}

/**
 * Verifies whether 'Place Order' button is not disabled.
 */
function checkPlaceOrderBtnNotDisabled(): void {
  cy.get('button.btn-primary')
    .contains('Place Order')
    .should('not.be.disabled');
}

/**
 * Proceeds with payment method.
 */
function proceedWithPaymentMethod(): void {
  cy.log('🛒 Select Account Payment Method');
  cy.get('a.cx-link.active').contains('Method ofPayment');
  cy.get('cx-payment-type').should('be.visible');
  cy.get('cx-payment-type').within(() => {
    cy.get('span.label-content').should('be.visible');
    cy.get('.cx-payment-type-container').should('be.visible');
    cy.get('.cx-checkout-btns').should('be.visible');
    cy.get(`#paymentType-ACCOUNT`).click({ force: true });
  });
}

/**
 * Verifies whether cost center is displayed.
 */
function checkCostCenterDisplayed(): void {
  cy.get('cx-cost-center').should('be.visible');
  cy.get('cx-cost-center').within(() => {
    cy.get('span.label-content').contains('Cost Center');
    cy.get('select').should('be.visible');
    cy.get('span.label-content').contains('Delivery addresses available');
  });
}

/**
 * Verifies whether delivery address is displayed.
 */
function checkDeliveryAddressDisplayed(): void {
  cy.get('cx-delivery-address').should('be.visible');
  cy.get('cx-delivery-address').within(() => {
    checkLoadingSpinnerNotDisplayed();
    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    cy.get('p.cx-checkout-text').contains('Address');
    cy.get('.cx-checkout-body').should('be.visible');
    cy.get('.cx-checkout-btns').should('be.visible');
    cy.get('.cx-checkout-body').within(() => {
      checkShipToThisAddressDisplayed();
    });
    cy.get('.cx-checkout-btns').within(() => {
      cy.get('button.btn-secondary').should('be.visible');
      cy.get('button.btn-secondary').contains('Back');
      cy.get('button.btn-primary').should('be.visible');
      cy.get('button.btn-primary').contains('Continue');
    });
  });
}

/**
 * Verifies whether 'Ship to this address' button is displayed.
 */
function checkShipToThisAddressDisplayed(): void {
  cy.get('.cx-delivery-address-card').should('be.visible');
  cy.get('.cx-delivery-address-card').within(() => {
    checkLoadingSpinnerNotDisplayed();
    cy.get('.cx-card-body').should('be.visible');
    cy.get('.cx-card-container').should('be.visible');
    cy.get('.cx-card-actions').should('be.visible');
  });
}

/**
 * Proceeds with delivery address.
 */
function proceedWithDeliveryAddress(): void {
  cy.log("🛒 Navigate to the next step 'Delivery Address' tab");
  checkContinueBtnNotDisabled();
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.wait('@deliveryAddress');
      cy.location('pathname').should('contain', '/checkout/delivery-address');
      cy.get('a.cx-link.active').contains('Ship');
      checkCostCenterDisplayed();
      checkDeliveryAddressDisplayed();
      checkShipToThisAddressDisplayed();
    });
}

/**
 * Proceeds with delivery mode.
 */
function proceedWithDeliveryMode(): void {
  cy.log("🛒 Navigate to the next step 'Delivery mode' tab");
  checkContinueBtnNotDisabled();
  cy.get('button.btn-primary')
    .contains('Continue')
    .wait(Cypress.config('defaultCommandTimeout'))
    .click()
    .then(() => {
      cy.wait('@deliveryMode');
      cy.location('pathname').should('contain', '/checkout/delivery-mode');
      cy.get('a.cx-link.active').contains('DeliveryMode');
      cy.get('cx-delivery-mode').should('be.visible');
      cy.get('cx-delivery-mode').within(() => {
        cy.get('.cx-checkout-title').should('contain', 'Delivery Options');
      });
    });
}

/**
 *  Verifies whether terms and conditions are checked.
 */
function checkTermsAndConditions(): void {
  cy.log("🛒 Check 'Terms & Conditions'");
  cy.get('input[formcontrolname="termsAndConditions"]')
    .check()
    .then(() => {
      cy.get('cx-place-order form').should('have.class', 'ng-valid');
    });
}

/**
 * Reviews an order.
 */
function reviewOrder(): void {
  cy.log("🛒 Navigate to the next step 'Review Order' tab");
  const reviewOrderAlias = waitForPage('/checkout/review-order', 'reviewOrder');
  cy.get('button.btn-primary').click();
  checkContinueBtnNotDisabled();
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.wait(`@${reviewOrderAlias}`);
      cy.location('pathname').should('contain', '/checkout/review-order');
      cy.get('cx-review-submit').should('be.visible');
      cy.get('.cx-review').should('be.visible');
      cy.get('.cx-review').should('contain', 'Review');
      cy.get('cx-review-submit').should('be.visible');
      cy.get('.cx-review-cart-total').should('be.visible');
      cy.get('.cx-review-cart-item').should('be.visible');
    });
  checkTermsAndConditions();
}

/**
 * Places an order.
 */
function placeOrder(): void {
  cy.log('🛒 Place order');
  checkPlaceOrderBtnNotDisabled();
  cy.get('cx-place-order button.btn-primary')
    .contains('Order')
    .wait(Cypress.config('defaultCommandTimeout'))
    .click()
    .then(() => {
      cy.wait('@orderConfirmation');
      cy.location('pathname').should('contain', '/order-confirmation');
      cy.get('cx-breadcrumb').should('contain', 'Order Confirmation');
    });
}

/**
 * Conducts the B2B checkout.
 */
export function checkoutB2B(): void {
  cy.log('🛒 Complete B2B checkout process');
  defineB2BCheckoutAlias();
  proceedWithPaymentMethod();
  proceedWithDeliveryAddress();
  proceedWithDeliveryMode();
  reviewOrder();
  placeOrder();
  configurationCart.defineOrderNumberAlias();
}

/**
 * Registers a cart GET intercept for the given base site.
 *
 * @param baseSite - Base site id, e.g. `powertools-spa`
 */
export function registerCartRouteForBaseSite(baseSite: string): void {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${baseSite}/users/*/carts/*?fields=DEFAULT*`
  ).as('getCart');
}

/**
 * Registers a cart entry DELETE intercept for the given base site.
 *
 * `cart.removeCartItem` cannot be reused here because its intercept is bound to
 * the `BASE_SITE` environment variable, which CPQ tests do not run against.
 *
 * @param baseSite - Base site id, e.g. `powertools-spa`
 */
export function registerRemoveCartEntryRouteForBaseSite(
  baseSite: string
): void {
  cy.intercept(
    'DELETE',
    `${Cypress.env('OCC_PREFIX')}/${baseSite}/users/*/carts/*/entries/*`
  ).as(REMOVE_CART_ENTRY_ALIAS);
}

/**
 * Removes the cart entry of the given product and waits for the OCC delete call.
 * Requires `registerRemoveCartEntryRouteForBaseSite` to have been called.
 *
 * @param productCode - Product code shown in the cart row
 */
export function removeCartEntryForProductCode(productCode: string): void {
  configurationCpqCartBundle.withCartEntryIndexForProductCode(
    productCode,
    (cartEntryIndex) => {
      configurationCart.clickOnRemoveLink(cartEntryIndex);
    }
  );
  cy.wait(`@${REMOVE_CART_ENTRY_ALIAS}`)
    .its('response.statusCode')
    .should('eq', 200);
}

/**
 * Navigates to the cart page of the given base site.
 *
 * @param baseSite - Base site id, e.g. `powertools-spa`
 */
export function goToCart(baseSite: string): void {
  const location = `/${baseSite}/en/USD/cart`;
  cy.visit(location);
  cy.location('pathname').should('contain', location);
  common.checkLoadingMsgNotDisplayed();
}

/**
 * Opens the cart of the given base site and removes all entries, if any.
 * Requires a logged-in user.
 *
 * @param baseSite - Base site id, e.g. `powertools-spa`
 */
export function clearCartIfNotEmpty(baseSite: string): void {
  goToCart(baseSite);
  // While the cart is loading, neither the cart details nor the empty-cart content is rendered.
  cy.get('cx-cart-details, .EmptyCartMiddleContent')
    .should('be.visible')
    .then(($content) => {
      if ($content.is('cx-cart-details')) {
        cy.log('Cart is not empty, remove all cart entries');
        cart.clearActiveCart();
      }
    });
  cart.validateEmptyCart();
}

/**
 * Verifies the amount of cart entries.
 *
 * @param expectedCount - Expected amount of cart entries
 */
export function verifyCartCount(expectedCount: number) {
  cy.log('expectedCount =' + expectedCount);
  cy.get('cx-mini-cart .count').contains(expectedCount);
}

/**
 * Define alias for B2B checkout API call.
 */
function defineB2BCheckoutAlias() {
  cy.intercept('GET', '**delivery-address*').as('deliveryAddress');
  cy.intercept('PUT', '**/deliverymode*').as('deliveryMode');
  cy.intercept('POST', '**/orders*').as('orderConfirmation');
}
