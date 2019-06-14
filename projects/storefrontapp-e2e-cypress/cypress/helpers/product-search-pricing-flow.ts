import { PRODUCT_LISTING } from './data-configuration';
import {
  createProductQuery,
  createProductSortQuery,
  productItemSelector,
  verifyProductSearch,
} from './product-search';

export function productPricingFlow() {
  cy.server();
  createProductQuery('productQuery');
  createProductSortQuery('price-asc', 'query_price_asc');

  // Click on a Category
  cy.get('header').within(() => {
    cy.get('cx-navigation-ui')
      .contains('Digital Cameras')
      .click({ force: true });
    cy.get('.childs cx-generic-link')
      .contains('Compact Cameras')
      .click({ force: true });
  });

  cy.get('cx-breadcrumb h1').should(
    'contain',
    '47 results for Digital Compacts'
  );

  cy.get(productItemSelector).should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  verifyProductSearch(
    '@productQuery',
    '@query_price_asc',
    PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
  );
}
