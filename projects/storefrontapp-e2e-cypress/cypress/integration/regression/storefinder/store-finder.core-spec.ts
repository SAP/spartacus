context('Store finder', () => {
    const googleMap = 'cx-store-finder-map .cx-store-map .gm-style';
    const resultListItem = 'cx-store-finder-list-item';
    const storeAddressDescription = '.cx-store-description-address';
    const openingHours = '.cx-schedule';
    const contactDetails = '.cx-contact';
  
    before(() => {
      cy.visit('/store-finder');
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
  });
  