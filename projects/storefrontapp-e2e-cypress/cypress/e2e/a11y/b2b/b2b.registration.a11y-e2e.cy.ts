/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillOrganizationUserRegistrationForm } from '../../../helpers/b2b/b2b-user-registration';
import { getSampleUser } from '../../../sample-data/checkout-flow';

function clickRegisterButton() {
  cy.get('main button').contains(' Register ').scrollIntoView().click();
}
describe('B2b registration accessibility', { testIsolation: false }, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.a11yContinuumSetup();
    cy.visit('login/register');
  });
  it('empty form', () => {
    clickRegisterButton();
    cy.get('main').a11yRunContinuumTest();
  });

  it('filled form ', () => {
    fillOrganizationUserRegistrationForm(
      getSampleUser(),
      'Please register my account'
    );
    cy.get('main').a11yRunContinuumTest();

    clickRegisterButton();
    cy.get('cx-global-message').a11yRunContinuumTest();
  });
});
