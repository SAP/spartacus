/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateProfile from '../../../helpers/update-profile';
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
      it('should redirect to login page for anonymous user (CXSPA-4442)', () => {
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

      it('should be able to change to edit mode and back (CXSPA-4442)', () => {
        cy.get('.value').should('exist');

        cy.log('--> click edit button');
        cy.get('.editButton').click();

        cy.log('--> should show email message bar');
        cy.get('.value').should('not.exist');
        cy.get('.button-cancel').should('exist');

        cy.log('--> click cancel button');
        cy.get('.button-cancel').click();

        cy.log('--> should show email content');
        cy.get('.value').should('exist');

        cy.log('--> click edit button');
        cy.get('.editButton').click();
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
