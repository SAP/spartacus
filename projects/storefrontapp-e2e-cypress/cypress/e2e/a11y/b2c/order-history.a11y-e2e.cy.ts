/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';
import { doPlaceOrder } from '../../../helpers/order-history';

describe('Order History Page accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
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
      });
    });

    it('Order list', () => {
      cy.get('#order-history-table'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Order details', () => {
      cy.get('.cx-order-history-code > .cx-order-history-value')
        .first()
        .click();

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
