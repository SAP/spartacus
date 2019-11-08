import { login } from './auth-forms';
import { standardUser } from '../sample-data/shared-users';
import { generateMail, randomString } from './user';
import * as alerts from './global-message';
import { config, retrieveAuthToken } from '../support/utils/login';

export const testUser = 'test-user-with-coupons@ydev.hybris.com';
export const testPassword = 'Password123.';
export const claimCouponUrl = '/my-account/coupon/claim/';
export const loginContainUrl = '/login';
export const myCouponsContainUrl = '/coupons';
export const validCouponCode = 'customerCoupon1';
export const invalidCouponCode = 'invalidCoupon';
export const findProductCoupon = 'qualifyProductCoupon';

export function verifyMyCouponsAsAnonymous() {
  it('should redirect from my coupons page to login page', () => {
    cy.visit('/my-account/coupons');
    cy.location('pathname').should('contain', loginContainUrl);
  });
}

export function verifyClaimCouponSuccessAsAnonymous(couponCode: string) {
  it('should redirect to login page and claim coupon success', () => {
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
  });
}

export function verifyClaimCouponFailedAsAnonymous(couponCode: string) {
  it('should redirect to login page and claim coupon fail', () => {
    claimCoupon(couponCode);
    cy.location('pathname').should('contain', loginContainUrl);
    login(
      standardUser.registrationData.email,
      standardUser.registrationData.password
    );
    cy.location('pathname').should('contain', myCouponsContainUrl);
    alerts.getErrorAlert().should('exist');
  });
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

export function verifyCoupons() {
  cy.get('cx-breadcrumb h1').should('contain', 'My Coupons');
  cy.get('.cx-my-coupons-header').should('contain', 'My coupons');
  cy.get('cx-my-coupons .cx-section-msg').should(
    'contain',
    'You have no coupons available'
  );
  claimCoupon(findProductCoupon);
  cy.location('pathname').should('contain', myCouponsContainUrl);
  cy.get('.cx-coupon-card:first').within(() => {
    cy.get('.cx-coupon-card-id').should('contain', findProductCoupon);
  });
}

export function verifyEnableDisableNotification() {
  cy.get('[type="checkbox"]')
    .first()
    .should('not.be.checked');

  cy.get('[type="checkbox"]')
    .first()
    .check();
  verfifyNotificationEnable();

  cy.get('[type="checkbox"]')
    .first()
    .uncheck();
  verfifyNotificationDisable();
}

export function verfifyNotificationEnable() {
  cy.visit('/');
  cy.visit('/my-account/coupons');
  cy.get('[type="checkbox"]')
    .first()
    .should('be.checked');
}

export function verfifyNotificationDisable() {
  cy.visit('/');
  cy.visit('/my-account/coupons');
  cy.get('[type="checkbox"]')
    .first()
    .should('not.be.checked');
}

export function verifyReadMore() {
  cy.get('.cx-card-read-more:first').click();
  cy.get('cx-coupon-dialog').should('exist');
  cy.get('.cx-dialog-header span').click();
}

export function verifyFindProduct() {
  cy.get('.cx-coupon-find-product:first .btn')
    .should('contain', ' Find Products')
    .click();

  cy.location('pathname').should('contain', 'search');
  cy.get('cx-breadcrumb').within(() => {
    cy.get('span:last a').should('contain', 'My Coupons');
    cy.get('h1').should(
      'contain',
      '1 result for coupon "qualifyProductCoupon"'
    );
  });
}

export function verifyMyCoupons() {
  it('should claim and display coupons', () => {
    verifyCoupons();
  });

  it('should enable/disable coupon notification', () => {
    verifyEnableDisableNotification();
  });

  it('should read more detail and find product', () => {
    verifyReadMore();
    verifyFindProduct();
  });
}

const firstCouponStartDateAscending = 'customerCoupon1';
const firstCouponStartDateDescending = 'customerCoupon11';
const firstCouponEndDateAscending = 'customerCoupon1';
const firstCouponEndDateDescending = 'customerCoupon11';
const firstCouponCodeSelector =
  'cx-my-coupons .cx-coupon-card:first .cx-coupon-card-id';

export function verifyPagingAndSorting() {
  it('should page and sort', () => {
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
    cy.get('.cx-coupon-card').should('have.length', 10);
    cy.get('cx-pagination:first .page-link').should('have.length', 4);
  });
}
