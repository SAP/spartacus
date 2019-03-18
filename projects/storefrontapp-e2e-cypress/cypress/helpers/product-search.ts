import { PRODUCT_LISTING } from './data-configuration';

export const resultsTitleSelector = 'cx-breadcrumb h1';
export const productItemSelector = 'cx-product-list cx-product-list-item';
export const firstProductItemSelector = `${productItemSelector}:first`;
export const pageLinkSelector = '.page-item.active > .page-link';
export const sortingOptionSelector = 'cx-sorting .ng-select:first';
export const firstProductPriceSelector = `${firstProductItemSelector} .cx-product-price`;
export const firstProductNameSelector = `${firstProductItemSelector} a.cx-product-name`;

export function searchResult() {
  it('should be able to search and get results', () => {
    cy.get(resultsTitleSelector).should('contain', '144 results for "camera"');
    cy.get(productItemSelector).should(
      'have.length',
      PRODUCT_LISTING.PRODUCTS_PER_PAGE
    );
    cy.get(firstProductItemSelector).within(() => {
      cy.get('a.cx-product-name').should('be.visible');
    });
  });
}

export function pagination() {
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
}

export function viewMode() {
  it('should be able to switch to grid mode', () => {
    cy.get('cx-product-view > div > div:first').click();
    cy.get('cx-product-list cx-product-grid-item').should(
      'have.length',
      PRODUCT_LISTING.PRODUCTS_PER_PAGE
    );
  });
}

export function facets(mobile?: string) {
  it('should filter results using facet filtering', () => {
    cy.get('.cx-facet-header')
      .contains('Stores')
      .parents('.cx-facet-group')
      .within(() => {
        cy.get('.cx-facet-checkbox')
          .first()
          .click({ force: true });
      });
    cy.get(resultsTitleSelector).should('contain', '79 results for "camera"');
  });

  it('should be able to clear active facet', () => {
    if (mobile) {
      console.log('in here');
      cy.get(
        `cx-product-facet-navigation ${mobile} .cx-facet-filter-pill .close:first`
      ).click();
    } else {
      console.log('out here');
      cy.get(
        'cx-product-facet-navigation .cx-facet-filter-pill .close:first'
      ).click();
    }
    cy.get(resultsTitleSelector).should('contain', 'results for "camera"');
  });
}

export function sorting() {
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
    cy.get(firstProductNameSelector).should('contain', '10.2 Megapixel D-SLR');
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
}
