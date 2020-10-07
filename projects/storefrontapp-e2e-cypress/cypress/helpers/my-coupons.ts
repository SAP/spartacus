import { standardUser } from '../sample-data/shared-users';
import { waitForPage } from './checkout-flow';
import * as alerts from './global-message';
import { generateMail, randomString } from './user';

export const testUser = 'test-user-with-coupons@ydev.hybris.com';
export const testPassword = 'Password123.';
export const claimCouponUrl = '/my-account/coupon/claim/';
export const loginContainUrl = '/login';
export const myCouponsContainUrl = '/my-account/coupons';
export const validCouponCode = 'customerCoupon1';
export const invalidCouponCode = 'invalidCoupon';
export const CouponWithOpenCatalog = 'dragonboat';
export const CouponWithProductCategory = 'springfestival';
export const CouponWithProducts = 'midautumn';
export const PageSize = 10;
export const NumberInPage2 = 1;

export const pageUrl = `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
  'BASE_SITE'
)}`;

export function verifyPagingAndSorting() {
  const firstCouponStartDateAscending = 'customerCoupon1';
  const firstCouponStartDateDescending = 'customerCoupon11';
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

export function verifyMyCouponsAsAnonymous() {
  cy.visit('/my-account/coupons');
  cy.location('pathname').should('contain', loginContainUrl);
}

export function verifyClaimCouponSuccessAsAnonymous(couponCode: string) {
  claimCoupon(couponCode);
  cy.location('pathname').should('contain', myCouponsContainUrl);
  cy.get('.cx-coupon-card').within(() => {
    cy.get('.cx-coupon-card-id').should('contain', couponCode);
  });
}

export function verifyClaimCouponFailedAsAnonymous(couponCode: string) {
  claimCoupon(couponCode, 400);
  cy.location('pathname').should('contain', myCouponsContainUrl);
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
  verifyFindProduct(CouponWithOpenCatalog, 10);
  goMyCoupon();
  verifyFindProduct(CouponWithProductCategory, 4);
  goMyCoupon();
  verifyFindProduct(CouponWithProducts, 1);
}

export function claimCoupon(
  couponCode: string,
  validCouponPostRequest: number = 201
) {
  // sometimes we need to wait for the document to load
  cy.wait(1000);

  const claimCouponPage = waitForPage(
    claimCouponUrl + couponCode,
    'getClaimedCouponPage'
  );

  const claimCouponsPostRequest = waitClaimCouponPostRequest(couponCode);

  const getCoupons = waitClaimCouponGetRequest();

  const couponsPage = waitForPage(myCouponsContainUrl, 'getCouponsPage');

  cy.visit(claimCouponUrl + couponCode);

  cy.wait(`@${claimCouponPage}`).its('status').should('eq', 200);
  cy.wait(`@${claimCouponsPostRequest}`)
    .its('status')
    .should('eq', validCouponPostRequest);

  if (validCouponPostRequest === 400) {
    alerts.getErrorAlert().should('exist');
  }

  cy.wait(`@${couponsPage}`).its('status').should('eq', 200);
  cy.wait(`@${getCoupons}`).its('status').should('eq', 200);
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
  cy.location('pathname').should('contain', myCouponsContainUrl);
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

  cy.wait(`@${productSearchPage}`).its('status').should('eq', 200);

  cy.get('cx-breadcrumb').within(() => {
    cy.get('span:last a').should('contain', 'My coupons');
    cy.get('h1').should('contain', couponCode);
  });
  cy.get('cx-product-list-item').should('have.length', productNumber);
}

export function waitClaimCouponPostRequest(couponCode: string): string {
  const aliasName = 'claimCoupon';
  cy.server();
  cy.route(
    'POST',
    `${pageUrl}/users/current/customercoupons/${couponCode}/claim*`
  ).as(aliasName);
  return `${aliasName}`;
}

export function waitClaimCouponGetRequest(): string {
  const aliasName = 'getCoupons';
  cy.server();
  cy.route('GET', `${pageUrl}/users/current/customercoupons*`).as(aliasName);
  return `${aliasName}`;
}
