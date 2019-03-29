import { PRODUCT_LISTING } from './data-configuration';

export const resultsTitle = 'cx-breadcrumb h1';

export function productTypeFlow(mobile?: string) {
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/products/search*').as('query');
  cy.get('cx-searchbox input').type('sony{enter}');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  cy.get('cx-product-list-item').should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  cy.get('cx-product-list-item')
    .first()
    .should('contain', '10.2 Megapixel D-SLR with Standard Zoom Lens');

  // Filter by brand
  cy.route(
    'GET',
    '/rest/v2/electronics-spa/products/search?fields=*&query=sony:relevance:brand*'
  ).as('brand_query');
  cy.get('.cx-facet-header')
    .contains('Brand')
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });

  cy.wait('@brand_query');

  cy.get(resultsTitle).should('contain', '86 results for "sony"');
  cy.get('cx-product-list-item')
    .first()
    .should('contain', '10.2 Megapixel D-SLR with Standard Zoom Lens');

  cy.route('GET', '/rest/v2/electronics-spa/products/search*').as('query1');

  if (mobile) {
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click({ force: true });
  } else {
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-container .cx-facet-filter-pill .close:first'
    ).click({ force: true });
  }

  cy.wait('@query1');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  // Filter by price
  cy.route(
    'GET',
    '/rest/v2/electronics-spa/products/search?fields=*&query=sony:relevance:price*'
  ).as('price_query');

  cy.get('.cx-facet-header')
    .contains('Price')
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });

  cy.wait('@price_query')
    .its('url')
    .should('include', 'sony:relevance:price');

  cy.get(resultsTitle).should('contain', '16 results for "sony"');
  cy.get('cx-product-list-item')
    .first()
    .should('contain', 'MSHX8A');

  cy.route('GET', '/rest/v2/electronics-spa/products/search*').as('query2');

  if (mobile) {
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click({ force: true });
  } else {
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-container .cx-facet-filter-pill .close:first'
    ).click({ force: true });
  }

  cy.wait('@query2');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  // Filter by category
  cy.route(
    'GET',
    '/rest/v2/electronics-spa/products/search?fields=*&query=sony:relevance:category*'
  ).as('category_query');

  cy.get('.cx-facet-header')
    .contains('Category')
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });

  cy.wait('@category_query')
    .its('url')
    .should('include', 'sony:relevance:category');

  cy.get(resultsTitle).should('contain', '95 results for "sony"');

  cy.get('cx-product-list-item')
    .first()
    .should('contain', '10.2 Megapixel D-SLR with Standard Zoom Lens');

  cy.route('GET', '/rest/v2/electronics-spa/products/search*').as('query3');

  if (mobile) {
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click({ force: true });
  } else {
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
    ).click({ force: true });
  }

  cy.wait('@query3');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');

  // Filter by color
  cy.route(
    'GET',
    '/rest/v2/electronics-spa/products/search?fields=*&query=sony:relevance:Colour*'
  ).as('color_query');

  cy.get('.cx-facet-header')
    .contains('Color')
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });

  cy.wait('@color_query')
    .its('url')
    .should('include', 'sony:relevance:Colour');

  cy.get(resultsTitle).should('contain', '7 results for "sony"');
  cy.get('cx-product-list-item')
    .first()
    .should('contain', 'NP-FV 70');

  cy.route('GET', '/rest/v2/electronics-spa/products/search*').as('query4');

  if (mobile) {
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click({ force: true });
  } else {
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-container .cx-facet-filter-pill .close:first'
    ).click({ force: true });
  }

  cy.wait('@query4');

  cy.get(resultsTitle).should('contain', '131 results for "sony"');
}
