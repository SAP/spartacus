import * as productSearchCheckout from '../../../helpers/product-search-checkout';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  filterUsingFacetFiltering,
  searchResult,
} from '../../../helpers/product-search';
import { carts, products } from '../../../sample-data/product-search-checkout';

context('Product Search Faceting and Checkout', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    it('should add to cart the first result using facet filtering and checkout', () => {
      const user = productSearchCheckout.registerUser();
      searchResult();
      filterUsingFacetFiltering();
      productSearchCheckout.addFirstResultToCartFromSearchAndLogin(user);
      productSearchCheckout.fillFormAndCheckout(user, carts[1], products[1]);
    });
  });
});
