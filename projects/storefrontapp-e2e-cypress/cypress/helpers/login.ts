import { user } from '../sample-data/checkout-flow';
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
 * Use only if you already are on the `/login` page.
 * Redirects to `/register` page and registers the user.
 *
 * @returns Newly registered user
 */
export function registerUserFromLoginPage() {
  const registerPage = waitForPage('/login/register', 'getRegisterPage');
  cy.get('cx-page-layout > cx-page-slot > cx-login-register')
    .findByText('Register')
    .click();
  cy.wait(`@${registerPage}`).its('response.statusCode').should('eq', 200);

  register(user);
  return user;
}

/**
 * Use only if you are outside of `/login` page.
 * Redirects to `/login` page, then uses `registerUserFromLoginPage()` helper function.
 *
 * @returns Newly registered user
 */
export function registerUser() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

  return registerUserFromLoginPage();
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

export function loginWithBadCredentialsFromLoginPage() {
  listenForTokenAuthenticationRequest();

  login(user.email, 'Password321');

  cy.wait('@tokenAuthentication').its('response.statusCode').should('eq', 400);

  cy.get(userGreetSelector).should('not.exist');

  alerts
    .getErrorAlert()
    .should('contain', 'Bad credentials. Please login again');
}

export function loginWithBadCredentials() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

  loginWithBadCredentialsFromLoginPage();
}

export function loginAsDefaultUser() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

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
