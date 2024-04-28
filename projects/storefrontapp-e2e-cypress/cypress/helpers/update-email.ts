/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import * as alerts from './global-message';
import { generateMail, randomString } from './user';

export const password = 'Password123.';
export const UPDATE_EMAIL_URL = '/my-account/update-email';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function testUpdateEmailAndLogin() {
  it('should update his email address and login', () => {
    const newUid = generateMail(randomString(), true);
    cy.get('cx-update-email, cx-my-account-v2-email').within(() => {
      cy.get('[formcontrolname="email"]').type(newUid);
      cy.get('[formcontrolname="confirmEmail"]').type(newUid);
      cy.get('[formcontrolname="password"]').type(password);
      cy.get('button.btn-primary').click();
    });

    alerts
      .getSuccessAlert()
      .should('contain', `Success. Please sign in with ${newUid}`);

    cy.get('cx-login-form').should('exist');
    login(newUid, password);

    cy.get('cx-login .cx-login-greet').should('exist');
  });
}
