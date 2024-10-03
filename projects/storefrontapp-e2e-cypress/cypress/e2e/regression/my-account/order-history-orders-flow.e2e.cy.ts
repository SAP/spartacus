/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { viewportContext } from '../../../helpers/viewport-context';
import { product } from '../../../sample-data/checkout-flow';
import { waitForOrderWithConsignmentToBePlacedRequest } from '../../../support/utils/order-placed';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Order History with orders', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
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
  });
});

describe('Order details page', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTestsBefore();
    let formattedValue: any;

    orderHistoryTest.checkOrderDetailsUnconsignedEntries();

    before(() => {
      cy.requireLoggedIn();
      doPlaceOrder().then((orderData: any) => {
        formattedValue = orderData.body.totalPrice.formattedValue;
        cy.waitForOrderToBePlacedRequest(
          undefined,
          undefined,
          orderData.body.code
        );
        cy.visit('/my-account/orders');
        cy.get('.cx-order-history-code > .cx-order-history-value')
          .then((el) => {
            const orderNumber = el.text().match(/\d+/)[0];
            waitForOrderWithConsignmentToBePlacedRequest(orderNumber);
            return cy.wrap(el);
          })
          .first()
          .click();
      });

      it('should display order details page with consigned entries', () => {
        cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
        cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
        cy.get('.cx-summary-total > .cx-summary-amount').should(
          'contain',
          formattedValue
        );
      });
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
