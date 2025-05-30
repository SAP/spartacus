/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import * as alerts from './global-message';
import { generateMail, randomString } from './user';

export const password = 'Pas!sword123.';
export const UPDATE_EMAIL_URL = '/my-account/update-email';

/**
 * Registers a standard user with a unique email and logs them in.
 * Updates the user's registration data with a generated email before login.
 */
export function registerAndLogin() {
  // Generate a unique email for the standard user
  const uniqueEmail = generateMail(randomString(), true);
  standardUser.registrationData.email = uniqueEmail;

  // Ensure the user is registered and logged in
  cy.requireLoggedIn(standardUser);
}

/**
 * Cypress test: Updates the user's email address and verifies login with the new email.
 */
export function testUpdateEmailAndLogin() {
  it('should update the email address and allow login with the new email', () => {
    // Generate a new unique email for the update
    const newEmail = generateMail(randomString(), true);

    // Fill out and submit the update email form
    cy.get('cx-update-email, cx-my-account-v2-email').within(() => {
      cy.get('[formcontrolname="email"]').type(newEmail);
      cy.get('[formcontrolname="confirmEmail"]').type(newEmail);
      cy.get('[formcontrolname="password"]').type(password);
      cy.get('button.btn-primary').click();
    });

    // Assert success alert contains the new email
    alerts
      .getSuccessAlert()
      .should('contain', `Success. Please sign in with ${newEmail}`);

    // Ensure the login form is displayed and log in with the new email
    cy.get('cx-login-form').should('exist');
    login(newEmail, password);

    // Verify the user is greeted after login
    cy.get('cx-login .cx-login-greet').should('exist');
  });
}
