import * as cartCoupon from '../../../helpers/cart-coupon';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart Coupon', () => {
  viewportContext(['mobile'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
    });

    it('should show the promotion for cart, discount in price and success message when applied a coupon with cart total action successfully.', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode1);

      //TODO products can be added to cart asynchronously
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponCode1);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.couponCode1);
      });
    });

    it('should show error message when applied a wrong coupon', () => {
      cartCoupon.visitProductPage(cartCoupon.productCode1);
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyWrongCoupon();
    });

    it('should show the promotion for product, discount in price and success message when applied a coupon with product category action successfully.', () => {
      // product coupon doesn't seem to be working
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode2);
      cartCoupon.addProductToCart(cartCoupon.productCode2);
      cartCoupon.applyCoupon(cartCoupon.couponCode2);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.couponCode2);
      });
    });

    it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
      //gift coupon doesn't seem to be working
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode3);
      cartCoupon.addProductToCart(cartCoupon.productCode3);
      cartCoupon.applyCoupon(cartCoupon.couponCode3);
      cartCoupon.verifyGiftProductCoupon(cartCoupon.giftProductCode);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.couponCode3);
      });
    });

    it('should remove the coupon when back to cart and place order without coupon', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode1);
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponCode1);
      cartCoupon.removeCoupon(cartCoupon.couponCode1);

      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData);
      });
    });
  });
});
