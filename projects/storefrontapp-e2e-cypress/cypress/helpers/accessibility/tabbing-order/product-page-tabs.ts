import { testProductUrl } from '../tabbing-order';

export function productPageTabsTabbingOrder() {
  cy.visit(testProductUrl);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Film cameras');
  cy.get('cx-breadcrumb').should('contain', 'Kodak');

  cy.get('h3')
    .contains('Product Details')
    .first()
    .focus();

  cy.get('cx-tab-paragraph-container'); // wait for tabs to render

  // we don't use checkAllElements(), because we have to click tabs between checks

  // Specs
  cy.clickTab();
  cy.focused()
    .click()
    .should('contain', 'Specs');

  // Reviews
  cy.clickTab();
  cy.focused()
    .click()
    .should('contain', 'Reviews');

  cy.clickTab();
  cy.focused()
    .should('contain', 'Write a Review')
    .click();

  cy.focused().should('have.attr', 'formcontrolname', 'title');

  cy.clickTab();
  cy.focused().should('have.attr', 'formcontrolname', 'comment');

  for (let i = 0; i < 5; i++) {
    cy.clickTab();
    cy.focused().should('have.class', 'star');
  }

  cy.clickTab();
  cy.focused().should('have.attr', 'formcontrolname', 'reviewerName');

  cy.clickTab();
  cy.focused().should('contain', 'Cancel');

  // TODO: submit button (below) is not working when the form is empty
  cy.clickTab();
  cy.focused().should('contain', 'Submit');

  cy.get('button')
    .contains('Cancel')
    .click();

  cy.clickTab();
  cy.focused().should('contain', 'George Reviewer');

  cy.clickTab();
  cy.focused().should('contain', 'Doris Reviewer');

  cy.clickTab();
  cy.focused().should('contain', 'Claudius Reviewer');

  cy.clickTab();
  cy.focused().should('contain', 'Nicko Reviewer');

  cy.clickTab();
  cy.focused().should('contain', 'Alistair Reviewer');

  cy.clickTab();
  cy.focused().should('contain', 'More');

  // Shipping
  cy.clickTab();
  cy.focused()
    .click()
    .should('contain', 'Shipping');
}
