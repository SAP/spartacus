import * as myCoupons from '../../../helpers/my-coupons';

describe('My coupons test for anonymous user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  it('should redirect from my coupons page to login page', () => {
    myCoupons.verifyMyCouponsAsAnonymous();
  });

  describe('claim coupon test for anonymous user', () => {
    beforeEach(() => {
      myCoupons.registerUser();
    });

    it('should redirect to login page and claim coupon success', () => {
      myCoupons.verifyClaimCouponSuccessAsAnonymous(myCoupons.validCouponCode);
    });

    it('should redirect to login page and claim coupon fail', () => {
      myCoupons.verifyClaimCouponFailedAsAnonymous(myCoupons.invalidCouponCode);
    });
  });
});

describe('My coupons test for logged in user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.reload();
    cy.visit('/');
    cy.selectUserMenuOption({
      option: 'My Coupons',
    });
  });
  myCoupons.testMyCoupons();
});

describe('My coupons test for pagination and sort', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.login(myCoupons.testUser, myCoupons.testPassword);
    cy.reload();
    cy.visit('/');
    cy.selectUserMenuOption({
      option: 'My Coupons',
    });
  });

  it('should page and sort', () => {
    myCoupons.verifyPagingAndSorting();
  });
});
