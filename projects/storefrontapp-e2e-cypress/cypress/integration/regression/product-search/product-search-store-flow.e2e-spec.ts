import * as productSearchStoreFlow from '../../../helpers/product-search-store-flow';
context('Product search store flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search with store filtering', () => {
      productSearchStoreFlow.productStoreFlow();
    });
  });
});
