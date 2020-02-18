import { PRODUCT_LISTING } from './data-configuration';
import {
  assertFirstProduct,
  clickSearchIcon,
  createProductQuery,
  createProductSortQuery,
  verifyProductSearch,
} from './product-search';

export const resultsTitle = 'cx-breadcrumb h1';
export const tabsHeaderList = 'cx-tab-paragraph-container > h3';

const productSelector = 'cx-product-list-item';

const searchResults = 17;
const topResultQuery = 1;
const byCategoryQuery = 16;

export function productRatingFlow(mobile?: string) {
  cy.server();
  createProductQuery('productQuery');
  createProductSortQuery('topRated', 'query-topRated');

  clickSearchIcon();
  const productName = 'DSC-N1';
  cy.get('cx-searchbox input').type(`${productName}{enter}`);

  cy.get(resultsTitle).should(
    'contain',
    `${searchResults} results for "${productName}"`
  );

  cy.get(productSelector).should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  verifyProductSearch(
    '@productQuery',
    '@query-topRated',
    PRODUCT_LISTING.SORTING_TYPES.BY_TOP_RATED
  );

  // Navigate to previous page
  cy.get('cx-pagination a.current')
    .prev()
    .first()
    .click();
  cy.wait('@query-topRated');

  cy.get('cx-pagination a.current').should('contain', `${topResultQuery}`);

  assertFirstProduct();

  // Filter by category
  cy.get('.cx-facet-header')
    .contains('Category')
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });

  cy.wait('@productQuery');

  cy.get(resultsTitle).should(
    'contain',
    `${byCategoryQuery} results for "DSC-N1"`
  );
  assertFirstProduct();

  if (mobile) {
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click();
  } else {
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
    ).click();
  }
  cy.wait('@productQuery');

  cy.get(resultsTitle).should('contain', '17 results for "DSC-N1"');

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
