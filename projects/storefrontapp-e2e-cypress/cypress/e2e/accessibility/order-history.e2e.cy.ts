/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../helpers/viewport-context';

describe('Order History Page accessibility', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.login('test-user-with-orders@sap.cx.com', 'pw4all');
      cy.visit('/my-account/orders');
    });

    context('Order list', () => {
      it('Page loaded', () => {
        cy.get('main').a11yRunContinuumTest();
      });
    });

    context('Order details', () => {
      it('Page loaded', () => {
        cy.get('.cx-order-history-code > .cx-order-history-value')
          .first()
          .click();

        cy.get('main').a11yRunContinuumTest();
      });
    });

    context('Cancel order', () => {
      it('Page loaded', () => {
        cy.get('cx-order-details-actions .btn-secondary').eq(1).click();

        cy.get('main').a11yRunContinuumTest();
      });
    });
  });
});
