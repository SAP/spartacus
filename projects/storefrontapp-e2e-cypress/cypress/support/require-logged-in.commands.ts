/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateMail, randomString } from '../helpers/user';
import {
  config,
  login,
  loginJDK17,
  loginJDK21,
  setSessionData,
} from './utils/login';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Registers a new user, if necessary; logs in; and sets the user token into local storage.
       *
       * Note: The session data will be stored on the domain currently visited.
       *
       * @returns The user (generated) email.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireLoggedIn(user)
        ```
       */
      requireLoggedIn: (
        user?: AccountData,
        options?: RequireLoggedInDebugOptions
      ) => Cypress.Chainable<{ username: string; password: string }>;
    }
  }
}

export interface AccountData {
  user: string;
  registrationData: RegistrationData;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  password: string;
  titleCode: string;
  email?: string;
}

export interface RequireLoggedInDebugOptions {
  freshUserOnTestRefresh?: boolean;
}

Cypress.Commands.add(
  'requireLoggedIn',
  (accountData?: AccountData, options: RequireLoggedInDebugOptions = {}) => {
    /** @deprecated Not supported in JDK17 */
    function loginAsGuest_legacy() {
      return cy.request({
        method: 'POST',
        url: config.tokenUrl,
        body: {
          ...config.client,
          grant_type: 'client_credentials',
        },
        form: true,
      });
    }
    function loginAsGuest() {
      return cy.wrap<Promise<never>, never>(
        Promise.resolve(undefined as never)
      );
    }

    function registerUser(
      uid: string,
      registrationData: RegistrationData,
      options: { access_token?: string }
    ) {
      const headers: Record<string, string> = {};
      if (options.access_token) {
        headers.Authorization = `bearer ${options.access_token}`;
      }
      return cy.request({
        method: 'POST',
        url: config.newUserUrl,
        body: {
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          password: registrationData.password,
          titleCode: registrationData.titleCode,
          uid,
        },
        headers,
      });
    }

    const defaultAccount: AccountData = {
      user: randomString(),
      registrationData: {
        firstName: 'Cypress',
        lastName: 'TestUser',
        password: 'Password123.',
        titleCode: 'mr',
      },
    };
    const account = accountData ?? defaultAccount;
    const username =
      account.registrationData.email ||
      generateMail(account.user, options.freshUserOnTestRefresh);

    const password = account.registrationData.password;

    cy.whenJDK17(
      () => loginJDK17(username, password, false),
      () => loginJDK21(username, password, false)
    ).then((res) => {
      if (res.status === 200) {
        // User is already registered - only set session in sessionStorage
        setSessionData(res.body);
      } else {
        /* User needs to be registered
           1. Login as guest for access token
           2. Create new user
           3. Login as a new user
        */
        cy.whenJDK17(loginAsGuest_legacy, loginAsGuest)
          .then((response) =>
            registerUser(username, account.registrationData, {
              access_token: response?.body?.access_token,
            })
          )
          .then(() =>
            cy.whenJDK17(
              () => loginJDK17(username, account.registrationData.password),
              () => login(username, account.registrationData.password)
            )
          )
          .then((response) => {
            setSessionData(response.body);
            Cypress.log({
              name: 'requireLoggedIn',
              displayName: 'New user auth',
              message: [`🔒 Authenticated new generated user | ${username}`],
              consoleProps: () => {
                return {
                  'User name': username,
                  'Session data': response.body,
                };
              },
            });
          });
      }
    });

    return cy.wrap({ username, password: account.registrationData.password });
  }
);
