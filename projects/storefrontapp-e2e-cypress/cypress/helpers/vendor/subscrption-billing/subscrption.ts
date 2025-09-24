/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const serviceUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  firstName: 'James',
  lastName: 'Weber',
  titleCode: 'mr',
};

export const SHOP_NAME = Cypress.env('BASE_SITE');
export const SUBSCRIPTION_LIST_PATH = `${SHOP_NAME}/en/USD/my-account/subscriptions`;

const subscriptionSelector = '.subscription';
const statusSelector = '.subscription-status';
const manageServiceLinkSelector = '.subscription-column-2 a.cx-action-link';

const subscrptionComponentSelector = 'cx-subscription-list';
const subscrptionDetailsComponentSelector = 'cx-subscription-details';

let alreadyCancelled = false;

export function clickManageServiceForActiveSubscription() {
  cy.get(subscrptionComponentSelector).should('be.visible');
  cy.get(subscriptionSelector).should('exist');

  cy.get(subscriptionSelector).then(($subs) => {
    const activeSub = $subs
      .toArray()
      .find((el) =>
        el.querySelector(statusSelector)?.textContent?.includes('Active')
      );
    if (activeSub) {
      cy.wrap(activeSub)
        .find(manageServiceLinkSelector)
        .should('be.visible')
        .click({ force: true });
      cy.get(subscrptionDetailsComponentSelector).should('be.visible');
    } else {
      throw new Error('No active subscription found.');
    }
  });
}

export function checkCancelButtonExists() {
  const cancelButtonSelector = `cx-subscription-details .cx-other-actions a[aria-label="Cancel"]`;
  cy.get('cx-subscription-details', { timeout: 10000 }).should('be.visible');
  cy.get(cancelButtonSelector, { timeout: 5000 })
    .should('exist')
    .and('be.visible');
  cy.log('Cancel button is present and visible.');
}

export function cancelSubscriptionIfPossible() {
  if (alreadyCancelled) {
    this.resubscribeSubscriptionIfPossible();
    return;
  }
  alreadyCancelled = true;

  const cancelButtonSelector = '.cx-other-actions a[aria-label="Cancel"]';
  const modalSelector = 'cx-subscription-cancel';
  const confirmButtonSelector = `${modalSelector} button.btn-primary`;

  cy.get('body').then(($body) => {
    if ($body.find(cancelButtonSelector).length > 0) {
      cy.log('Cancel button is available, proceeding to click it.');
      cy.get(cancelButtonSelector).should('be.visible').click({ force: true });

      cy.get(modalSelector, { timeout: 5000 }).should('be.visible');

      cy.get(`${modalSelector} .cx-dialog-body p`)
        .first()
        .invoke('text')
        .then((text) => {
          cy.log(`Modal message: ${text}`);
        });

      cy.intercept('POST', '**/cancellationEffectiveAt?**').as('cancelCall');

      cy.get(confirmButtonSelector).should('be.visible').click({ force: true });

      cy.get(modalSelector, { timeout: 10000 }).should('not.exist');

      cy.get(`${subscrptionDetailsComponentSelector} .subscription-status`, {
        timeout: 15000,
      })
        .should(($el) => {
          const text = $el.text().toLowerCase();
          expect(text).to.include('cancelled');
        })
        .then(($el) => {
          cy.log(`Subscription status after cancellation: ${$el.text()}`);
        });
    } else {
      cy.log('No cancel button available — skipping cancellation.');
    }
  });
}
export function resubscribeSubscriptionIfPossible() {
  const resubscribeButtonSelector =
    '.cx-other-actions a[aria-label="Re-subscribe"]';
  const modalSelector = 'cx-subscription-cancel';
  const confirmButtonSelector = `${modalSelector} button.btn-primary`;

  cy.get('body').then(($body) => {
    if ($body.find(resubscribeButtonSelector).length > 0) {
      cy.log('Re-subscribe button is available, proceeding to click it.');

      cy.intercept('POST', '**/subscriptions/**/cancellationReversal?**').as(
        'resubscribeCall'
      );

      cy.get(resubscribeButtonSelector)
        .should('be.visible')
        .click({ force: true });

      cy.get(modalSelector, { timeout: 5000 }).should('be.visible');
      cy.get(`${modalSelector} .cx-dialog-header h4 strong`).should(
        'contain.text',
        'Resubscribe your subscription?'
      );

      cy.get(`${modalSelector} .cx-dialog-body p`).should(
        'contain.text',
        'By confirming, you are renewing your subscription'
      );

      cy.get(confirmButtonSelector).should('be.visible').click({ force: true });

      cy.wait('@resubscribeCall', { timeout: 10000 });

      cy.get(modalSelector, { timeout: 10000 }).should('not.exist');

      cy.get(`${subscrptionDetailsComponentSelector} .subscription-status`)
        .invoke('text')
        .then((statusText) => {
          cy.log(`Subscription status after resubscribe: ${statusText}`);
        });
    } else {
      cy.log('No Re-subscribe button available — skipping resubscribe.');
    }
  });
}
export function widthdrawSubscriptionIfPossible() {
  const withdrawButtonSelector = '.cx-other-actions a[aria-label="Withdraw"]';
  const modalSelector = 'cx-subscription-cancel';
  const confirmButtonSelector = `${modalSelector} button.btn-primary`;

  cy.get('body').then(($body) => {
    if ($body.find(withdrawButtonSelector).length > 0) {
      cy.log('withdraw button is available, proceeding to click it.');

      cy.get(withdrawButtonSelector)
        .should('be.visible')
        .click({ force: true });

      cy.get(modalSelector, { timeout: 5000 }).should('be.visible');

      cy.get(`${modalSelector} .cx-dialog-header h4 strong`).should(
        'contain.text',
        ' Withdraw your subscription?'
      );

      cy.intercept('POST', '**/subscriptions/**/withdrawal?**').as(
        'withdrawCall'
      );
      cy.get(confirmButtonSelector).should('be.visible').click({ force: true });

      cy.wait('@withdrawCall', { timeout: 10000 });

      cy.get(modalSelector, { timeout: 10000 }).should('not.exist');

      cy.get(`${subscrptionDetailsComponentSelector} .subscription-status`, {
        timeout: 15000,
      })
        .should(($el) => {
          const text = $el.text().toLowerCase();
          expect(text).to.include('withdrawn');
        })
        .then(($el) => {
          cy.log(`Subscription status after Withdrawn: ${$el.text()}`);
        });
    } else {
      cy.log('No Withdraw button available.');
    }
  });
}
