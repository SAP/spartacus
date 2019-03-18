import * as productSearchFlow from '../../../helpers/product-search';
import { formats } from '../../../sample-data/viewports';

function clickSearchIcon() {
  cy.get('cx-searchbox [aria-label="Search "]').click();
}

function enterProduct() {
  clickSearchIcon();
  cy.get('cx-searchbox input').type('camera{enter}');
}

context(`${formats.mobile.width + 1}p resolution - Product search`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
    enterProduct();
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Search results', () => {
    productSearchFlow.searchResult();
  });

  describe('Pagination', () => {
    productSearchFlow.pagination();
  });

  describe('product list view mode', () => {
    productSearchFlow.viewMode();
  });

  describe('Facets', () => {
    productSearchFlow.facets('.cx-facet-mobile');
  });

  describe('Sorting', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.visit('/');
      enterProduct();
    });

    productSearchFlow.sorting();
  });
});
