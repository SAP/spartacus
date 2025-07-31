/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import { checkBanner } from '../../../helpers/homepage';
import { signOut } from '../../../helpers/register';
import * as updateEmail from '../../../helpers/update-email';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import * as alerts from '../../../helpers/global-message';


describe('My Account - Update Email', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Anonymous user', () => {
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

      it('should click cancel update email and go back to the homepage', () => {
        cy.get('cx-update-email a.btn-secondary').click();
        checkBanner();
        cy.location('pathname').should('contain', '/');
      });

      // Core e2e test. Check with different view port.
      it('should update email and able to login with new and not with old email', () => {
        updateEmail.testUpdateEmailAndLogin();
        signOut();
        cy.visit('/login');
        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );
        cy.whenJDK17(() => {
          alerts.getErrorAlert().should('contain', 'Bad credentials');
        });
        cy.whenJDK21(() => {
          cy.get('.fd-message-strip__text').should('contain','Bad credentials.');
        });
      });
    });
  });
});
