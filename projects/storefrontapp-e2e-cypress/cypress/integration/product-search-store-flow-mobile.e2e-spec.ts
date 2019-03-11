import { PRODUCT_LISTING } from '../helpers/data-configuration';
import { formats } from '../sample-data/viewports';

context(
  `${formats.mobile.width + 1}p resolution - Product search store flow`,
  () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.visit('/');
    });
    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search with store filtering', () => {
        const resultsTitle = 'cx-breadcrumb h1';

        // Search for a product
        cy.get('cx-searchbox [aria-label="Search "]').click();
        cy.get('cx-searchbox input').type('canon{enter}');

        cy.get(resultsTitle).should('contain', '77 results for "canon"');

        cy.get('cx-product-list-item').should(
          'have.length',
          PRODUCT_LISTING.PRODUCTS_PER_PAGE
        );

        cy.get('cx-product-list-item:first')
          .first()
          .should('contain', 'Monopod 100 - Floor Standing Monopod');

        // Navigate to next page
        cy.get('.page-item:last-of-type .page-link:first').click();
        cy.get('.page-item.active > .page-link').should('contain', '2');

        cy.get('cx-product-list-item:nth-child(1)').should(
          'contain',
          'PowerShot A480'
        );

        // Sort by name descending
        cy.get('cx-sorting .ng-select:first').ngSelect(
          PRODUCT_LISTING.SORTING_TYPES.BY_NAME_DESC
        );
        cy.get('.page-item.active > .page-link').should('contain', '2');
        cy.get('cx-product-list-item:first').should('contain', 'PL60 Grey');

        // Filter by stores
        cy.get('.cx-facet-header')
          .contains('Stores')
          .parents('.cx-facet-group')
          .within(() => {
            cy.get('.cx-facet-checkbox')
              .first()
              .click({ force: true });
          });

        cy.get(resultsTitle).should('contain', '45 results for "canon"');
        cy.get('cx-product-list-item')
          .first()
          .should('contain', 'LP-E5');

        cy.get(
          'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
        );
        cy.get(resultsTitle).should('contain', '77 results for "canon"');

        // Add product to cart from search listing page
        cy.get('cx-add-to-cart:first button').click({ force: true });
        cy.get('.cx-dialog-header .close').click();
        cy.get('cx-mini-cart .count').should('contain', '1');
      });
    });
  }
);
