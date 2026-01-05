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

export const ORDER_CODE = '0005004001';
export const READ_ORDER = '@READ_ORDER';
export const READ_VENDOR_QUOTE = '@READ_VENDOR_QUOTE';
export const DOWNLOAD_ATTACHMENT = '@DOWNLOAD_ATTACHMENT';

export function interceptOrderList(alias, response) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders?*`,
    { statusCode: 200, body: response }
  ).as(alias);
}

export function interceptOrderDetails(alias, response) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}?*`,
    { statusCode: 200, body: response }
  ).as(alias);
}

export function interceptCancelOrder(alias) {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}/serviceOrder/cancellation?*`,
    { statusCode: 200 }
  ).as(alias);
}
