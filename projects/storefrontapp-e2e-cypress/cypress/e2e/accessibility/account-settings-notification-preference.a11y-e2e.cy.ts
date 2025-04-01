/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateEmail from '../../helpers/update-email';
import { isolateTests } from '../../support/utils/test-isolation';

export function updateNotificationPreferencesForm({
  isEmailNotificationChannel,
}: {
  isEmailNotificationChannel: boolean;
}) {
  cy.log(
    `🛒 Updating notification preference ${JSON.stringify({ isEmailNotificationChannel })}!`
  );
  const checkbox = cy
    .get('cx-notification-preference')
    .find('input.form-check-input');
  // TODO: Why is check causing error!?
  return isEmailNotificationChannel ? checkbox.check() : checkbox.uncheck();
}

const NOTIFICATION_PREFERENCE_URL = '/my-account/notification-preference';

/**
 * This test checks accessibility concerns on the Account Settings Email page using Access Continuum
 */
describe('Account Settings / Notification Preference Page Accessibility', () => {
  isolateTests();

  before(() => {
    cy.a11yContinuumSetup();
  });

  it('initial page load', () => {
    updateEmail.registerAndLogin();
    cy.visit(NOTIFICATION_PREFERENCE_URL);
    cy.get('cx-breadcrumb h1').should('contain', 'Notification Preference');
    cy.get('cx-notification-preference input[type="checkbox"]').should(
      'not.be.checked'
    );

    cy.get('main').a11yRunContinuumTest();
  });

  it('notification preference update success', () => {
    updateEmail.registerAndLogin();
    cy.visit(NOTIFICATION_PREFERENCE_URL);
    cy.get('cx-breadcrumb h1').should('contain', 'Notification Preference');
    cy.get('cx-notification-preference input[type="checkbox"]').should(
      'not.be.checked'
    );
    updateNotificationPreferencesForm({ isEmailNotificationChannel: true });
    cy.get('cx-notification-preference input[type="checkbox"]').should(
      'be.checked'
    );

    cy.get('main').a11yRunContinuumTest();
  });
});
