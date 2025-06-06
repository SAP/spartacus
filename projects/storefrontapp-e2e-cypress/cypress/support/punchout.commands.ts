/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       */
      loginViaPunchout(setupRequestUrl: string): void;

      /**
       */
      transferPunchoutBasket(): void;
    }
  }
}

Cypress.Commands.add('loginViaPunchout', (_setupRequestUrl: string) => {
  //
});

Cypress.Commands.add('transferPunchoutBasket', () => {
  //
});
