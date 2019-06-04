import { PRODUCT_LISTING } from './data-configuration';
import { checkFirstItem, createGenericQuery } from './product-search';
import { apiUrl } from '../support/utils/login';

export function productPricingFlow() {
  cy.server();
  createGenericQuery('query');
  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/products/search?fields=*&sort=price-asc*`
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

  checkFirstItem('DSC-S930');

  // Navigate to next page
  cy.get('.page-item:last-of-type .page-link:first').click();
  cy.get('.page-item.active > .page-link').should('contain', '2');

  cy.wait('@query');

  cy.get('cx-product-list-item:nth-child(1)').should(
    'contain',
    'EASYSHARE Z730 Zoom Digital Camera'
  );

  // Sort by price low to high
  cy.get('cx-sorting .ng-select:first').ngSelect(
    PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
  );

  cy.wait('@query_price_asc');

  cy.get('.page-item.active > .page-link').should('contain', '2');

  cy.get('cx-product-list-item:first .cx-product-name').should(
    'contain',
    'DSC-W180'
  );
}
