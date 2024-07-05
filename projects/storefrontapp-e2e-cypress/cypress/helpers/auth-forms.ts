/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* Use this methods if you need to test UI for login/register (eg. form validation).
 If you only need to be logged in to check other feature use `requireLoggedIn` command */

import { SampleUser } from '../sample-data/checkout-flow';
import { waitForPage } from './checkout-flow';

export interface LoginUser {
  username: string;
  password: string;
}

export function fillRegistrationForm(
  { firstName, lastName, email, password }: SampleUser,
  giveRegistrationConsent,
  hiddenConsent?
) {
  cy.log(`🛒 Registering user ${email} from the registration page`);
  cy.get('cx-register form').should('be.visible');
  cy.get('cx-register form').within(() => {
    cy.get('[formcontrolname="titleCode"]').ngSelect('Mr');
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('[formcontrolname="passwordconf"]').type(password);
    if (giveRegistrationConsent) {
      cy.get('[formcontrolname="newsletter"]').check();
      if (hiddenConsent) {
        cy.get('[formcontrolname="newsletter"]')
          .siblings('.form-check-label')
          .should('contain', hiddenConsent);
      }
    }
    cy.get('[formcontrolname="termsandconditions"]').check();
  });
}

export function fillLoginForm({ username, password }: LoginUser) {
  cy.log(`🛒 Logging in user ${username} from the login form`);
  cy.get('cx-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').clear().type(username);
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
}

export function fillKymaLoginForm({ username, password }: LoginUser) {
  cy.origin(
    `${Cypress.env('API_URL')}`,
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('form[id="loginForm"]').within(() => {
        cy.get('input[name="username"]').clear().type(username);
        cy.get('input[name="password"]').clear().type(password);
        cy.get('input[type=submit]').click();
      });
    }
  );
}

export function register(
  user: SampleUser,
  giveRegistrationConsent = false,
  hiddenConsent?
) {
  fillRegistrationForm(user, giveRegistrationConsent, hiddenConsent);
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get('cx-register form').within(() => {
    cy.get('button[type="submit"]').click();
    cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
  });
}

export function login(username: string, password: string) {
  fillLoginForm({ username, password });
}
