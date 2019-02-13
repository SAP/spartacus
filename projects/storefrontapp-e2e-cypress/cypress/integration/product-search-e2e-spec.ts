const PRODUCTS_PER_PAGE = 10;

context('Product search', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Search results', () => {
    it('should be able to search and get results', () => {
      cy.get('cx-searchbox input').type('camera{enter}');
      cy.get('header h1').contains('results for camera');
      cy.get('cx-product-list cx-product-list-item').should(
        'have.length',
        PRODUCTS_PER_PAGE
      );
      cy.get('cx-product-list cx-product-list-item:first').within(() => {
        cy.get('a.cx-product-name').should('be.visible');
      });
    });
  });

  describe('Pagination', () => {
    it('should navigate to the next page and display results', () => {
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');
    });

    it('should be able navigate to the specified page number and display results', () => {
      cy.get('.page-item:nth-child(4) .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '3');
    });

    it('should navigate to the previous page and display results', () => {
      cy.get('.page-item:first-of-type .page-link:first').click();
      cy.get('.page-item.active > .page-link').should('contain', '2');
    });
  });

  describe('product list view mode', () => {
    it('should be able to switch to grid mode', () => {
      cy.get('cx-product-view > div > div:first').click();
      cy.get('cx-product-list cx-product-grid-item').should(
        'have.length',
        PRODUCTS_PER_PAGE
      );
    });
  });

  describe('Facets', () => {
    it('should filter results using facet filtering', () => {
      cy.get(
        'cx-product-facet-navigation .cx-search-facet-checkbox:first'
      ).click();
      cy.get('header h1').should('contain', '79 results for Chiba');
    });

    it('should be able to clear active facet', () => {
      cy.get(
        'cx-product-facet-navigation .cx-search-facet-filter__pill .close:first'
      ).click();
      cy.get('header h1').should('contain', 'results for camera');
    });
  });

  describe('Sorting', () => {
    before(() => {
      cy.visit('/');
      cy.get('cx-searchbox input').type('camera{enter}');
    });

    it('should be able to sort by lowest price', () => {
      cy.get('cx-sorting .ng-select:first').ngSelect('Price (lowest first)');
      cy.get(
        'cx-product-list cx-product-list-item:first .cx-product-price'
      ).should('contain', '$1.58');
    });

    it('should be able to use sorting by highest price', () => {
      cy.get('cx-sorting .ng-select:first').ngSelect('Price (highest first)');
      cy.get(
        'cx-product-list cx-product-list-item:first .cx-product-price'
      ).should('contain', '$6,030.71');
    });
  });
});
