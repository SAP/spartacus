/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { cmsEndpoints } from './cms-endpoints';
import * as alerts from './global-message';

export function signOut() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/${cmsEndpoints.pages}`,
    query: {
      pageLabelOrId: '/logout',
    },
  }).as('logOut');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait('@logOut');
  return cy.visit('/');
}

export function verifyGlobalMessageAfterRegistration() {
  cy.whenJDK17(() => {
    const alert = alerts.getSuccessAlert();
    alert.should(
      'contain',
      'Your account has been successfully created! Please log in with provided credentials'
    );
  });
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/login$/);
  });
}
