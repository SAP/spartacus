import { PRODUCT_LISTING } from './data-configuration';
import {
  checkFirstItem,
  createDefaultQueryRoute,
  createQueryRoute,
} from './product-search';

export const resultsTitle = 'cx-breadcrumb h1';

export function productTypeFlow(mobile?: string) {
  cy.server();

  createDefaultQueryRoute('query');

  cy.get('cx-searchbox input').type('sony{enter}');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  cy.get('cx-product-list-item').should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  checkFirstItem('10.2 Megapixel D-SLR with Standard Zoom Lens');

  // Filter by brand
  createQueryRoute('brand', 'sony', 'brand_query');

  clickFacet('Brand');

  cy.wait('@brand_query');

  cy.get(resultsTitle).should('contain', '86 results for "sony"');

  createDefaultQueryRoute('query1');

  clearSelectedFacet(mobile);

  cy.wait('@query1');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  // Filter by price
  createQueryRoute('price', 'sony', 'price_query');

  clickFacet('Price');

  cy.wait('@price_query')
    .its('url')
    .should('include', 'sony:relevance:price');

  cy.get(resultsTitle).should('contain', '16 results for "sony"');

  checkFirstItem('MSHX8A');

  createDefaultQueryRoute('query2');

  clearSelectedFacet(mobile);

  cy.wait('@query2');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  // Filter by category
  createQueryRoute('category', 'sony', 'category_query');

  clickFacet('Category');

  cy.wait('@category_query')
    .its('url')
    .should('include', 'sony:relevance:category');

  cy.get(resultsTitle).should('contain', '95 results for "sony"');

  checkFirstItem('10.2 Megapixel D-SLR with Standard Zoom Lens');

  createDefaultQueryRoute('query3');

  clearSelectedFacet(mobile);

  cy.wait('@query3');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  // Filter by color
  createQueryRoute('Colour', 'sony', 'color_query');

  clickFacet('Color');

  cy.wait('@color_query')
    .its('url')
    .should('include', 'sony:relevance:Colour');

  cy.get(resultsTitle).should('contain', '7 results for "sony"');

  checkFirstItem('NP-FV 70');

  createDefaultQueryRoute('query4');

  clearSelectedFacet(mobile);

  cy.wait('@query4');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');
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

function clickFacet(header: string) {
  cy.get('.cx-facet-header')
    .contains(header)
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });
}
