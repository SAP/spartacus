import { user } from '../sample-data/checkout-flow';
import { login, register } from './auth-forms';
import * as alerts from './global-message';
import { CMS_LOGIN_PAGE, CMS_REGISTER_PAGE } from './interceptors';

export const userGreetSelector = 'cx-login .cx-login-greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export const defaultUser = {
  name: 'test-user-cypress@ydev.hybris.com',
  password: 'Password123.',
};

/**
 * Use only if you already are on the `/login` page.
 * Redirects to `/register` page and registers the user.
 *
 * @returns Newly registered user
 */
export function registerUserFromLoginPage() {
  cy.get('cx-page-layout > cx-page-slot > cx-login-register')
    .findByText('Register')
    .click();
  cy.wait(CMS_REGISTER_PAGE).its('response.statusCode').should('eq', 200);

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
  cy.get(loginLinkSelector).click();
  cy.wait(CMS_LOGIN_PAGE).its('response.statusCode').should('eq', 200);

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

export function loginWithBadCredentials() {
  cy.get(loginLinkSelector).click();
  cy.wait(CMS_LOGIN_PAGE).its('response.statusCode').should('eq', 200);

  login(user.email, 'Password321');

  cy.get(userGreetSelector).should('not.exist');

  alerts
    .getErrorAlert()
    .should('contain', 'Bad credentials. Please login again');
}

export function loginAsDefaultUser() {
  cy.get(loginLinkSelector).click();
  cy.wait(CMS_LOGIN_PAGE).its('response.statusCode').should('eq', 200);

  login(defaultUser.name, defaultUser.password);
}

export function listenForTokenRevocationRequest(): string {
  const aliasName = 'tokenRevocation';
  cy.intercept({
    method: 'POST',
    pathname: '/authorizationserver/oauth/revoke',
  }).as(aliasName);

  return `@${aliasName}`;
}
