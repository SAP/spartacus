/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import * as common from './common';
import { navigation, waitForPage } from './navigation';
import * as configurationCart from './product-configurator-cart';
import * as configurationCpq from './product-configurator-cpq';
import * as configurationOverview from './product-configurator-overview';
import * as configurationOverviewCpq from './product-configurator-overview-cpq';
import Chainable = Cypress.Chainable;

const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

const REMOVE_CART_ENTRY_ALIAS = 'removeCartEntry';

/**
 * Clicks on 'Resolve Issues' link in the cart.
 *
 * @param {number} cartItemIndex - Index of cart item
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
 * Selects the order by the oder number alias.
 *
 * @param {string} shopName - shop name
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
 * @param {string} orderNumber - Order number
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
 * Navigates to the oder history page.
 *
 * @param {string} shopName - shop name
 *
 * @return {Chainable<Window>} - New order history window
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
 * Search for a corresponding bundle item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @returns {Chainable<JQuery<HTMLElement>>} - Corresponding bundle item
 */
function findBundleItem(cartItemIndex: number): Chainable<JQuery<HTMLElement>> {
  return cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-cart-entry-bundle-info');
}

/**
 * Verifies the name of bundle item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} bundleItemIndex - Index of bundle item
 * @param {string} name - Expected name of bundle item
 */
export function checkBundleItemName(
  cartItemIndex: number,
  bundleItemIndex: number,
  name: string
) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-item-info')
      .eq(bundleItemIndex)
      .within(() => {
        cy.get('.cx-item-name').should('contain', name);
      });
  });
}

/**
 * Verifies the price of bundle item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} bundleItemIndex - Index of bundle item
 * @param {string} price - Expected price of bundle item
 */
export function checkBundleItemPrice(
  cartItemIndex: number,
  bundleItemIndex: number,
  price: string
) {
  findBundleItem(cartItemIndex).within(() => {
    if (price) {
      cy.get('.cx-item-info')
        .eq(bundleItemIndex)
        .within(() => {
          cy.get('.cx-item-price .cx-item').should('contain', price);
        });
    }
  });
}

/**
 * Verifies the quantity of bundle item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} bundleInfoIndex - Index of bundle item
 * @param {string} quantity - Expected quantity of bundle item
 */
export function checkBundleItemQuantity(
  cartItemIndex: number,
  bundleInfoIndex: number,
  quantity: string
) {
  findBundleItem(cartItemIndex).within(() => {
    if (quantity) {
      cy.get('.cx-item-info')
        .eq(bundleInfoIndex)
        .within(() => {
          cy.get('.cx-item-quantity .cx-item').should('contain', quantity);
        });
    }
  });
}

/**
 * Toggle bundle items via 'show' or 'hide' link within a cart entry.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {string} linkName - Name of the toggled link
 */
function toggleBundleItems(cartItemIndex: number, linkName: string) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-toggle-hide-items')
      .should('contain', linkName)
      .click()
      .then(() => {
        let expectedLinkName = 'hide';
        if (linkName !== 'show') {
          expectedLinkName = linkName;
        }
        cy.get('.cx-toggle-hide-items').should('contain', expectedLinkName);
      });
  });
}

/**
 * Verifies the amount of bundle items for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} itemsAmount - Expected amount of bundle items
 */
export function checkAmountOfBundleItems(
  cartItemIndex: number,
  itemsAmount: number
) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-number-items').should('contain', itemsAmount);
  });
  toggleBundleItems(cartItemIndex, 'show');
}

/**
 * Verifies that bundle items are represented by an overview link instead of
 * being rendered inline.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} itemsAmount - Expected amount of bundle items
 */
export function checkBundleOverviewLink(
  cartItemIndex: number,
  itemsAmount: number
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-number-items').should('contain', itemsAmount);
    cy.get('button').should('not.exist');
    cy.get('.cx-item-infos').should('not.exist');
    cy.get('.cx-item-info').should('not.exist');
    cy.get('.cx-toggle-hide-items a')
      .should('contain', 'show')
      .and('be.visible');
  });
}

/**
 * Navigates from a cart bundle to its read-only configuration overview.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnBundleOverviewLink(cartItemIndex: number): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-toggle-hide-items a').contains('show').click();
  });
}

/**
 * Verifies that bundle line items are toggled inline (show/hide button) rather
 * than via the overview navigation link.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function checkBundleInlineShowToggleDisplayed(
  cartItemIndex: number
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('button .cx-toggle-hide-items').should('contain', 'show');
    cy.get('.cx-toggle-hide-items a.link').should('not.exist');
  });
}

/**
 * Expands inline bundle line items via the show toggle button.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickBundleInlineShowToggle(cartItemIndex: number): void {
  toggleBundleItems(cartItemIndex, 'show');
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-item-infos').should('have.class', 'open');
  });
}

/**
 * Verifies that a bundle line item shows the product name as a link and the
 * product code beneath it.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {string} productName - Expected product name
 */
export function checkBundleLineItemProductLinkAndCode(
  cartItemIndex: number,
  productName: string
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.contains('.cx-item-info', productName).within(() => {
      cy.get('.cx-item-name a.cx-link')
        .should('be.visible')
        .and('contain', productName);
      cy.get('.cx-item-name .cx-code')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          const productCode = text.replace(/ID\s*/i, '').trim();
          expect(productCode).to.match(/\S+/);
          cy.wrap(productCode).as('bundleLineItemProductCode');
        });
    });
  });
}

/**
 * Opens the product detail page from a bundle line item link in the cart.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {string} productName - Product name shown on the line item
 */
export function clickBundleLineItemProductLink(
  cartItemIndex: number,
  productName: string
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.contains('.cx-item-info', productName)
      .find('.cx-item-name a.cx-link')
      .click();
  });
}

/**
 * Opens the product details page of a bundle line item via its product link and
 * returns to the cart. Requires `checkBundleLineItemProductLinkAndCode` to have
 * set the `@bundleLineItemProductCode` alias.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {string} productName - Product name shown on the line item
 * @param {string} productCode - Product code of the cart entry holding the bundle
 */
export function navigateToBundleLineItemPDPAndBackToCart(
  cartItemIndex: number,
  productName: string,
  productCode: string
): void {
  clickBundleLineItemProductLink(cartItemIndex, productName);
  const productNameSlug = productName.toLowerCase().replace(/\s+/g, '-');
  cy.get('@bundleLineItemProductCode').then((lineItemProductCode) => {
    cy.location('pathname').should(
      'contain',
      `/product/${lineItemProductCode}/${productNameSlug}`
    );
  });
  cy.get('.ProductDetailsPageTemplate').should('be.visible');

  cy.go('back');
  checkCartPageReady();
  waitForCartEntryBundleInfo(productCode);
}

/**
 * Clicks the nested "Edit Product Configuration" link on a bundle line item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {string} productName - Product name shown on the line item
 */
export function clickBundleLineItemEditProductConfiguration(
  cartItemIndex: number,
  productName: string
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.contains('.cx-item-info', productName)
      .find('.cx-item-configure a')
      .contains('Edit Product Configuration')
      .click();
  });
}

/**
 * Adds the currently open configuration to the cart and navigates from the
 * overview page to the cart, which then shows the bundle info.
 * Requires `registerCartRouteForBaseSite` to have been called.
 *
 * @param {string} productCode - Product code of the configured product
 */
export function addConfigurableProductToCart(productCode: string): void {
  configurationCpq.clickAddToCartBtn();
  configurationOverviewCpq.checkOverviewPageReady();
  configurationOverview.clickContinueToCartBtnOnOP();
  cy.wait('@getCart');
  checkCartPageReady();
  cart.verifyCartNotEmpty();
  waitForCartEntryBundleInfo(productCode);
}

/**
 * Clicks the "Edit Bundle Configuration" link on a CPQ cart entry.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnEditBundleConfigurationLink(
  cartItemIndex: number
): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-cart-entry')
    .find('a.link')
    .contains('Edit Bundle Configuration')
    .click({ force: true })
    .then(() => {
      cy.location('pathname').should('contain', '/cartEntry/entityKey/');
    });
}

/**
 * Leaves a configuration that was opened from a cart entry and returns to the
 * cart via the overview page.
 *
 * @param {string} productCode - Product code of the cart entry holding the bundle
 */
export function returnToCartFromConfiguration(productCode: string): void {
  configurationCpq.clickAddToCartBtn();
  configurationOverviewCpq.checkOverviewPageReady();
  configurationOverview.clickContinueToCartBtnOnOP();
  checkCartPageReady();
  waitForCartEntryBundleInfo(productCode);
}

/**
 * Registers a cart GET intercept for the given base site.
 *
 * @param {string} baseSite - Base site id, e.g. `powertools-spa`
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
 * @param {string} baseSite - Base site id, e.g. `powertools-spa`
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
 * @param {string} productCode - Product code shown in the cart row
 */
export function removeCartEntryForProductCode(productCode: string): void {
  withCartEntryIndexForProductCode(productCode, (cartEntryIndex) => {
    configurationCart.clickOnRemoveLink(cartEntryIndex);
  });
  cy.wait(`@${REMOVE_CART_ENTRY_ALIAS}`)
    .its('response.statusCode')
    .should('eq', 200);
}

/**
 * Navigates to the cart page of the given base site.
 *
 * @param {string} baseSite - Base site id, e.g. `powertools-spa`
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
 * @param {string} baseSite - Base site id, e.g. `powertools-spa`
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
 * Runs assertions for the cart row that contains the given product code.
 *
 * @param {string} productCode - Product code shown in the cart row
 * @param {(cartEntryIndex: number) => void} fn - Callback with the row index
 */
export function withCartEntryIndexForProductCode(
  productCode: string,
  fn: (cartEntryIndex: number) => void
): void {
  cy.get('cx-cart-item-list .cx-item-list-row').then(($rows) => {
    let cartEntryIndex = -1;
    $rows.each((index, row) => {
      const codeText = Cypress.$(row).find('.cx-code').text();
      if (codeText.includes(productCode)) {
        cartEntryIndex = index;
        return false;
      }
    });
    expect(
      cartEntryIndex,
      `cart entry index for product ${productCode}`
    ).to.be.gte(0);
    fn(cartEntryIndex);
  });
}

/**
 * Waits until the cart page shows bundle info for the given product.
 *
 * @param {string} productCode - Product code of the cart entry
 */
export function waitForCartEntryBundleInfo(productCode: string): void {
  withCartEntryIndexForProductCode(productCode, (cartEntryIndex) => {
    findBundleItem(cartEntryIndex).should('be.visible');
  });
}

/**
 * Verifies that the cart page is loaded after leaving the configurator overview.
 */
export function checkCartPageReady(): void {
  common.checkLoadingMsgNotDisplayed();
  cy.get('.CartPageTemplate').should('be.visible');
  cy.get('cx-cart-details').should('be.visible');
}

/**
 * Verifies the amount of cart entries.
 *
 * @param {number} expectedCount - Expected amount of cart entries
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
