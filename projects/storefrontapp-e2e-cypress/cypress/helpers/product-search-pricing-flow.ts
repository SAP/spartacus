import { PRODUCT_LISTING } from './data-configuration';
import { createGenericQuery, createQuery } from './product-search';

export function productPricingFlow() {
  cy.server();
  createGenericQuery('query');
  createQuery('price-asc', 'query_price_asc');

  // Click on a Category
  cy.get('header').within(() => {
    cy.get('cx-navigation-ui')
      .contains('Digital Cameras')
      .click();
    cy.get('.childs cx-generic-link')
      .contains('Compact Cameras')
      .click();
  });

  cy.get('cx-breadcrumb h1').should(
    'contain',
    '47 results for Digital Compacts'
  );

  cy.get('cx-product-list-item').should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  cy.get('cx-product-list-item .cx-product-name')
    .first()
    .invoke('text')
    .should('match', /\w+/)
    .then(firstProduct => {
      // Navigate to next page
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');

      cy.wait('@query');

      cy.get('cx-product-list-item .cx-product-name')
        .first()
        .invoke('text')
        .should('match', /\w+/)
        .should('not.be.eq', firstProduct);

      // Sort by price low to high
      cy.get('cx-sorting .ng-select:first').ngSelect(
        PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
      );

      cy.wait('@query_price_asc');

      cy.get('.page-item.active > .page-link').should('contain', '2');

      cy.get('cx-product-list-item .cx-product-name')
        .first()
        .invoke('text')
        .should('match', /\w+/)
        .should('not.be.eq', firstProduct);
    });
}
