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
    /**
       * Selects in ng select
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.get('[name="title"]').ngSelect('Mr.')
        ```
       */
    ngSelect: (option: string) => void;
  }
}

Cypress.Commands.add('selectUserMenuOption', (option: string) => {
  cy.get('cx-login .dropdown-toggle').click();
  cy.get('cx-login [aria-label="My Account"]').within(() => {
    cy.getByText(new RegExp(option, 'i')).click();
  });
});

Cypress.Commands.add(
  'ngSelect',
  {
    prevSubject: 'element'
  },
  (element, option) => {
    cy.wrap(element).click();
    cy.get('.ng-dropdown-panel-items')
      .contains(option)
      .click();
  }
);
