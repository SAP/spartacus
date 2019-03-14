import * as productSearchPricingFlow from '../../../helpers/product-search-pricing-flow';
context('Product search pricing flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search with price', () => {
      productSearchPricingFlow.productSearch();
    });
  });
});
