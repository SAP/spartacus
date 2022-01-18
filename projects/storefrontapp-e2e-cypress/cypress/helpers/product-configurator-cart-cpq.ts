import { navigation } from './navigation';
import Chainable = Cypress.Chainable;
import * as configurationCart from './product-configurator-cart';

const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

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
  cy.findByText(/proceed to checkout/i)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/payment-type');
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
    cy.get('cx-order-history h3').should('contain', 'Order history');
  });
}

/**
 * Conducts the B2B checkout.
 */
export function checkoutB2B(): void {
  cy.log('Complete B2B checkout process');
  cy.log('Select Account Payment Method');
  cy.get(`#paymentType-ACCOUNT`).click({ force: true });
  cy.log("Navigate to the next step 'Shipping Address' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/shipping-address');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      cy.get('cx-shipping-address').should('be.visible');
      cy.log("Click to the link 'Ship to this address'");
      cy.contains('Ship to this address').click();
    });

  cy.log("Navigate to the next step 'Delivery mode' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.wait('@deliveryMode');
      cy.location('pathname').should('contain', '/checkout/delivery-mode');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
      cy.get('cx-delivery-mode').should('be.visible');
    });

  cy.log("Navigate to the next step 'Review Order' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/review-order');
      cy.get('.cx-review').should('contain', 'Review');
      cy.get('cx-review-submit').should('be.visible');
    });

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
 * Toggle bundle items via 'show' or 'hide' link
 *
 * @param {string} linkName - Name of the toggled link
 */
function toggleBundleItems(linkName: string) {
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
    toggleBundleItems('show');
  });
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
 * Define alias for deliveryMode API call.
 */
export function defineDeliveryModeAlias() {
  cy.intercept('PUT', '**/deliverymode*').as('deliveryMode');
}
