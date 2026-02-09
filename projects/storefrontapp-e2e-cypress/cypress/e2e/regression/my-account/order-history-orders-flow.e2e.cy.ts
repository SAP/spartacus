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
  goToB2COrderHistoryMockPage,
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
        goToB2COrderHistoryMockPage();
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
      cy.visit('/');
      cy.whenJDK17(() => {
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
        goToB2COrderHistoryMockPage();

        cy.get('.cx-order-history-code > .cx-order-history-value')
          .contains(consignedOrderId)
          .should('exist');

        cy.get('.cx-order-history-code > .cx-order-history-value')
          .contains(consignedOrderId)
          .click();
      });
    });
    it('should display order details page with consigned entries', () => {
      cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
      cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
      cy.get('.cx-summary-total > .cx-summary-amount').should(
        'contain',
        formattedValue
      );
    });

    it('should add product to cart from order details page', () => {
      const addToCartAlias = interceptAddToCartEndpoint();

      const cartPageAlias = interceptCartPageEndpoint();

      verifyActionLinkHasText('Buy It Again');

      clickOnActionLink();

      waitForResponse(addToCartAlias);

      clickOnPrimaryDialogButton();

      waitForResponse(cartPageAlias);

      verifyProductIsDisplayed(product.name, product.code);
    });

    it('should remove product to cart from order details page (only JDK21 relevant)', () => {
      cy.whenJDK21(() => {
        getCartItem(product.name).within(() => {
          cy.get('.cx-code').should('contain', product.code);
          cy.get('cx-item-counter')
            .get(`[aria-label="Remove one"]`)
            .first()
            .click();
        });
      });
    });
  });
});
