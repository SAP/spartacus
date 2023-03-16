/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillRegistrationForm, login } from '../../../helpers/auth-forms';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { fillShippingAddress } from '../../checkout-forms';
import { listenForTokenRevocationRequest } from '../../login';

export const updatedName = ' updated';
export const updatedEmail = 'spartacusb2bupdated@sapcx.com';
export const updatedPassword = 'NewPassword123.';

export function registerUser(cdcUser) {
  cy.findByText("Don't have an account yet?").click();
  cy.wait(2000);
  registerCDC(cdcUser);
}

export const user = getSampleUser();
export const nativeUser = getSampleUser();

export const b2bUser = getSampleB2BUser();

export function registerCDC(cdcUser) {
  fillAndSubmitRegistrationForm(cdcUser);
}
export const cdcB2BDelegateAdminUser = {
  userId: '991b7846-8ee3-49d9-8600-37fed93f445c',
  fullName: 'Spartacus B2BAdmin',
  email: 'spartacusb2b@hybris.com',
  password: 'Password123.',
};

export function waitForCmsComponentsToLoad(baseSite: string) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${baseSite}/cms/components`,
  }).as('getComponents');
  cy.wait('@getComponents').its('response.statusCode').should('eq', 200);
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

export function finalizeRegistration() {
  cy.get('[class="gigya-screen-dialog-main"]').within(() => {
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
  finalizeRegistration();
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

export function loginWithoutScreenSet(email: string, password: string) {
  login(email, password);
}

export function verifyLoginOrRegistrationSuccess(fullName: string) {
  cy.get('[class="cx-login-greet"]').should('contain', fullName);
}

export function interceptCDCSDKMethod(methodName: string) {
  let cdcInterceptName = 'CDCSdkInvocation';
  cy.intercept({
    method: 'POST',
    path: '/' + methodName,
  }).as(cdcInterceptName);

  return cdcInterceptName;
}

export function verifyCDCSDKRequestPayload(
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
  password: string = b2bUser.password
) {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  cy.get('cx-update-email form').within(() => {
    cy.get('[name="email"]').type(email);
    cy.get('[name="confirmEmail"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[class="btn btn-block btn-primary"]').click();
  });
  verifyCDCSDKInvocation(cdcInterceptName);
  listenForTokenRevocationRequest();
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
  updateEmailWithoutScreenset(cdcUser.email);
}

export function updatePasswordWithoutScreenset(
  oldPass: string = b2bUser.password,
  newPass: string = updatedPassword
) {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  cy.get('cx-update-password form').within(() => {
    cy.get('[name="oldPassword"]').type(oldPass);
    cy.get('[name="newPassword"]').type(newPass);
    cy.get('[name="newPasswordConfirm"]').type(newPass);
    cy.get('[class="btn btn-block btn-primary"]').click();
    verifyCDCSDKInvocation(cdcInterceptName);
    listenForTokenRevocationRequest();
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
  verifyCDCSDKRequestPayload(cdcInterceptName, cdcUser.address);
}

export function updateAddress(cdcUser) {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  let card = cy.get('cx-card').first();
  card.contains('Edit').click();
  verifyCDCSDKInvocation(cdcInterceptName);
  fillShippingAddress(cdcUser);
}

export function verifyUpdateAddressSuccess(cdcUser) {
  verifyAddAddressSuccess(cdcUser);
}

export function deleteAddress() {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  let card = cy.get('cx-card').first();
  card.contains('Delete').click();
  cy.get('.cx-card-delete button.btn-primary').click();
  verifyCDCSDKInvocation(cdcInterceptName);
}

export function verifyDeleteAddressSuccess() {
  let cdcInterceptName = interceptCDCSDKMethod('accounts.setAccountInfo');
  verifyCDCSDKRequestPayload(cdcInterceptName, {
    city: ' ',
    line1: ' ',
    line2: '',
    country: ' ',
    state: ' ',
    postal: ' ',
  });
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
  };
}
