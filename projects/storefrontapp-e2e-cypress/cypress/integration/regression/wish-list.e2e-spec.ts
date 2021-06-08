import * as cart from '../../helpers/cart';
import * as wishList from '../../helpers/wish-list';

describe('Wish list', () => {
  before(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('Anonymous', () => {
    it('should sign in to add to wish list from PDP', () => {
      wishList.addToWishListAnonymous(wishList.products[0]);
    });
  });

  describe('Logged in', () => {
    it('should add product to wish list from PDP', () => {
      wishList.addToWishListFromPage();
      wishList.verifyProductInWishListPdp();
      wishList.verifyProductInWishList(wishList.products[0]);
    });

    it('should remove product from wish list from PDP', () => {
      wishList.goToProductPage(wishList.products[0]);
      wishList.removeProductFromPdp();
      wishList.addToWishListFromPage();
    });

    it('should remove product from wish list page', () => {
      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.removeProductFromWishListPage(wishList.products[0]);
    });

    it('should persist wish list between sessions', () => {
      wishList.addToWishList(wishList.products[1]);
      wishList.checkWishListPersisted(wishList.products[1]);
    });

    it('should add product to cart from wish list', () => {
      wishList.addToWishList(wishList.products[0]);
      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.addProductToCart(wishList.products[0]);
      wishList.verifyProductInWishList(wishList.products[1]);
      wishList.addProductToCart(wishList.products[1]);
    });
  });

  describe('checkout', () => {
    it('should checkout with product added from wish list', () => {
      wishList.checkoutFromWishList([
        wishList.products[0],
        wishList.products[1],
      ]);
    });

    it('should add product to cart, to wish list and checkout', () => {
      cy.visit(`/product/${cart.products[0].code}`);
      cart.clickAddToCart();
      cart.closeAddedToCartDialog();
      wishList.verifyProductInWishList(wishList.products[1]);
      wishList.addProductToCart(wishList.products[1]);
      wishList.addToWishList(wishList.products[2]);
      wishList.verifyProductInWishList(wishList.products[2]);
      wishList.checkoutFromCart([cart.products[0], wishList.products[1]]);
    });
  });
});
