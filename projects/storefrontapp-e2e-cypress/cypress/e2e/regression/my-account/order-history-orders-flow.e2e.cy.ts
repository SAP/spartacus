/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  clickOnPrimaryDialogButton,
  verifyProductIsDisplayed,
} from '../../../helpers/b2b/b2b-saved-cart';
import {
  clickOnActionLink,
  doPlaceOrder,
  interceptAddToCartEndpoint,
  interceptCartPageEndpoint,
  orderHistoryTest,
  verifyActionLinkHasText,
  waitForResponse,
} from '../../../helpers/order-history';
import {
  mockOrderDetails,
  mockOrderList,
} from '../../../helpers/orders-history-mocks';
import { viewportContext } from '../../../helpers/viewport-context';
import { product } from '../../../sample-data/checkout-flow';
import { waitForOrderWithConsignmentToBePlacedRequest } from '../../../support/utils/order-placed';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

const USE_ORDER_HISTORY_MOCKS = true;

describe('Order History with orders', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
      cy.requireLoggedIn();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    orderHistoryTest.checkIfOrderIsDisplayedMock();
    orderHistoryTest.checkSortingByCodeMock();
    orderHistoryTest.checkCorrectDateFormatMock();
    orderHistoryTest.checkTabsAreDisplayedAfterNavigationMock();
  });
});

describe('Order details page', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTestsBefore();
    let formattedValue: any;

    orderHistoryTest.checkOrderDetailsUnconsignedEntries();

    before(() => {
      cy.visit('/');
      cy.requireLoggedIn();
      doPlaceOrder().then((orderData: any) => {
        const order = orderData.body;
        formattedValue = order.totalPrice.formattedValue;
        if (USE_ORDER_HISTORY_MOCKS) {
          const summary = {
            code: order.code,
            placed: order.created,
            status: order.statusDisplay,
            total: order.totalPrice,
            guid: order.guid,
          };

          mockOrderList(summary);
          mockOrderDetails(order);

          cy.visit('/my-account/orders');
          cy.wait('@mockOrders');

          cy.get('.cx-order-history-value').first().click();

          cy.wait('@mockOrderDetails');
          return;
        }

        cy.waitForOrderToBePlacedRequest(undefined, undefined, order.code);

        cy.visit('/my-account/orders');

        cy.get('.cx-order-history-code > .cx-order-history-value', {
          timeout: 30000,
        }).then((el) => {
          const number = el.text().match(/\d+/)[0];
          waitForOrderWithConsignmentToBePlacedRequest(number);
        });

        cy.get('.cx-order-history-code > .cx-order-history-value', {
          timeout: 10000,
        })
          .should('exist')
          .first()
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
  });
});
