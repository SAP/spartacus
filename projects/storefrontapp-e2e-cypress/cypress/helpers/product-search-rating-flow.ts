import { PRODUCT_LISTING } from './data-configuration';
import {
  assertFirstProduct,
  assertNumberOfProducts,
  clearSelectedFacet,
  clickFacet,
  clickSearchIcon,
  createProductQuery,
  createProductSortQuery,
  pageLinkSelector,
  previousPage,
  QUERY_ALIAS,
  verifyProductSearch,
} from './product-search';

export const resultsTitle = 'cx-breadcrumb h1';
export const tabsHeaderList = 'cx-tab-paragraph-container > button';
const productName = 'DSC-N1';

export function productRatingFlow(mobile?: string) {
  cy.server();

  createProductQuery(
    QUERY_ALIAS.FIRST_PAGE,
    productName,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE,
    `&currentPage=1`
  );
  createProductQuery(
    QUERY_ALIAS.DSC_N1,
    productName,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );
  createProductSortQuery('topRated', QUERY_ALIAS.TOP_RATED_FILTER);

  clickSearchIcon();

  cy.get('cx-searchbox input').type(`${productName}{enter}`);

  cy.wait(`@${QUERY_ALIAS.DSC_N1}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.DSC_N1}`, `"${productName}"`);

  verifyProductSearch(
    QUERY_ALIAS.FIRST_PAGE,
    QUERY_ALIAS.TOP_RATED_FILTER,
    PRODUCT_LISTING.SORTING_TYPES.BY_TOP_RATED
  );

  // Navigate to previous page
  previousPage();
  cy.wait(`@${QUERY_ALIAS.TOP_RATED_FILTER}`)
    .its('status')
    .should('eq', 200);

  // active paginated number
  cy.get(pageLinkSelector).should('contain', `1`);

  assertFirstProduct();

  // Filter by category
  clickFacet('Category');

  cy.wait(`@${QUERY_ALIAS.TOP_RATED_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(
    `@${QUERY_ALIAS.TOP_RATED_FILTER}`,
    `"${productName}"`
  );

  assertFirstProduct();

  clearSelectedFacet(mobile);

  cy.wait(`@${QUERY_ALIAS.TOP_RATED_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(
    `@${QUERY_ALIAS.TOP_RATED_FILTER}`,
    `"${productName}"`
  );

  // Select product and read all the tabs on product details page
  cy.get('cx-product-list-item:first .cx-product-name').click();
  cy.get(tabsHeaderList)
    .eq(0)
    .should('contain', 'Product Details');
  cy.get(tabsHeaderList)
    .eq(1)
    .should('contain', 'Specs');
  cy.get(tabsHeaderList)
    .eq(2)
    .should('contain', 'Reviews');
  cy.get(tabsHeaderList)
    .eq(3)
    .should('contain', 'Shipping');
}
