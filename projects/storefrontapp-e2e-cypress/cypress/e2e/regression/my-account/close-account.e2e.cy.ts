/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import { visitAndWaitForRedirections } from '../../../helpers/auth-redirects';
import * as alerts from '../../../helpers/global-message';
import { waitForPage } from '../../../helpers/navigation';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { visitLoginPage } from '../../../support/utils/login';
import { isolateTests } from '../../../support/utils/test-isolation';

const CLOSE_ACCOUNT_URL = '/my-account/close-account';

describe('My Account - Close Account', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('Anonymous user', () => {
      // Verifies that anonymous users trying to access the close account page are redirected to the login page.
      // The final check ensures the URL pathname contains '/login'.
      it('should redirect to login page', () => {
        cy.visit(CLOSE_ACCOUNT_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', { testIsolation: false }, () => {
      isolateTests();
      before(() => {
        cy.visit('/');
        standardUser.registrationData.email = generateMail(
          randomString(),
          true
        );
        cy.requireLoggedIn(standardUser);
        visitAndWaitForRedirections('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      // Tests that clicking the cancel button on the close account page returns the user to the homepage without closing the account.
      // The final check verifies that the URL pathname contains '/' (the homepage).
      it('should cancel and go back to the homepage', () => {
        cy.selectUserMenuOption({
          option: 'Close Account',
        });

        cy.get('cx-close-account button.btn-secondary').click({ force: true });
        cy.location('pathname').should('contain', '/');
      });

      // Tests closing an account through the modal confirmation and verifies the user is logged out and redirected to the homepage.
      // The final check verifies that the login link displays 'Sign In / Register' confirming the user is logged out.
      it('should close account and go back to homepage', () => {
        cy.selectUserMenuOption({
          option: 'Close Account',
        });

        cy.intercept(
          'DELETE',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*`
        ).as('deleteQuery');

        cy.location('pathname').should('contain', CLOSE_ACCOUNT_URL);

        cy.get('cx-close-account button.btn-primary').click({ force: true });

        cy.get(
          'cx-close-account-modal .cx-close-account-modal-container .cx-close-account-modal-footer button:first-of-type'
        ).click();

        cy.wait('@deleteQuery');

        const homePageAlias = waitForPage('homepage', 'getHomePage');

        alerts
          .getSuccessAlert()
          .should('contain', 'Account closed with success');

        cy.wait(`@${homePageAlias}`);

        cy.get('cx-login .cx-login-greet').should('not.exist');
        cy.get('cx-login a').should('contain', 'Sign In / Register');
      });

      // Tests that attempting to login with a closed account's credentials results in an error message.
      // The final check verifies that the error alert displays 'User is disabled'.
      it('should not login with a closed account credentials', () => {
        cy.whenJDK17(() => {
          visitAndWaitForRedirections('/login');
        });

        cy.whenJDK21(() => {
          visitLoginPage();
        });

        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        cy.location('pathname').should('contain', '/login');

        alerts.getErrorAlert().should('contain', 'User is disabled');
      });
    });
  });
});
