/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

  describe('Login existing B2B Customer with Screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginUser(cdc.b2bUser.email, cdc.b2bUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2bUser.fullName);
    });
  });

  describe('Login existing B2B Customer with Native UI', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
    });

    it('should login and redirect to home page', () => {
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
      cdc.verifyLoginOrRegistrationSuccess(cdc.b2bUser.fullName);
    });
  });

  describe('Update profile', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/cdc/login');
      cdc.loginUser(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update profile', () => {
      cy.selectUserMenuOption({
        option: 'Profile Details',
      });

      cdc.updateUserProfile();
      cdc.verifyProfileUpdateSuccess(cdc.b2bUser);
      cdc.restoreUserLastName(cdc.b2bUser);
    });
  });

  describe('Update profile without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update profile with native UI', () => {
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });

      cdc.updateUserProfileWithoutScreenset();
      cdc.verifyProfileUpdateSuccess(cdc.b2bUser);
      cdc.restoreUserLastName(cdc.b2bUser);
    });
  });

  describe('Update email without screenset', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update email', () => {
      cy.selectUserMenuOption({
        option: 'Email Address',
      });

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
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
    });

    it('should update password in Native UI', () => {
      cy.selectUserMenuOption({
        option: 'Password',
      });

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

  describe('CDC My Account - Address Book', () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/login');
      cdc.loginWithoutScreenSet(cdc.b2bUser.email, cdc.b2bUser.password);
      cy.selectUserMenuOption({
        option: 'Address Book',
      });
    });

    it('should display a new address form when no address exists', () => {
      cy.get('cx-address-form').should('exist');
    });

    it('should add a new address and show it in CDC', () => {
      cdc.addAddress(cdc.b2bUser);
      cdc.verifyAddAddressSuccess(cdc.b2bUser);
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
