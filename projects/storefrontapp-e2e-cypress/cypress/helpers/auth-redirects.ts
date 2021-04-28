import { standardUser } from '../sample-data/shared-users';
import { AccountData } from '../support/require-logged-in.commands';
import { generateMail, randomString } from './user';

/**
 * Creates user, but doesn't log in
 */
export function createUser(): AccountData {
  const user = {
    ...standardUser,
    registrationData: {
      ...standardUser.registrationData,
      email: generateMail(randomString(), true),
    },
  };

  // TODO: optimize below code to avoid unnecessary login and logout
  // we just need to register
  cy.requireLoggedIn(user);
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?*/logout*`
  ).as('logOut');
  cy.visit('/logout');
  cy.wait('@logOut');

  return user;
}

/**
 * Fakes the expiration of the access token by tampering it's value.
 */
export function fakeExpiredAccessToken() {
  const AUTH_STORAGE_KEY = 'spartacus⚿⚿auth';
  cy.window().then((win) => {
    const authState = JSON.parse(win.localStorage.getItem(AUTH_STORAGE_KEY));
    authState.token.access_token = 'fake_expired_access_token';
    JSON.stringify(win.localStorage.setItem(AUTH_STORAGE_KEY, authState));
  });
}
