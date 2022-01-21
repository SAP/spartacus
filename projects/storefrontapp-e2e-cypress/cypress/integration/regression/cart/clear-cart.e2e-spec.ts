import * as cart from '../../../helpers/cart';
import * as alerts from '../../../helpers/global-message';
import * as quickOrder from '../../../helpers/b2b/b2b-quick-order';
import { visitHomePage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Clear Cart', () => {
  viewportContext(['desktop'], () => {
    describe('Clear cart for registered user', () => {
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
        alerts
          .getSuccessAlert()
          .should('contain', `Active cart cleared successfully.`);
        cart.verifyCartIdAfterClearCart();
      });

      it('should clear cart after adding products to cart from quick order', () => {
        quickOrder.visitQuickOrderPage();
        quickOrder.addProductToTheList('1934793');
        quickOrder.addToCart();
        cart.verifyCartNotEmpty();
        quickOrder.verifyQuickOrderListQuantity(0);
        alerts
          .getSuccessAlert()
          .should('contain', `Quick order list has been added to the cart`);
        cart.goToCart();
        cart.clearActiveCart();
        cart.validateEmptyCart();
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
    });
  });
});
