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

    it('Order list', () => {
      cy.get('#order-history-table'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Order details', () => {
      cy.get('.cx-order-history-code > .cx-order-history-value')
        .contains('00001092')
        .click();

      cy.url().should('contain', '00001092');
      cy.get('.cx-order-details-cards'); // wait until content is loaded
      cy.get('main').a11yRunContinuumTest();
    });

    it('Cancel order', () => {
      cy.get('cx-order-details-actions .btn-secondary')
        .contains(' Cancel Items ')
        .click();
      cy.url().should('contain', 'cancel');
      cy.get('.AccountPageTemplate').a11yRunContinuumTest();
    });
  });
});
