/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import * as helper from '../../../helpers/vendor/subscrption-billing/subscrption';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';

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
    helper.resubscribeSubscriptionIfPossible();
    helper.widthdrawSubscriptionIfPossible();
  });
  afterEach(() => {
    signOutUser();
  });
});
