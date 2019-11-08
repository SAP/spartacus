import * as myCoupons from '../../../helpers/my-coupons';

describe('My coupons test for anonymous user', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  myCoupons.verifyMyCouponsAsAnonymous();

  describe('claim coupon test for anonymous user', () => {
    beforeEach(() => {
      myCoupons.registerUser();
    });
    myCoupons.verifyClaimCouponSuccessAsAnonymous(myCoupons.validCouponCode);
    myCoupons.verifyClaimCouponFailedAsAnonymous(myCoupons.invalidCouponCode);
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
  myCoupons.verifyMyCoupons();
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

  myCoupons.verifyPagingAndSorting();
});
