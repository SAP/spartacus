import { PRODUCT_LISTING } from './data-configuration';
import {
  assertNumberOfProducts,
  clearSelectedFacet,
  clickFacet,
  createProductQuery,
  createProductSortQuery,
  QUERY_ALIAS,
  verifyProductSearch,
} from './product-search';

export const resultsTitle = 'cx-breadcrumb h1';
const category = 'canon';

export function productStoreFlow(mobile?: string) {
  cy.server();

  // createProductQuery(queries.q1);
  createProductQuery(
    QUERY_ALIAS.CANON,
    category,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );
  createProductQuery(
    QUERY_ALIAS.FIRST_PAGE,
    category,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE,
    `&currentPage=1`
  );
  createProductSortQuery('name-desc', QUERY_ALIAS.NAME_DSC_FILTER);

  cy.get('cx-searchbox input').type('canon{enter}');

  cy.wait(`@${QUERY_ALIAS.CANON}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.CANON}`, `"${category}"`);

  verifyProductSearch(
    QUERY_ALIAS.FIRST_PAGE,
    QUERY_ALIAS.NAME_DSC_FILTER,
    PRODUCT_LISTING.SORTING_TYPES.BY_NAME_DESC
  );

  clickFacet('Stores');

  cy.wait(`@${QUERY_ALIAS.NAME_DSC_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.NAME_DSC_FILTER}`, `"${category}"`);

  clearSelectedFacet(mobile);

  cy.wait(`@${QUERY_ALIAS.NAME_DSC_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.NAME_DSC_FILTER}`, `"${category}"`);

  // Add product to cart from search listing page
  cy.get('cx-add-to-cart:first button').click({ force: true });
  cy.get('.cx-dialog-header .close').click();
  cy.get('cx-mini-cart .count').should('contain', '1');
}
