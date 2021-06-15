import * as productSearchCheckout from '../../../helpers/product-search-checkout';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  clickSearchIcon,
  createProductQuery,
  firstProductItemSelector,
  QUERY_ALIAS,
  searchResult,
  sortByTopRated,
} from '../../../helpers/product-search';
import { PRODUCT_LISTING } from '../../../helpers/data-configuration';
import { carts, products } from '../../../sample-data/product-search-checkout';

context('Product Search and Checkout', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    it('should search for a product, add it to cart and checkout', () => {
      const productName = 'DSC-N1';
      const user = productSearchCheckout.registerUser();

      createProductQuery(
        QUERY_ALIAS.DSC_N1,
        productName,
        PRODUCT_LISTING.PRODUCTS_PER_PAGE
      );

      clickSearchIcon();

      cy.get('cx-searchbox input').type(`${productName}{enter}`);

      cy.wait(`@${QUERY_ALIAS.DSC_N1}`).its('status').should('eq', 200);

      productSearchCheckout.addFirstResultToCartFromSearchAndLogin(user);
      productSearchCheckout.fillFormAndCheckout(user, carts[0], products[0]);
    });

    it('should add the highest rated product and checkout', () => {
      const user = productSearchCheckout.registerUser();
      searchResult();
      sortByTopRated();
      cy.contains(firstProductItemSelector, products[2].name);
      productSearchCheckout.addFirstResultToCartFromSearchAndLogin(user);
      productSearchCheckout.fillFormAndCheckout(user, carts[2], products[2]);
    });
  });
});
