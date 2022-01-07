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

    it('should add product to cart from wish list', () => {
      wishList.addToWishList(wishList.products[0]);
      wishList.verifyProductInWishList(wishList.products[0]);
      wishList.addProductToCart(wishList.products[0]);

      wishList.removeProductFromCart();

      wishList.goToWishList();
      wishList.removeProductFromWishListPage(wishList.products[0]);
    });
  });
});
