/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../sample-data/shared-users';
import { AccountData } from '../support/require-logged-in.commands';
import { config } from '../support/utils/login';
import { generateMail, randomString } from './user';
import * as authForms from './auth-forms';

const AUTH_STORAGE_KEY = 'spartacus⚿⚿auth';

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
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageLabelOrId: '/logout',
    },
  }).as('logOut');
  cy.visit('/logout');
  cy.wait('@logOut');

  return user;
}

/**
 * Fakes the expiration of the access token by tampering it's value.
 */
export function fakeExpiredAccessToken() {
  cy.window().then((win) => {
    const authState = JSON.parse(win.localStorage.getItem(AUTH_STORAGE_KEY));
    authState.token.access_token = 'fake_expired_access_token';
    win.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  });
}

/**
 * Revokes access token via http endpoint
 */
export function revokeAccessToken() {
  return cy.window().then((win) => {
    const accessToken = JSON.parse(win.localStorage.getItem(AUTH_STORAGE_KEY))
      .token.access_token;

    return cy
      .request({
        method: 'POST',
        url: config.revokeTokenUrl,
        body: {
          ...config.client,
          token_type_hint: 'access_token',
          token: accessToken,
        },
        form: true,
      })
      .then(() => {
        Cypress.log({
          name: 'revokeAccessToken',
          displayName: 'Access token revoked',
          message: [`🚨 Access token revoked`],
        });
      });
  });
}

export function testRedirectBackfterLogin() {
  it('should redirect back after the login', () => {
    const user = createUser();
    cy.visit(`/contact`);

    cy.get('cx-login').click();
    cy.location('pathname').should('contain', '/login');
    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/contact');
  });
}

export function testRedirectAfterForcedLogin() {
  it('should redirect back after the forced login', () => {
    const user = createUser();
    cy.visit(`/my-account/address-book`);
    cy.location('pathname').should('contain', '/login');
    authForms.login(
      user.registrationData.email,
      user.registrationData.password
    );

    cy.location('pathname').should('contain', '/my-account/address-book');
  });
}

/**
 * Waits for the background work to complete after a cy.visit() call and the browser adds base parameters.
 *
 * Handling of authentication revocation can slow down page loads to the point that tests fail due to timeouts.
 * When the background work completes after a cy.visit(), the base paramaters are added to the url and the page loads normally.
 */
export function visitAndWaitForRedirections(path: string) {
  cy.visit(path);
  cy.location('pathname', { timeout: 30000 }).should(
    'contain',
    `/${Cypress.env('BASE_SITE')}/${Cypress.env('BASE_LANG')}/${Cypress.env(
      'BASE_CURRENCY'
    )}`
  );
}
