import { PRODUCT_LISTING } from './data-configuration';
import { checkFirstItem } from './product-search';

export function productPricingFlow() {
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/products/search*').as('query');
  cy.route(
    'GET',
    '/rest/v2/electronics-spa/products/search?fields=*&sort=price-asc*'
  ).as('query_price_asc');

  // Click on a Category
  cy.get('header').within(() => {
    cy.get('.nav-link')
      .contains('Digital Cameras')
      .click();
    cy.get('.cx-nav-child-link')
      .contains('Compact Cameras')
      .click();
  });

  cy.get('cx-breadcrumb h1').should(
    'contain',
    '47 results for Digital Compacts'
  );

  cy.get('cx-product-list-item').should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  checkFirstItem('DSC-WX1');

  // Navigate to next page
  cy.get('.page-item:last-of-type .page-link:first').click();
  cy.get('.page-item.active > .page-link').should('contain', '2');

  cy.wait('@query');

  checkFirstItem('PowerShot A480');

  // Sort by price low to high
  cy.get('cx-sorting .ng-select:first').ngSelect(
    PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
  );

  cy.wait('@query_price_asc');

  cy.get('.page-item.active > .page-link').should('contain', '2');

  checkFirstItem('DSC-WX180');
}
