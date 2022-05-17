import * as wishList from '../../../../helpers/wish-list';

// TODO. Fix Priority 3. Remove this line after this spec runs successfully with CCV2.
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
});
