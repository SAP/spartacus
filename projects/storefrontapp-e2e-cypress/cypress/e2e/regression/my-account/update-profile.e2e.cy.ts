/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateProfile from '../../../helpers/update-profile';
import { checkBanner } from '../../../helpers/homepage';
import * as login from '../../../helpers/login';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My Account - Update Profile', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    // Core e2e test. Repeat in mobile view.
    updateProfile.testUpdateProfileLoggedInUser();
  });
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('update profile test for anonymous user', () => {
      // Verifies that anonymous users cannot access the update profile page and are redirected to the login page.
      // The final check ensures the URL pathname contains '/login'.
      it('should redirect to login page for anonymous user', () => {
        cy.visit(updateProfile.UPDATE_PROFILE_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('update profile test for logged in user', () => {
      before(() => {
        cy.requireLoggedIn();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Personal Details',
        });
      });

      // Tests that clicking the cancel button on the update profile page returns the user to the homepage without updating the profile.
      // The final check verifies that the URL pathname contains '/' (the homepage).
      it('should be able to cancel and go back to home', () => {
        cy.get('cx-update-profile button.btn-secondary').click();
        checkBanner();

        cy.location('pathname').should('contain', '/');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        login.signOutUser();
      });
    });
  });
});
