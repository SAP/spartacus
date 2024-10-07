/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addToCartButton,
  breadcrumbContainer,
  infoContainer,
  itemCounter,
  summaryContainer,
} from '../../product-details';

export const subscriptionPriceContainer = 'cx-subscription-product-price';
export const susbscriptionUsageChargeContainer =
  'cx-subscription-product-usage-charge';

export const subscription_product_1 = {
  code: 'Mobile_2020_Plan_cpq',
  name: 'Mobile Plan 2020',
  summary:
    'Customizable mobile service plan offering tailored pricing and configurations',
  sapSubscriptionTerm: {
    name: 'Advanced Mobile Plan',
    renewalTerm: {
      value: 3,
      frequency: {
        id: 'MONTHLY',
        name: 'Months',
      },
    },
    minimumTerm: {
      value: 3,
      frequency: {
        id: 'MONTHLY',
        name: 'Months',
      },
    },
  },
};

export function verifySubscriptionProductDetails(product) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');
  cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
  cy.get(`${breadcrumbContainer} h1`).should('contain', product.name);
  cy.get(`${infoContainer} .code`).should('contain', 'ID ' + product.code);
  cy.get(`${summaryContainer} .summary`).should('contain', product.summary);
  cy.get(
    `${subscriptionPriceContainer} .subscription .subscription-name`
  ).should('contain', product.sapSubscriptionTerm.name);
  cy.get(
    `${subscriptionPriceContainer} .subscription .subscription-minimumterm`
  ).should(
    'contain',
    'Minimum Term: ' +
      product.sapSubscriptionTerm.minimumTerm.value +
      ' ' +
      product.sapSubscriptionTerm.minimumTerm.frequency.name
  );
  cy.get(
    `${subscriptionPriceContainer} .subscription .subscription-renewalterm`
  ).should(
    'contain',
    'Renewal Term: ' +
      product.sapSubscriptionTerm.renewalTerm.value +
      ' ' +
      product.sapSubscriptionTerm.renewalTerm.frequency.name
  );
  cy.get(`${susbscriptionUsageChargeContainer} .subscription-usage-charge .subscription-usage-charge-name`).should(
    'contain',
    'Usage Charges'
  );
  cy.get(`${addToCartButton}`).should('exist');
  cy.get(`${itemCounter}`).should('not.exist');
}

export function openSubscriptionProduct(baseSite, currency, productCode) {
  cy.window().then((win) => win.sessionStorage.clear());
  cy.cxConfig({
    context: {
      baseSite: [baseSite],
      currency: [currency],
    },
  });
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?pageType=ProductPage**`,
  }).as('productPage');
  cy.visit('/product/' + productCode);
  cy.wait(`@productPage`);
}
