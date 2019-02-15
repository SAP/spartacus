import { generateMail } from '../helpers/user';
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Select user menu option
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.selectUserMenuOption('Sign out')
        ```
       */
      selectUserMenuOption: (option: string) => void;
      /**
       * Selects in ng select
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.get('[name="title"]').ngSelect('Mr.')
        ```
       */
      ngSelect: (option: string) => void;
      /**
       * Make sure you are logged in. Returns generated email.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireLoggedIn({ alias: 'standard' })
        ```
       */
      requireLoggedIn: (
        user: LoginUserData,
        options?: LoginOptions
      ) => Cypress.Chainable<string>;
    }
  }
}

Cypress.Commands.add('selectUserMenuOption', (option: string) => {
  cy.get('cx-login [ngbdropdown]').click();
  cy.get('cx-login [aria-label="My Account"]').within(() => {
    cy.getByText(new RegExp(option, 'i')).click();
  });
});

Cypress.Commands.add(
  'ngSelect',
  {
    prevSubject: 'element'
  },
  (element, option) => {
    cy.wrap(element).click();
    cy.get('.ng-dropdown-panel-items')
      .contains(option)
      .click();
  }
);

export interface LoginUserData {
  firstName?: string;
  lastName?: string;
  alias: string;
  password?: string;
  titleCode?: string;
  username?: string;
}

export interface LoginOptions {
  alwaysNew?: boolean;
}

Cypress.Commands.add(
  'requireLoggedIn',
  (userData: LoginUserData, options: LoginOptions = {}) => {
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

    const defaultUser = {
      firstName: 'Winston',
      lastName: 'Rumfoord',
      alias: 'standard',
      password: 'Password123.',
      titleCode: 'mr'
    };
    const user = Object.assign({}, defaultUser, userData);
    user.username =
      user.username || generateMail(user.alias, options.alwaysNew);

    const apiUrl = Cypress.env('API_URL');
    const config = {
      tokenUrl: `${apiUrl}/authorizationserver/oauth/token`,
      newUserUrl: `${apiUrl}/rest/v2/electronics/users/?lang=en&curr=USD`,
      client: {
        client_id: Cypress.env('CLIENT_ID'),
        client_secret: Cypress.env('CLIENT_SECRET')
      }
    };

    cy.server();
    cy.request({
      method: 'POST',
      url: config.tokenUrl,
      body: {
        ...config.client,
        grant_type: 'password',
        username: user.username,
        password: user.password
      },
      form: true,
      failOnStatusCode: false
    }).then(res => {
      if (res.status === 200) {
        // User is already registered - only set session in sessionStorage
        setSessionData({ ...res.body, userId: user.username });
      } else {
        /* User needs to be registered
           1. Login as guest for access token
           2. Create new user
           3. Login as a new user
        */
        cy.request({
          method: 'POST',
          url: config.tokenUrl,
          body: {
            ...config.client,
            grant_type: 'client_credentials'
          },
          form: true,
          failOnStatusCode: false
        })
          .then(resGuest =>
            cy.request({
              method: 'POST',
              url: config.newUserUrl,
              body: {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                titleCode: user.titleCode,
                uid: user.username
              },
              headers: {
                Authorization: `bearer ${resGuest.body.access_token}`
              }
            })
          )
          .then(() =>
            cy.request({
              method: 'POST',
              url: config.tokenUrl,
              body: {
                ...config.client,
                grant_type: 'password',
                username: user.username,
                password: user.password
              },
              form: true
            })
          )
          .then(resAuth => {
            setSessionData({ ...resAuth.body, userId: user.username });
          });
      }
    });
    return cy.wrap(user.username);
  }
);
