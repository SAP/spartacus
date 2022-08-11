import { login, setSessionData } from './utils/login';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Headless login
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.login(username, password)
        ```
       */
      login: (username: string, password: string) => void;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  login(username, password).then((response) => {
    setSessionData(response.body);
    Cypress.log({
      name: 'login',
      displayName: 'User login',
      message: [`🔒 Logging in user | ${username}`],
      consoleProps: () => {
        return {
          'User name': username,
          'Session data': response.body,
        };
      },
    });
  });
});
