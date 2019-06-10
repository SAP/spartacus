import * as productSearchTypeFlow from '../../../helpers/product-search-product-type-flow';
context('Product search product type flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search with specific product type', () => {
      productSearchTypeFlow.productTypeFlow();
    });
  });
});
