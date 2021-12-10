import { standardUser } from '../../sample-data/shared-users';
import { waitForPage } from '../checkout-flow';
import { generateMail, randomString } from '../user';

export const testUser = 'test-user-with-coupons@sap.cx.com';
export const testPassword = 'pw4all';
export const claimCouponUrl = '/my-account/coupon/claim/';
export const myCouponsUrl = '/my-account/coupons';
export const validCouponCode = 'customerCoupon1';
export const invalidCouponCode = 'invalidCoupon';
export const CouponWithOpenCatalog = 'dragonboat'; //Buy over $1000 get 20% off on cart (order)
export const CouponWithProductCategory = 'springfestival'; //Buy any item in the webcam category get $5 on cart (cart)
export const CouponWithProducts = 'midautumn'; //Buy PowerShot A480 and get $20 off (product)
export const PageSize = 10;
export const NumberInPage2 = 1;

export const pageUrl = `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
  'BASE_SITE'
)}`;

export function verifyPagingAndSorting() {
  const firstCouponStartDateAscending = 'customerCoupon1';
  const firstCouponStartDateDescending = 'customerCoupon2';
  const firstCouponEndDateAscending = 'customerCoupon1';
  const firstCouponEndDateDescending = 'customerCoupon11';
  const firstCouponCodeSelector =
    'cx-my-coupons .cx-coupon-card:first .cx-coupon-card-id';
  cy.get(firstCouponCodeSelector).should(
    'contain',
    firstCouponStartDateAscending
  );
  cy.get('.top cx-sorting .ng-select').ngSelect('Start Date (descending)');
  cy.get(firstCouponCodeSelector).should(
    'contain',
    firstCouponStartDateDescending
  );
  cy.get('.top cx-sorting .ng-select').ngSelect('End Date (ascending)');
  cy.get(firstCouponCodeSelector).should(
    'contain',
    firstCouponEndDateAscending
  );
  cy.get('.top cx-sorting .ng-select').ngSelect('End Date (descending)');
  cy.get(firstCouponCodeSelector).should(
    'contain',
    firstCouponEndDateDescending
  );
  cy.get('.cx-coupon-card').should('have.length', PageSize);
  cy.get('cx-pagination:last a').should('have.length', 4);
  cy.get('cx-pagination:last').within(() => {
    cy.findByText('2').click();
  });
  cy.get('.cx-coupon-card').should('have.length', NumberInPage2);
  cy.get('cx-pagination:last a:first').click();
  cy.get('.cx-coupon-card').should('have.length', PageSize);
  cy.get('cx-pagination:last a:last').click();
  cy.get('.cx-coupon-card').should('have.length', NumberInPage2);
}

export function verifyClaimCouponSuccess(couponCode: string) {
  claimCoupon(couponCode);
  cy.location('pathname').should('contain', myCouponsUrl);
  cy.get('.cx-coupon-card').within(() => {
    cy.get('.cx-coupon-card-id').should('contain', couponCode);
  });
}

export function verifyClaimCouponFail(couponCode: string) {
  claimCoupon(couponCode);
  cy.location('pathname').should('contain', myCouponsUrl);
  cy.get('.cx-coupon-card').within(() => {
    cy.get('.cx-coupon-card-id').should('not.contain', couponCode);
  });
}

export function goMyCoupon() {
  cy.visit('/my-account/coupons');
  cy.get('.cx-coupon-card').should('have.length', 3);
}

export function verifyMyCoupons() {
  verifyCouponsClaiming();
  verifyEnableDisableNotification();
  verifyReadMore();
  verifyFindProduct(CouponWithOpenCatalog, 12);
  goMyCoupon();
  verifyFindProduct(CouponWithProductCategory, 4);
  goMyCoupon();
  verifyFindProduct(CouponWithProducts, 1);
}

export function claimCoupon(couponCode: string) {
  const claimCouponPage = waitForPage(
    claimCouponUrl + couponCode,
    'getClaimedCouponPage'
  );

  const claimCoupon = waitForClaimCoupon(couponCode);

  const getCoupons = waitForGetCoupons();

  const couponsPage = waitForPage(myCouponsUrl, 'getCouponsPage');

  cy.visit(claimCouponUrl + couponCode);

  cy.wait(`@${claimCouponPage}`);
  cy.wait(`@${claimCoupon}`);

  cy.wait(`@${couponsPage}`);
  cy.wait(`@${getCoupons}`);
}

export function createStandardUser() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function verifyCouponsClaiming() {
  cy.get('cx-my-coupons .cx-section-msg').should(
    'contain',
    'You have no coupons available'
  );
  claimCoupon(CouponWithOpenCatalog);
  cy.location('pathname').should('contain', myCouponsUrl);
  cy.get('.cx-coupon-card:first').within(() => {
    cy.get('.cx-coupon-card-id').should('contain', CouponWithOpenCatalog);
  });
  claimCoupon(CouponWithProductCategory);
  cy.get('.cx-coupon-card').should('have.length', 2);
  claimCoupon(CouponWithProducts);
  cy.get('.cx-coupon-card').should('have.length', 3);
}

export function verifyEnableDisableNotification() {
  verfifyNotificationDisable();
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then((el) => {
      cy.wrap(el).check();
    });
  verfifyNotificationEnable();
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then((el) => {
      cy.wrap(el).uncheck();
    });
  verfifyNotificationDisable();
}

export function verfifyNotificationEnable() {
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then((el) => {
      cy.wrap(el).should('be.checked');
    });
}

export function verfifyNotificationDisable() {
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then((el) => {
      cy.wrap(el).should('not.be.checked');
    });
}

export function verifyReadMore() {
  cy.get('.cx-card-read-more:first').click({ force: true });
  cy.get('cx-coupon-dialog').should('exist');
  cy.get('.cx-dialog-header span').click();
}

export function verifyFindProduct(couponCode: string, productNumber: number) {
  const productSearchPage = waitForPage('search', 'getProductSearchPage');

  cy.findByText(couponCode)
    .parent()
    .parent()
    .parent('.cx-coupon-data')
    .within(() => {
      cy.get('.cx-coupon-find-product:first .btn')
        .should('contain', ' Find Products')
        .click();
    });

  cy.wait(`@${productSearchPage}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-breadcrumb').within(() => {
    cy.get('ol li:last a').should('contain', 'My coupons');
    cy.get('h1').should('contain', couponCode);
  });
  cy.get('cx-product-list-item').should('have.length', productNumber);
}

export function waitForClaimCoupon(couponCode: string): string {
  const aliasName = `claimCoupon_${couponCode}`;
  cy.intercept({
    method: 'POST',
    url: `${pageUrl}/users/current/customercoupons/${couponCode}/claim*`,
  }).as(aliasName);
  return `${aliasName}`;
}

export function waitForGetCoupons(): string {
  const aliasName = 'getCoupons';
  cy.intercept({
    method: 'GET',
    url: `${pageUrl}/users/current/customercoupons*`,
  }).as(aliasName);
  return `${aliasName}`;
}
