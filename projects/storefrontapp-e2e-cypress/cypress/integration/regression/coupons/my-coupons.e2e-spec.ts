import { visitHomePage } from '../../../helpers/checkout-flow';
import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['mobile', 'desktop'], () => {
  describe('My coupons - Anonymous user', () => {
    it('should redirect to login page', () => {
      cy.visit('/my-account/coupons');
      cy.location('pathname').should('contain', '/login');
    });

    it('should apply customer coupon that fails for anonymous user', () => {
      cartCoupon.applyMyCouponAsAnonymous();
    });
  });

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

    it('should claim customer coupon, switch notification button and find products', () => {
      visitHomePage();
      cy.selectUserMenuOption({
        option: 'My Coupons',
      });
      myCoupons.verifyMyCoupons();
    });

    it('should list customer coupons and apply in cart', () => {
      cartCoupon.verifyOrderPlacingWithCouponAndCustomerCoupon();
    });

    it('should remove customer coupon from cart', () => {
      cartCoupon.verifyCustomerCouponRemoving();
    });
  });

  describe('My coupons test for pagination and sort', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.login(myCoupons.testUser, myCoupons.testPassword);
      visitHomePage();
    });

    it('should page and sort my coupon list', () => {
      cy.selectUserMenuOption({
        option: 'My Coupons',
      });
      myCoupons.verifyPagingAndSorting();
    });
  });
});
