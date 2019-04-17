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
  cy.server();
  login(username, password).then(res => {
    setSessionData({ ...res.body, userId: username });
  });
});
