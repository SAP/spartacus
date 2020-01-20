import { checkAllElements, testProductUrl } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function productPageTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.visit(testProductUrl);

  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/products/779841/reviews*`
  ).as('reviews');

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Film cameras');
  cy.get('cx-breadcrumb').should('contain', 'Kodak');

  // add product and force "minus" button to be active
  cy.get('cx-item-counter button')
    .contains('+')
    .click();

  cy.get('cx-product-images cx-carousel')
    .find('cx-media')
    .first()
    .focus();

  cy.wait('@reviews');

  checkAllElements(config);
}
