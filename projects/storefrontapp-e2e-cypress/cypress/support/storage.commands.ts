let LOCAL_STORAGE_MEMORY = {};

declare namespace Cypress {
  interface Chainable {
    /**
       * Save localStorage
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.saveLocalStorage()
        ```
       */
    saveLocalStorage: () => void;
    /**
       * Restore localStorage
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.restoreLocalStorage()
        ```
       */
    restoreLocalStorage: () => void;
  }
}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
