/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as alerts from '../../../helpers/global-message';
import * as loginHelper from '../../../helpers/my-account-v2/my-account-v2-login-helper';
import * as helper from '../../../helpers/login';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { isolateTests } from '../../../support/utils/test-isolation';

export const PAGE_TITLE_LOGIN = 'Login';
export const PAGE_URL_UPDATE_PASSWORD = '/my-account/update-password';
export const newPassword = 'newPas!sword123!';

describe('My Account V2 - Update Password (CXSPA-10780)', () => {
  viewportContext(['mobile'/*, 'desktop'*/], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Update password for anonymous user (CXSPA-10780)', () => {
      it('should redirect to login page (CXSPA-10780)', () => {
        cy.visit(PAGE_URL_UPDATE_PASSWORD);
        cy.location('pathname').should('contain', '/login');
      });
    });
  });

  viewportContext(['desktop'], () => {
    before(() =>
      cy.window().then((win) => {
        win.sessionStorage.clear();
      })
    );

    describe(
      'update password test for logged in user (CXSPA-10780)',
      { testIsolation: false },
      () => {
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
          cy.selectUserMenuOption({
            option: 'Password',
          });
        });

        it('should be able to cancel the input in password columns', () => {
          cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
          cy.get('[formcontrolname="newPassword"]').type(newPassword);
          cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
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
          cy.get('[formcontrolname="newPassword"]').type(newPassword);
          cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
          cy.get('cx-my-account-v2-password button.btn-primary').click();
          cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
          alerts.getErrorAlert().should('exist');
        });

        it('should update the password with success', () => {
          cy.get('[formcontrolname="oldPassword"]').type(
            standardUser.registrationData.password
          );
          cy.get('[formcontrolname="newPassword"]').type(newPassword);
          cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);

          cy.get('cx-my-account-v2-password button.btn-primary').click();

          cy.title().should('eq', PAGE_TITLE_LOGIN);
          cy.whenJDK17(() => {
            alerts.getSuccessAlert().should('exist');
          });
          cy.whenJDK21(() => {
            /* Intentionally empty */
          });
          cy.url().should('contain', '/login');
          cy.wait(5000);

          loginHelper.loginWithOTP(
            standardUser.registrationData.email,
            newPassword,
            4
          );
          cy.get(helper.userGreetSelector).should('exist');
        });
      }
    );
  });
});
