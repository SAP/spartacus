/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  testEnableDisableMyAccountV2NotificationPreference,
  updateEmailV2,
  verifyEmailChannelV2,
} from '../../../helpers/my-account-v2/my-account-v2-notification';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { isolateTests } from '../../../support/utils/test-isolation';
import * as loginHelper from '../../../helpers/my-account-v2/my-account-v2-login-helper';

describe('My Account V2 Notification preference (CXSPA-10780)', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Anonymous user (CXSPA-10780)', () => {
      // Verifies that anonymous users cannot access the notification preference page and are redirected to the login page.
      // The final check ensures the URL pathname contains '/login'.
      it('should redirect to login page for anonymous user', () => {
        cy.visit('/my-account/notification-preference');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user (CXSPA-10780)', { testIsolation: false }, () => {
      isolateTests();
      beforeEach(() => {
        standardUser.registrationData.email = generateMail(
          randomString(),
          true
        );
        loginHelper.registerAndLogin(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        cy.wait(2000);
      });

      // Tests that the notification preference page shows the correct email channel after updating the user's email address.
      // The final check verifies that the new email is displayed correctly in the notification channel after the update.
      it('should show correct email channel after update email address', () => {
        verifyEmailChannelV2(standardUser.registrationData.email);
        const newEmail = updateEmailV2();
        verifyEmailChannelV2(newEmail);
      });
    });
  });

  viewportContext(['desktop'], () => {
    describe('Logged in user (CXSPA-10780)', { testIsolation: false }, () => {
      isolateTests();
      beforeEach(() => {
        standardUser.registrationData.email = generateMail(
          randomString(),
          true
        );
        loginHelper.registerAndLogin(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        cy.wait(2000);
      });

      // Core test. Run in mobile view as well.
      testEnableDisableMyAccountV2NotificationPreference();
    });
  });
});
