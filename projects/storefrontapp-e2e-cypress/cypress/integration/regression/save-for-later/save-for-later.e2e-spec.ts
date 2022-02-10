import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
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
} from '../../../helpers/save-for-later';
import { viewportContext } from '../../../helpers/viewport-context';

context('Save for later', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
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

      it('should place order and keep save for later', () => {
        const stateAuth = JSON.parse(
          localStorage.getItem('spartacus⚿⚿auth')
        ).token;
        addProductToCart(products[0]);
        addProductToCart(products[1]);
        moveItem(products[0], ItemList.SaveForLater);
        validateCart(1, 1);
        cy.wait(1000);
        cartCoupon.placeOrder(stateAuth);
        cy.reload();
        validateCart(0, 1);
        validateProduct(products[0], 1, ItemList.SaveForLater);
      });

      // turned off until sampledata with proper promotion will get set up (#11871)
      xit('should handle product with free gift in save for later', () => {
        addProductToCart(products[0]);
        addProductToCart(products[3]);
        verifyMiniCartQty(3);
        moveItem(products[3], ItemList.SaveForLater);
        validateCart(1, 2);
        moveItem(products[3], ItemList.Cart);
        validateCart(3, 0);
      });
    });
  });
});
