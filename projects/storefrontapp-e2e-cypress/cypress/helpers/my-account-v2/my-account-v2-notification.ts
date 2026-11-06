/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginWithOTP } from '../my-account-v2/my-account-v2-login-helper';
import { waitForPage } from '../navigation';
import { generateMail, randomString } from '../user';

export const normalProductCode = '872912';
export const firstProductCodeSelector =
  'cx-my-interests .cx-product-interests-product-item:first .cx-code';
export const firstProductAscending = '4205431';
export const firstProductDescending = '898520';
export const NOTIFICATION_PREFERENCES_CHANGE_ENDPOINT_ALIAS =
  'notificationPreferencesChange';
export const GET_STOCK_NOTIFICATION_ENDPOINT_ALIAS =
  'getStockNotificationEndpointAlias';

function navigateToNotificationPreferencePage() {
  const alias = waitForPage(
    '/my-account/notification-preference',
    'notificationPreferencePage'
  );

  cy.selectUserMenuOption({
    option: 'Notification Preference',
  });
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

function navigateToUpdateEmailPage() {
  const alias = waitForPage('/my-account/update-email', 'updateEmailPage');

  cy.selectUserMenuOption({
    option: 'Email Address',
  });
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

function interceptNotificationPreferencesChange() {
  cy.intercept(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/notificationpreferences*`
  ).as(NOTIFICATION_PREFERENCES_CHANGE_ENDPOINT_ALIAS);

  return NOTIFICATION_PREFERENCES_CHANGE_ENDPOINT_ALIAS;
}

export function enableNotificationChannelV2() {
  navigateToNotificationPreferencePage();
  const notificationPreferencesChange =
    interceptNotificationPreferencesChange();

  cy.get('[type="checkbox"]').first().check();
  cy.wait(`@${notificationPreferencesChange}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function disableNotificationChannelV2() {
  const notificationPreferencesChange =
    interceptNotificationPreferencesChange();

  cy.get('[type="checkbox"]').first().uncheck();
  cy.wait(`@${notificationPreferencesChange}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function updateEmailV2(): String {
  const password = 'Pas!sword123.';
  const newUid = generateMail(randomString(), true);

  navigateToUpdateEmailPage();

  cy.get('.editButton').click();

  cy.get('[formcontrolname="email"]').type(newUid);
  cy.get('[formcontrolname="confirmEmail"]').type(newUid);
  cy.get('[formcontrolname="password"]').type(password);
  cy.get('button').contains('Save').click();

  cy.wait(2000);
  loginWithOTP(newUid, password, 1);

  return newUid;
}

export function verifyEmailChannelV2(email: String) {
  navigateToNotificationPreferencePage();
  cy.get('cx-my-account-v2-notification-preference').within(() => {
    cy.get('.pref-channel .form-check-label').should(
      'contain',
      'Email: ' + email
    );
    cy.get('[type="checkbox"]').first().should('not.be.checked');
  });
}

export function testEnableDisableMyAccountV2NotificationPreference() {
  it('should enable/disable notification preference', () => {
    enableNotificationChannelV2();
    cy.get('[type="checkbox"]').first().should('be.checked');

    disableNotificationChannelV2();
    cy.get('[type="checkbox"]').first().should('not.be.checked');
  });
}
