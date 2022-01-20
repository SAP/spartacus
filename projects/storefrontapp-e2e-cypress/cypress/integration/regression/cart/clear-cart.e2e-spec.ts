import * as cart from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart', () => {
  viewportContext(['desktop'], () => {
    describe('Clear Cart for registered user', () => {
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

      describe('Clear Cart - Saved Cart', () => {
        it('should save a cart', () => {
          cart.addProducts();
          cart.verifyCartNotEmpty();
          cart.goToCart();
          cart.saveCartId();
          cart.saveActiveCart();
        });

        it('should restore a saved cart and clear it', () => {
          cart.restoreCart();
          cart.goToCart();
          cart.clearActiveCart();
          cart.validateEmptyCart();
        });
      });

      it('should clear cart after importing products to cart', () => {});

      it('should clear cart after importing products to cart', () => {});
    });
  });
});
