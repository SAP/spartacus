import { user } from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import * as alerts from './global-message';

export const userGreetSelector = 'cx-login .cx-login-greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export const defaultUser = {
  name: 'test-user-cypress@ydev.hybris.com',
  password: 'Password123.',
};

export function registerUser() {
  cy.get(loginLinkSelector).click();
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
  cy.get(loginLinkSelector).click();

  login(user.email, 'Password321');

  cy.get(userGreetSelector).should('not.exist');

  alerts
    .getErrorAlert()
    .should('contain', 'Bad credentials. Please login again');
}

export function loginAsDefaultUser() {
  cy.get(loginLinkSelector).click();
  login(defaultUser.name, defaultUser.password);
}

export function listenForTokenRevocationReqest(): string {
  const aliasName = 'tokenRevocation';
  cy.server();
  cy.route('POST', '/authorizationserver/oauth/revoke').as(aliasName);
  return `@${aliasName}`;
}
