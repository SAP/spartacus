import { PRODUCT_LISTING } from './../helpers/data-configuration';
context('Product search rating flow', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search and show product rating', () => {
      const resultsTitle = 'cx-breadcrumb h1';
      const tabsHeaderList = 'cx-product-details .details > h3';

      // Search for a product
      cy.get('cx-searchbox input').type('DSC-N1{enter}');

      cy.get(resultsTitle).should('contain', '21 results for "DSC-N1"');

      cy.get('cx-product-list-item').should(
        'have.length',
        PRODUCT_LISTING.PRODUCTS_PER_PAGE
      );

      cy.get('cx-product-list-item')
        .first()
        .should('contain', 'DSC-N1');

      // Navigate to next page
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');

      cy.get('cx-product-list-item:nth-child(1)').should('contain', 'DSC-WX1');

      // Sort by top rated
      cy.get('cx-sorting .ng-select:first').ngSelect(
        PRODUCT_LISTING.SORTING_TYPES.BY_TOP_RATED
      );
      cy.get('.page-item.active > .page-link').should('contain', '2');
      cy.get('cx-product-list-item:first').should('contain', 'DSC-W180');

      // Navigate to previous page
      cy.get('.page-item:first-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '1');

      cy.get('cx-product-list-item:nth-child(1)').should(
        'contain',
        'Cyber-shot DSC-W55'
      );

      // Filter by category
      cy.get('.cx-facet-header')
        .contains('Category')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '20 results for "DSC-N1"');
      cy.get('cx-product-list-item:first')
        .first()
        .should('contain', 'Cyber-shot DSC-W55');
      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '21 results for "DSC-N1"');

      // Select product and read all the tabs on product details page
      cy.get('cx-product-list-item:first .cx-product-name').click();
      cy.get(tabsHeaderList)
        .eq(0)
        .should('contain', 'Product Details');
      cy.get(tabsHeaderList)
        .eq(1)
        .should('contain', 'Specs');
      cy.get(tabsHeaderList)
        .eq(2)
        .should('contain', 'Reviews');
      cy.get(tabsHeaderList)
        .eq(3)
        .should('contain', 'Shipping');
    });
  });
});
