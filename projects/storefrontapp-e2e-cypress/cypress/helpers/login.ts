/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSampleUser, SampleUser, user } from '../sample-data/checkout-flow';
import { visitLoginPage } from '../support/utils/login';
import { login, register } from './auth-forms';
import * as alerts from './global-message';
import { waitForPage } from './navigation';

export const userGreetSelector = 'cx-login .cx-login-greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export const defaultUser = {
  name: 'test-user-with-orders@sap.cx.com',
  password: 'pw4all',
};

/**
 * Use only if you already are on the `/login` page.
 * Redirects to `/register` page and registers the user.
 *
 * @param uniqueUser if true creates a unique user, otherwise the default sample user is used.
 * @returns Newly registered user
 */
export function registerUserFromLoginPage(uniqueUser?: boolean) {
  cy.whenJDK17(() => {
    const registerPage = waitForPage('/login/register', 'getRegisterPage');
    cy.get('cx-page-layout > cx-page-slot > cx-login-register')
      .findByText('Register')
      .click();
    cy.wait(`@${registerPage}`).its('response.statusCode').should('eq', 200);
  });

  cy.whenJDK21(() => {
    const registerPage = waitForPage('/login/register', 'getRegisterPage');
    cy.visit('/login/register');
    cy.wait(`@${registerPage}`).its('response.statusCode').should('eq', 200);
  });

  const loginUser = uniqueUser ? getSampleUser() : user;
  register(loginUser);
  return loginUser;
}

/**
 * Use only if you are outside of `/login` page.
 * Redirects to `/login` page, then uses `registerUserFromLoginPage()` helper function.
 *
 * @param uniqueUser if true creates a unique user, otherwise the default sample user is used.
 * @returns Newly registered user
 */
export function registerUser(uniqueUser?: boolean) {
  cy.whenJDK17(() => {
    cy.getLoginRegisterLink({ clickAndWait: true });
  });
  cy.whenJDK21(() => {
    const loginPage = waitForPage('/login/register', 'getRegisterPage');
    cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
  });
  return registerUserFromLoginPage(uniqueUser);
}

export function signOutUser() {
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });

  cy.get(userGreetSelector).should('not.exist');
}

/**
 * From the login page
 * - Fill in the login form with default user
 * - Submit the form
 */
export function loginUser() {
  login(user.email, user.password);
}

export function loginWithBadCredentialsFromLoginPage() {
  let alias: string;
  cy.whenJDK17(
    () => {
      alias = listenForTokenAuthenticationRequest();
    },
    () => {
      alias = listenForAuthServerLoginRequest();
    }
  );

  login(user.email, 'Password321');

  cy.whenJDK17(() => {
    cy.wait(alias).its('response.statusCode').should('eq', 400);
    alerts
      .getErrorAlert()
      .should('contain', 'Bad credentials. Please login again');
  });
  cy.whenJDK21(() => {
    cy.wait(alias).then((interception) => {
      expect(interception.response?.statusCode).to.eq(302);
      expect(interception.response?.headers.location).to.include('?error');
    });
  });

  cy.get(userGreetSelector).should('not.exist');
}

export function loginWithBadCredentials() {
  navigateToLoginPage();

  loginWithBadCredentialsFromLoginPage();
}

/**
 * Navigate to login page
 * - For JDK17, it waits for the login page to load.
 */
export function navigateToLoginPage() {
  cy.whenJDK17(() => {
    const alias = waitForPage('/login', 'getLoginPage');
    visitLoginPage();
    cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
  });
  cy.whenJDK21(() => {
    visitLoginPage();
    cy.url().should('contain', '/login');
  });
}

export function loginAsDefaultUser() {
  navigateToLoginPage();

  login(defaultUser.name, defaultUser.password);
}

export function listenForTokenRevocationRequest(): string {
  const aliasName = 'tokenRevocation';
  cy.intercept({
    method: 'POST',
    path: '/authorizationserver/oauth/revoke',
  }).as(aliasName);

  return `@${aliasName}`;
}

export function listenForTokenAuthenticationRequest(): string {
  const aliasName = 'tokenAuthentication';
  cy.intercept({
    method: 'POST',
    path: '/authorizationserver/oauth/token',
  }).as(aliasName);

  return `@${aliasName}`;
}

export function listenForAuthServerLoginRequest(): string {
  const aliasName = 'loginRequest';
  cy.intercept({
    method: 'POST',
    path: '/authorizationserver/login',
  }).as(aliasName);

  return `@${aliasName}`;
}

/**
 * If the singed-in was successful, the user should be redirected to the home page.
 * Thus, this method verifies whether the home page is displayed and
 * the name of the signed-in user is visible next to the mini cart.
 *
 * @param user - logged-in user.
 */
export function checkUserIsSignedIn(user: SampleUser) {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
  cy.get(userGreetSelector).should('exist');
  cy.get(userGreetSelector).should('contain', user.fullName);
}
