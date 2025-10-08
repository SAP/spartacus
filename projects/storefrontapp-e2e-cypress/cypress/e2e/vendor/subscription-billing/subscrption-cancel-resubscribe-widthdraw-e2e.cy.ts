/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import * as helper from '../../../helpers/vendor/subscription-billing/subscrption';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
export const subscrptionComponentSelector = 'cx-subscription-list';
describe('Cancel Resubscribe Withdraw subscription billing Order Flow', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.serviceUser);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit(`${Cypress.env('BASE_SITE')}/en/USD/my-account/subscriptions`);
  });

  it('should cancel only the first active subscription', () => {
    helper.clickManageServiceForActiveSubscription();
    helper.checkCancelButtonExists();
    helper.cancelSubscriptionIfPossible();
    helper.clickViewAllSubscriptions();
    helper.clickManageServiceForCancellSubscription();
    helper.resubscribeSubscriptionIfPossible();
  cy.visit(`${Cypress.env('BASE_SITE')}/en/USD/my-account/subscriptions`);
  cy.get(subscrptionComponentSelector, { timeout: 10000 }).should('be.visible');
    helper.clickManageServiceForActiveSubscription();
    helper.widthdrawSubscriptionIfPossible();
  });
  afterEach(() => {
    signOutUser();
  });
});
