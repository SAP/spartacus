import * as myCoupons from '../../../helpers/my-coupons';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - My Coupons page for guest`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
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

describe(`${formats.mobile.width +
  1}p resolution - My Coupons page for login customer`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
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

describe(`${formats.mobile.width +
  1}p resolution - My Coupons page for pagination and sorting`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });
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
