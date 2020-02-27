import { standardUser } from '../sample-data/shared-users';
import { config, retrieveAuthToken } from '../support/utils/login';
import { login } from './auth-forms';
import * as alerts from './global-message';
import { generateMail, randomString } from './user';

export const testUser = 'test-user-with-coupons@ydev.hybris.com';
export const testPassword = 'Password123.';
export const claimCouponUrl = '/my-account/coupon/claim/';
export const loginContainUrl = '/login';
export const myCouponsContainUrl = '/coupons';
export const validCouponCode = 'customerCoupon1';
export const invalidCouponCode = 'invalidCoupon';
export const CouponWithOpenCatalog = 'dragonboat';
export const CouponWithProductCategory = 'springfestival';
export const CouponWithProducts = 'midautumn';
export const PageSize = 10;
export const NumberInPage2 = 2;

export function verifyPagingAndSorting() {
  const firstCouponStartDateAscending = 'customerCoupon1';
  const firstCouponStartDateDescending = 'customerCoupon11';
  const firstCouponEndDateAscending = 'dragonboat';
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
    cy.getByText('2').click();
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
  cy.location('pathname').should('contain', loginContainUrl);
  login(
    standardUser.registrationData.email,
    standardUser.registrationData.password
  );
  cy.location('pathname').should('contain', myCouponsContainUrl);
  cy.get('.cx-coupon-card').within(() => {
    cy.get('.cx-coupon-card-id').should('contain', couponCode);
  });
}

export function verifyClaimCouponFailedAsAnonymous(couponCode: string) {
  claimCoupon(couponCode);
  cy.location('pathname').should('contain', loginContainUrl);
  login(
    standardUser.registrationData.email,
    standardUser.registrationData.password
  );
  cy.location('pathname').should('contain', myCouponsContainUrl);
  alerts.getErrorAlert().should('exist');
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

export function claimCoupon(couponCode: string) {
  cy.visit(claimCouponUrl + couponCode);
}

export function createStandardUser() {
  standardUser.registrationData.email = generateMail(randomString(), true);
}

export function registerUser() {
  createStandardUser();
  retrieveTokenAndRegister();
}

export function retrieveTokenAndRegister() {
  // User needs to be registered
  retrieveAuthToken().then(response =>
    cy.request({
      method: 'POST',
      url: config.newUserUrl,
      body: {
        firstName: standardUser.registrationData.firstName,
        lastName: standardUser.registrationData.lastName,
        password: standardUser.registrationData.password,
        titleCode: standardUser.registrationData.titleCode,
        uid: standardUser.registrationData.email,
      },
      headers: {
        Authorization: `bearer ` + response.body.access_token,
      },
    })
  );
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
    .then(el => {
      cy.wrap(el).check();
    });
  verfifyNotificationEnable();
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then(el => {
      cy.wrap(el).uncheck();
    });
  verfifyNotificationDisable();
}

export function verfifyNotificationEnable() {
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then(el => {
      cy.wrap(el).should('be.checked');
    });
}

export function verfifyNotificationDisable() {
  cy.get('[type="checkbox"]:first')
    .should('be.enabled')
    .then(el => {
      cy.wrap(el).should('not.be.checked');
    });
}

export function verifyReadMore() {
  cy.get('.cx-card-read-more:first').click();
  cy.get('cx-coupon-dialog').should('exist');
  cy.get('.cx-dialog-header span').click();
}

export function verifyFindProduct(couponCode: string, productNumber: number) {
  cy.getByText(couponCode)
    .parent()
    .parent()
    .parent('.cx-coupon-data')
    .within(() => {
      cy.get('.cx-coupon-find-product:first .btn')
        .should('contain', ' Find Products')
        .click();
    });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('span:last a').should('contain', 'My Coupons');
    cy.get('h1').should('contain', couponCode);
  });
  cy.get('cx-product-list-item').should('have.length', productNumber);
}
