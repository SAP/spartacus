import * as cart from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

let cartId;

describe('Cart', () => {
  viewportContext(['desktop'], () => {
    context('Clear Cart for registered user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cart.registerCartUser();
        visitHomePage();
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      it('should have the same cartId after clearing cart', () => {
        cart.loginCartUser();
        cart.addProducts();
        cart.verifyCartNotEmpty();
        cart.goToCart();
        cart.saveCartId();
        cart.clearActiveCart();
        cart.verifyCartIdAfterClearCart();
      });

      it('should clear cart after restoring a saved cart', () => {});

      it('should clear cart after importing products to cart', () => {});

      it('should clear cart after importing products to cart', () => {});
    });
  });
});
