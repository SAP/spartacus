/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { editedAddress } from '../../../helpers/address-book';
import { fillRegistrationForm, login } from '../../../helpers/auth-forms';
import * as loginHelper from '../../../helpers/login';
import { generateMail, randomString } from '../../../helpers/user';
import {
  getSampleUser,
  SampleOrg,
  SampleUser,
} from '../../../sample-data/checkout-flow';
import { AddressData, fillShippingAddress } from '../../checkout-forms';
import * as alerts from '../../global-message';
import { listenForTokenRevocationRequest } from '../../login';

export const updatedName = ' updated';
export const updatedEmail = 'cypress_user_updated@sapcx.com';
export const updatedB2BEmail = 'spartacusb2bupdated@sapcx.com';
export const updatedPassword = 'NewPassword123.';

export function registerUser(cdcUser) {
  cy.findByText("Don't have an account yet?").click();
  cy.wait(2000);
  registerCDC(cdcUser);
}

export const user = getSampleUser(); //screenset UI user
export const nativeUser = getSampleUser();
export const b2cConsentTestUser = {
  email: 'consenttester@xyz.com',
  password: 'Password123.',
  fullName: 'Consent Tester',
  encodedEmail: 'consenttester%40xyz.com',
  stuntDoubleEmail: 'stuntdouble@xyz.com',
  stuntDoublePassword: 'Password123.',
  encodedStuntDoubleEmail: 'stuntdouble%40xyz.com',
};
export const b2bUser = getSampleB2BUser();
export const updatedFirstAddress = {
  ...editedAddress,
};
export const secondAddress: AddressData = {
  ...b2bUser,
  firstName: 'Second',
  lastName: 'Address',
  address: {
    city: 'New York',
    country: 'United States',
    line1: 'second address line xxx1',
    line2: 'second address line xxx2',
    postal: '123000',
    state: 'New York',
  },
};

export function interceptGetB2BUser() {
  const interceptName = 'currentB2BUser';
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/${Cypress.env('OCC_PREFIX_USER_ENDPOINT')}/current?*`,
  }).as('currentB2BUser');

  return interceptName;
}

export function updateCustomerIdForB2BUser(interceptName: string) {
  cy.wait(`@${interceptName}`)
    .then((xhr) => {
      expect(xhr.request.method).to.eq('GET');
      if (xhr && xhr.response && xhr.response.body) {
        b2bUser.customerId = xhr.response.body.customerId;
      }
    })
    .its('response.statusCode')
    .should('eq', 200);
}

export function waitForCmsComponentsToLoad(baseSite: string) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${baseSite}/cms/components`,
  }).as('getComponents');
  cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
}

export function registerCDC(cdcUser) {
  fillAndSubmitRegistrationForm(cdcUser);
}

export function fillAndSubmitRegistrationForm(cdcUser) {
  cy.get('[id="register-site-login"]').within(() => {
    cy.get('[placeholder="Email *"]').type(cdcUser.email);
    cy.get('[placeholder="First name"]').type(cdcUser.firstName);
    cy.get('[placeholder="Last name"]').type(cdcUser.lastName);
    cy.get('[placeholder="Password *"]').type(cdcUser.password);
    cy.get('[placeholder="Confirm password *"]').type(cdcUser.password);
    cy.get(
      '[data-gigya-name="preferences.terms.test.terms.of.use.isConsentGranted"]'
    ).check();
    cy.get(
      '[data-gigya-name="preferences.consent.survey.isConsentGranted"]'
    ).check();
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function registerUserWithoutScreenSet(cdcUser) {
  cy.findByText(/Sign in \/ Register/i).click();
  cy.get('cx-login-register').findByText('Register').click();
  fillRegistrationForm(cdcUser, false);
  cy.get('button[type="submit"]').click();
}

export function fillAndSubmitNativeRegistrationForm(cdcUser) {
  cy.get('[id="register-site-login"]').within(() => {
    cy.get('[placeholder="Enter email"]').type(cdcUser.email);
    cy.get('[placeholder="First name"]').type(cdcUser.firstName);
    cy.get('[placeholder="Last name"]').type(cdcUser.lastName);
    cy.get('[placeholder="Password *"]').type(cdcUser.password);
    cy.get('[placeholder="Confirm password *"]').type(cdcUser.password);
    cy.get(
      '[data-gigya-name="preferences.terms.test.terms.of.use.isConsentGranted"]'
    ).check();
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function loginUser(email: string, password: string) {
  cy.get('[id="gigya-login-form"]').within(() => {
    cy.get('[placeholder="Email *"]').type(email);
    cy.get('[placeholder="Password *"]').type(password);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function registerOrg(user: SampleUser, org: SampleOrg) {
  cy.get('[id="gigya-org-register-form"]').within(() => {
    cy.get('[name="organization.name"]').type(org.companyName);
    cy.get('[name="organization.street_address"]').type(org.address);
    cy.get('[name="organization.city"]').type(org.city);
    cy.get('[name="organization.state"]').type(org.state);
    cy.get('[name="organization.zip_code"]').type(org.zipCode);
    cy.get('[name="organization.country"]').type(org.country);
    cy.get('[name="requester.firstName"]').type(user.firstName);
    cy.get('[name="requester.lastName"]').type(user.lastName);
    cy.get('[name="requester.email"]').type(user.email);
    cy.get('[name="requester.phone"]').type(user.phone);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function loginWithoutScreenSet(email: string, password: string) {
  login(email, password);
}

export function verifyLoginOrRegistrationSuccess(fullName: string) {
  cy.get('[class="cx-login-greet"]').should('contain', fullName);
}

export function verifyOrgRegistrationRequestReceived() {
  cy.get('[id="gigya-org-register-success-screen"]').should(
    'contain',
    "We have received your request to register as a Customer. You'll receive an email once your request is approved."
  );
}

export function interceptCDCSDKMethod(methodName: string) {
  let cdcInterceptName = 'CDCSdkInvocation';
  cy.intercept({
    method: 'POST',
    path: '/' + methodName,
  }).as(cdcInterceptName);

  return cdcInterceptName;
}

export function verifyCDCReqAddressPayload(
  cdcInterceptName: string,
  address: any
) {
  cy.wait(`@${cdcInterceptName}`)
    .then((xhr) => {
      expect(xhr.request.method).to.eq('POST');
      if (address.line1) {
        expect(xhr.request.body).to.contain(encodeURI(address.line1));
      }
      if (address.line2) {
        expect(xhr.request.body).to.contain(encodeURI(address.line2));
      }
      if (address.state) {
        expect(xhr.request.body).to.contain(encodeURI(address.state));
      }
      if (address.postalCode) {
        expect(xhr.request.body).to.contain(encodeURI(address.postalCode));
      }
      if (address.city) {
        expect(xhr.request.body).to.contain(encodeURI(address.city));
      }
    })
    .its('response.statusCode')
    .should('eq', 200);
}

export function verifyCDCSDKInvocation(cdcInterceptName: string) {
  cy.wait(`@${cdcInterceptName}`).its('response.statusCode').should('eq', 200);
}

export function verifyNoCDCInvocation(methodName: string) {
  cy.intercept('/' + methodName, cy.spy().as('cdcInvocation'));
  cy.get('@cdcInvocation').should('not.have.been.called');
}

export function updateUserProfile(lastName: string = updatedName) {
  cy.get('[id="gigya-profile-form"]').within(() => {
    cy.get('[name="profile.lastName"]')
      .should('be.visible')
      .invoke('val')
      .should('not.be.empty'); //not empty
    cy.get('[name="profile.lastName"]').clear();
    cy.get('[name="profile.lastName"]').type(lastName);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function updateUserProfilePassword(
  oldPass: string,
  newPass: string = updatedPassword
) {
  cy.get('[id="gigya-profile-form"]').within(() => {
    cy.get('[data-switch-screen="gigya-change-password-screen"]')
      .last()
      .click();
    cy.get('[name="password"]').type(oldPass);
    cy.get('[name="newPassword"]').type(newPass);
    cy.get('[name="passwordRetype"]').type(newPass);
    cy.get('[class="gigya-input-submit"]').click();
  });
  logoutUser();
}

export function updateUserProfileEmail(email: string = updatedEmail) {
  const tokenRevocationAlias = listenForTokenRevocationRequest();
  cy.get('[id="gigya-profile-form"]').within(() => {
    cy.get('[name="email"]')
      .should('be.visible')
      .invoke('val')
      .should('not.be.empty'); //not empty
    cy.get('[name="email"]').clear();
    cy.get('[name="email"]').type(email);
    cy.get('[class="gigya-input-submit"]').click();
  });
  cy.wait(tokenRevocationAlias);
}

export function updateUserProfileWithoutScreenset(
  lastName: string = updatedName
) {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  cy.get('cx-update-profile form').within(() => {
    cy.get('[name="lastName"]')
      .should('be.visible')
      .invoke('val')
      .should('not.be.empty'); //not empty
    cy.get('[name="lastName"]').clear();
    cy.get('[name="lastName"]').type(lastName);
    cy.get('[class="btn btn-block btn-primary"]').click();
  });
  verifyCDCSDKInvocation(cdcInterceptName);
}

export function verifyProfileUpdateSuccess(cdcUser) {
  cy.get('[class="cx-login-greet"]').should(
    'contain',
    cdcUser.firstName + updatedName
  );
}

export function restoreUserLastName(cdcUser) {
  cy.visit('/my-account/update-profile');
  updateUserProfileWithoutScreenset(cdcUser.lastName);
}

export function updateEmailWithoutScreenset(
  email: string = updatedEmail,
  password: string = b2bUser.password,
  isErrorTestCase: boolean = false
) {
  const cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');

  cy.get('cx-update-email form').within(() => {
    cy.get('[name="email"]').type(email);
    cy.get('[name="confirmEmail"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[class="btn btn-block btn-primary"]').click();
  });
  if (!isErrorTestCase) {
    //only for sucess scenario
    const tokenRevocationAlias = listenForTokenRevocationRequest();
    verifyCDCSDKInvocation(cdcInterceptName);
    cy.wait(tokenRevocationAlias);
  }
}

export function verifyUpdateEmailError() {
  //verify error message is shown.
  const alert = alerts.getErrorAlert();
  alert.should('contain', 'Password entered is not valid');
  //check for no route change
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/my-account\/update-email$/);
  });
}

export function verifyUpdateEmailSuccess(
  email: string,
  password: string,
  fullName: string
) {
  //Login user
  cy.visit('/login');
  loginWithoutScreenSet(email, password);
  verifyLoginOrRegistrationSuccess(fullName);
}

export function restoreUserEmail(cdcUser) {
  cy.selectUserMenuOption({
    option: 'Email Address',
  });
  updateEmailWithoutScreenset(cdcUser.email, cdcUser.password);
}

export function updatePasswordWithoutScreenset(
  oldPass: string = b2bUser.password,
  newPass: string = updatedPassword,
  isErrorTestCase: boolean = false
) {
  const cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  cy.get('cx-update-password form').within(() => {
    cy.get('[name="oldPassword"]').type(oldPass);
    cy.get('[name="newPassword"]').type(newPass);
    cy.get('[name="newPasswordConfirm"]').type(newPass);
    cy.get('[class="btn btn-block btn-primary"]').click();
  });
  if (!isErrorTestCase) {
    //only for sucess scenario
    const tokenRevocationAlias = listenForTokenRevocationRequest();
    verifyCDCSDKInvocation(cdcInterceptName);
    cy.wait(tokenRevocationAlias);
  }
}

export function verifyUpdatePasswordError() {
  //verify error message is shown.
  const alert = alerts.getErrorAlert();
  alert.should('contain', 'invalid loginID or password');
  //check for no route change
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/my-account\/update-password$/);
  });
}

export function verifyUpdatePasswordSuccess(
  email: string,
  password: string,
  fullName: string
) {
  cy.visit('/login');
  loginWithoutScreenSet(email, password);
  verifyLoginOrRegistrationSuccess(fullName);
}

export function restoreUserPassword(cdcUser) {
  cy.selectUserMenuOption({
    option: 'Password',
  });
  updatePasswordWithoutScreenset(updatedPassword, cdcUser.password);
}

export function addAddress(cdcUser) {
  fillShippingAddress(cdcUser);
}

export function verifyAddAddressSuccess(cdcUser) {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  verifyCDCReqAddressPayload(cdcInterceptName, cdcUser.address);
}

export function updateAddress(cdcUser) {
  const card = cy.get('cx-card').first();
  card.contains('Edit').click();
  fillShippingAddress(cdcUser);
}

export function verifyUpdateAddressSuccess(cdcUser) {
  verifyAddAddressSuccess(cdcUser);
}

export function setAddressAsDefault(cdcUser) {
  const card = cy.get('cx-card').contains(cdcUser.firstName);
  const cardBody = card.parentsUntil('.card-body .cx-card-body');
  const cardActions = cardBody.get('.cx-card-actions');
  cardActions.contains('Set as default').click();
}

export function verifySetDefaultAddressSuccess(cdcUser) {
  verifyAddAddressSuccess(cdcUser);
}

export function verifyNoCDCForNonDefaultAddress() {
  verifyNoCDCInvocation('accounts.setAccountInfo');
}

export function deleteAddress(cdcUser) {
  const card = cy.get('cx-card').contains(cdcUser.firstName);
  const cardBody = card.parentsUntil('.card-body .cx-card-body');
  const cardActions = cardBody.get('.cx-card-actions');
  cardActions.contains('Delete').click();
  cy.get('.cx-card-delete button.btn-primary').click();
}

export function verifyDeleteAddressSuccess(cdcUser) {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  verifyCDCReqAddressPayload(cdcInterceptName, {
    city: cdcUser.address.city,
    line1: cdcUser.address.line1,
    line2: cdcUser.address.line2,
    country: cdcUser.address.country,
    state: cdcUser.address.state,
    postal: cdcUser.address.postal,
  });
}

export function verifyDeleteAllAddressSuccess() {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  verifyCDCReqAddressPayload(cdcInterceptName, {
    city: ' ',
    line1: ' ',
    line2: '',
    country: ' ',
    state: ' ',
    postal: ' ',
  });
}

export function forgotPassword(email: string) {
  cy.visit('/cdc/login');
  cy.findByText('Forgot password?').click();
  cy.get('[id="gigya-reset-password-form"]').within(() => {
    cy.get('[id="gigya-textbox-loginID"]').clear();
    cy.get('[id="gigya-textbox-loginID"]').type(email);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function forgotPasswordWithoutScreenset(email: string) {
  cy.visit('/login/forgot-password');
  cy.get('input[type="email"]').type(email);
  cy.findByText('Submit').click();
}

export function verifyForgotPasswordError() {
  //verify error message is shown.
  cy.get('[role="alert"]').should(
    'contain',
    'There is no user with that username or email'
  );
  //check for no route change
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/cdc\/login$/);
  });
}

export function verifyForgotPasswordSuccess() {
  cy.get('.gigya-message').should(
    'contain',
    'An email regarding your password change has been sent to your email address.'
  );
  //check for no route change
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/cdc\/login$/);
  });
}

export function verifyForgotPasswordWithoutScreensetError() {
  //verify error message is shown.
  const alert = alerts.getErrorAlert();
  alert.should('contain', 'loginID does not exist');
  //check for no route change
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/login\/forgot-password$/);
  });
}

export function verifyForgotPasswordWithoutScreensetSuccess() {
  //verify error message is shown.
  const alert = alerts.getSuccessAlert();
  alert.should(
    'contain',
    'An email has been sent to you with information on how to reset your password.'
  );
  //check for no route change
  cy.location().should((location) => {
    expect(location.pathname).to.match(/\/login$/);
  });
}

export function logoutUser() {
  loginHelper.signOutUser();
}

export function generateRandomEmail() {
  return generateMail(randomString(), true);
}

export function getSampleB2BUser() {
  return {
    titleCode: 'Mr',
    firstName: 'Spartacus',
    lastName: 'B2BAdmin',
    fullName: 'Spartacus B2BAdmin',
    password: 'Password123.',
    email: 'spartacusb2b@sapcx.com',
    phone: '555 555 555',
    cellphone: '555 555 555',
    address: {
      city: 'Los Angeles',
      line1: '1111 S Figueroa St',
      line2: 'US-CA',
      country: 'United States',
      state: 'California',
      postal: '90015',
    },
    payment: {
      card: 'Visa',
      number: '4111111111111111',
      expires: {
        month: '12',
        year: '2027',
      },
      cvv: '123',
    },
    customerId: '991b7846-8ee3-49d9-8600-37fed93f445c',
    orgUnit: '111',
  };
}
