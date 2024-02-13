/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as alerts from '../../../helpers/global-message';
import { signOutUser } from '../../../helpers/login';
import * as updatePassword from '../../../helpers/update-password';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { isolateTests } from '../../../support/utils/test-isolation';

describe('My Account V2 - Update Password', () => {
  viewportContext(['mobile'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );
    // Core e2e test. Repeat in mobile viewport.
    updatePassword.testUpdatePasswordLoggedInUser(true);
  });

  viewportContext(['mobile', 'desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe('update password test for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit(updatePassword.PAGE_URL_UPDATE_PASSWORD);
        cy.url().should('contain', '/login');
      });
    });

    describe(
      'update password test for logged in user',
      { testIsolation: false },
      () => {
        isolateTests();
        before(() => {
          standardUser.registrationData.email = generateMail(
            randomString(),
            true
          );
          cy.requireLoggedIn(standardUser);
          cy.visit('/');
        });

        beforeEach(() => {
          cy.restoreLocalStorage();
          cy.selectUserMenuOption({
            option: 'Password',
          });
        });

        it('should be able to cancel the input in password columns', () => {
          cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
          cy.get('[formcontrolname="newPassword"]').type(
            updatePassword.newPassword
          );
          cy.get('[formcontrolname="newPasswordConfirm"]').type(
            updatePassword.newPassword
          );
          cy.get(
            'cx-my-account-v2-password button.myaccount-password-button-cancel'
          ).click();
          cy.get('[formcontrolname="oldPassword"]').should('have.value', '');
          cy.get('[formcontrolname="newPassword"]').should('have.value', '');
          cy.get('[formcontrolname="newPasswordConfirm"]').should(
            'have.value',
            ''
          );
        });

        it('should display server error if old password is wrong', () => {
          alerts.getErrorAlert().should('not.exist');
          cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
          cy.get('[formcontrolname="newPassword"]').type(
            updatePassword.newPassword
          );
          cy.get('[formcontrolname="newPasswordConfirm"]').type(
            updatePassword.newPassword
          );
          cy.get('cx-my-account-v2-password button.btn-primary').click();
          cy.url().should('contain', updatePassword.PAGE_URL_UPDATE_PASSWORD);
          alerts.getErrorAlert().should('exist');
        });

        afterEach(() => {
          cy.saveLocalStorage();
        });

        after(() => {
          signOutUser();
        });
      }
    );
  });
});
