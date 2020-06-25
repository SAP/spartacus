import { register } from './utils/login';
import { RegistrationData } from './require-logged-in.commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Headless registration
       * @memberof Cypress.Chainable
       * @example
        ```
        cy.register(username, password)
        ```
       */
      login: (username: string, password: string) => void;
    }
  }
}

Cypress.Commands.add(
  'register',
  (uid: string, registrationData: RegistrationData) => {
    cy.server();
    register(uid, registrationData);
  }
);
