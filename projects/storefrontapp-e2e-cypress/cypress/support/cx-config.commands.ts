import { StorefrontConfig } from '@spartacus/storefront';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Provides dynamically a chunk of the `StorefrontConfig`.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.cxConfig(config)
        ```
       */
      cxConfig: (config: StorefrontConfig) => void;
    }
  }
}

Cypress.Commands.add('cxConfig', config => {
  cy.setCookie('cxConfigE2E', JSON.stringify(config));
});
