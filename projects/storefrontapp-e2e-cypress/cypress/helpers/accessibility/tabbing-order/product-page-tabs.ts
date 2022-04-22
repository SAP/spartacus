import { testProductUrl } from '../tabbing-order';

export function productPageTabsTabbingOrder() {
  cy.visit(testProductUrl);

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/779841/reviews`,
  }).as('reviews');

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Film cameras');
  cy.get('cx-breadcrumb').should('contain', 'Kodak');

  cy.get('cx-product-details-tab'); // wait for first tab to render
  cy.get('cx-product-attributes'); // wait for specs to render
  cy.get('cx-product-reviews'); // wait for reviews to render
  cy.get('p .tab-delivery'); // wait for shipping to render

  cy.get('button.active').contains('Product Details').first().focus();

  cy.wait('@reviews');

  // we don't use checkAllElements(), because we have to click tabs between checks

  // Specs
  cy.pressTab();

  cy.focused().click().should('contain', 'Specs');

  // Reviews
  cy.pressTab();

  cy.focused().click().should('contain', 'Reviews');

  cy.pressTab();
  cy.focused().should('contain', 'Write a Review').click();

  cy.focused().should('have.attr', 'formcontrolname', 'title');

  cy.pressTab();
  cy.focused().should('have.attr', 'formcontrolname', 'comment');

  for (let i = 0; i < 5; i++) {
    cy.pressTab();
    cy.focused().should('have.class', 'star');
  }

  cy.pressTab();
  cy.focused().should('have.attr', 'formcontrolname', 'reviewerName');

  cy.pressTab();
  cy.focused().should('contain', 'Cancel');

  // TODO: submit button (below) is not working when the form is empty
  cy.pressTab();
  cy.focused().should('contain', 'Submit');

  cy.get('button').contains('Cancel').click();

  cy.pressTab();
  cy.focused().should('contain', 'George Reviewer');

  cy.pressTab();
  cy.focused().should('contain', 'Doris Reviewer');

  cy.pressTab();
  cy.focused().should('contain', 'Claudius Reviewer');

  cy.pressTab();
  cy.focused().should('contain', 'Nicko Reviewer');

  cy.pressTab();
  cy.focused().should('contain', 'Alistair Reviewer');

  cy.pressTab();
  cy.focused().should('contain', 'More');

  // Shipping
  cy.pressTab();

  cy.focused().click().should('contain', 'Shipping');
}
