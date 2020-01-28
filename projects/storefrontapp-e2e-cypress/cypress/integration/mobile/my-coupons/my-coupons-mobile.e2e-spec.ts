import * as myCoupons from '../../../helpers/my-coupons';
import { formats } from '../../../sample-data/viewports';
import * as cartCoupon from '../../../helpers/cart-coupon';

describe(`${formats.mobile.width +
  1}p resolution - My coupons test for anonymous user`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should redirect to login page when entering my coupons using anonymous user', () => {
    myCoupons.verifyMyCouponsAsAnonymous();
  });

  it('should apply customer coupon failed for anonymous user', () => {
    cartCoupon.applyMyCouponAsAnonymous(cartCoupon.myCouponCode2);
  });

  describe(`${formats.mobile.width +
    1}p resolution - claim coupon test for anonymous user`, () => {
    beforeEach(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.reload();
      cy.getByText('Sign In / Register').should('exist');
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

describe(`${formats.mobile.width +
  1}p resolution - My coupons test for login user`, () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.requireLoggedIn();
    cy.visit('/');
    cy.get('cx-searchbox cx-icon[aria-label="search"]').click({ force: true });
  });

  it('claim customer coupon, switch notification button and find product', () => {
    cy.selectUserMenuOption({
      option: 'My Coupons',
    });
    myCoupons.verifyMyCoupons();
  });

  it('should list customer coupons and able to filter and apply at cart', () => {
    cartCoupon.verifyOrderPlacingWithCouponAndCustomerCoupon();
  });

  it('should remove customer coupon from cart', () => {
    cartCoupon.verifyCustomerCouponRemoving();
  });
});

describe(`${formats.mobile.width +
  1}p resolution - My coupons test for pagination and sort`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.login(myCoupons.testUser, myCoupons.testPassword);
    cy.visit('/');
    cy.selectUserMenuOption({
      option: 'My Coupons',
    });
  });

  it('should page and sort my coupon list', () => {
    myCoupons.verifyPagingAndSorting();
  });
});
