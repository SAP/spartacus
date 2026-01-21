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
  goToOrderHistoryWithConsignedOrder,
  interceptAddToCartEndpoint,
  interceptCartPageEndpoint,
  orderHistoryTest,
  verifyActionLinkHasText,
  waitForResponse,
} from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';
import { consignedOrderId, product } from '../../../sample-data/checkout-flow';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Order History with orders', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      goToOrderHistoryWithConsignedOrder();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    orderHistoryTest.checkSortingByCode();
    orderHistoryTest.checkCorrectDateFormat();
    orderHistoryTest.checkTabsAreDisplayedAfterNavigation();
  });
});

describe('Order details page', { testIsolation: false }, () => {
  isolateTestsBefore();
  viewportContext(['mobile', 'desktop'], () => {
    orderHistoryTest.checkOrderDetailsUnconsignedEntries();

    before(() => {
      cy.visit('/');

      goToOrderHistoryWithConsignedOrder();

      cy.get('.cx-order-history-code > .cx-order-history-value')
        .contains(consignedOrderId)
        .should('exist');

      cy.get('.cx-order-history-code > .cx-order-history-value')
        .contains(consignedOrderId)
        .click();
    });

    it('should display order details page with consigned entries', () => {
      cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
      cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
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
    it('should remove product to cart from order details page', () => {
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
