import * as cart from '../../helpers/cart';
import * as wishList from '../../helpers/wish-list';
import * as login from '../../helpers/login';
import { clearAllStorage } from '../../support/utils/clear-all-storage';

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
    it('should sign in to add to wish list from PDP', () => {
      wishList.addToWishListAnonymous(wishList.products[0]);
    });
  });

  describe('Logged in', () => {
    beforeEach(() => {
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
      cy.get('cx-login').click();
      wishList.loginWishListUser();
    });

    it('should checkout with product added from wish list', () => {
      const currentRetry = cy.state('runnable')._currentRetry;
      if (currentRetry === 0) {
        wishList.addToWishList(wishList.products[0]);
        wishList.addToWishList(wishList.products[1]);
      }

      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.verifyProductInWishList(wishList.products[1]);

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

    it('should add product to cart, to wish list and checkout', () => {
      cy.visit(`/product/${cart.products[0].code}`);
      cart.clickAddToCart();
      cart.closeAddedToCartDialog();
      wishList.addToWishList(wishList.products[2]);
      wishList.verifyProductInWishList(wishList.products[2]);
      wishList.addProductToCart(wishList.products[2]);
      wishList.checkoutFromCart([cart.products[0], wishList.products[2]]);
    });
  });
});
