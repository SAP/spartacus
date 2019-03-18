import * as productSearchFlow from '../../helpers/product-search';
// import { formats } from '../../sample-data/viewports';

function enterProduct() {
  cy.get('cx-searchbox input').type('camera{enter}');
}

context('Product search', () => {
  before(() => {
    cy.visit('/');
    enterProduct();
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
    productSearchFlow.facets();
  });

  describe('Sorting', () => {
    before(() => {
      cy.visit('/');
      enterProduct();
    });

    productSearchFlow.sorting();
  });
});
