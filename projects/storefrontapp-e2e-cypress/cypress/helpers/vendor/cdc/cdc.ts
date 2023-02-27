/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillRegistrationForm, login } from '../../../helpers/auth-forms';
import { getSampleUser } from '../../../sample-data/checkout-flow';
const UPDATED_NAME = ' updated';
export function registerUser() {
  cy.findByText("Don't have an account yet?").click();
  cy.wait(2000);
  registerCDC();
}

const user = getSampleUser();
const nativeUser = getSampleUser();

export const cdcB2BDelegateAdminUser = {
  userId: '80dfa58b-e24e-40a1-97c6-5e7f0c2bdd09',
  fullName: 'Spartacus B2BAdmin',
  email: 'spartacusb2b@mailinator.com',
  password: 'Password123.',
};

export function waitForCmsComponentsToLoad(baseSite: string) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${baseSite}/cms/components`,
  }).as('getComponents');
  cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
}

export function registerCDC() {
  fillAndSubmitRegistrationForm();
}

export function fillAndSubmitRegistrationForm() {
  cy.get('[id="register-site-login"]').within(() => {
    cy.get('[placeholder="Email *"]').type(user.email);
    cy.get('[placeholder="First name"]').type(user.firstName);
    cy.get('[placeholder="Last name"]').type(user.lastName);
    cy.get('[placeholder="Password *"]').type(user.password);
    cy.get('[placeholder="Confirm password *"]').type(user.password);
    cy.get(
      '[data-gigya-name="preferences.terms.test.terms.of.use.isConsentGranted"]'
    ).check();
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function finalizeRegistration() {
  cy.get('[class="gigya-screen-dialog-main"]').within(() => {
    cy.get(
      '[data-gigya-name="preferences.terms.test.terms.of.use.isConsentGranted"]'
    ).check();
    cy.get(
      '[data-gigya-name="preferences.consent.survey.isConsentGranted"]'
    ).check();
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function registerUserWithoutScreenSet() {
  cy.findByText(/Sign in \/ Register/i).click();
  cy.get('cx-login-register').findByText('Register').click();
  fillRegistrationForm(nativeUser, false);
  cy.get('button[type="submit"]').click();
  finalizeRegistration();
}

export function fillAndSubmitNativeRegistrationForm() {
  cy.get('[id="register-site-login"]').within(() => {
    cy.get('[placeholder="Enter email"]').type(nativeUser.email);
    cy.get('[placeholder="First name"]').type(nativeUser.firstName);
    cy.get('[placeholder="Last name"]').type(nativeUser.lastName);
    cy.get('[placeholder="Password *"]').type(nativeUser.password);
    cy.get('[placeholder="Confirm password *"]').type(nativeUser.password);
    cy.get(
      '[data-gigya-name="preferences.terms.test.terms.of.use.isConsentGranted"]'
    ).check();
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function loginUser() {
  cy.get('[id="gigya-login-form"]').within(() => {
    cy.get('[placeholder="Email *"]').type(user.email);
    cy.get('[placeholder="Password *"]').type(user.password);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function loginWithoutScreenSet() {
  login(nativeUser.email, nativeUser.password);
}

export function verifyLoginOrRegistrationSuccess() {
  cy.get('[class="cx-login-greet"]').should('contain', user.fullName);
}

export function updateUserProfile() {
  cy.get('[id="gigya-profile-form"]').within(() => {
    cy.get('[name="profile.lastName"]').type(UPDATED_NAME);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function verifyProfileUpdateSuccess() {
  cy.get('[class="cx-login-greet"]').should(
    'contain',
    user.fullName + UPDATED_NAME
  );
}
