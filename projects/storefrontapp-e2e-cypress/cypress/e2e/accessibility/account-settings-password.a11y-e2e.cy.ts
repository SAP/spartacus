/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateEmail from '../../helpers/update-email';
import * as updatePassword from '../../helpers/update-password';
import { standardUser } from '../../sample-data/shared-users';
import { isolateTests } from '../../support/utils/test-isolation';

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
context('Account Settings / Password Page Accessibility', () => {
  isolateTests();

  before(() => {
    cy.a11yContinuumSetup();
  });

  it('initial page load', () => {
    updateEmail.registerAndLogin();
    cy.visit(PAGE_URL_UPDATE_PASSWORD);
    cy.get('cx-breadcrumb h1').should('contain', 'Update Password');
  });

  it('saving enpty fields', () => {
    updateEmail.registerAndLogin();
    cy.visit(PAGE_URL_UPDATE_PASSWORD).wait(3000);
    cy.get('cx-breadcrumb h1').should('contain', 'Update Password');

    fillUpdatePasswordForm({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    });
    cy.get('cx-form-errors#oldPasswordError').should(
      'contain',
      'Field Old Password is required'
    );
    cy.get('cx-form-errors#newPasswordError').should(
      'contain',
      'Field New Password is required'
    );
    cy.get('cx-form-errors#newPasswordConfirmError').should(
      'contain',
      'Field Confirm New Password is required'
    );
  });

  it('password update success', () => {
    const newPassword = 'Pas!sword123.a';
    updateEmail.registerAndLogin();
    cy.visit(PAGE_URL_UPDATE_PASSWORD).wait(3000);
    cy.get('cx-breadcrumb h1').should('contain', 'Update Password');

    fillUpdatePasswordForm({
      oldPassword: standardUser.registrationData.password,
      newPassword,
      newPasswordConfirm: newPassword,
    });
    cy.get('cx-form-errors#oldPasswordError').should(
      'not.contain',
      'Field Old Password is required'
    );
    cy.get('cx-form-errors#newPasswordError').should(
      'not.contain',
      'Password fields cannot match'
    );
    cy.get('cx-global-message').should(
      'contain',
      'Password updated with success'
    );
  });
});
