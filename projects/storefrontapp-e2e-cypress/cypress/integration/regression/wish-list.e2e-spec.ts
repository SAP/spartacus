import * as wishlist from '../../helpers/wish-list';

describe('Wish list', () => {
  before(() => {
    cy.window().then(win => {
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
    it('should go to login and redirect to PDP', () => {
      wishlist.addToWishListAnonymous(wishlist.products[0]);
    });
  });

  describe('Logged in', () => {
    it('should add to wish list', () => {
      wishlist.addToWishListFromPage();
      wishlist.verifyProductInWishListPdp();
      wishlist.verifyProductInWishList(wishlist.products[0]);
    });

    it('should remove product from wish list from product details page', () => {
      wishlist.goToProductPage(wishlist.products[0]);
      wishlist.removeProductFromPdp();
      wishlist.addToWishListFromPage();
    });

    it('should remove product from wish list page', () => {
      wishlist.verifyProductInWishList(wishlist.products[0]);
      wishlist.removeProductFromWishListPage(wishlist.products[0]);
    });

    it('should add product to cart from wish list', () => {
      wishlist.addToWishList(wishlist.products[1]);
      wishlist.verifyProductInWishList(wishlist.products[1]);
      wishlist.addProductToCart(wishlist.products[1]);
    });

    it('should persist wish list between sessions', () => {
      wishlist.checkWishListPersisted(wishlist.products[1]);
    });
  });
});
