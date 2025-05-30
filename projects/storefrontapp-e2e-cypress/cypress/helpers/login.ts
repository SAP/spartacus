/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { user, getSampleUser, SampleUser } from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import { waitForPage } from './checkout-flow';
import * as alerts from './global-message';

export const userGreetSelector = 'cx-login .cx-login-greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export const defaultUser = {
  name: 'test-user-with-orders@sap.cx.com',
  password: 'pw4all',
};

/**
 * Registers a user from the login page.
 * Navigates to the register page, waits for it to load, and submits the registration form.
 *
 * @param uniqueUser - If true, creates a unique user; otherwise, uses the default sample user.
 * @returns The newly registered user object.
 */
export function registerUserFromLoginPage(uniqueUser?: boolean) {
  // Go to the register page from the login page
  const registerPageAlias = waitForPage('/login/register', 'getRegisterPage');
  cy.get('cx-page-layout > cx-page-slot > cx-login-register')
    .findByText('Register')
    .click();

  // Wait for the register page to load
  cy.wait(`@${registerPageAlias}`).its('response.statusCode').should('eq', 200);

  // Choose the user to register
  const newUser = uniqueUser ? getSampleUser() : user;

  // Fill and submit the registration form
  register(newUser);

  return newUser;
}

/**
 * Registers a user from outside the `/login` page.
 * Navigates to the login page, waits for it to load, then delegates to registerUserFromLoginPage.
 *
 * @param uniqueUser - If true, creates a unique user; otherwise, uses the default sample user.
 * @returns The newly registered user object.
 */
export function registerUser(uniqueUser?: boolean) {
  // Navigate to the login page
  const loginPageAlias = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();

  // Wait for the login page to load
  cy.wait(`@${loginPageAlias}`).its('response.statusCode').should('eq', 200);

  // Delegate registration to the login page helper
  return registerUserFromLoginPage(uniqueUser);
}
export function signOutUser() {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });

  cy.get(userGreetSelector).should('not.exist');
}

export function loginUser() {
  login(user.email, user.password);
}


/**
 * Attempts to log in with invalid credentials from the login page,
 * verifies that authentication fails, and checks for the correct error message.
 */
export function loginWithBadCredentialsFromLoginPage() {
  // Listen for the authentication request
  listenForTokenAuthenticationRequest();

  // Attempt login with invalid password
  login(user.email, 'Password321');

  // Assert that the authentication request failed
  cy.wait('@tokenAuthentication').its('response.statusCode').should('eq', 400);

  // Ensure user is not greeted (not logged in)
  cy.get(userGreetSelector).should('not.exist');

  // Check for the expected error alert
  alerts.getErrorAlert().should('contain', 'Bad credentials. Please login again');
}

/**
 * Navigates to the login page and attempts to log in with invalid credentials,
 * verifying that authentication fails and the correct error message is shown.
 */
export function loginWithBadCredentials() {
  // Navigate to the login page
  const loginPageAlias = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();

  // Wait for the login page to load
  cy.wait(`@${loginPageAlias}`).its('response.statusCode').should('eq', 200);

  // Attempt login with invalid credentials and verify error handling
  loginWithBadCredentialsFromLoginPage();
}

/**
 * Navigates to the login page and logs in using the default user credentials.
 * Waits for the login page to load before submitting credentials.
 */
export function loginAsDefaultUser() {
  // Navigate to the login page
  const loginPageAlias = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();

  // Wait for the login page to load
  cy.wait(`@${loginPageAlias}`).its('response.statusCode').should('eq', 200);

  // Log in with default user credentials
  login(defaultUser.name, defaultUser.password);
}

/**
 * Sets up a network intercept for token revocation requests and returns the alias.
 * This allows tests to wait for or assert on token revocation network calls.
 *
 * @returns The Cypress alias for the token revocation request.
 */
export function listenForTokenRevocationRequest(): string {
  const aliasName = 'tokenRevocation';
  cy.intercept(
    {
      method: 'POST',
      path: '/authorizationserver/oauth/revoke',
    }
  ).as(aliasName);

  return `@${aliasName}`;
}

/**
 * Sets up a network intercept for token authentication (login) requests and returns the alias.
 * This allows tests to wait for or assert on authentication network calls.
 *
 * @returns The Cypress alias for the token authentication request.
 */
export function listenForTokenAuthenticationRequest(): string {
  const aliasName = 'tokenAuthentication';
  cy.intercept(
    {
      method: 'POST',
      path: '/authorizationserver/oauth/token',
    }
  ).as(aliasName);

  return `@${aliasName}`;
}

/**
 * Verifies that the user is signed in by:
 * - Waiting for the home page to load
 * - Checking that the user greeting is visible
 * - Ensuring the greeting contains the user's full name
 *
 * @param user - The logged-in user object (should have a fullName property)
 */
export function checkUserIsSignedIn(user: SampleUser) {
  // Wait for the home page to load
  const homePageAlias = waitForPage('homepage', 'getHomePage');
  cy.wait(`@${homePageAlias}`).its('response.statusCode').should('eq', 200);

  // Check that the user greeting is visible and contains the user's full name
  cy.get(userGreetSelector)
    .should('exist')
    .and('contain', user.fullName);
}
