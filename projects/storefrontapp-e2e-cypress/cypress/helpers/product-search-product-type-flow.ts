import { PRODUCT_LISTING } from './data-configuration';
import {
  checkFirstItem,
  clickSearchIcon,
  createProductFacetQuery,
  createProductQuery,
  productItemSelector,
} from './product-search';

export const resultsTitle = 'cx-breadcrumb h1';

const sonySearchResults = 130;
const sonyBrandFilter = 85;
const sonyPriceFilter = 16;
const sonyCategoryFilter = 94;
const sonyColorFilter = 7;

export function productTypeFlow(mobile?: string) {
  cy.server();

  createProductQuery('query');

  clickSearchIcon();

  cy.get('cx-searchbox input[aria-label="search"]').type('sony{enter}');

  cy.get(resultsTitle).should(
    'contain',
    `${sonySearchResults} results for "sony"`
  );

  cy.get(productItemSelector).should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  checkFirstItem('10.2 Megapixel D-SLR with Standard Zoom Lens');

  // Filter by brand
  createProductFacetQuery('brand', 'sony', 'brand_query');

  clickFacet('Brand');

  cy.wait('@brand_query')
    .its('status')
    .should('eq', 200);

  cy.get(resultsTitle).should(
    'contain',
    `${sonyBrandFilter} results for "sony"`
  );

  createProductQuery('query1');

  clearSelectedFacet(mobile);

  cy.wait('@query1')
    .its('status')
    .should('eq', 200);

  cy.get(resultsTitle).should(
    'contain',
    `${sonySearchResults} results for "sony"`
  );

  // Filter by price
  createProductFacetQuery('price', 'sony', 'price_query');

  clickFacet('Price');

  cy.wait('@price_query')
    .its('url')
    .should('include', 'sony:relevance:price');

  cy.get(resultsTitle).should(
    'contain',
    `${sonyPriceFilter} results for "sony"`
  );

  checkFirstItem('MSHX8A');

  createProductQuery('query2');

  clearSelectedFacet(mobile);

  cy.wait('@query2')
    .its('status')
    .should('eq', 200);

  cy.get(resultsTitle).should(
    'contain',
    `${sonySearchResults} results for "sony"`
  );

  // Filter by category
  createProductFacetQuery('category', 'sony', 'category_query');

  clickFacet('Category');

  cy.wait('@category_query')
    .its('url')
    .should('include', 'sony:relevance:category');

  cy.get(resultsTitle).should(
    'contain',
    `${sonyCategoryFilter} results for "sony"`
  );

  checkFirstItem('10.2 Megapixel D-SLR with Standard Zoom Lens');

  createProductQuery('query3');

  clearSelectedFacet(mobile);

  cy.wait('@query3')
    .its('status')
    .should('eq', 200);

  cy.get(resultsTitle).should(
    'contain',
    `${sonySearchResults} results for "sony"`
  );

  // Filter by color
  createProductFacetQuery('Colour', 'sony', 'color_query');

  clickFacet('Color');

  cy.wait('@color_query')
    .its('url')
    .should('include', 'sony:relevance:Colour');

  cy.get(resultsTitle).should(
    'contain',
    `${sonyColorFilter} results for "sony"`
  );

  checkFirstItem('InfoLITHIUM™ H Series Battery');

  createProductQuery('query4');

  clearSelectedFacet(mobile);

  cy.wait('@query4')
    .its('status')
    .should('eq', 200);

  cy.get(resultsTitle).should(
    'contain',
    `${sonySearchResults} results for "sony"`
  );
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
