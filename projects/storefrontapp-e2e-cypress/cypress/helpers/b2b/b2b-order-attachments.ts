/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../../sample-data/b2b-order-attachments';
import { POWERTOOLS_BASESITE } from '../../sample-data/b2b-checkout';
import { stubB2bUnitSelectionApis } from './b2b-unit-selection';

export function loginB2bUser() {
  stubB2bUnitSelectionApis();
  cy.requireLoggedIn(sampleData.b2bUserAccount);
}

export function openAttachmentList(orderCode: string) {
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/my-account/order/${orderCode}`);
  cy.get('cx-order-attachments div div button').first().click();
}

export function downloadAllAttachmentsTwice() {
  cy.intercept(
    'GET',
    `**/users/current/orders/*/attachments/*/download?lang=en&curr=USD`
  ).as('downloadAttachment');
  cy.get('tr.order-attachment-row').each(($row) => {
    // Navigable download icon button
    cy.wrap($row).find('a[role="button"]').click();
    cy.wait('@downloadAttachment').its('response.statusCode').should('eq', 200);

    // File name link
    cy.wrap($row).find('a:not([role])').click();
    cy.wait('@downloadAttachment').its('response.statusCode').should('eq', 200);
  });
}
