/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare namespace Cypress {
  interface Chainable {
    /**
       * Run commands only when JDK_VERSION is 'JDK17'
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.whenJDK17(() => {
          cy.get('something')
        })
        ```
       */
    whenJDK17: <T, E = never>(
      cb: () => T,
      elseCb?: () => E
    ) => Cypress.Chainable<T | E>;

    /**
       * Run commands only when JDK_VERSION is 'JDK21'
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.whenJDK21(() => {
          cy.get('something')
        })
        ```
       */
    whenJDK21: <T, E = never>(
      cb: () => T,
      elseCb?: () => E
    ) => Cypress.Chainable<T | E>;
  }
}

Cypress.Commands.addAll({
  whenJDK17(cb: () => unknown, elseCb?: () => unknown) {
    if (Cypress.env('JDK_VERSION') === 'JDK17') {
      cy.log('using JDK17 path');
      return cy.wrap(cb());
    } else {
      if (elseCb) {
        cy.log('using alternate JDK21 path');
      }
      return cy.wrap(elseCb?.());
    }
  },

  whenJDK21(cb: () => unknown, elseCb?: () => unknown) {
    if (Cypress.env('JDK_VERSION') !== 'JDK17') {
      cy.log('using JDK21 path');
      return cy.wrap(cb());
    } else {
      if (elseCb) {
        cy.log('using alternate JDK17 path');
      }
      return cy.wrap(elseCb?.());
    }
  },
});
