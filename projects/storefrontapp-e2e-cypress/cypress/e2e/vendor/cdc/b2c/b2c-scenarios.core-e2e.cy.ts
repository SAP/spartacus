/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cdc from '../../../../helpers/vendor/cdc/cdc';

describe('CDC', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  describe('Register with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should register and redirect to home page', () => {
      cdc.registerUser(cdc.user);
      cdc.verifyLoginOrRegistrationSuccess(cdc.user.fullName);
    });
  });

  describe('Register with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('should register and redirect to home page', () => {
      cdc.registerUserWithoutScreenSet(cdc.nativeUser);
      cdc.verifyLoginOrRegistrationSuccess(cdc.nativeUser.fullName);
    });
  });

  describe('Login existing Customer with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginUser(cdc.user.email, cdc.user.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.user.fullName);
    });
  });

  describe('Login existing Customer with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
    });

    it('should login and redirect to home page', () => {
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

    it('should update profile', () => {
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

    it('should update profile with native UI', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      cdc.updateUserProfileWithoutScreenset();
      cdc.verifyProfileUpdateSuccess(cdc.nativeUser);
      cdc.restoreUserLastName(cdc.nativeUser);
    });
  });
});
