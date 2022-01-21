import * as cart from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
//import * as alerts from '../../../helpers/global-message';

describe('Clear Cart', () => {
  viewportContext(['desktop'], () => {
    context('Clear cart of anonymous user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        visitHomePage();
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      it('should add products to the cart', () => {
        cart.addProducts();
        cart.verifyCartNotEmpty();
      });

      it('should be able to cancel before clearing the cart', () => {
        cart.goToCart();
        cart.cancelClearCart();
        cart.verifyCartNotEmpty();
      });

      it('should clear cart for anynonymous user', () => {
        cart.goToCart();
        cart.clearActiveCart();
        cart.validateEmptyCart();
      });
    });

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

      it('should add products to the cart', () => {
        cart.loginCartUser();
        cart.addProducts();
        cart.verifyCartNotEmpty();
      });

      it('should clear cart for registered user and have same cartId', () => {
        cart.goToCart();
        cart.saveCartId();
        cart.clearActiveCart();
        // alerts
        //   .getSuccessAlert()
        //   .should('contain', `Active cart cleared successfully.`);
        cart.validateEmptyCart();
        cart.verifyCartIdAfterClearCart();
      });
    });
  });
});
