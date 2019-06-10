import { PRODUCT_LISTING } from './data-configuration';
import {
  createProductQuery,
  productNameSelector,
  createProductSortQuery,
  productItemSelector,
  checkDistinctProductName,
} from './product-search';

export function productPricingFlow() {
  cy.server();
  createProductQuery('productQuery');
  createProductSortQuery('price-asc', 'query_price_asc');

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

  cy.get(productItemSelector).should(
    'have.length',
    PRODUCT_LISTING.PRODUCTS_PER_PAGE
  );

  cy.get(productNameSelector)
    .first()
    .invoke('text')
    .should('match', /\w+/)
    .then(firstProduct => {
      // Navigate to next page
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');

      cy.wait('@productQuery');

      checkDistinctProductName(firstProduct);

      // Sort by price low to high
      cy.get('cx-sorting .ng-select:first').ngSelect(
        PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
      );

      cy.wait('@query_price_asc');

      cy.get('.page-item.active > .page-link').should('contain', '2');

      checkDistinctProductName(firstProduct);
    });
}
