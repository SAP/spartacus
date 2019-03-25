import * as productSearchRatingFlow from '../../../helpers/product-search-rating-flow';
context('Product search rating flow', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  describe('Product search', () => {
    it('should be able to search and show product rating', () => {
      productSearchRatingFlow.productRatingFlow();
    });
  });
});
