declare namespace Cypress {
  interface Chainable {
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

Cypress.Commands.add(
  'ngSelect',
  {
    prevSubject: 'element',
  },
  (element, option) => {
    cy.wrap(element).click();
    cy.get('.ng-dropdown-panel-items').contains(option).click({ force: true });
  }
);
