/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { navigateToAMyAccountPage } from "../../navigation";

export function validateSubscriptionBillingList() {
  cy.visit('/powertools-spa/en/USD/my-account/subscription-bills');

  // table headers
  cy.get('.cx-billing-list-table .cx-billing-list-thead')
    .should('exist')
    .within(() => {
      cy.contains('.cx-billing-list-table-header', 'Bill ID/Number').should(
        'exist'
      );
      cy.contains('.cx-billing-list-table-header', 'Billing Date').should(
        'exist'
      );
      cy.contains('.cx-billing-list-table-header', 'Subscriptions').should(
        'exist'
      );
      cy.contains('.cx-billing-list-table-header', 'Total').should('exist');
    });

  // first row data
  cy.get('.cx-billing-list-table tbody tr')
    .eq(0)
    .should('exist')
    .within(() => {
      cy.get('td').eq(0).should('exist'); // Bill ID/Number value
      cy.get('td').eq(1).should('exist'); // Billing Date value
      cy.get('td').eq(2).should('exist'); // Subscriptions value
      cy.get('td').eq(3).should('exist'); // Total value
    });
}
