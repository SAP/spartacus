import { PRODUCT_LISTING } from './data-configuration';
import { apiUrl } from '../support/utils/login';

export const resultsTitleSelector = 'cx-breadcrumb h1';
export const productItemSelector = 'cx-product-list cx-product-list-item';
export const firstProductItemSelector = `${productItemSelector}:first`;
export const pageLinkSelector = '.page-item.active > .page-link';
export const sortingOptionSelector = 'cx-sorting .ng-select:first';
export const firstProductPriceSelector = `${firstProductItemSelector} .cx-product-price`;
export const firstProductNameSelector = `${firstProductItemSelector} a.cx-product-name`;

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
  cy.get('.page-item:last-of-type .page-link:first').click();
  cy.get(pageLinkSelector).should('contain', '2');
}

export function choosePage() {
  cy.get('.page-item:nth-child(4) .page-link:first').click();
  cy.get(pageLinkSelector).should('contain', '3');
}

export function previousPage() {
  cy.get('.page-item:first-of-type .page-link:first').click();
  cy.get(pageLinkSelector).should('contain', '2');
}

export function viewMode() {
  cy.get('cx-product-view > div > div:first').click();
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
    ).click();
  } else {
    console.log('out here');
    cy.get(
      'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
    ).click();
  }
  cy.get(resultsTitleSelector).should('contain', 'results for "camera"');
}

export function sortByLowestPrice() {
  cy.get(sortingOptionSelector).ngSelect('Price (lowest first)');
  cy.get(firstProductPriceSelector).should('contain', '$1.58');
}

export function sortByHighestPrice() {
  cy.get(sortingOptionSelector).ngSelect('Price (highest first)');
  cy.get(firstProductPriceSelector).should('contain', '$6,030.71');
}

export function sortByNameAscending() {
  cy.get(sortingOptionSelector).ngSelect('Name (ascending)');
  cy.get(firstProductNameSelector).should('contain', '10.2 Megapixel D-SLR');
}

export function sortByNameDescending() {
  cy.get(sortingOptionSelector).ngSelect('Name (descending)');
  cy.get(firstProductNameSelector).should('contain', 'Wide Strap for EOS 450D');
}

export function sortByRelevance() {
  cy.get(sortingOptionSelector).ngSelect('Relevance');
  cy.get(firstProductNameSelector).should('not.be.empty');
}

export function sortByTopRated() {
  cy.get(sortingOptionSelector).ngSelect('Top Rated');
  cy.get(firstProductNameSelector).should('not.be.empty');
}

export function checkFirstItem(title: string): void {
  cy.get('cx-product-list-item .cx-product-name')
    .first()
    .should('contain', title);
}
export function createDefaultQueryRoute(alias: string): void {
  cy.route('GET', `${apiUrl}/rest/v2/electronics-spa/products/search*`).as(
    alias
  );
}

export function createQueryRoute(
  param: string,
  search: string,
  alias: string
): void {
  cy.route(
    'GET',
    `${apiUrl}/rest/v2/electronics-spa/products/search?fields=*&query=${search}:relevance:${param}*`
  ).as(alias);
}
