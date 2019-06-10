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
  cy.get('[position="HeaderLinks"] cx-navigation-ui > nav > h5').click({
    force: true,
  });

  cy.get('[position="HeaderLinks"] cx-navigation-ui > nav').within(() => {
    cy.getByText(new RegExp(option, 'i')).click({ force: true });
  });
});
