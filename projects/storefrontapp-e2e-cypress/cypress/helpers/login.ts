import { user } from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import { waitForPage } from './checkout-flow';
import * as alerts from './global-message';

export const userGreetSelector = 'cx-login .cx-login-greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export const defaultUser = {
  name: 'test-user-cypress@ydev.hybris.com',
  password: 'Password123.',
};

export function registerUser() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();
  cy.wait(`@${loginPage}`).its('status').should('eq', 200);

  cy.get('cx-page-layout > cx-page-slot > cx-login-register')
    .findByText('Register')
    .click();
  register(user);
  return user;
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

export function loginWithBadCredentials() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();
  cy.wait(`@${loginPage}`).its('status').should('eq', 200);

  login(user.email, 'Password321');

  cy.get(userGreetSelector).should('not.exist');

  alerts
    .getErrorAlert()
    .should('contain', 'Bad credentials. Please login again');
}

export function loginAsDefaultUser() {
  const loginPage = waitForPage('/login', 'getLoginPage');
  cy.get(loginLinkSelector).click();
  cy.wait(`@${loginPage}`).its('status').should('eq', 200);

  login(defaultUser.name, defaultUser.password);
}

export function listenForTokenRevocationRequest(stub = false): string {
  const aliasName = 'tokenRevocation';
  cy.server();

  if (stub) {
    cy.route('POST', '/authorizationserver/oauth/revoke', {}).as(aliasName);
  } else {
    cy.route('POST', '/authorizationserver/oauth/revoke').as(aliasName);
  }
  return `@${aliasName}`;
}
