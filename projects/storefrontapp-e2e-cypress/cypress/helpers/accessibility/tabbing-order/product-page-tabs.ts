import { testProductUrl } from '../tabbing-order';

export function productPageTabsTabbingOrder() {
  cy.server();
  cy.visit(testProductUrl);

  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/products/779841/reviews*`
  ).as('reviews');

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Film cameras');
  cy.get('cx-breadcrumb').should('contain', 'Kodak');

  cy.get('h3')
    .contains('Product Details')
    .first()
    .focus();

  cy.wait('@reviews');

  // we don't use checkAllElements(), because we have to click tabs between checks

  // Specs
  cy.tab();
  cy.focused()
    .click()
    .should('contain', 'Specs');

  // Reviews
  cy.tab();
  cy.focused()
    .click()
    .should('contain', 'Reviews');

  cy.tab();
  cy.focused()
    .should('contain', 'Write a Review')
    .click();

  cy.focused().should('have.attr', 'formcontrolname', 'title');

  cy.tab();
  cy.focused().should('have.attr', 'formcontrolname', 'comment');

  for (let i = 0; i < 5; i++) {
    cy.tab();
    cy.focused().should('have.class', 'star');
  }

  cy.tab();
  cy.focused().should('have.attr', 'formcontrolname', 'reviewerName');

  cy.tab();
  cy.focused().should('contain', 'Cancel');

  // TODO: submit button (below) is not working when the form is empty
  cy.tab();
  cy.focused().should('contain', 'Submit');

  cy.get('button')
    .contains('Cancel')
    .click();

  cy.tab();
  cy.focused().should('contain', 'George Reviewer');

  cy.tab();
  cy.focused().should('contain', 'Doris Reviewer');

  cy.tab();
  cy.focused().should('contain', 'Claudius Reviewer');

  cy.tab();
  cy.focused().should('contain', 'Nicko Reviewer');

  cy.tab();
  cy.focused().should('contain', 'Alistair Reviewer');

  cy.tab();
  cy.focused().should('contain', 'More');

  // Shipping
  cy.tab();
  cy.focused()
    .click()
    .should('contain', 'Shipping');
}
