/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { goToB2BOrderHistoryMockPage } from '../../../helpers/order-history';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import {
  loginB2bUser,
  navigateToReviewOrderPage,
} from '../helpers/a11y-b2b.checkout';

export function waitUntilOrderIsPlaced() {
  cy.get('input[formcontrolname="termsAndConditions"]').check();
  cy.get('cx-place-order button').contains(' Place Order ').click();
  cy.get('main').contains('Thank you for your order!');
}

describe('Reorder accessibility', () => {
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.a11yContinuumSetup();

    cy.whenJDK21(() => {
      goToB2BOrderHistoryMockPage();
    });
    cy.whenJDK17(() => {
      loginB2bUser();
      navigateToReviewOrderPage();
      waitUntilOrderIsPlaced();
    });
  });

  it('Reorder', () => {
    cy.whenJDK17(() => {
      cy.visit('my-account/orders');
    });
    cy.get('cx-order-history .cx-order-history-value').first().click();
    cy.get('button').contains(' Reorder ').click();
    cy.get('cx-reorder-dialog').a11yRunContinuumTest();

    cy.get('button').contains(' Continue ').click();
    cy.get('p[aria-live="polite"]').a11yRunContinuumTest();
  });
});
