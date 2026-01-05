/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import * as helper from '../../../helpers/vendor/subscription-billing/subscription';
import { login } from '../../../helpers/b2b/b2b-quote';
import { signOutUser } from '../../../helpers/checkout-flow';

describe('Subscription - PDP, Order Placement, List, Details', () => {
  it('place subscription order and validate it under my-account', () => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);

    cy.visit('/powertools-spa/en/USD/login');
    login(
      helper.subscriptionUser.email,
      helper.subscriptionUser.password,
      helper.subscriptionUser.fullName
    );

    helper.lookForSubscriptionProduct();
    helper.placeSubscriptionOrder();

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

    helper.waitForSubscriptionOrderToSyncToCommerce();
    helper.validateSubscriptionList();
    helper.validateSubscriptionDetailsPage();
    signOutUser();
  });
});
