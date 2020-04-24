import * as cartCoupon from '../../../helpers/cart-coupon';
import { visitHomePage } from '../../../helpers/checkout-flow';
import * as myCoupons from '../../../helpers/my-coupons';

describe('My coupons test for anonymous user', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  it('should redirect to login page when entering my coupons using anonymous user', () => {
    myCoupons.verifyMyCouponsAsAnonymous();
  });

  it('should apply customer coupon that fails for anonymous user', () => {
    cartCoupon.applyMyCouponAsAnonymous(cartCoupon.myCouponCode2);
  });

  describe('claim coupon test for anonymous user', () => {
    before(() => {
      myCoupons.createStandardUser();
      cy.reload();
      visitHomePage();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    it('claim customer coupon that is successful for anonymous user', () => {
      myCoupons.verifyClaimCouponSuccessAsAnonymous(myCoupons.validCouponCode);
    });

    it('claim customer coupon that fails for anonymous user', () => {
      myCoupons.verifyClaimCouponFailedAsAnonymous(myCoupons.invalidCouponCode);
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});

describe('My coupons test for login user', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
    cy.requireLoggedIn();
    cy.reload();
    visitHomePage();
  });

  it('claim customer coupon, switch notification button and find product', () => {
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
      win.localStorage.clear();
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
