/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isJDK17 } from './utils/jdk-versions';

declare namespace Cypress {
  interface Chainable {
    /**
       * Run commands only when JDK_VERSION is 'JDK17'.
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
    ) => Cypress.Chainable<
      | (T extends Cypress.Chainable<infer WrappedT> ? WrappedT : T)
      | (E extends Cypress.Chainable<infer WrappedE> ? WrappedE : E)
    >;

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
    ) => Cypress.Chainable<
      | (T extends Cypress.Chainable<infer WrappedT> ? WrappedT : T)
      | (E extends Cypress.Chainable<infer WrappedE> ? WrappedE : E)
    >;
  }
}

Cypress.Commands.addAll({
  whenJDK17(cb: () => unknown, elseCb?: () => unknown) {
    if (isJDK17()) {
      cy.log('using JDK17 path');

      const result = cb?.();
      return isChainable(result) ? result : cy.wrap(result);
    } else {
      if (elseCb) {
        cy.log('using alternate JDK21 path');
      }

      const result = elseCb?.();
      return isChainable(result) ? result : cy.wrap(result);
    }
  },

  whenJDK21(cb: () => unknown, elseCb?: () => unknown) {
    if (!isJDK17()) {
      cy.log('using JDK21 path');

      const result = cb?.();
      return isChainable(result) ? result : cy.wrap(result);
    } else {
      if (elseCb) {
        cy.log('using alternate JDK17 path');
      }

      const result = elseCb?.();
      return isChainable(result) ? result : cy.wrap(result);
    }
  },
});

function isChainable(obj: any): obj is Cypress.Chainable<unknown> {
  return !!(obj && obj['and'] && obj['wrap']);
}
