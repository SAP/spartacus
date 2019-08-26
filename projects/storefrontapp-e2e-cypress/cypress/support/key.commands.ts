declare namespace Cypress {
  interface Chainable {
    /**
       * Simulates pressing down the tab key
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.typeTab('','')
        ```
       */
    typeTab: (shiftKey, ctrlKey) => void;
  }
}

Cypress.Commands.add('typeTab', (shiftKey, ctrlKey) => {
  cy.focused().trigger('keydown', {
    keyCode: 9,
    which: 9,
    shiftKey: shiftKey,
    ctrlKey: ctrlKey,
  });
});
