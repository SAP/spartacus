/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import { login } from '../../../helpers/b2b/b2b-quote';
import { signOutUser, waitForProductPage } from '../../checkout-flow';
import { addCheapProductToCart } from '../../../helpers/checkout-flow';
import { placeOrder } from '../../../helpers/b2b/b2b-checkout';
import { navigateToAMyAccountPage } from '../../navigation';

export const subscriptionUser = {
  email: 'james.weber@harvestlive.inc',
  password: 'welcome',
  firstName: 'James',
  lastName: 'Weber',
  titleCode: 'mr',
  fullName: 'James Weber',
};

export const subscription_product = {
  code: 'Mobile_2020_Plan_cpq',
  name: 'Mobile 2020 Plan',
};

export function lookForSubscriptionProduct() {
  const productPage = waitForProductPage(
    subscription_product.code,
    'getProductPage'
  );
  cy.visit(
    `${POWERTOOLS_BASESITE}/en/USD/product/${subscription_product.code}`
  );
  cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', subscription_product.code);
  });
  cy.get('cx-subscription-product-price').each(($el) => {
    const hasChildElements = Array.from($el[0].children).length > 0;
    expect(hasChildElements, 'should have some inner element').to.be.true;
  });
}

export function waitForSubscriptionOrderToSyncToCommerce() {
  cy.wait(50000);
  signOutUser();
  cy.visit('/powertools-spa/en/USD/login');
  login(
    subscriptionUser.email,
    subscriptionUser.password,
    subscriptionUser.fullName
  );
}

export function placeSubscriptionOrder() {
  addCheapProductToCart(subscription_product);
  validateSubscriptionCharges();
  cy.findByText(/proceed to checkout/i).click();
  cy.get('cx-payment-type').within(() => {
    cy.findByText('Account').click({ force: true });
    cy.findByText('Continue').click({ force: true });
  });
  cy.get('cx-delivery-address').within(() => {
    cy.findByText('Selected Address').click({ force: true });
    cy.findByText('Continue').click({ force: true });
  });
  cy.get('cx-delivery-mode button.btn-primary').contains(' Continue ').click();
  cy.get('cx-place-order').within(() => {
    cy.findByText('Terms & Conditions')
      .should('have.attr', 'target', '_blank')
      .should(
        'have.attr',
        'href',
        `/${Cypress.env('BASE_SITE')}/en/USD/terms-and-conditions`
      );
    cy.get('input[formcontrolname="termsAndConditions"]').check();
  });
  placeOrder('/order-confirmation');
}

export function validateSubscriptionList() {
  navigateToAMyAccountPage(
    'Subscriptions',
    '/my-account/subscriptions',
    'viewSubscriptionsPage'
  );

  cy.get('cx-subscription-list .subscription')
    .first()
    .within(() => {
      cy.get('.subscription-body')
        .should('contain.text', 'Subscription ID:')
        .and('contain.text', 'Billing Amount:')
        .and('contain.text', 'Subscription Start Date:');
      cy.get('a.btn-link.cx-action-link')
        .should('contain.text', 'Manage Service')
        .click();
    });
  cy.get('cx-subscription-details', { timeout: 10000 }).should('exist');
}

export function validateSubscriptionDetailsPage() {
  cy.get('cx-subscription-details').within(() => {
    cy.contains('Subscription ID:').should('exist');

    cy.contains('Subscription Service (Product) Code:').should('exist');

    cy.contains('div', 'Subscription Service (Product) Code:')
      .find('a')
      .click();

    cy.url().should('include', '/product/Mobile_2020_Plan_cpq');

    cy.go('back');

    cy.contains('Order Code:').should('exist');
    cy.contains('div', 'Order Code:')
      .find('a')
      .should('contain.text', Cypress.env('subscriptionOrderNumber'));

    cy.contains('Order Code:')
      .find('a')
      .invoke('attr', 'href')
      .then((orderUrl) => {
        cy.contains('Order Code:').find('a').click();
        cy.url().should('include', orderUrl);
      });
    cy.go('back');
    cy.contains('button', 'View All Subscriptions').click();
  });
  cy.get('cx-subscription-list', { timeout: 10000 }).should('exist');
}

export function extendSubscriptionByFrequency(extendDuration: number) {
  cy.get('cx-subscription-details').within(() => {
    cy.find('button.btn-primary', { timeout: 1000 }).should('be.disabled');
    cy.find('button', { timeout: 10000 })
      .contains('Extend Subscription')
      .should('be.visible')
      .click();
    cy.get('#extendDurationDropdown').should('be.visible').click();
    cy.wait(2000);

    cy.contains(
      `${extendDuration} ${Cypress.env('subscriptionContractFrequency')}`
    )
      .should('be.visible')
      .click();
    cy.find('button.btn-primary', { timeout: 1000 })
      .contains('Extend')
      .should('be.enabled')
      .click();
    cy.intercept('POST', '/extension').as('extendSubscription');
    cy.find('button.btn-primary', { timeout: 1000 })
      .contains('Confirm')
      .click();
    cy.wait('@extendSubscription')
      .its('response.statusCode')
      .should('eq', 200)
      .then(() => {
        cy.wait(2000);
        cy.get('cx-global-message').should(
          'contain.text',
          'Your subscription has been extended successfully'
        );
      });
  });
}

const subscriptionSelector = '.subscription';
const statusSelector = '.subscription-status';
const manageServiceLinkSelector = '.subscription-column-2 a.cx-action-link';
const subscriptionComponentSelector = 'cx-subscription-list';
const subscriptionDetailsComponentSelector = 'cx-subscription-details';

let alreadyCancelled = false;

export function clickManageServiceForActiveSubscription() {
  cy.get(subscriptionComponentSelector).should('be.visible');
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
      cy.get(subscriptionDetailsComponentSelector).should('be.visible');
    } else {
      throw new Error('No active subscription found.');
    }
  });
}

export function checkCancelButtonExists() {
  const cancelButtonSelector = `cx-subscription-details .cx-other-actions a[aria-label="Cancel Subscription"]`;
  cy.get('cx-subscription-details', { timeout: 10000 }).should('be.visible');
  cy.get(cancelButtonSelector, { timeout: 5000 })
    .should('exist')
    .and('be.visible');
  cy.log('Cancel button is present and visible.');
}

export function cancelSubscriptionIfPossible() {
  if (alreadyCancelled) {
    resubscribeSubscriptionIfPossible();
    return;
  }
  alreadyCancelled = true;

  const cancelButtonSelector =
    '.cx-other-actions a[aria-label="Cancel Subscription"]';
  const modalSelector = 'cx-subscription-actions-modal';
  const confirmButtonSelector = `${modalSelector} button.btn-primary`;

  cy.get('body').then(($body) => {
    if ($body.find(cancelButtonSelector).length > 0) {
      cy.log('Cancel button is available, proceeding to click it.');
      cy.get(cancelButtonSelector).should('be.visible').click({ force: true });

      cy.get(modalSelector, { timeout: 15000 }).should('be.visible');

      cy.get(`${modalSelector} .cx-dialog-body p`)
        .first()
        .invoke('text')
        .then((text) => {
          cy.log(`Modal message: ${text}`);
        });

      cy.intercept('POST', '**/cancellationEffectiveAt?**').as('cancelCall');

      cy.get(confirmButtonSelector).should('be.visible').click({ force: true });

      cy.get(modalSelector, { timeout: 10000 }).should('not.exist');

      cy.get(`${subscriptionDetailsComponentSelector} .subscription-status`, {
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

export function clickManageServiceForCancellSubscription() {
  cy.get(subscriptionComponentSelector).should('be.visible');
  cy.get(subscriptionSelector).should('exist');

  cy.get(subscriptionSelector).then(($subs) => {
    const cancelledSub = $subs
      .toArray()
      .find((el) =>
        el.querySelector(statusSelector)?.textContent?.includes('Cancelled')
      );
    if (cancelledSub) {
      cy.wrap(cancelledSub)
        .find(manageServiceLinkSelector)
        .should('be.visible')
        .click({ force: true });
      cy.get(subscriptionDetailsComponentSelector).should('be.visible');
    } else {
      throw new Error('No cancelled subscription found.');
    }
  });
}

export function resubscribeSubscriptionIfPossible() {
  const resubscribeButtonSelector =
    '.cx-other-actions a[aria-label="Re-subscribe"]';
  const modalSelector = 'cx-subscription-actions-modal';
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

      cy.get(`${subscriptionDetailsComponentSelector} .subscription-status`)
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
  const modalSelector = 'cx-subscription-actions-modal';
  const confirmButtonSelector = `${modalSelector} button.btn-primary`;

  cy.get('body').then(($body) => {
    if ($body.find(withdrawButtonSelector).length > 0) {
      cy.log('Withdraw button is available, proceeding to click it.');

      cy.get(withdrawButtonSelector)
        .should('be.visible')
        .click({ force: true });

      cy.get(modalSelector, { timeout: 5000 }).should('be.visible');

      cy.get(`${modalSelector} .cx-dialog-header h4 strong`).should(
        'contain.text',
        'Withdraw your subscription?'
      );

      cy.intercept('POST', '**/subscriptions/**/withdrawal?**').as(
        'withdrawCall'
      );
      cy.get(confirmButtonSelector).should('be.visible').click({ force: true });

      cy.wait('@withdrawCall', { timeout: 10000 });

      cy.get(modalSelector, { timeout: 10000 }).should('not.exist');

      cy.get(`${subscriptionDetailsComponentSelector} .subscription-status`, {
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

export function clickViewAllSubscriptions() {
  cy.get('button')
    .contains('View All Subscriptions')
    .should('be.visible')
    .click();
  cy.get(subscriptionComponentSelector, { timeout: 10000 }).should(
    'be.visible'
  );
}

export function validateSubscriptionCharges() {
  cy.get(`cx-subscription-cart-price-body`)
    .should('contain.text', 'monthly payment')
    .and('contain.text', ' pay on checkout ');
}

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
