/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import * as subscriptionHelper from '../../../helpers/vendor/subscription-billing/subscription';
import * as billingHelper from '../../../helpers/vendor/subscription-billing/billing';
import { login } from '../../../helpers/b2b/b2b-quote';
import { signOutUser } from '../../../helpers/checkout-flow';

describe('Subscription Bills - PDP, Order Placement, List, Details', () => {
  it('place subscription order and validate subscription bill list and bill details page under my-account', () => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);

    cy.visit('/powertools-spa/en/USD/login');
    login(
      subscriptionHelper.subscriptionUser.email,
      subscriptionHelper.subscriptionUser.password,
      subscriptionHelper.subscriptionUser.fullName
    );

    subscriptionHelper.lookForSubscriptionProduct();
    subscriptionHelper.placeSubscriptionOrder();

    cy.get('cx-order-confirmation-thank-you-message .cx-page-title')
      .invoke('text')
      .then((text) => {
        const match = text.match(/Confirmation of Order:\s*(\d+)/);
        if (match) {
          const orderNumber = match[1].trim();
          Cypress.env('subscriptionOrderNumber', orderNumber);
        } else {
          throw new Error('Order number not found in confirmation message');
        }
      });

    subscriptionHelper.waitForSubscriptionOrderToSyncToCommerce();
    billingHelper.validateSubscriptionBillingList();
    cy.wait(5000);

    // click on view details of first bill
    cy.get('.cx-billing-list-table tbody tr')
      .eq(0)
      .should('exist')
      .within(() => {
        cy.contains('a', 'View Bill').click();
        cy.wait(10000);
      });

    // [TODO] validate bill details page
    signOutUser();
  });
});
