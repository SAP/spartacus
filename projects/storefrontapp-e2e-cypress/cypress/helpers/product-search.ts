import { apiUrl } from '../support/utils/login';
import { PRODUCT_LISTING } from './data-configuration';

export const resultsTitleSelector = 'cx-breadcrumb h1';
export const productItemSelector = 'cx-product-list cx-product-list-item';
export const productNameSelector = 'cx-product-list-item .cx-product-name';
export const firstProductItemSelector = `${productItemSelector}:first`;
export const pageLinkSelector = '.page-item.active > .page-link';
export const sortingOptionSelector = 'cx-sorting .ng-select:first';
export const firstProductPriceSelector = `${firstProductItemSelector} .cx-product-price`;
export const firstProductNameSelector = `${firstProductItemSelector} a.cx-product-name`;

export function clickSearchIcon() {
  cy.get('cx-searchbox cx-icon[aria-label="search"]').click();
}

export function assertFirstProduct() {
  cy.get(productNameSelector)
    .first()
    .invoke('text')
    .should('match', /\w+/);
}

export function checkDistinctProductName(firstProduct: string) {
  cy.get(productNameSelector)
    .first()
    .invoke('text')
    .should('match', /\w+/)
    .should('not.be.eq', firstProduct);
}

export function verifyProductSearch(
  productAlias: string,
  sortingAlias: string,
  sortBy: string
): void {
  cy.get(productNameSelector)
    .first()
    .invoke('text')
    .should('match', /\w+/)
    .then(firstProduct => {
      // Navigate to next page
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');

      cy.wait(productAlias);

      checkDistinctProductName(firstProduct);

      cy.get('cx-sorting .ng-select:first').ngSelect(sortBy);

      cy.wait(sortingAlias);

      cy.get('.page-item.active > .page-link').should('contain', '2');

      checkDistinctProductName(firstProduct);
    });
}

export function searchResult() {
  cy.get(resultsTitleSelector).should('contain', '144 results for "camera"');
  cy.get(productItemSelector).should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );
  cy.get(firstProductItemSelector).within(() => {
    cy.get('a.cx-product-name').should('be.visible');
  });
}

export function nextPage() {
  cy.get('.page-item:last-of-type .page-link:first').click({ force: true });
  cy.get(pageLinkSelector).should('contain', '2');
}

export function choosePage() {
  cy.get('.page-item:nth-child(4) .page-link:first').click({ force: true });
  cy.get(pageLinkSelector).should('contain', '3');
}

export function previousPage() {
  cy.get('.page-item:first-of-type .page-link:first').click({ force: true });
  cy.get(pageLinkSelector).should('contain', '2');
}

export function viewMode() {
  cy.get('cx-product-view > div > div:first').click({ force: true });
  cy.get('cx-product-list cx-product-grid-item').should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );
}

export function filterUsingFacetFiltering() {
  cy.get('.cx-facet-header')
    .contains('Stores')
    .parents('.cx-facet-group')
    .within(() => {
      cy.get('.cx-facet-checkbox')
        .first()
        .click({ force: true });
    });
  cy.get(resultsTitleSelector).should('contain', '79 results for "camera"');
}

export function clearActiveFacet(mobile?: string) {
  if (mobile) {
    console.log('in here');
    cy.get(
      `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
    ).click({ force: true });
  } else {
    console.log('out here');
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
    ).click({ force: true });
  }
  cy.get(resultsTitleSelector).should('contain', 'results for "camera"');
}

export function sortByLowestPrice() {
  createProductSortQuery('price-asc', 'query_price_asc');
  cy.get(sortingOptionSelector).ngSelect('Price (lowest first)');
  cy.wait('@query_price_asc');
  cy.get(firstProductPriceSelector).should('contain', '$1.58');
}

export function sortByHighestPrice() {
  createProductSortQuery('price-desc', 'query_price_desc');
  cy.get(sortingOptionSelector).ngSelect('Price (highest first)');
  cy.wait('@query_price_desc');
  cy.get(firstProductPriceSelector).should('contain', '$6,030.71');
}

export function sortByNameAscending() {
  createProductSortQuery('name-asc', 'query_name_asc');
  cy.get(sortingOptionSelector).ngSelect('Name (ascending)');
  cy.wait('@query_name_asc');
  cy.get(firstProductNameSelector).should('contain', '10.2 Megapixel D-SLR');
}

export function sortByNameDescending() {
  createProductSortQuery('name-desc', 'query_name_desc');
  cy.get(sortingOptionSelector).ngSelect('Name (descending)');
  cy.wait('@query_name_desc');
  cy.get(firstProductNameSelector).should('contain', 'Wide Strap for EOS 450D');
}

export function sortByRelevance() {
  createProductSortQuery('relevance', 'query_relevance');
  cy.get(sortingOptionSelector).ngSelect('Relevance');
  cy.wait('@query_relevance');
  cy.get(firstProductNameSelector).should('not.be.empty');
}

export function sortByTopRated() {
  cy.get(sortingOptionSelector).ngSelect('Top Rated');
  cy.get(firstProductNameSelector).should('not.be.empty');
}

export function checkFirstItem(productName: string): void {
  cy.get('cx-product-list-item .cx-product-name')
    .first()
    .should('contain', productName);
}

export function createProductQuery(alias: string): void {
  cy.route('GET', `${apiUrl}/rest/v2/electronics-spa/products/search*`).as(
    alias
  );
}

export function createProductSortQuery(sort: string, alias: string): void {
  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/products/search?fields=*&sort=${sort}*`
  ).as(alias);
}

export function createProductFacetQuery(
  param: string,
  search: string,
  alias: string
): void {
  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/products/search?fields=*&query=${search}:relevance:${param}*`
  ).as(alias);
}
