import * as storeFinder from '../../../helpers/store-finder';
context('Store finder', () => {
  before(() => {
    cy.visit('/store-finder');
  });

  //TODO uncomment once stores search works in the backend
  it.skip('should show stores that matches search query', () => {
    cy.get('cx-store-finder-search').within(() => {
      cy.get('input').type('Tokyo');
      cy.get('.search').click();
    });

    cy.get(storeFinder.searchResults).should('have.length.greaterThan', 0);
    cy.get(storeFinder.resultListItem)
      .first()
      .within(() => {
        cy.get(storeFinder.storeName).should('not.to.be.empty');
        cy.get('.cx-store-address').should('not.to.be.empty');
      });

    cy.get(storeFinder.googleMap);
  });

  //TODO uncomment once stores search works in the backend
  it.skip('should allow to select store from result list', () => {
    cy.get(storeFinder.resultListItem)
      .first()
      .within(() => {
        cy.get('.cx-store-name button').click();
      });

    cy.get('.cx-store-details').should('exist');
  });

  // Core e2e test.
  storeFinder.testAllowViewAllStores();

  // Core e2e test.
  storeFinder.testAllowViewStoreDetails();

  // Test depends on core tests for setup.
  it('should call back action and go to country all stores', () => {
    cy.get('.cx-store').should('exist');
    cy.get('cx-store-finder .btn-action')
      .should('have.text', ' Back to list ')
      .click();
    cy.url().should('contain', '/store-finder/country/');
  });
});
