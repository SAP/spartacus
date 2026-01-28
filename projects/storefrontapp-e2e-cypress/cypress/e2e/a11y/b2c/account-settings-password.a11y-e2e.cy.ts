/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateEmail from '../../../helpers/update-email';
import * as updatePassword from '../../../helpers/update-password';
import { standardUser } from '../../../sample-data/shared-users';

export function fillUpdatePasswordForm({
  oldPassword,
  newPassword,
  newPasswordConfirm,
}: {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}) {
  cy.log(
    `🛒 Updating password ${JSON.stringify({ oldPassword, newPassword, newPasswordConfirm })}!`
  );
  cy.get('cx-update-password form').within(() => {
    (oldPassword ?? '').length > 0
      ? cy.get('[formcontrolname="oldPassword"]').clear().type(oldPassword)
      : cy.get('[formcontrolname="oldPassword"]').clear();
    (newPassword ?? '').length > 0
      ? cy.get('[formcontrolname="newPassword"]').clear().type(newPassword)
      : cy.get('[formcontrolname="newPassword"]').clear();
    (newPasswordConfirm ?? '').length > 0
      ? cy
          .get('[formcontrolname="newPasswordConfirm"]')
          .clear()
          .type(newPasswordConfirm)
      : cy.get('[formcontrolname="newPasswordConfirm"]').clear();
    cy.get('button.btn-primary').click();
  });
}

const PAGE_URL_UPDATE_PASSWORD = updatePassword.PAGE_URL_UPDATE_PASSWORD;

/**
 * This test checks accessibility concerns on the Account Settings Password page using Access Continuum
 */
context(
  'Account Settings / Password Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
    });

    it('initial page load', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(PAGE_URL_UPDATE_PASSWORD);
      cy.get('cx-update-password form button.btn-primary');
      cy.get('main').a11yRunContinuumTest();
    });

    it('saving enpty fields', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(PAGE_URL_UPDATE_PASSWORD);

      fillUpdatePasswordForm({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
      cy.get('main').a11yRunContinuumTest();
    });

    it('password update success', () => {
      const newPassword = 'Pas!sword123.a';
      // Register new user (changing standardUser password causes other tests to fail)
      updateEmail.registerAndLogin();
      cy.visit(PAGE_URL_UPDATE_PASSWORD);

      fillUpdatePasswordForm({
        oldPassword: standardUser.registrationData.password,
        newPassword,
        newPasswordConfirm: newPassword,
      });
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
