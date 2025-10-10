/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
