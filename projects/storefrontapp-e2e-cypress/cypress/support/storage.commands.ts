let LOCAL_STORAGE_MEMORY = {};

declare namespace Cypress {
  interface Chainable {
    /**
       * Save localStorage as state in the command since cypress clears the local storage of the browser in between tests
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
    /**
       * Reset the local storage memory.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.resetLocalStorageMemory()
        ```
       */
    clearLocalStorageMemory: () => void;
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

/**
 * Clears the command local storage
 */
Cypress.Commands.add('clearLocalStorageMemory', () => {
  LOCAL_STORAGE_MEMORY = {};
});
