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
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
      cdc.loginUser(cdc.user.email, cdc.user.password);
    });

    it('should update profile (CXSPA-3016)', () => {
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });

      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess(cdc.user);
      cdc.restoreUserLastName(cdc.user);
    });
  });

  describe('Update profile without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
    });

    it('should update profile with native UI (CXSPA-3016)', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      cdc.updateUserProfileWithoutScreenset();
      cdc.verifyProfileUpdateSuccess(cdc.nativeUser);
      cdc.restoreUserLastName(cdc.nativeUser);
    });
  });

  describe('Update email without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
    });

    it('should update email (CXSPA-3016)', () => {
      cy.selectUserMenuOption({
        option: 'Email Address',
      });

      cdc.updateEmailWithoutScreenset(
        cdc.updatedEmail,
        cdc.nativeUser.password
      );
      cdc.verifyUpdateEmailSuccess(
        cdc.updatedEmail,
        cdc.nativeUser.password,
        cdc.nativeUser.fullName
      );
      cdc.restoreUserEmail(cdc.nativeUser);
    });
  });

  describe('Update password without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
    });

    it('should update password in Native UI (CXSPA-3016)', () => {
      cy.selectUserMenuOption({
        option: 'Password',
      });

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

  describe('CDC My Account - Address Book', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.nativeUser.email, cdc.nativeUser.password);
      cy.selectUserMenuOption({
        option: 'Address Book',
      });
    });

    it('should display a new address form when no address exists', () => {
      cy.get('cx-address-form').should('exist');
    });

    it('should add a new address and show it in CDC', () => {
      cdc.addAddress(cdc.nativeUser);
      cdc.verifyAddAddressSuccess(cdc.nativeUser);
    });

    it('should edit the Address and save it in CDC', () => {
      cdc.updateAddress(cdc.updatedFirstAddress);
      cdc.verifyUpdateAddressSuccess(cdc.updatedFirstAddress);
    });

    it('should add another Address and NOT save it in CDC if it is not default', () => {
      cy.get('button').contains(' Add new address ').click({ force: true });
      cdc.addAddress(cdc.secondAddress);
      cdc.verifyNoCDCForNonDefaultAddress();
    });

    it('should set the non default Address as default and save it in CDC', () => {
      cdc.setAddressAsDefault(cdc.secondAddress);
      cdc.verifySetDefaultAddressSuccess(cdc.secondAddress);
    });

    it('should show delete the first Address and update the second address as default in CDC', () => {
      cdc.deleteAddress(cdc.updatedFirstAddress);
      cdc.verifyDeleteAddressSuccess(cdc.updatedFirstAddress);
    });

    it('should show delete the second Address and empty the address in CDC', () => {
      cdc.deleteAddress(cdc.updatedFirstAddress);
      cdc.verifyDeleteAllAddressSuccess();
    });
  });

  after(() => {
    cdc.logoutUser();
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/');
  });
});
