import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart Coupon', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
    });

    it('should show the promotion for cart, discount in price and success message when applied a coupon with cart total action successfully.', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode1);

      //TODO products can be added to cart asynchronously
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponForCart);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.couponForCart);
      });
    });

    it('should show error message when applied a wrong coupon', () => {
      cartCoupon.visitProductPage(cartCoupon.productCode1);
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyWrongCoupon();
    });

    it('should show the promotion for product, discount in price and success message when applied a coupon with product category action successfully.', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode2);
      cartCoupon.addProductToCart(cartCoupon.productCode2);
      cartCoupon.applyCoupon(cartCoupon.couponForProduct);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.couponForProduct);
      });
    });

    it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode3);
      cartCoupon.addProductToCart(cartCoupon.productCode3);
      cartCoupon.applyCoupon(cartCoupon.freeGiftCoupon);
      cartCoupon.verifyGiftProductCoupon(cartCoupon.giftProductCode);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.freeGiftCoupon);
      });
    });

    it('should remove the coupon when back to cart and place order without coupon', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode1);
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponForCart);
      cartCoupon.removeCoupon(cartCoupon.couponForCart);

      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData);
      });
    });
  });
});
