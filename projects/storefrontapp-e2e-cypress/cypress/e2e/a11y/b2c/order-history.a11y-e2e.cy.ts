/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  mockOrderDetails,
  mockOrdersListEN,
} from '../../../helpers/mock-order-history';
import { doPlaceOrder } from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Order History Page accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.requireLoggedIn();
      doPlaceOrder().then(() => {
        mockOrdersListEN();
        cy.visit('/my-account/orders');
      });
    });

    it('Order list', () => {
      cy.get('#order-history-table'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Order details', () => {
      mockOrderDetails();
      cy.get('.cx-order-history-code > .cx-order-history-value')
        .first()
        .click();
      cy.wait('@orderDetails');

      cy.get('.cx-order-details-cards'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Cancel order', () => {
      cy.get('cx-order-details-actions a.btn-secondary').click();
      cy.get('.cx-amend-order-items'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
