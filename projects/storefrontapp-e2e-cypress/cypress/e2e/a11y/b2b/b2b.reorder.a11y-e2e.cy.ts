/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bCheckout from '../../../helpers/b2b/b2b-checkout';
import { goToB2bOrderHistoryWithOrder } from '../../../helpers/order-history';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

export function waitUntilOrderIsPlaced() {
  cy.get('input[formcontrolname="termsAndConditions"]')
    .should('be.visible')
    .check();
  b2bCheckout.placeOrder('/order-confirmation');
  cy.get('main').contains('Thank you for your order!');
}

describe('Reorder accessibility', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.a11yContinuumSetup();
    goToB2bOrderHistoryWithOrder();
  });

  it('Reorder', () => {
    cy.get('cx-order-history .cx-order-history-value').first().click();
    cy.get('button').contains(' Reorder ').click();
    cy.get('cx-reorder-dialog').a11yRunContinuumTest();

    cy.get('button').contains(' Continue ').click();
    cy.get('p[aria-live="polite"]').a11yRunContinuumTest();
  });
});
