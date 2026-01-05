/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../../../sample-data/shared-users';

const NOTIFICATION_PREFERENCE_URL = '/my-account/notification-preference';

/**
 * This test checks accessibility concerns on the Account Settings Notification Preference page using Access Continuum
 */
describe(
  'Account Settings / Notification Preference Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      cy.requireLoggedIn(standardUser);
      cy.visit(NOTIFICATION_PREFERENCE_URL);
      cy.get('cx-notification-preference input.form-check-input').as(
        'notificationPrefCheckbox'
      );
    });

    it('initial page load', () => {
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
