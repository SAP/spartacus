/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';
import * as updateProfile from '../../helpers/update-profile';
import * as updateEmail from '../../helpers/update-email';
import { isolateTests } from '../../support/utils/test-isolation';

export function fillUpdatePersonalDetailsForm({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  cy.log(`🛒 Updating profile ${JSON.stringify({ firstName, lastName })}!`);
  cy.get('cx-update-profile form').within(() => {
    (firstName ?? '').length > 0
      ? cy.get('[formcontrolname="firstName"]').clear().type(firstName)
      : cy.get('[formcontrolname="firstName"]').clear();
    (lastName ?? '').length > 0
      ? cy.get('[formcontrolname="lastName"]').clear().type(lastName)
      : cy.get('[formcontrolname="lastName"]').clear();
    cy.get('button.btn-primary').click();
  });
}

const UPDATE_PROFILE_URL = updateProfile.UPDATE_PROFILE_URL;

/**
 * This test checks accessibility concerns on the Account Settings Personal Details page using Access Continuum
 */
context('Account Settings / Personal Details Page Accessibility', () => {
  isolateTests();

  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('initial page load', () => {
    isolateTests();

    before(() => {
      updateEmail.registerAndLogin();
      cy.visit(UPDATE_PROFILE_URL);
      cy.get('cx-breadcrumb h1').should('contain', 'Update Personal Details');
    });

    checkA11yConcerns();
  });

  describe('saving enpty fields', () => {
    isolateTests();

    before(() => {
      updateEmail.registerAndLogin();
      cy.visit(UPDATE_PROFILE_URL).wait(3000);
      cy.get('cx-breadcrumb h1').should('contain', 'Update Personal Details');

      fillUpdatePersonalDetailsForm({ firstName: '', lastName: '' });
      cy.get('cx-form-errors#firstNameError').should(
        'contain',
        'Field First name is required'
      );
      cy.get('cx-form-errors#lastNameError').should(
        'contain',
        'Field Last name is required'
      );
    });

    checkA11yConcerns(false);
  });

  describe('password update success', () => {
    isolateTests();

    before(() => {
      updateEmail.registerAndLogin();
      cy.visit(UPDATE_PROFILE_URL).wait(3000);
      cy.get('cx-breadcrumb h1').should('contain', 'Update Personal Details');

      fillUpdatePersonalDetailsForm({ firstName: 'John', lastName: 'Doe' });
      cy.get('cx-global-message').should(
        'contain',
        'Personal details successfully updated'
      );
      cy.get('cx-form-errors#firstNameError').should(
        'not.contain',
        'Field First name is required'
      );
      cy.get('cx-form-errors#lastNameError').should(
        'not.contain',
        'Field Last name is required'
      );
    });

    checkA11yConcerns(false);
  });
});
