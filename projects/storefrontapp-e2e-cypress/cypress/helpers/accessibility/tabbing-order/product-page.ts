import { checkAllElements, TabElement } from '../tabbing-order';

export function productPageTabbingOrder(config: TabElement[]) {
  cy.visit('/product/1990255');

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Digital Compacts');
  cy.get('cx-breadcrumb').should('contain', 'Sony');

  cy.get('cx-product-images cx-carousel')
    .find('cx-media')
    .first()
    .focus();

  checkAllElements(config);
}
