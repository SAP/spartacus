import * as wishList from '../../../helpers/wish-list';
import * as login from '../../../helpers/login';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { visitHomePage } from '../../../helpers/checkout-flow';

describe('Wish list', () => {
  before(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  beforeEach(() => {
    clearAllStorage();
  });

  afterEach(() => {
    const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();
    login.signOutUser();
    cy.wait(tokenRevocationRequestAlias);
  });

  describe('Anonymous', () => {
    it('should register and sign in user to add product to wish list', () => {
      wishList.addToWishListAnonymous(wishList.products[0]);
    });
  });

  describe('Logged in', () => {
    beforeEach(() => {
      visitHomePage();
      cy.get('cx-login').click();
      wishList.loginWishListUser();
    });

    it('should add and remove product to wish list from PDP', () => {
      wishList.visitProduct(wishList.products[0]);
      wishList.addToWishListFromPage();
      wishList.verifyProductInWishListPdp();
      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.goToProductPageFromWishList(wishList.products[0]);
      wishList.removeProductFromPdp();
    });

    it('should persist wish list between sessions', () => {
      wishList.addToWishList(wishList.products[1]);
      wishList.verifyProductInWishList(wishList.products[1]);
      wishList.checkWishListPersisted(wishList.products[1]);
      wishList.goToWishList();
      wishList.removeProductFromWishListPage(wishList.products[1]);
    });

    it('should add product to cart from wish list', () => {
      wishList.addToWishList(wishList.products[0]);
      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.addProductToCart(wishList.products[0]);

      wishList.removeProductFromCart();

      wishList.goToWishList();
      wishList.removeProductFromWishListPage(wishList.products[0]);
    });
  });

  describe('checkout', () => {
    beforeEach(() => {
      visitHomePage();
      cy.get('cx-login').click();
      wishList.loginWishListUser();
    });

    it('should checkout with product added from wish list', () => {
      const currentRetry = cy.state('runnable')._currentRetry;

      /**
       * This test case performs a checkout. Checkout will occasioanlly (rare)
       * freeze on a checkout step (Shipping -> Delivery -> Payment -> Review).
       * If this occurs, spec will time out and restart from beginning. In this case
       * we do not try to add products to wish list as they will still be in wish list
       * from failed attempt.
       */
      if (currentRetry === 0) {
        wishList.addToWishList(wishList.products[0]);
        wishList.addToWishList(wishList.products[1]);
      }

      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.verifyProductInWishList(wishList.products[1]);

      /**
       * Same as previously explained, only try to add products to cart on first attempt.
       */
      if (currentRetry === 0) {
        wishList.addProductToCart(wishList.products[0]);
        wishList.addProductToCart(wishList.products[1]);
      }

      wishList.checkoutFromWishList([
        wishList.products[0],
        wishList.products[1],
      ]);

      wishList.goToWishList();
      wishList.removeProductFromWishListPage(wishList.products[0]);
      wishList.removeProductFromWishListPage(wishList.products[1]);
    });
  });
});
