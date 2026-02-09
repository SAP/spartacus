/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  doPlaceOrder,
  goToOrderHistoryWithConsignedOrder,
} from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';
import { consignedOrderId } from '../../../sample-data/checkout-flow';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Order History Page accessibility', { testIsolation: false }, () => {
  isolateTestsBefore();
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.whenJDK21(() => {
        goToOrderHistoryWithConsignedOrder();
      });
      cy.whenJDK17(() => {
        cy.requireLoggedIn();
        doPlaceOrder().then((orderData: any) => {
          cy.waitForOrderToBePlacedRequest(
            undefined,
            undefined,
            orderData.body.code
          );
          cy.visit('/my-account/orders');
        });
      });
    });

    it('Order list', () => {
      cy.get('#order-history-table'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Order details', () => {
      cy.whenJDK21(() => {
        cy.get('.cx-order-history-code > .cx-order-history-value')
          .contains(consignedOrderId)
          .click();
      });
      cy.whenJDK17(() => {
        cy.get('.cx-order-history-code > .cx-order-history-value')
          .first()
          .click();
      });

      cy.get('.cx-order-details-cards'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Cancel order', () => {
      cy.get('cx-order-details-actions .btn-secondary')
        .contains(' Cancel Items ')
        .click();
      cy.get('.cx-amend-order-items'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
