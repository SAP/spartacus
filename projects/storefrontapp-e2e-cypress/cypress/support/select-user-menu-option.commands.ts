declare namespace Cypress {
  interface Chainable {
    /**
       * Select user menu option
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.selectUserMenuOption('Sign out')
        ```
       */
    selectUserMenuOption: (option: string) => void;
  }
}

Cypress.Commands.add('selectUserMenuOption', (option: string) => {
  cy.get('cx-login [ngbdropdown]').click();
  cy.get('cx-login [aria-label="My Account"]').within(() => {
    cy.getByText(new RegExp(option, 'i')).click({ force: true });
  });
});
