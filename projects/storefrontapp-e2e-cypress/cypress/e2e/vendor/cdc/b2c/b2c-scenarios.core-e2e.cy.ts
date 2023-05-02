/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('CDC', () => {
  describe('Register with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should register and redirect to home page (CXSPA-3016)', () => {
      cdc.registerUser(cdc.user);
      cdc.verifyLoginOrRegistrationSuccess(cdc.user.fullName);
    });
  });

  describe('Register with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('should register and redirect to home page (CXSPA-3016)', () => {
      cdc.registerUserWithoutScreenSet(cdc.nativeUser);
      cdc.verifyLoginOrRegistrationSuccess(cdc.nativeUser.fullName);
    });
  });

  describe('Login existing Customer with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page (CXSPA-3016)', () => {
      cdc.loginUser(cdc.user.email, cdc.user.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.user.fullName);
    });
  });

  describe('Login existing Customer with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
    });

    it('should login and redirect to home page (CXSPA-3016)', () => {
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.nativeUser.fullName);
    });
  });

  describe('Update profile', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
      cdc.loginUser(cdc.user.email, cdc.user.password);
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });
    });

    it('should update last name in profile (CXSPA-3016)', () => {
      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess(cdc.user);
      cdc.restoreUserLastName(cdc.user); //screenset user
    });

    it('should update password in profile details with screen set (CXINT-1912)', () => {
      cdc.updateUserProfilePassword(cdc.user.password, cdc.updatedPassword);
      cdc.verifyUpdatePasswordSuccess(
        cdc.user.email,
        cdc.updatedPassword,
        cdc.nativeUser.fullName
      );
      cdc.restoreUserPassword(cdc.user); //screenset user
    });

    it('should update email in profile details with screen set and logout the user (CXINT-1912)', () => {
      const tempEmail = cdc.generateRandomEmail();
      cdc.updateUserProfileEmail(tempEmail);
      cdc.verifyUpdateEmailSuccess(
        tempEmail,
        cdc.user.password,
        cdc.user.fullName
      );
      cdc.restoreUserEmail({ ...cdc.user, email: tempEmail }); //screenset user
    });
  });

  describe('Update profile without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });
    });

    it('should update profile with native UI (CXSPA-3016)', () => {
      cdc.updateUserProfileWithoutScreenset();
      cdc.verifyProfileUpdateSuccess(cdc.nativeUser);
      cdc.restoreUserLastName(cdc.nativeUser);
    });
  });

  describe('Update email without screenset', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
      cy.selectUserMenuOption({
        option: 'Email Address',
      });
    });

    it('should NOT update email with wrong password and show error (CXINT-23)', () => {
      cdc.updateEmailWithoutScreenset(
        cdc.nativeUser.email,
        'WRONG_Pswd', //wrong password
        true //error testing
      );
      cdc.verifyUpdateEmailError();
    });

    it('should update email (CXSPA-3016)', () => {
      const tempEmail = cdc.generateRandomEmail();
      cdc.updateEmailWithoutScreenset(tempEmail, cdc.nativeUser.password);
      cdc.verifyUpdateEmailSuccess(
        tempEmail,
        cdc.nativeUser.password,
        cdc.nativeUser.fullName
      );
      cdc.restoreUserEmail(cdc.nativeUser);
    });
  });

  describe('Update password without screenset', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
      cy.selectUserMenuOption({
        option: 'Password',
      });
    });

    it('should NOT update password in Native UI with wrong password (CXINT-23)', () => {
      cdc.updatePasswordWithoutScreenset(
        'WRONG_Pswd', //wrong password
        cdc.updatedPassword,
        true
      );
      cdc.verifyUpdatePasswordError();
    });

    it('should update password in Native UI (CXSPA-3016)', () => {
      cdc.updatePasswordWithoutScreenset(
        cdc.nativeUser.password,
        cdc.updatedPassword
      );
      cdc.verifyUpdatePasswordSuccess(
        cdc.nativeUser.email,
        cdc.updatedPassword,
        cdc.nativeUser.fullName
      );
      cdc.restoreUserPassword(cdc.nativeUser);
    });
  });

  describe('Forgot password in screenset', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    it('should NOT send email to invalid email address in CDC screenset (CXINT-23)', () => {
      cdc.forgotPassword('invalid_email@sapcx.com');
      cdc.verifyForgotPasswordError();
    });

    it('should send email to invalid email address in CDC screenset (CXINT-23)', () => {
      cdc.forgotPassword(cdc.user.email);
      cdc.verifyForgotPasswordSuccess();
    });
  });

  describe('Forgot password with Native UI', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    it('should NOT send email to invalid email address in CDC (CXINT-23)', () => {
      cdc.forgotPasswordWithoutScreenset('invalid_email@sapcx.com');
      cdc.verifyForgotPasswordWithoutScreensetError();
    });

    it('should send email to valid email address in CDC (CXINT-23)', () => {
      cdc.forgotPasswordWithoutScreenset(cdc.nativeUser.email);
      cdc.verifyForgotPasswordWithoutScreensetSuccess();
    });
  });

  describe('CDC My Account - Address Book', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
      cy.selectUserMenuOption({
        option: 'Address Book',
      });
    });

    it('should display a new address form when no address exists (CXSPA-3016)', () => {
      cy.get('cx-address-form').should('exist');
    });

    it('should add a new address and show it in CDC (CXSPA-3016)', () => {
      cdc.addAddress(cdc.nativeUser);
      cdc.verifyAddAddressSuccess(cdc.nativeUser);
    });

    it('should edit the Address and save it in CDC (CXSPA-3016)', () => {
      cdc.updateAddress(cdc.updatedFirstAddress);
      cdc.verifyUpdateAddressSuccess(cdc.updatedFirstAddress);
    });

    it('should add another Address and NOT save it in CDC if it is not default (CXSPA-3016)', () => {
      cy.get('button').contains(' Add new address ').click({ force: true });
      cdc.addAddress(cdc.secondAddress);
      cdc.verifyNoCDCForNonDefaultAddress();
    });

    it('should set the non default Address as default and save it in CDC (CXSPA-3016)', () => {
      cdc.setAddressAsDefault(cdc.secondAddress);
      cdc.verifySetDefaultAddressSuccess(cdc.secondAddress);
    });

    it('should show delete the first Address and update the second address as default in CDC (CXSPA-3016)', () => {
      cdc.deleteAddress(cdc.updatedFirstAddress);
      cdc.verifyDeleteAddressSuccess(cdc.updatedFirstAddress);
    });

    it('should show delete the second Address and empty the address in CDC (CXSPA-3016)', () => {
      cdc.deleteAddress(cdc.updatedFirstAddress);
      cdc.verifyDeleteAllAddressSuccess();
    });
  });

  after(() => {
    cy.visit('/logout');
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });
});
