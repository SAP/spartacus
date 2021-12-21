context('Store finder', () => {
  const googleMap = 'cx-store-finder-map .cx-store-map .gm-style';
  const searchResults = 'cx-store-finder-list .cx-columns .cx-list-items';
  const resultListItem = 'cx-store-finder-list-item';
  const storeName = '.cx-store-name';
  const storeAddressDescription = '.cx-store-description-address';
  const openingHours = '.cx-schedule';
  const contactDetails = '.cx-contact';

  before(() => {
    cy.visit('/store-finder');
  });

  //TODO uncomment once stores search works in the backend
  it.skip('should show stores that matches search query', () => {
    cy.get('cx-store-finder-search').within(() => {
      cy.get('input').type('Tokyo');
      cy.get('.search').click();
    });

    cy.get(searchResults).should('have.length.greaterThan', 0);
    cy.get(resultListItem)
      .first()
      .within(() => {
        cy.get(storeName).should('not.to.be.empty');
        cy.get('.cx-store-address').should('not.to.be.empty');
      });

    cy.get(googleMap);
  });

  //TODO uncomment once stores search works in the backend
  it.skip('should allow to select store from result list', () => {
    cy.get(resultListItem)
      .first()
      .within(() => {
        cy.get('.cx-store-name button').click();
      });

    cy.get('.cx-store-details').should('exist');
  });

  it('should allow to view all stores', () => {
    cy.findByText('View all stores').click();
    cy.get('.country-header-link').eq(0).click();
    cy.get(resultListItem).should('have.length.greaterThan', 0);
  });

  it('should allow to see store details', () => {
    cy.get(resultListItem)
      .first()
      .within(() => {
        cy.get('.cx-store-name a').click();
      });

    cy.get(storeAddressDescription).should('not.to.be.empty');
    cy.get(openingHours).should('not.to.be.empty');
    cy.get(contactDetails).should('not.to.be.empty');

    cy.get(googleMap);
  });

  it('should call back action and go to country all stores', () => {
    cy.get('.cx-store').should('exist');
    cy.get('cx-store-finder .btn-action')
      .should('have.text', ' Back to list ')
      .click();
    cy.url().should('contain', '/store-finder/country/');
  });
});
