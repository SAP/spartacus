/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* Use this methods if you need to test UI for login/register (eg. form validation).
 If you only need to be logged in to check other feature use `requireLoggedIn` command */

import { SampleUser } from '../sample-data/checkout-flow';
import { waitForPage } from './navigation';

export interface LoginUser {
  username: string;
  password: string;
}

export function fillRegistrationForm(
  { firstName, lastName, email, password }: SampleUser,
  giveRegistrationConsent,
  hiddenConsent?,
  waitForCsrFallback = false
) {
  cy.log(`🛒 Registering user ${email} from the registration page`);
  if (waitForCsrFallback) {
    waitForCsrFallbackTimeout();
  }
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
export function fillLoginForm(
  credentials: LoginUser,
  waitForCsrFallback = false
) {
  return fillCustomLoginForm(credentials, waitForCsrFallback);
}

/** New Authorization server login */
export function fillAuthServerLoginForm({ username, password }: LoginUser) {
  cy.log(`🛒 Logging in user ${username} from the login form`);
  cy.get('input[name=username]').clear().type(username);
  cy.get('input[name=password]').clear().type(password);

  cy.get('button[type=submit]').click();
}

// Wait for CSR fallback, it needs to be over the SSR timeout of 3 seconds + js files to load + api calls to complete. 8 seconds is a safe bet.
// this is needed for CCV2 e2e tests.
// TODO: This workaround (CXSPA-13762 - E2E failure: SPA_E2E tests are failing in S7 and S8 envs) can be deleted after CXSPA-13800 is fixed ([SSR] Login form inputs cleared after CSR loading)
export function waitForCsrFallbackTimeout() {
  cy.log('Waiting for SSR timeout to pass (8s)');
  cy.wait(8000);
}

/** New Authorization server login */
export function fillCustomLoginForm(
  { username, password }: LoginUser,
  waitForCsrFallback = false
) {
  cy.log(`🛒 Logging in user ${username} from the login form`);

  if (waitForCsrFallback) {
    waitForCsrFallbackTimeout();
  }
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
  hiddenConsent?: string,
  waitForCsrFallback = false
) {
  fillRegistrationForm(
    user,
    giveRegistrationConsent,
    hiddenConsent,
    waitForCsrFallback
  );
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
export function login(
  username: string,
  password: string,
  waitForCsrFallback = false
) {
  fillLoginForm({ username, password }, waitForCsrFallback);
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
