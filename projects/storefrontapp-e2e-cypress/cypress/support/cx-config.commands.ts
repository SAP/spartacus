/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Config } from '@spartacus/core';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Provides dynamically a chunk of the `Config`.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.cxConfig(config)
        ```
       */
      cxConfig: (config: Config) => void;
    }
  }
}

Cypress.Commands.add('cxConfig', (config) => {
  cy.setCookie('cxConfigE2E', encodeURIComponent(JSON.stringify(config)));
});
