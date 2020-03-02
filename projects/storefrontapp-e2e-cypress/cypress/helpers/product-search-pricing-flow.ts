import { PRODUCT_LISTING } from './data-configuration';
import {
  assertNumberOfProducts,
  createProductQuery,
  createProductSortQuery,
  QUERY_ALIAS,
  verifyProductSearch,
} from './product-search';

// compact cameras category ID
const categoryId = '576';
const category = 'Digital Compacts';

export function productPricingFlow() {
  cy.server();
  createProductQuery(
    QUERY_ALIAS.FIRST_PAGE,
    `:relevance:allCategories:${categoryId}`,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE,
    `&currentPage=1`
  );
  createProductSortQuery('price-asc', QUERY_ALIAS.PRICE_ASC_FILTER);

  createProductQuery(
    QUERY_ALIAS.CATEGORY_PAGE,
    `:relevance:allCategories:${categoryId}`,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  // Click on a Category
  cy.get('header').within(() => {
    cy.get('cx-navigation-ui')
      .contains('Digital Cameras')
      .click({ force: true });
    cy.get('.childs cx-generic-link')
      .contains('Compact Cameras')
      .click({ force: true });
  });

  cy.wait(`@${QUERY_ALIAS.CATEGORY_PAGE}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.CATEGORY_PAGE}`, category);

  verifyProductSearch(
    QUERY_ALIAS.FIRST_PAGE,
    QUERY_ALIAS.PRICE_ASC_FILTER,
    PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
  );
}
