/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateEmail from '../../helpers/update-email';
import { generateMail, randomString } from '../../helpers/user';
import { standardUser } from '../../sample-data/shared-users';
import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';
import { isolateTests } from '../../support/utils/test-isolation';

export function fillUpdateEmailForm({
  email,
  password,
  confirmEmail,
}: {
  email: string;
  password: string;
  confirmEmail: string;
}) {
  cy.log(
    `🛒 Updating password ${JSON.stringify({ email, password, confirmEmail })}!`
  );
  cy.get('cx-update-email form').within(() => {
    (email ?? '').length > 0
      ? cy.get('[formcontrolname="email"]').clear().type(email)
      : cy.get('[formcontrolname="email"]').clear();
    (confirmEmail ?? '').length > 0
      ? cy.get('[formcontrolname="confirmEmail"]').clear().type(confirmEmail)
      : cy.get('[formcontrolname="confirmEmail"]').clear();
    (password ?? '').length > 0
      ? cy.get('[formcontrolname="password"]').clear().type(password)
      : cy.get('[formcontrolname="password"]').clear();

    cy.get('button.btn-primary').click();
  });
}

const UPDATE_EMAIL_URL = updateEmail.UPDATE_EMAIL_URL;

/**
 * This test checks accessibility concerns on the Account Settings Email page using Access Continuum
 */
context('Account Settings / Email Page Accessibility', () => {
  isolateTests();

  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('initial page load', () => {
    before(() => {
      updateEmail.registerAndLogin();
      cy.visit(UPDATE_EMAIL_URL);
      cy.get('cx-breadcrumb h1').should('contain', 'Update Email');
    });

    checkA11yConcerns();
  });

  describe('saving enpty fields', () => {
    before(() => {
      updateEmail.registerAndLogin();
      cy.visit(UPDATE_EMAIL_URL).wait(3000);
      cy.get('cx-breadcrumb h1').should('contain', 'Update Email');

      fillUpdateEmailForm({ email: '', confirmEmail: '', password: '' });
      cy.get('cx-form-errors#emailError')
        .should('contain', 'Field New email address is required')
        .should(
          'contain',
          'Field New email address has not a valid email format. Match pattern: example@yourdomain.com'
        );
      cy.get('cx-form-errors#confirmEmailError').should(
        'contain',
        'Field Confirm new email address is required'
      );
      cy.get('cx-form-errors#passwordError').should(
        'contain',
        'Field Password is required'
      );
    });

    checkA11yConcerns(false);
  });

  describe('email update success', () => {
    before(() => {
      const newEmail = generateMail(randomString(), true);
      const successMessage = `Success. Please sign in with ${newEmail}`;
      updateEmail.registerAndLogin();
      cy.visit(UPDATE_EMAIL_URL).wait(3000);
      cy.get('cx-breadcrumb h1').should('contain', 'Update Email');

      fillUpdateEmailForm({
        email: newEmail,
        confirmEmail: newEmail,
        password: standardUser.registrationData.password,
      });
      cy.get('cx-form-errors#emailError').should(
        'not.contain',
        'Field New email address is required'
      );
      cy.get('cx-global-message').should('contain', successMessage);
    });

    checkA11yConcerns(false);
  });
});
