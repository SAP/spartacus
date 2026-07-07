/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* Use this methods if you need to test UI for login/register (eg. form validation).
 If you only need to be logged in to check other feature use `requireLoggedIn` command */

import { SampleUser } from '../sample-data/checkout-flow';
import { interceptGet } from '../support/utils/intercept';
import { waitForPage } from './navigation';

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

/**
 * Fill in Spartacus Login page
 */
export function fillLoginForm(credentials: LoginUser) {
  return fillCustomLoginForm(credentials);
}

/** New Authorization server login */
export function fillAuthServerLoginForm({ username, password }: LoginUser) {
  cy.log(`🛒 Logging in user ${username} from the login form`);
  cy.get('input[name=username]').clear().type(username);
  cy.get('input[name=password]').clear().type(password);

  cy.get('button[type=submit]').click();
}

/** New Authorization server login */
export function fillCustomLoginForm({ username, password }: LoginUser) {
  cy.log(`🛒 Logging in user ${username} from the login form`);
  interceptGet(
    'login_page_cart',
    '/users/*/carts/*?fields=DEFAULT,potentialProductPromotions*'
  );
  cy.wait('@login_page_cart');
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

/**
 * Starting from the registration page
 * - Fill out the registration form
 * - Submit the form
 * - Wait for the success page to load
 */
export function register(
  user: SampleUser,
  giveRegistrationConsent = false,
  hiddenConsent?: string
) {
  fillRegistrationForm(user, giveRegistrationConsent, hiddenConsent);
  const pageAlias = waitForPage('/login', 'getLoginPageAfterRegister');
  cy.get('cx-register form').within(() => {
    cy.get('button[type="submit"]').click();
    cy.whenJDK17(() => {
      cy.wait(`@${pageAlias}`).its('response.statusCode').should('eq', 200);
    });
  });
} /**
 * Starting from the registration page
 * - fill out the registration form
 * - submit the form without supplying captcha
 * - resubmit form with captcha
 * - wait for the success page to load
 */
export function registerWithCaptcha(
  user: SampleUser,
  giveRegistrationConsent = false,
  hiddenConsent?: string
) {
  fillRegistrationForm(user, giveRegistrationConsent, hiddenConsent);

  const pageAlias = waitForPage('/login', 'getLoginPageAfterRegister');

  cy.get('button[type="submit"]').click();
  // Register a user without confirming captcha will have an error.
  cy.get('cx-form-errors.control-invalid').should('exist');
  // Confirming captcha
  cy.get('.mock-captcha').click();
  cy.contains('label', 'Verified', { timeout: 10000 }).should('be.visible');
  cy.get('cx-form-errors.control-invalid').should('not.exist');
  cy.get('button[type="submit"]').click();
  cy.wait(`@${pageAlias}`).its('response.statusCode').should('eq', 200);
}

/**
 * From the login page
 * - Fill in the login form
 * - Submit the form
 */
export function login(username: string, password: string) {
  fillLoginForm({ username, password });
}

export function agentLoginForJDK21(username: string, password: string) {
  cy.origin(
    `${Cypress.env('API_URL')}`,
    { args: { username, password } },
    ({ username, password }) => {
      cy.wait(2000);
      cy.get('form[id="loginForm"]').within(() => {
        cy.get('input[name=username]').clear().type(username);
        cy.get('input[name=password]').clear().type(password);

        cy.get('button[type=submit]').click();
      });
    }
  );
}
