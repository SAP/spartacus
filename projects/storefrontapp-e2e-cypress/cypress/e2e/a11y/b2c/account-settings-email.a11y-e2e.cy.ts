/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateEmail from '../../../helpers/update-email';
import { generateMail, randomString } from '../../../helpers/user';
import { standardUser } from '../../../sample-data/shared-users';

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
describe(
  'Account Settings / Email Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
    });

    it('initial page load', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(UPDATE_EMAIL_URL);
      cy.get('cx-update-email form button.btn-primary');
      cy.get('main').a11yRunContinuumTest();
    });

    it('saving enpty fields', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(UPDATE_EMAIL_URL);

      fillUpdateEmailForm({ email: '', confirmEmail: '', password: '' });
      cy.get('main').a11yRunContinuumTest();
    });

    it('email update success', () => {
      const newEmail = generateMail(randomString(), true);
      cy.requireLoggedIn(standardUser);
      cy.visit(UPDATE_EMAIL_URL);

      fillUpdateEmailForm({
        email: newEmail,
        confirmEmail: newEmail,
        password: standardUser.registrationData.password,
      });
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
