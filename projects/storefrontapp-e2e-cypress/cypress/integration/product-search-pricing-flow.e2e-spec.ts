import { PRODUCT_LISTING } from './../helpers/data-configuration';
context('Product search pricing flow', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search with price', () => {
      // Click on a Category
      cy.get('header').within(() => {
        cy.get('.nav-link')
          .contains('Digital Cameras')
          .click();
        cy.get('.cx-navigation__child-link')
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

      cy.get('cx-product-list-item')
        .first()
        .should('contain', 'DSC-HX1');

      // Navigate to next page
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');

      cy.get('cx-product-list-item:nth-child(1)').should(
        'contain',
        'DSC-H20 Red'
      );

      // Sort by price low to high
      cy.get('cx-sorting .ng-select:first').ngSelect(
        PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
      );
      cy.get('.page-item.active > .page-link').should('contain', '2');
      cy.get('cx-product-list-item').should('contain', 'DSC-W180');

      // Add product to cart from search listing page
      cy.get('cx-add-to-cart:first button').click({ force: true });
      cy.get('.cx-dialog-header .close').click();
      cy.get('cx-mini-cart .count').should('contain', '1');
    });
  });
});
