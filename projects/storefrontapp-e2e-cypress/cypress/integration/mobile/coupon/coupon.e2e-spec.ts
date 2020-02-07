import * as cartCoupon from '../../../helpers/cart-coupon';
import { formats } from '../../../sample-data/viewports';

describe('Cart Coupon', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.requireLoggedIn();
    cy.visit('/');
    cy.get('cx-searchbox cx-icon[aria-label="search"]').click({ force: true });
  });

  it('should show the promotion for cart, discount in price and success message when applied a coupon with cart total action successfully.', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(cartCoupon.productCode1);
    cartCoupon.applyCoupon(cartCoupon.couponCode1);
    cartCoupon.verifyCouponAndPromotion(
      cartCoupon.couponCode1,
      '$104.12',
      '$10'
    );
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.verifyOrderHistory(orderData, couponCode1, '$104.12', '$10');
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
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.verifyOrderHistory(orderData, couponCode2, '$88.84', '$29.61');
    });
  });

  it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(cartCoupon.productCode3);
    cartCoupon.applyCoupon(cartCoupon.couponCode3);
    cy.get('cx-searchbox cx-icon[aria-label="search"]').click({ force: true });
    cartCoupon.verifyGiftProductCoupon(cartCoupon.giftProductCode);
    cartCoupon.verifyCouponAndPromotion(
      cartCoupon.couponCode3,
      '$1,914.23',
      '$20'
    );
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.verifyOrderHistory(orderData, couponCode3, '$1,914.23', '$20');
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

    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.verifyOrderHistory(orderData);
    });
  });
});
