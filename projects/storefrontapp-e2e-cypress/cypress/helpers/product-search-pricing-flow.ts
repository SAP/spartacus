import { PRODUCT_LISTING } from './data-configuration';
import {
  createCategoryPaginationQuery,
  createProductSortQuery,
  productItemSelector,
  searchUrlPrefix,
  verifyProductSearch,
} from './product-search';

// compact cameras category ID
const categoryId = '576';

export function productPricingFlow() {
  cy.server();
  createCategoryPaginationQuery(
    'first_page_query',
    categoryId,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE,
    '1'
  );
  createProductSortQuery('price-asc', 'query_price_asc');

  cy.route(
    'GET',
    `${searchUrlPrefix}?fields=*&query=:relevance:category:${categoryId}&pageSize=10&lang=en&curr=USD`
  ).as('category_query');

  // Click on a Category
  cy.get('header').within(() => {
    cy.get('cx-navigation-ui')
      .contains('Digital Cameras')
      .click({ force: true });
    cy.get('.childs cx-generic-link')
      .contains('Compact Cameras')
      .click({ force: true });
  });

  cy.wait('@category_query').then(xhr => {
    const results = xhr.response.body.pagination.totalResults;

    cy.get('cx-breadcrumb h1').should(
      'contain',
      `${results} results for Digital Compacts`
    );

    cy.get(productItemSelector).should(
      'have.length',
      PRODUCT_LISTING.PRODUCTS_PER_PAGE
    );
  });

  verifyProductSearch(
    '@first_page_query',
    '@query_price_asc',
    PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
  );
}
