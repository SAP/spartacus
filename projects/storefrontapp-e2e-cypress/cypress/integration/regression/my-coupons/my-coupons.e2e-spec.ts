import * as cartCoupon from '../../../helpers/cart-coupon';
import { visitHomePage } from '../../../helpers/checkout-flow';
import * as myCoupons from '../../../helpers/my-coupons';

describe('My coupons test for anonymous user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect to login page when entering my coupons using anonymous user', () => {
    myCoupons.verifyMyCouponsAsAnonymous();
  });

  it('should apply customer coupon failed for anonymous user', () => {
    cartCoupon.applyMyCouponAsAnonymous(cartCoupon.myCouponCode2);
  });

  describe('claim coupon test for anonymous user', () => {
    before(() => {
      cy.getByText(/Sign in \/ Register/i).should('exist');
      myCoupons.registerUser();
    });

    it('claim customer coupon successfully for anonymous user', () => {
      myCoupons.verifyClaimCouponSuccessAsAnonymous(myCoupons.validCouponCode);
    });

    it('claim customer coupon failed for anonymous user', () => {
      myCoupons.verifyClaimCouponFailedAsAnonymous(myCoupons.invalidCouponCode);
    });
  });
});

describe('My coupons test for login user', () => {
  before(() => {
    cy.reload(true);
    cy.window().then(win => win.sessionStorage.clear());
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.requireLoggedIn();
    visitHomePage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('claim customer coupon, switch notification button and find product', () => {
    myCoupons.verifyMyCoupons();
  });

  it('should list customer coupons and able to filter and apply in cart', () => {
    cartCoupon.verifyOrderPlacingWithCouponAndCustomerCoupon();
  });

  it('should remove customer coupon from cart', () => {
    cartCoupon.verifyCustomerCouponRemoving();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});

describe('My coupons test for pagination and sort', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.login(myCoupons.testUser, myCoupons.testPassword);
    visitHomePage();
  });

  it('should page and sort my coupon list', () => {
    myCoupons.verifyPagingAndSorting();
  });
});
