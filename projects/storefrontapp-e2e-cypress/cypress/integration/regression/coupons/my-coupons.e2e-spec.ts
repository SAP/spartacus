import { visitHomePage } from '../../../helpers/checkout-flow';
import * as cartCoupon from '../../../helpers/coupons/cart-coupon';
import * as myCoupons from '../../../helpers/coupons/my-coupons';
import { viewportContext } from '../../../helpers/viewport-context';

viewportContext(['mobile'], () => {
  describe('My coupons - Authenticated user', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.requireLoggedIn();
    });

    it(['my_coupons'],'should validate coupons core functionality', () => {
      // Core Test. Test in mobile as well.
      myCoupons.testClaimCustomerCoupon();
    });
  });
});
viewportContext(['mobile', 'desktop'], () => {
  describe('My coupons - Anonymous user', () => {
    it(['my_coupons'],'should redirect to login page', () => {
      cy.visit('/my-account/coupons');
      cy.location('pathname').should('contain', '/login');
    });

    it(['my_coupons'],'should apply customer coupon that fails for anonymous user', () => {
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

    // Core Test
    //myCoupons.testClaimCustomerCoupon();

    it(['my_coupons'], 'should claim customer coupon, switch notification button and find products', () => {
      visitHomePage();
      cy.selectUserMenuOption({
        option: 'My Coupons',
      });
      myCoupons.verifyMyCoupons();
    });

    it(['my_coupons'], 'should list customer coupons and apply in cart', () => {
      cartCoupon.verifyOrderPlacingWithCouponAndCustomerCoupon();
    });

    it(['my_coupons'], 'should remove customer coupon from cart', () => {
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

    it(['my_coupons'], 'should page and sort my coupon list', () => {
      cy.selectUserMenuOption({
        option: 'My Coupons',
      });
      myCoupons.verifyPagingAndSorting();
    });
  });
});
