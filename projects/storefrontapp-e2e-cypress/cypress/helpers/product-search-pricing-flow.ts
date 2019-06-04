import { PRODUCT_LISTING } from './data-configuration';
import { checkFirstItem, createDefaultQueryRoute } from './product-search';
import { apiUrl } from '../support/utils/login';

export function productPricingFlow() {
  cy.server();
  createDefaultQueryRoute('query');
  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/products/search?fields=*&sort=price-asc*`
  ).as('query_price_asc');

  // Click on a Category
  cy.get('cx-searchbox input').type('camcorders{enter}');

  cy.get('cx-breadcrumb h1').should('contain', '29 results for "camcorders"');

  cy.get('cx-product-list-item').should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  checkFirstItem('Light HVL-20DW2');

  // Navigate to next page
  cy.get('.page-item:last-of-type .page-link:first').click();
  cy.get('.page-item.active > .page-link').should('contain', '2');

  cy.wait('@query');

  cy.get('cx-product-list-item:nth-child(1)').should(
    'contain',
    'Secure Digital Card 2GB'
  );

  // Sort by price low to high
  cy.get('cx-sorting .ng-select:first').ngSelect(
    PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
  );

  cy.wait('@query_price_asc');

  cy.get('.page-item.active > .page-link').should('contain', '2');

  cy.get('cx-product-list-item:first .cx-product-name').should(
    'contain',
    'Light HVL-20DW2'
  );
}
