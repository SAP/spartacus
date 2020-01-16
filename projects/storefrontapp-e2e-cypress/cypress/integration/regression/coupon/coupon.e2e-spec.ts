import * as cartCoupon from '../../../helpers/cart-coupon';

export const productCode1 = '300938';
export const couponCode1 = 'CouponForCart';
export const productCode2 = '493683';
export const couponCode2 = 'CouponForProduct';
export const productCode3 = '1986316';
export const couponCode3 = 'FreeGiftCoupon';
export const giftProductCode = '443175';

describe('Cart Coupon', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('should show the promotion for cart, discount in price and success message when applied a coupon with cart total action successfully.', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode1);
    cartCoupon.applyCoupon(couponCode1);
    cartCoupon.verifyCouponAndPromotion(couponCode1, '$104.12', '$10');
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData, couponCode1, '$104.12', '$10');
    });
  });

  it('should show the promotion for product, discount in price and success message when applied a coupon with product category action successfully.', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode2);
    cartCoupon.applyCoupon(couponCode2);
    cartCoupon.verifyCouponAndPromotion(couponCode2, '$88.84', '$29.61');
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData, couponCode2, '$88.84', '$29.61');
    });
  });

  it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode3);
    cartCoupon.applyCoupon(couponCode3);
    cartCoupon.verifyGiftProductCoupon(giftProductCode);
    cartCoupon.verifyCouponAndPromotion(couponCode3, '$1,914.23', '$20');
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData, couponCode3, '$1,914.23', '$20');
    });
  });

  it('should show error message when applied a wrong coupon', () => {
    cartCoupon.addProductToCart(productCode1);
    cartCoupon.applyWrongCoupon();
  });

  it('should remove the coupon when back to cart and place order without coupon', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode1);
    cartCoupon.applyCoupon(couponCode1);
    cartCoupon.verifyCouponAndPromotion(couponCode1, '$104.12', '$10');

    cartCoupon.navigateToCheckoutPage();
    cartCoupon.navigateToCartPage();
    cartCoupon.removeCoupon(couponCode1);

    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData);
    });
  });
});
