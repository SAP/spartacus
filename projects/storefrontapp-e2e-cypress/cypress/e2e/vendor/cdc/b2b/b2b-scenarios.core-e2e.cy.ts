/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser } from '../../../../helpers/checkout-flow';
import * as alerts from '../../../../helpers/global-message';
import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import { waitForCmsComponentsToLoad } from '../../../../helpers/vendor/cdc/cdc';
import * as b2bCheckout from '../../../../sample-data/b2b-checkout';

describe('CDC B2B scenarios', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    Cypress.env('BASE_SITE', b2bCheckout.POWERTOOLS_BASESITE);
    Cypress.env('OCC_PREFIX_USER_ENDPOINT', b2bCheckout.USER_REQUEST_ENDPOINT);
    Cypress.env(
      'OCC_PREFIX_ORDER_ENDPOINT',
      b2bCheckout.ORDER_REQUEST_ENDPOINT
    );
  });

  describe('Manage Users in CDC-B2B scenario', () => {
    beforeEach(() => {
      cy.visit('/powertools-spa/en/USD/login');
      const interceptName = cdc.interceptGetB2BUser();
      loginUser(cdc.b2bUser);
      cdc.updateCustomerIdForB2BUser(interceptName);
      waitForCmsComponentsToLoad('powertools-spa');
    });
    it('should show My Company option', () => {
      cy.get('cx-navigation-ui.accNavComponent.flyout')
        .should('contain.text', 'My Account')
        .and('be.visible')
        .within(() => {
          cy.get('cx-generic-link')
            .contains('My Company')
            .should('not.be.visible');
          cy.get('nav > ul > li > button').first().focus().trigger('keydown', {
            key: ' ',
            code: 'Space',
            force: true,
          });
          cy.get('cx-generic-link').contains('My Company').should('be.visible');
        });
    });
    it('should show Manage Users Button', () => {
      cy.visit('/powertools-spa/en/USD/organization/users');
      waitForCmsComponentsToLoad('powertools-spa');
      cy.get('button.button.primary.create').contains('Manage Users').click();
    });

    it('should hide edit, disbale, change password and unit details naviation buttons in user details', () => {
      cy.visit(
        `/powertools-spa/en/USD/organization/users/${cdc.b2bUser.customerId}`
      );
      waitForCmsComponentsToLoad('powertools-spa');
      cy.get('a.link.edit').should('not.exist');
      cy.get('button.button.active').should('not.exist');
      cy.get('div.orgUnit').should('exist');
      cy.get(
        'cx-org-list > cx-split-view > cx-org-user-details > cx-org-card > cx-view > div.main > section.details > div:nth-child(5)'
      ).within(() => {
        cy.get('a.link').should('not.exist');
      });
    });

    it('should stop navigation via url change', () => {
      cy.visit('/powertools-spa/en/USD/organization/users/create');
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/users/${cdc.b2bUser.customerId}/edit`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/users/${cdc.b2bUser.customerId}/change-password`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');
    });
  });

  describe('Manage Units in CDC-B2B scenario', () => {
    beforeEach(() => {
      cy.visit('/powertools-spa/en/USD/login');
      loginUser(cdc.b2bUser);
      waitForCmsComponentsToLoad('powertools-spa');
    });
    it('should show My Company option', () => {
      cy.get('cx-navigation-ui.accNavComponent.flyout')
        .should('contain.text', 'My Account')
        .and('be.visible')
        .within(() => {
          cy.get('cx-generic-link')
            .contains('My Company')
            .should('not.be.visible');
          cy.get('nav > ul > li > button').first().focus().trigger('keydown', {
            key: ' ',
            code: 'Space',
            force: true,
          });
          cy.get('cx-generic-link').contains('My Company').should('be.visible');
        });
    });
    it('should not show Add Button', () => {
      cy.visit('/powertools-spa/en/USD/organization/units');
      waitForCmsComponentsToLoad('powertools-spa');
      cy.get('button.button.primary.create').should('not.exist');
    });

    it('should hide edit, disbale, child units in unit details', () => {
      cy.visit(
        `/powertools-spa/en/USD/organization/units/${cdc.b2bUser.orgUnit}`
      );
      waitForCmsComponentsToLoad('powertools-spa');
      cy.get('a.link.edit').should('not.exist');
      cy.get('button.button.active').should('not.exist');
      cy.get('section.link-list')
        .find('a.link')
        .should('not.include.text', 'Child Units');
    });

    it('should stop navigation via url change', () => {
      cy.visit('/powertools-spa/en/USD/organization/units/create');
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/units/${cdc.b2bUser.orgUnit}/edit`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/units/${cdc.b2bUser.orgUnit}/children`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');
    });
  });

  describe('Login existing B2B Customer with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page (CXSPA-3016)', () => {
      cdc.loginUser(cdc.b2bUser.email, cdc.b2bUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2bUser.fullName);
    });
  });

  describe('Login existing B2B Customer with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
    });

    it('should login and redirect to home page (CXSPA-3016)', () => {
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2bUser.fullName);
    });
  });

  describe('Update profile', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
      cdc.loginUser(cdc.b2bUser.email, cdc.b2bUser.password);
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });
    });

    it('should update last name in profile (CXSPA-3016)', () => {
      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess(cdc.b2bUser);
      cdc.restoreUserLastName(cdc.b2bUser);
    });

    it('should update password in profile details with screen set (CXINT-1912)', () => {
      cdc.updateUserProfilePassword(cdc.b2bUser.password, cdc.updatedPassword);
      cdc.verifyUpdatePasswordSuccess(
        cdc.b2bUser.email,
        cdc.updatedPassword,
        cdc.b2bUser.fullName
      );
      cdc.restoreUserPassword(cdc.b2bUser);
    });

    it('should update email in profile details with screen set and logout the user (CXINT-1912)', () => {
      const tempEmail = cdc.generateRandomEmail();
      cdc.updateUserProfileEmail(tempEmail);
      cdc.verifyUpdateEmailSuccess(
        tempEmail,
        cdc.b2bUser.password,
        cdc.b2bUser.fullName
      );
      cdc.restoreUserEmail({ ...cdc.b2bUser, email: tempEmail });
    });
  });

  describe('Update profile without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update profile with native UI (CXSPA-3016)', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      cdc.updateUserProfileWithoutScreenset();
      cdc.verifyProfileUpdateSuccess(cdc.b2bUser);
      cdc.restoreUserLastName(cdc.b2bUser);
    });
  });

  describe('Update email without screenset', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
      cy.selectUserMenuOption({
        option: 'Email Address',
      });
    });

    it('should NOT update email with wrong password and show error (CXINT-23)', () => {
      cdc.updateEmailWithoutScreenset(
        cdc.b2bUser.email,
        'WRONG_Pswd', //wrong password
        true //error testing
      );
      cdc.verifyUpdateEmailError();
    });

    it('should update email (CXSPA-3016)', () => {
      cdc.updateEmailWithoutScreenset(
        cdc.updatedB2BEmail,
        cdc.b2bUser.password
      );
      cdc.verifyUpdateEmailSuccess(
        cdc.updatedB2BEmail,
        cdc.b2bUser.password,
        cdc.b2bUser.fullName
      );
      cdc.restoreUserEmail(cdc.b2bUser);
    });
  });

  describe('Update password without screenset', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
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
        cdc.b2bUser.password,
        cdc.updatedPassword
      );
      cdc.verifyUpdatePasswordSuccess(
        cdc.b2bUser.email,
        cdc.updatedPassword,
        cdc.b2bUser.fullName
      );
      cdc.restoreUserPassword(cdc.b2bUser);
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
      cdc.forgotPassword(cdc.b2bUser.email);
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
      cdc.forgotPasswordWithoutScreenset(cdc.b2bUser.email);
      cdc.verifyForgotPasswordWithoutScreensetSuccess();
    });
  });

  describe('CDC My Account - Address Book', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
      cy.selectUserMenuOption({
        option: 'Address Book',
      });
    });

    it('should display a new address form when no address exists (CXSPA-3016)', () => {
      cy.get('cx-address-form').should('exist');
    });

    it('should add a new address and show it in CDC (CXSPA-3016)', () => {
      cdc.addAddress(cdc.b2bUser);
      cdc.verifyAddAddressSuccess(cdc.b2bUser);
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
