/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  clickOnPrimaryDialogButton,
  verifyProductIsDisplayed,
} from '../../helpers/b2b/b2b-saved-cart';
import {
  clickOnActionLink,
  doPlaceOrder,
  interceptAddToCartEndpoint,
  interceptCartPageEndpoint,
  orderHistoryTest,
  verifyActionLinkHasText,
  waitForResponse,
} from '../../helpers/order-history';
import { viewportContext } from '../../helpers/viewport-context';
import { product } from '../../sample-data/checkout-flow';
import { waitForOrderWithConsignmentToBePlacedRequest } from '../../support/utils/order-placed';
import { isolateTestsBefore } from '../../support/utils/test-isolation';

describe('Order History Page accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTestsBefore();

    before(() => {
      cy.a11yContinuumSetup();
      cy.requireLoggedIn();
      doPlaceOrder().then((orderData: any) => {
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
        cy.wait(300);
      });
    });

    context('Order list', () => {
      it('Page loaded', () => {
        cy.get('main').a11yRunContinuumTest();
      });
    });

    context('Order details', () => {
      it('Page loaded', () => {
        cy.get('.cx-order-history-code > .cx-order-history-value')
          .should('exist')
          .first()
          .click();

        cy.wait(3000);
        cy.get('main').a11yRunContinuumTest();
      });
    });
  });
});
