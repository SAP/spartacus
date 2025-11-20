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
  mockOrderDetails,
  mockOrdersListEN,
} from '../../../helpers/mock-order-history';
import {
  clickOnActionLink,
  interceptAddToCartEndpoint,
  interceptCartPageEndpoint,
  orderHistoryTest,
  verifyActionLinkHasText,
  waitForResponse,
} from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';
import { product } from '../../../sample-data/checkout-flow';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

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

    orderHistoryTest.checkIfOrderIsDisplayed();
    orderHistoryTest.checkSortingByCode();
    orderHistoryTest.checkCorrectDateFormat();
    orderHistoryTest.checkTabsAreDisplayedAfterNavigation();
  });
});

describe('Order details page', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTestsBefore();

    orderHistoryTest.checkOrderDetailsUnconsignedEntries();

    before(() => {
      cy.visit('/');
      cy.requireLoggedIn();

      mockOrdersListEN();
      mockOrderDetails();

      cy.visit('/my-account/orders');
      cy.wait('@ordersEN');

      cy.contains('.cx-order-history-value', '00054851', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true });
        
      cy.wait('@orderDetails');
    });

    it('should display order details page with consigned entries', () => {
      cy.get('.cx-item-list-row .cx-link').should('contain', 'Alpha 350');
      cy.get('.cx-item-list-row .cx-code').should('contain', '1446509');
      cy.get('.cx-summary-total .cx-summary-amount').should(
        'contain',
        '$1,313.53'
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
