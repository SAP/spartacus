/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import { signOut } from '../../../helpers/register';
import * as updateEmail from '../../../helpers/update-email';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

describe('My Account - Update Email', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Anonymous user', () => {
      // Verifies that anonymous users cannot access the update email page and are redirected to the login page.
      // The final check ensures the URL pathname contains '/login'.
      it('should redirect to login page', () => {
        cy.visit(updateEmail.UPDATE_EMAIL_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', () => {
      beforeEach(() => {
        cy.visit('/');
        registerAndLogin();
        cy.reload();
        cy.visit('/');
        cy.selectUserMenuOption({
          option: 'Email Address',
        });
      });

      // Tests that clicking the cancel button on the update email page navigates back to the homepage without updating the email.
      // The final check verifies that the URL pathname contains '/' (the homepage).
      it('should click cancel update email and go back to the homepage', () => {
        cy.get('cx-update-email a.btn-secondary').click();
        checkBanner();
        cy.location('pathname').should('contain', '/');
      });

      // Core e2e test. Check with different view port.
      // Tests updating the email address and verifies that login works with the new email but fails with the old email.
      // The final check verifies that attempting to login with the old email displays a 'Bad credentials' error.
      it('should update email and able to login with new and not with old email', () => {
        updateEmail.testUpdateEmailAndLogin();
        signOut();

        cy.getLoginRegisterLink({ clickAndWait: true });
        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        alerts.getErrorAlert().should('contain', 'Bad credentials');
      });
    });
  });
});
