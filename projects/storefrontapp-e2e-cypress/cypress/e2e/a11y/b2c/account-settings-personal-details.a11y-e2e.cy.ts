/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../../../sample-data/shared-users';
import * as updateProfile from '../../../helpers/update-profile';

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
describe(
  'Account Settings / Personal Details Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
    });

    it('initial page load', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(UPDATE_PROFILE_URL);
      cy.get('cx-update-profile form button.btn-primary');
      cy.get('main').a11yRunContinuumTest();
    });

    it('saving enpty fields', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(UPDATE_PROFILE_URL);

      fillUpdatePersonalDetailsForm({ firstName: '', lastName: '' });
      cy.get('main').a11yRunContinuumTest();
    });

    it('password update success', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(UPDATE_PROFILE_URL);

      fillUpdatePersonalDetailsForm({ firstName: 'John', lastName: 'Doe' });
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
