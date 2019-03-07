import { PRODUCT_LISTING } from '../../../helpers/data-configuration';
context('Product search product type flow', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search with specific product type', () => {
      const resultsTitle = 'cx-breadcrumb h1';

      // Search for a product
      cy.get('cx-searchbox input').type('sony{enter}');

      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      cy.get('cx-product-list-item').should(
        'have.length',
        PRODUCT_LISTING.PRODUCTS_PER_PAGE
      );

      cy.get('cx-product-list-item')
        .first()
        .should('contain', '10.2 Megapixel D-SLR with Standard Zoom Lens');

      // Filter by brand
      cy.get('.cx-facet-header')
        .contains('Brand')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click({ force: true });
        });

      cy.get(resultsTitle).should('contain', '86 results for "sony"');
      cy.get('cx-product-list-item')
        .first()
        .should('contain', '10.2 Megapixel D-SLR with Standard Zoom Lens');

      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by price
      cy.get('.cx-facet-header')
        .contains('Price')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click({ force: true });
        });

      cy.get(resultsTitle).should('contain', '16 results for "sony"');
      cy.get('cx-product-list-item')
        .first()
        .should('contain', 'MSHX8A');

      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by category
      cy.get('.cx-facet-header')
        .contains('Category')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '95 results for "sony"');
      cy.get('cx-product-list-item')
        .first()
        .should('contain', '10.2 Megapixel D-SLR with Standard Zoom Lens');
      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by mounting
      cy.get('.cx-facet-header')
        .contains('Mounting')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '2 results for "sony"');
      cy.get('cx-product-list-item')
        .first()
        .should('contain', 'Remote Control Tripod VCT-80AV');

      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by lens type
      cy.get('.cx-facet-header')
        .contains('Lens type')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '1 results for "sony"');

      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by megapixels
      cy.get('.cx-facet-header')
        .contains('Megapixels')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '1 results for "sony"');
      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by color
      cy.get('.cx-facet-header')
        .contains('Color')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '7 results for "sony"');
      cy.get('cx-product-list-item')
        .first()
        .should('contain', 'InfoLITHIUM™ H Series Battery');

      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Filter by resolution
      cy.get('.cx-facet-header')
        .contains('Resolution')
        .parents('.cx-facet-group')
        .within(() => {
          cy.get('.cx-facet-checkbox')
            .first()
            .click();
        });

      cy.get(resultsTitle).should('contain', '1 results for "sony"');
      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
      cy.get(resultsTitle).should('contain', '131 results for "sony"');

      // Add product to cart from search listing page
      cy.get('cx-add-to-cart:first button').click({ force: true });
      cy.get('.cx-dialog-header .close').click();
      cy.get('cx-mini-cart .count').should('contain', '1');
    });
  });
});
