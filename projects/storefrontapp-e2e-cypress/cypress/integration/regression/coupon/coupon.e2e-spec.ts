import * as cart from '../../../helpers/cart';
import * as cartCoupon from '../../../helpers/cart-coupon';

export const CouponCode1 = 'BUYMORE16';
export const CouponCode2 = 'WINTER16';
export const CouponCode3 = 'CHRISTMAS16';

describe('Cart Coupon', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should remove the coupon when back to cart and place order without coupon', () => {
    cart.loginRegisteredUser();
    cart.addProductWhenLoggedIn(false);
    cartCoupon.navigateToCartPage();
    cartCoupon.applyCoupon(CouponCode1);
    cartCoupon.applyCoupon(CouponCode2);
    cartCoupon.removeCoupon(CouponCode1);
  });
});
