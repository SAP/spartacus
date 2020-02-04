import { PRODUCT_LISTING } from './data-configuration';
import { checkFirstItem, createProductQuery } from './product-search';
import Chainable = Cypress.Chainable;
import WaitXHR = Cypress.WaitXHR;
import ObjectLike = Cypress.ObjectLike;

export const resultsTitle = 'cx-breadcrumb h1';

enum queries {
  q1 = 'query1',
  q2 = 'query2',
  q3 = 'query3',
  q4 = 'query4',
  q5 = 'query5',
}
export function productStoreFlow(mobile?: string) {
  cy.server();

  createProductQuery(queries.q1);

  cy.get('cx-searchbox input').type('canon{enter}');

  waitAndGetFirstProductFromXHR(queries.q1)
    .then(firstItem => {
      cy.get(resultsTitle).should('contain', '73 results for "canon"');

      cy.get('cx-product-list-item').should(
        'have.length',
        PRODUCT_LISTING.PRODUCTS_PER_PAGE
      );
      // checkFirstItem('ACK-E5 AC Adapter Kit');
      checkFirstItem(firstItem);
      // Navigate to next page
      createProductQuery(queries.q2);
      cy.get('.page-item:last-of-type .page-link:first').click();
    })
    .then(() => waitAndGetFirstProductFromXHR(queries.q2))
    .then(firstItem => {
      cy.get('.page-item.active > .page-link').should('contain', '2');

      checkFirstItem(firstItem);
      // Sort by name descending
      createProductQuery(queries.q3);
      cy.get('cx-sorting .ng-select:first').ngSelect(
        PRODUCT_LISTING.SORTING_TYPES.BY_NAME_DESC
      );
    })
    .then(() => waitAndGetFirstProductFromXHR(queries.q3))
    .then(firstItem => {
      cy.get('.page-item.active > .page-link').should('contain', '2');

      checkFirstItem(firstItem);
      createProductQuery(queries.q4);
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
    .then(() => waitAndGetFirstProductFromXHR(queries.q4))
    .then(firstItem => {
      cy.get('.page-item.active > .page-link').should('contain', '1');
      cy.get(resultsTitle).should('contain', '44 results for "canon"');

      checkFirstItem(firstItem);
      createProductQuery(queries.q5);
      if (mobile) {
        cy.get(
          `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
        ).click();
      } else {
        cy.get(
          'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
        ).click();
      }
    })
    .then(() => waitAndGetFirstProductFromXHR(queries.q5))
    .then(() => {
      cy.get(resultsTitle).should('contain', '73 results for "canon"');

      // Add product to cart from search listing page
      cy.get('cx-add-to-cart:first button').click({ force: true });
      cy.get('.cx-dialog-header .close').click();
      cy.get('cx-mini-cart .count').should('contain', '1');
    });
}

function waitAndGetFirstProductFromXHR(query): Chainable<string> {
  return cy.wait(`@${query}`).then((xhr: WaitXHR) => {
    if (xhr.aborted) {
      return waitAndGetFirstProductFromXHR(query);
    } else {
      return getFirstItemFromXHR(xhr);
    }
  });
}

function getFirstItemFromXHR(xhr: WaitXHR): string {
  const body = xhr.response.body as ObjectLike;
  return body.products[0].name;
}
