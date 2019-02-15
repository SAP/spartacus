const PRODUCTS_PER_PAGE = 10;
const resultsTitleSelector = 'header h1';
const productItemSelector = 'cx-product-list cx-product-list-item';
const firstProductItemSelector = `${productItemSelector}:first`;

context('Product search', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Search results', () => {
    it('should be able to search and get results', () => {
      cy.get('cx-searchbox input').type('camera{enter}');
      cy.get(resultsTitleSelector).contains('results for camera');
      cy.get(productItemSelector).should('have.length', PRODUCTS_PER_PAGE);
      cy.get(firstProductItemSelector).within(() => {
        cy.get('a.cx-product-name').should('be.visible');
      });
    });
  });

  describe('Pagination', () => {
    const pageLinkSelector = '.page-item.active > .page-link';

    it('should navigate to the next page and display results', () => {
      cy.get('.page-item:last-of-type .page-link:first').click();
      cy.get(pageLinkSelector).should('contain', '2');
    });

    it('should be able navigate to the specified page number and display results', () => {
      cy.get('.page-item:nth-child(4) .page-link:first').click();
      cy.get(pageLinkSelector).should('contain', '3');
    });

    it('should navigate to the previous page and display results', () => {
      cy.get('.page-item:first-of-type .page-link:first').click();
      cy.get(pageLinkSelector).should('contain', '2');
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
      cy.get(resultsTitleSelector).should('contain', '79 results for Chiba');
    });

    it('should be able to clear active facet', () => {
      cy.get(
        'cx-product-facet-navigation .cx-search-facet-filter__pill .close:first'
      ).click();
      cy.get(resultsTitleSelector).should('contain', 'results for camera');
    });
  });

  describe('Sorting', () => {
    const sortingOptionSelector = 'cx-sorting .ng-select:first';
    const firstProductPriceSelector = `${firstProductItemSelector} .cx-product-price`;
    const firstProductNameSelector = `${firstProductItemSelector} a.cx-product-name`;

    before(() => {
      cy.visit('/');
      cy.get('cx-searchbox input').type('camera{enter}');
    });

    it('should be able to sort by lowest price', () => {
      cy.get(sortingOptionSelector).ngSelect('Price (lowest first)');
      cy.get(firstProductPriceSelector).should('contain', '$1.58');
    });

    it('should be able to sort by highest price', () => {
      cy.get(sortingOptionSelector).ngSelect('Price (highest first)');
      cy.get(firstProductPriceSelector).should('contain', '$6,030.71');
    });

    it('should be able to sort by name ascending', () => {
      cy.get(sortingOptionSelector).ngSelect('Name (ascending)');
      cy.get(firstProductNameSelector).should(
        'contain',
        '10.2 Megapixel D-SLR'
      );
    });

    it('should be able to sort by name descending', () => {
      cy.get(sortingOptionSelector).ngSelect('Name (descending)');
      cy.get(firstProductNameSelector).should(
        'contain',
        'Wide Strap for EOS 450D'
      );
    });

    it('should be able to sort by relevance', () => {
      cy.get(sortingOptionSelector).ngSelect('Relevance');
      cy.get(firstProductNameSelector).should('not.be.empty');
    });

    it('should be able to sort by top rated', () => {
      cy.get(sortingOptionSelector).ngSelect('Top Rated');
      cy.get(firstProductNameSelector).should('not.be.empty');
    });
  });
});
