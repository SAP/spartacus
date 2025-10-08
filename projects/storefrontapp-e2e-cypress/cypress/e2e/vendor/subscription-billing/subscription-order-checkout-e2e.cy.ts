/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import * as helper from '../../../helpers/vendor/subscription-billing/subscription-billing';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

describe('Subscription Billing Checkout Flow ', () => {
  it('with subscription products in cart', () => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.subscriptionUser);

    helper.lookForSubscriptionProduct();
    helper.placeSubscriptionOrder();
    helper.validateSubscriptionCharges();
    signOutUser();
  });
});
