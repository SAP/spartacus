/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from './auth-forms';
import * as alerts from './global-message';
import * as helper from './login';

import { standardUser } from '../sample-data/shared-users';

export const PAGE_TITLE_HOME = 'Homepage';
export const PAGE_TITLE_LOGIN = 'Login';
export const PAGE_URL_UPDATE_PASSWORD = '/my-account/update-password';
export const newPassword = 'newPassword123!';

import { signOutUser } from '../helpers/login';
import { generateMail, randomString } from '../helpers/user';

export function testUpdatePassword() {
  it('should update the password with success', () => {
    alerts.getSuccessAlert().should('not.exist');
    cy.get('[formcontrolname="oldPassword"]').type(
      standardUser.registrationData.password
    );
    cy.get('[formcontrolname="newPassword"]').type(newPassword);
    cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
    cy.get('cx-update-password button.btn-primary').click();
    cy.title().should('eq', PAGE_TITLE_LOGIN);
    alerts.getSuccessAlert().should('exist');
    cy.url().should('contain', '/login');

    login(standardUser.registrationData.email, newPassword);
    cy.get(helper.userGreetSelector).should('exist');
  });
}

export function testUpdatePasswordLoggedInUser() {
  describe('update password test for logged in user', () => {
    before(() => {
      standardUser.registrationData.email = generateMail(randomString(), true);
      cy.requireLoggedIn(standardUser);
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Password',
      });
    });

    testUpdatePassword();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      signOutUser();
    });
  });
}
