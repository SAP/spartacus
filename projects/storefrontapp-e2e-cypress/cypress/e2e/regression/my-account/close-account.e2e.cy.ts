/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import { visitAndWaitForRedirections } from '../../../helpers/auth-redirects';
import { waitForPage } from '../../../helpers/checkout-flow';
import * as alerts from '../../../helpers/global-message';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
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
      it('should redirect to login page', () => {
        cy.visit(CLOSE_ACCOUNT_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', { testIsolation: false }, () => {
      isolateTests();
      before(() => {
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

      it('should cancel and go back to the homepage', () => {
        cy.selectUserMenuOption({
          option: 'Close Account',
        });

        cy.get('cx-close-account a').click({ force: true });
        cy.location('pathname').should('contain', '/');
      });

      it('should close account and go back to homepage', () => {
        cy.selectUserMenuOption({
          option: 'Close Account',
        });

        cy.intercept(
          'DELETE',
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*`
        ).as('deleteQuery');

        cy.location('pathname').should('contain', CLOSE_ACCOUNT_URL);

        cy.get('cx-close-account button').click({ force: true });

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

      it('should not login with a closed account credentials', () => {
        visitAndWaitForRedirections('/login');

        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );

        cy.location('pathname').should('contain', '/login');
        alerts.getErrorAlert().should('contain', 'User is disabled');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  });
});
