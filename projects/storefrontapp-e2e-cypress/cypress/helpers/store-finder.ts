export const googleMap = 'cx-store-finder-map .cx-store-map .gm-style';
export const resultListItem = 'cx-store-finder-list-item';
export const storeAddressDescription = '.cx-store-description-address';
export const openingHours = '.cx-schedule';
export const contactDetails = '.cx-contact';
export const searchResults = 'cx-store-finder-list .cx-columns .cx-list-items';
export const storeName = '.cx-store-name';

export function testAllowViewAllStores() {
  it('should allow to view all stores', () => {
    cy.findByText('View all stores').click();
    cy.get('.country-header-link').eq(0).click();
    cy.get(resultListItem).should('have.length.greaterThan', 0);
  });
}

export function testAllowViewStoreDetails() {
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
}
