import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Cart Coupon', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
    });

    // TODO. Core test. Move to helper after GH-14500
    it('should apply cart coupon', () => {
      const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      cartCoupon.visitProductPage(cartCoupon.productCode1);

      //TODO products can be added to cart asynchronously
      cartCoupon.addProductToCart(cartCoupon.productCode1);
      cartCoupon.applyCoupon(cartCoupon.couponForCart);
      cartCoupon.placeOrder(stateAuth.token);
    });
  });
});
