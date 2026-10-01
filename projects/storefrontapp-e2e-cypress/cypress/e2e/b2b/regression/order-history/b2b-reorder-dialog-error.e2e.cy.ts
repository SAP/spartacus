/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { goToB2BOrderHistoryPage } from '../../../../helpers/order-history';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

const CART_FROM_ORDER_ERROR_ALIAS = 'cartFromOrderError';

describe('Reorder dialog error handling', () => {
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);

    cy.whenJDK21(() => {
      goToB2BOrderHistoryPage();
    });
  });

  it('should display a global error message and close the dialog when reorder API fails', () => {
    cy.whenJDK17(() => {
      cy.visit('my-account/orders');
    });

    cy.get('cx-order-history .cx-order-history-value').first().click();
    cy.get('button').contains(' Reorder ').click();
    cy.get('.cx-reorder-dialog-areyousure-section').should('exist');

    cy.intercept(
      'POST',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/orgUsers/current/cartFromOrder?*`,
      {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      }
    ).as(CART_FROM_ORDER_ERROR_ALIAS);

    cy.get('.cx-reorder-dialog-footer div button.btn-primary').first().click();
    cy.wait(`@${CART_FROM_ORDER_ERROR_ALIAS}`);

    cy.get('cx-reorder-dialog').should('not.exist');

    // Check message content specifically, as a second global error message is also displayed
    // triggered by the generic Internal Server Error HTTP response
    cy.contains('cx-global-message .alert-danger', 'reordering').should(
      'exist'
    );
  });
});
