import { visitHomePage } from '../../../helpers/checkout-flow';
import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['mobile', 'desktop'], () => {
  
  describe('My coupons - Authenticated user', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    describe('Claim customer coupon', () => {
      it('should claim customer coupon successfully', () => {
        myCoupons.verifyClaimCouponSuccess(myCoupons.validCouponCode);
        cy.saveLocalStorage();
      });

      it('should not claim invalid customer coupon', () => {
        cy.restoreLocalStorage();
        myCoupons.verifyClaimCouponFail(myCoupons.invalidCouponCode);
      });
    });
  });
});
