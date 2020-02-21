import { PRODUCT_LISTING } from './data-configuration';
import {
  assertNumberOfProducts,
  checkFirstItem,
  clickSearchIcon,
  createProductFacetQuery,
  createProductQuery,
  QUERY_ALIAS,
} from './product-search';

export const resultsTitle = 'cx-breadcrumb h1';
export const category = 'sony';

export function productTypeFlow(mobile?: string) {
  cy.server();

  createProductQuery(
    QUERY_ALIAS.SONY,
    category,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  clickSearchIcon();

  cy.get('cx-searchbox input[aria-label="search"]').type(`${category}{enter}`);

  cy.wait(`@${QUERY_ALIAS.SONY}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.SONY}`, `"${category}"`);

  checkFirstItem('10.2 Megapixel D-SLR with Standard Zoom Lens');

  // Filter by brand
  createProductFacetQuery('brand', category, QUERY_ALIAS.BRAND_PAGE);

  clickFacet('Brand');

  cy.wait(`@${QUERY_ALIAS.BRAND_PAGE}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.BRAND_PAGE}`, `"${category}"`);

  createProductQuery(
    QUERY_ALIAS.SONY_CLEAR_FACET,
    `${category}:relevance`,
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  clearSelectedFacet(mobile);

  cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.SONY}`, `"${category}"`);

  // Filter by price
  createProductFacetQuery('price', category, QUERY_ALIAS.PRICE_DSC_FILTER);

  clickFacet('Price');

  cy.wait(`@${QUERY_ALIAS.PRICE_DSC_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.PRICE_DSC_FILTER}`, `"${category}"`);

  checkFirstItem('MSHX8A');

  clearSelectedFacet(mobile);

  cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`, `"${category}"`);

  // Filter by category
  createProductFacetQuery('category', category, QUERY_ALIAS.CATEGORY_FILTER);

  clickFacet('Category');

  cy.wait(`@${QUERY_ALIAS.CATEGORY_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.CATEGORY_FILTER}`, `"${category}"`);

  checkFirstItem('10.2 Megapixel D-SLR with Standard Zoom Lens');

  clearSelectedFacet(mobile);

  cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`, `"${category}"`);

  // Filter by color
  createProductFacetQuery('Colour', category, QUERY_ALIAS.COLOR_FILTER);

  clickFacet('Color');

  cy.wait(`@${QUERY_ALIAS.COLOR_FILTER}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.COLOR_FILTER}`, `"${category}"`);

  checkFirstItem('InfoLITHIUM™ H Series Battery');

  clearSelectedFacet(mobile);

  cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
    .its('status')
    .should('eq', 200);

  assertNumberOfProducts(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`, `"${category}"`);
}

function clearSelectedFacet(mobile: string) {
  if (mobile) {
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click({ force: true });
  } else {
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-container .cx-facet-filter-pill .close:first'
    ).click({ force: true });
  }
}

export function clickFacet(header: string) {
  cy.get('.cx-facet-header')
    .contains(header)
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });
}
