import { PRODUCT_LISTING } from './data-configuration';
import { checkFirstItem, createDefaultQueryRoute } from './product-search';
import Chainable = Cypress.Chainable;
import WaitXHR = Cypress.WaitXHR;
import ObjectLike = Cypress.ObjectLike;

export const resultsTitle = 'cx-breadcrumb h1';

export function productStoreFlow(mobile?: string) {
  cy.server();

  // Search for a product
  createDefaultQueryRoute('query');
  cy.get('cx-searchbox input').type('canon{enter}');
  cy.wait('@query'); // Workaround: skipping aborted response
  waitAndGetFirstProductFromXHR()
    .then(firstItem => {
      cy.get(resultsTitle).should('contain', '77 results for "canon"');

      cy.get('cx-product-list-item').should(
        'have.length',
        PRODUCT_LISTING.PRODUCTS_PER_PAGE
      );
      // checkFirstItem('ACK-E5 AC Adapter Kit');
      checkFirstItem(firstItem);

      // Navigate to next page
      cy.get('.page-item:last-of-type .page-link:first').click();
    })
    .then(waitAndGetFirstProductFromXHR)
    .then(firstItem => {
      cy.get('.page-item.active > .page-link').should('contain', '2');

      checkFirstItem(firstItem);

      // Sort by name descending
      cy.get('cx-sorting .ng-select:first').ngSelect(
        PRODUCT_LISTING.SORTING_TYPES.BY_NAME_DESC
      );
    })
    .then(waitAndGetFirstProductFromXHR)
    .then(firstItem => {
      cy.get('.page-item.active > .page-link').should('contain', '2');

      checkFirstItem(firstItem);

      // Filter by stores
      cy.get('.cx-facet-header')
        .contains('Stores')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click({ force: true });
        });
    })
    .then(waitAndGetFirstProductFromXHR)
    .then(firstItem => {
      cy.get('.page-item.active > .page-link').should('contain', '1');
      cy.get(resultsTitle).should('contain', '45 results for "canon"');

      checkFirstItem(firstItem);

      if (mobile) {
        cy.get(
          `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
        ).click();
      } else {
        cy.get(
          'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
        ).click();
      }

      cy.wait('@query');
      cy.get(resultsTitle).should('contain', '77 results for "canon"');

      // Add product to cart from search listing page
      cy.get('cx-add-to-cart:first button').click({ force: true });
      cy.get('.cx-dialog-header .close').click();
      cy.get('cx-mini-cart .count').should('contain', '1');
    });
}

function waitAndGetFirstProductFromXHR(): Chainable<string> {
  return cy.wait('@query').then(getFirstItemFromXHR);
}

function getFirstItemFromXHR(xhr: WaitXHR): string {
  const body = xhr.response.body as ObjectLike;
  return body.products[0].name;
}
