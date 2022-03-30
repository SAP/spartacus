import { login } from '../../../../helpers/auth-forms';
import * as cart from '../../../../helpers/cart';
import { waitForPage } from '../../../../helpers/checkout-flow';
import {
  addProductToCart,
  ItemList,
  moveItem,
  products,
  removeItem,
  validateCart,
  validateCartPromotion,
  validateProduct,
  verifyMiniCartQty,
} from '../../../../helpers/save-for-later';
import { viewportContext } from '../../../../helpers/viewport-context';

// TODO. Fix Priority 2. Remove this line after this spec runs successfully with CCV2.

context('Save for later', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    context('Guest', () => {
      it('should register and login first for anonymous user', () => {
        addProductToCart(products[0]);
        cy.visit('/cart');
        moveItem(products[0], ItemList.SaveForLater, true);
        cy.location('pathname').should('contain', '/login');
      });
    });

    context('Re-login customer', () => {
      it('Should save items in saved for later list when logout', () => {
        const alias = waitForPage('/cart', 'cartPage');
        cy.requireLoggedIn().then((account) => {
          addProductToCart(products[2]);
          moveItem(products[2], ItemList.SaveForLater);
          validateCart(0, 1);
          cart.logOutAndEmptyCart();
          const loginPage = waitForPage('/login', 'getLoginPage');
          cy.visit('/login');
          cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
          login(account.username, account.password);
          cy.url().should('not.contain', 'login');
        });
        cy.visit(`/cart`);
        cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);

        verifyMiniCartQty(0);
        validateProduct(products[2], 1, ItemList.SaveForLater);
        removeItem(products[2], ItemList.SaveForLater);
      });
    });

    describe('Customer', () => {
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.requireLoggedIn();
        cy.visit('/');
      });

      it('should save for later/move to cart for items', () => {
        cy.visit('/cart');
        validateCart(0, 0);
        addProductToCart(products[0]);
        moveItem(products[0], ItemList.SaveForLater);
        validateCart(0, 1);
        addProductToCart(products[1]);
        addProductToCart(products[2]);
        validateCart(2, 1);
        validateCartPromotion(true);
        moveItem(products[1], ItemList.SaveForLater);
        validateCart(1, 2);
        validateCartPromotion(true);
        moveItem(products[1], ItemList.Cart);
        validateCartPromotion(true);
        validateCart(2, 1);
        // validate merge
        addProductToCart(products[0]);
        validateCart(3, 1);
        moveItem(products[0], ItemList.SaveForLater);
        validateCart(2, 1);
        addProductToCart(products[0]);
        moveItem(products[0], ItemList.Cart);
        validateCart(3, 0);
        verifyMiniCartQty(5); //to avoid the cart item quatity is not updated yet
        //remove
        moveItem(products[0], ItemList.SaveForLater);
        validateCart(2, 1);
        removeItem(products[0], ItemList.SaveForLater);
        validateCart(2, 0);
      });
    });
  });
});
