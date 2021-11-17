import { generateMail, randomString } from '../helpers/user';
import { config, login, setSessionData } from './utils/login';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Registers a new user and logs him in. Returns user (generated) email.
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
    function loginAsGuest() {
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

    function registerUser(
      uid: string,
      registrationData: RegistrationData,
      access_token: string
    ) {
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
        headers: {
          Authorization: `bearer ${access_token}`,
        },
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
    const account = accountData || defaultAccount;
    const username =
      account.registrationData.email ||
      generateMail(account.user, options.freshUserOnTestRefresh);

    login(username, account.registrationData.password, false).then((res) => {
      if (res.status === 200) {
        // User is already registered - only set session in sessionStorage
        setSessionData(res.body);
      } else {
        /* User needs to be registered
           1. Login as guest for access token
           2. Create new user
           3. Login as a new user
        */
        loginAsGuest()
          .then((response) =>
            registerUser(
              username,
              account.registrationData,
              response.body.access_token
            )
          )
          .then(() => login(username, account.registrationData.password))
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
