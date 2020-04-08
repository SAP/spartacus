import { baseEndPoint } from '../../constants/backend';
import { testProductUrl, verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.ProductDetailsPageTemplate .Summary';

export function productPageTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.visit(testProductUrl);

  cy.route(`${baseEndPoint}/products/779841/reviews*`).as('reviews');

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Film cameras');
  cy.get('cx-breadcrumb').should('contain', 'Kodak');

  // add product and force "minus" button to be active
  cy.get('cx-item-counter button').contains('+').click();

  cy.wait('@reviews');

  verifyTabbingOrder(containerSelector, config);
}
