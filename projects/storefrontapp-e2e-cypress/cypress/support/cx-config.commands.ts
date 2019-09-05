import { StorefrontConfig } from '@spartacus/storefront';

declare namespace Cypress {
  interface Chainable {
    /**
       * Provides a chunk of the `StorefrontConfig`
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

Cypress.Commands.add('cxConfig', config => {
  cy.on('window:before:load', setCxTestConfig(config));
});

function setCxTestConfig(config: StorefrontConfig): (win: Window) => void {
  return (win: Window) => {
    Object.defineProperty(win, 'cxTestConfig', {
      configurable: false,
      get: () => config,
      set: () => {},
    });
  };
}
