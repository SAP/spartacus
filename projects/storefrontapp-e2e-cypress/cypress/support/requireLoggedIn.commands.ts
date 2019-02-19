import { generateMail, randomString } from '../helpers/user';
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you are logged in. Returns generated email.
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
        options?: RequireLoggedInOptions
      ) => Cypress.Chainable<string>;
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
}

export interface RequireLoggedInOptions {
  alwaysRegister?: boolean;
}

Cypress.Commands.add(
  'requireLoggedIn',
  (accountData?: AccountData, options: RequireLoggedInOptions = {}) => {
    const apiUrl = Cypress.env('API_URL');
    const config = {
      tokenUrl: `${apiUrl}/authorizationserver/oauth/token`,
      newUserUrl: `${apiUrl}/rest/v2/electronics/users/?lang=en&curr=USD`,
      client: {
        client_id: Cypress.env('CLIENT_ID'),
        client_secret: Cypress.env('CLIENT_SECRET')
      }
    };

    function login(uid: string, password: string) {
      return cy.request({
        method: 'POST',
        url: config.tokenUrl,
        body: {
          ...config.client,
          grant_type: 'password',
          username: uid,
          password
        },
        form: true,
        failOnStatusCode: false
      });
    }

    function loginAsGuest() {
      return cy.request({
        method: 'POST',
        url: config.tokenUrl,
        body: {
          ...config.client,
          grant_type: 'client_credentials'
        },
        form: true,
        failOnStatusCode: false
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
          uid
        },
        headers: {
          Authorization: `bearer ${access_token}`
        }
      });
    }

    function loginAsNewUser(uid: string, password: string) {
      return cy.request({
        method: 'POST',
        url: config.tokenUrl,
        body: {
          ...config.client,
          grant_type: 'password',
          username: uid,
          password
        },
        form: true
      });
    }

    function setSessionData(data) {
      const authData = {
        userToken: {
          token: data
        },
        clientToken: {
          loading: false,
          error: false,
          success: false
        }
      };
      cy.window().then(win => {
        win.sessionStorage.setItem('auth', JSON.stringify(authData));
      });
      return data;
    }

    const defaultAccount = {
      user: randomString(),
      registrationData: {
        firstName: 'Winston',
        lastName: 'Rumfoord',
        password: 'Password123.',
        titleCode: 'mr'
      }
    };
    const account = accountData || defaultAccount;
    const username = generateMail(account.user, options.alwaysRegister);

    cy.server();
    login(username, account.registrationData.password).then(res => {
      if (res.status === 200) {
        // User is already registered - only set session in sessionStorage
        setSessionData({ ...res.body, userId: username });
      } else {
        /* User needs to be registered
           1. Login as guest for access token
           2. Create new user
           3. Login as a new user
        */
        loginAsGuest()
          .then(response =>
            registerUser(
              username,
              account.registrationData,
              response.body.access_token
            )
          )
          .then(() =>
            loginAsNewUser(username, account.registrationData.password)
          )
          .then(response => {
            setSessionData({ ...response.body, userId: username });
          });
      }
    });
    return cy.wrap(username);
  }
);
