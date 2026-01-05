/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/b2b/b2b-quote';
import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import * as helper from '../../../helpers/vendor/subscription-billing/subscription';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
export const subscriptionComponentSelector = 'cx-subscription-list';
describe('Subscription Billing - Cancel, Withdraw, Resubscribe', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(helper.subscriptionUser);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit(`${Cypress.env('BASE_SITE')}/en/USD/my-account/subscriptions`);
  });

  it('should perform cancel,resubscribe,widthdraw actions on a subscription', () => {
    helper.clickManageServiceForActiveSubscription();
    helper.checkCancelButtonExists();
    helper.cancelSubscriptionIfPossible();
    helper.clickViewAllSubscriptions();
    helper.clickManageServiceForCancellSubscription();
    helper.resubscribeSubscriptionIfPossible();
    cy.visit(`${Cypress.env('BASE_SITE')}/en/USD/my-account/subscriptions`);
    cy.get(subscriptionComponentSelector, { timeout: 10000 }).should(
      'be.visible'
    );
    helper.clickManageServiceForActiveSubscription();
    helper.widthdrawSubscriptionIfPossible();
  });
  it('should extend subscription by particular frequency', () => {
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
    cy.intercept('GET', '**/users/*/subscriptions*').as('getSubscriptions');
    cy.contains('div', 'Subscription Service (Product) Code:')
      .find('a')
      .click();
    cy.wait('@getSubscriptions')
      .its('response.statusCode')
      .should('eq', 200)
      .then((interception) => {
        expect(interception.response.body['contractFrequency']).to.not
          .undefined;
        Cypress.env(
          'subscriptionContractFrequency',
          interception.response.body['contractFrequency']
        );
      });
    helper.extendSubscriptionByFrequency(1);
  });
  afterEach(() => {
    signOutUser();
  });
});
