/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { mockOrderDetails } from '../../../helpers/mock-order-history';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Order History Page accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.a11yContinuumSetup();
      cy.requireLoggedIn();
      cy.intercept('GET', /\/users\/current\/orders(\?.*)?/, {
        fixture: 'orders/orders-list-en.json',
      }).as('ordersEN');
      cy.visit('/my-account/orders');
    });

    it('Order list', () => {
      cy.wait('@ordersEN', { timeout: 60000 });
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
