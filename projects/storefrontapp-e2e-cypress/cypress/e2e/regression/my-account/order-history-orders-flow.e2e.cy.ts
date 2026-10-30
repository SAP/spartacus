/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  clickOnPrimaryDialogButton,
  getCartItem,
  verifyProductIsDisplayed,
} from '../../../helpers/b2b/b2b-saved-cart';
import {
  clickOnActionLink,
  doPlaceOrder,
  goToB2COrderHistoryPage,
  interceptAddToCartEndpoint,
  interceptCartPageEndpoint,
  orderHistoryTest,
  verifyActionLinkHasText,
  waitForResponse,
} from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';
import { consignedOrderId, product } from '../../../sample-data/checkout-flow';
import { waitForOrderWithConsignmentToBePlacedRequest } from '../../../support/utils/order-placed';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Order History with orders', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.whenJDK21(() => {
        goToB2COrderHistoryPage();
      });
      cy.whenJDK17(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.visit('/');
        cy.requireLoggedIn();
        orderHistoryTest.checkIfOrderIsDisplayed();
      });
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    orderHistoryTest.checkIfOrderIsDisplayed();
    orderHistoryTest.checkSortingByCode();
    orderHistoryTest.checkCorrectDateFormat();
    orderHistoryTest.checkTabsAreDisplayedAfterNavigation();
  });
});

describe('Order details page', { testIsolation: false }, () => {
  isolateTestsBefore();
  viewportContext(['mobile', 'desktop'], () => {
    let formattedValue: any;
    before(() => {
      cy.whenJDK17(() => {
        cy.visit('/');
        cy.requireLoggedIn();
        doPlaceOrder().then((orderData: any) => {
          formattedValue = orderData.body.totalPrice.formattedValue;
          cy.waitForOrderToBePlacedRequest(
            undefined,
            undefined,
            orderData.body.code
          );
          cy.visit('/my-account/orders');
          cy.get('.cx-order-history-code > .cx-order-history-value').then(
            (el) => {
              const orderNumber = el.text().match(/\d+/)[0];
              waitForOrderWithConsignmentToBePlacedRequest(orderNumber);
            }
          );

          cy.get('.cx-order-history-code > .cx-order-history-value')
            .should('exist')
            .first()
            .click();
        });
      });
      cy.whenJDK21(() => {
        goToB2COrderHistoryPage();

        cy.get('.cx-order-history-code > .cx-order-history-value')
          .contains(consignedOrderId)
          .as('orderHistoryCode');

        cy.get('@orderHistoryCode').click();
      });
    });
    // Tests that the order details page displays consigned entries including product name and code.
    // The final check verifies the consignment tracking information is displayed correctly in the order details.
    it('should display order details page with consigned entries', () => {
      cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
      cy.get('.cx-item-list-row .cx-code').should('contain', product.code);

      cy.whenJDK17(() => {
        cy.get('.cx-summary-total > .cx-summary-amount').should(
          'contain',
          formattedValue
        );
      });
    });

    // Tests adding a product from the order details page to the cart using the "Buy It Again" feature.
    // The final check verifies the product is displayed in the cart with the correct name and code, and removes it after verification.
    it('should add product to cart from order details page', () => {
      const addToCartAlias = interceptAddToCartEndpoint();

      const cartPageAlias = interceptCartPageEndpoint();

      verifyActionLinkHasText('Buy It Again');

      clickOnActionLink();

      waitForResponse(addToCartAlias);

      clickOnPrimaryDialogButton();

      waitForResponse(cartPageAlias);
      cy.whenJDK17(() => {
        verifyProductIsDisplayed(product.name, product.code);
      });
      cy.whenJDK21(() => {
        getCartItem(product.name).within(() => {
          cy.get('.cx-code').should('contain', product.code);
          cy.get('cx-item-counter input')
            .invoke('val')
            .then(Number)
            .should('be.gt', 0);
          // Removing the product from cart to avoid increasing qty over runs.
          cy.get('cx-item-counter')
            .get(`[aria-label="Remove one"]`)
            .first()
            .click();
        });
      });
    });
  });
});
