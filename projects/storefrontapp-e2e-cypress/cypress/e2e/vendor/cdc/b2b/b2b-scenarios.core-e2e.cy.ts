/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { newAddress } from '../../../../helpers/address-book';
import { loginUser } from '../../../../helpers/checkout-flow';
import * as alerts from '../../../../helpers/global-message';
import * as cdc from '../../../../helpers/vendor/cdc/cdc';
import {
  cdcB2BDelegateAdminUser,
  waitForCmsComponentsToLoad,
} from '../../../../helpers/vendor/cdc/cdc';

describe('CDC B2B scenarios', () => {
  describe('Manage Users in CDC-B2B scenario', () => {
    beforeEach(() => {
      cy.visit('/powertools-spa/en/USD/login');
      loginUser(cdcB2BDelegateAdminUser);
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
        `/powertools-spa/en/USD/organization/users/${cdcB2BDelegateAdminUser.userId}`
      );
      waitForCmsComponentsToLoad('powertools-spa');
      cy.get('a.link.edit').should('not.exist');
      cy.get('button.button.active').should('not.exist');
      cy.get('div.orgUnit').should('exist');

      cy.get('section.details').within(() => {
        cy.get('div.property.full-width').within(() => {
          cy.get('a.link').should('not.exist');
        });
      });
    });

    it('should stop navigation via url change', () => {
      cy.visit('/powertools-spa/en/USD/organization/users/create');
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/users/${cdcB2BDelegateAdminUser.userId}/edit`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/users/${cdcB2BDelegateAdminUser.userId}/change-password`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');
    });
  });

  describe('Manage Units in CDC-B2B scenario', () => {
    beforeEach(() => {
      cy.visit('/powertools-spa/en/USD/login');
      loginUser(cdcB2BDelegateAdminUser);
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
        `/powertools-spa/en/USD/organization/units/${cdcB2BDelegateAdminUser.orgUnit}`
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
        `/powertools-spa/en/USD/organization/units/${cdcB2BDelegateAdminUser.orgUnit}/edit`
      );
      alerts.getWarningAlert().should('contain', 'This item does not exist');

      cy.visit(
        `/powertools-spa/en/USD/organization/units/${cdcB2BDelegateAdminUser.orgUnit}/children`
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

      cdc.updateEmailWithoutScreenset(cdc.updatedEmail, cdc.b2bUser.password);
      cdc.verifyUpdateEmailSuccess(
        cdc.updatedEmail,
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
    });

    it('should display a new address form when no address exists', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cy.get('cx-address-form').should('exist');
    });

    it('should show Add address in CDC', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cdc.addAddress(cdc.b2bUser);
      cdc.verifyAddAddressSuccess(cdc.b2bUser);
    });

    it('should edit the Address and save it in CDC', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cdc.updateAddress(newAddress);
      cdc.verifyUpdateAddressSuccess(newAddress);
    });

    it('should show delete the Address ', () => {
      cy.selectUserMenuOption({
        option: 'Address Book',
      });

      cdc.deleteAddress();
      cdc.verifyDeleteAddressSuccess();
    });
  });
});
