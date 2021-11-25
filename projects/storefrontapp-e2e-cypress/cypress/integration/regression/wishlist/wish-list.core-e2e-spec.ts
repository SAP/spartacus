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
