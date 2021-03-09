import * as cartCoupon from '../../../helpers/cart-coupon';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart Coupon', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();

      // Go to PDP directly and wait for product details
      cartCoupon.registerProductDetailsRoute(cartCoupon.productCode1);
      cy.visit(`/product/${cartCoupon.productCode1}`);
      cy.wait('@product_details');
    });

    it.only('should show the promotion for cart, discount in price and success message when applied a coupon with cart total action successfully.', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      //TODO products can be added to cart asynchronously
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponCode1);
      cartCoupon.placeOrder(stateAuth.token).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData, cartCoupon.couponCode1);
      });
    });

    it('should show the promotion for product, discount in price and success message when applied a coupon with product category action successfully.', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
        .auth;
      cartCoupon.addProductToCart(cartCoupon.productCode2);
      cartCoupon.applyCoupon(cartCoupon.couponCode2);
      cartCoupon.verifyCouponAndPromotion(
        cartCoupon.couponCode2,
        '$88.84',
        '$29.61'
      );
      cartCoupon.placeOrder(stateAuth).then((orderData) => {
        cartCoupon.verifyOrderHistory(
          orderData,
          cartCoupon.couponCode2,
          '$88.84',
          '$29.61'
        );
      });
    });

    it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
        .auth;
      cartCoupon.addProductToCart(cartCoupon.productCode3);
      cartCoupon.applyCoupon(cartCoupon.couponCode3);
      cartCoupon.verifyGiftProductCoupon(cartCoupon.giftProductCode);
      cartCoupon.verifyCouponAndPromotion(
        cartCoupon.couponCode3,
        '$1,914.23',
        '$20'
      );
      cartCoupon.placeOrder(stateAuth).then((orderData) => {
        cartCoupon.verifyOrderHistory(
          orderData,
          cartCoupon.couponCode3,
          '$1,914.23',
          '$20'
        );
      });
    });

    it('should show error message when applied a wrong coupon', () => {
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyWrongCoupon();
    });

    it('should remove the coupon when back to cart and place order without coupon', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
        .auth;
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponCode1);
      cartCoupon.verifyCouponAndPromotion(
        cartCoupon.couponCode1,
        '$104.12',
        '$10'
      );

      cartCoupon.navigateToCheckoutPage();
      cartCoupon.navigateToCartPage();
      cartCoupon.removeCoupon(cartCoupon.couponCode1);

      cartCoupon.placeOrder(stateAuth).then((orderData) => {
        cartCoupon.verifyOrderHistory(orderData);
      });
    });
  });
});
